/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import Client from '../api/client/client.model';
import Owner from '../api/user/user.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

var owner1Id, owner2Id;

Owner.find({}).remove()
  .then(() => {
    var owner1 = new Owner({
      provider: 'local',
      name: 'Haircut 4 You',
      email: 'owner@example.com',
      password: 'owner',
      photo: 'http://i.imgur.com/OpbrAJK.jpg',
      referralId: '1234',
      referrals: [],
      serviceType: 'Hairdressing',
      phone: '416-555-0101'
    });
    owner1.save(function(err, owner1){
      owner1Id = owner1._id;
      var owner2 = new Owner({
        provider: 'local',
        name: 'Sarah Campbell',
        email: 'owner2@example.com',
        password: 'owner2',
        photo: 'https://scontent-ord1-1.xx.fbcdn.net/hphotos-xla1/t31.0-8/s960x960/12970998_10209160382274967_4651504399281583408_o.jpg',
        referralId: '123',
        referrals: [],
        serviceType: 'Photographer',
        phone: '416-555-2323'
      });

      owner2.save(function(err,owner2){
        Client.find({}).remove()
        .then(() => {
          var client1 = new Client({
            provider: 'local',
            role: 'client',
            name: 'Test Client',
            email: 'client@example.com',
            password: 'client',
            photo: 'http://i.imgur.com/OpbrAJK.jpg',
            owner: owner1._id,
            referrals: [],
            referralId: '321',
            referrer: null,
            credits: 20
          });
          client1.save(function(err, client1){
           var client2 = new Client({
              provider: 'local',
              role: 'client',
              name: 'Test Client 2',
              email: 'client2@example.com',
              password: 'client2',
              photo: 'http://i.imgur.com/wYynYQu.jpg',
              owner: owner1._id,
              referrals: [],
              referralId: '4321',
              referrer: null,
              credits: 20
            });
           client2.save()
            .then(() => {
              console.log('finished populating clients');
            });
          });
        });
      })
      .then(() => {
        console.log('finished populating owners');
      });
    });
  });

