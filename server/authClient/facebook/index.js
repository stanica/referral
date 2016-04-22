'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';
import {setOwnerReferral} from '../auth.service';
import {storeOwnerReferral} from '../auth.service';
import {clearReferralIds} from '../auth.service';

var router = express.Router();

router
  .get('/', clearReferralIds, passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), setOwnerReferral, setTokenCookie);

router.get('/:referralId', storeOwnerReferral, passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  }));

export default router;
