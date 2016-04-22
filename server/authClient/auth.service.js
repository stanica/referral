'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import Client from '../api/client/client.model';
import Owner from '../api/user/user.model';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      Client.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    if(req.session.referralId)
      delete req.session.referralId;
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);

  res.cookie('token', token);
  res.redirect('/');
}

export function storeOwnerReferral(req, res, next){
  req.session.ownerReferralId = req.params.referralId;
  next();
}

export function setOwnerReferral(req, res, next){
  var userId = req.user._id;
  if(req.session.ownerReferralId){
    Client.findById(userId).exec()
      .then(user => {
        if (user){
          if(!user.owner){
            Owner.findOne({referralId: req.session.ownerReferralId}).exec()
            .then(owner => {
              if (!owner){
                Client.findOne({referralId: req.session.ownerReferralId}).exec()
                  .then(client => {
                    if(client){
                      user.referrer = client._id;
                      user.owner = client.owner;
                      user.save()
                      .then(() => {
                        client.referrals.push({
                          _id: user._id,
                          paid: false
                        });
                        client.save()
                        .catch(validationError(res));
                      })
                      .catch(validationError(res));
                    }
                  })
                  .catch(err => next(err));
              }
              else {
                if (user._id !== owner._id){
                  user.owner = owner._id;
                  user.save()
                    .then(() => {
                      res.status(204).end();
                      if(req.session.referralId)
                        delete req.session.referralId;
                    })
                    .catch(validationError(res));
                  owner.referrals.push({
                    _id: user._id,
                    paid: false
                  });
                  owner.save()
                  .then(()=>{
                    res.status(204).end();
                  })
                  .catch(validationError(res));
                }
              }
            })
            .catch(err => next(err));
          }
        }
      })
      .catch(err => next(err));
  }
  next();
}

export function clearReferralIds(req, res, next){
  if(req.session.ownerReferralId){
    delete req.session.ownerReferralId;
  }
  next();
}