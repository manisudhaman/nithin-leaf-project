import * as express from 'express';

import LeafCtrl from './controllers/leaf';
import UserCtrl from './controllers/user';
import Leaf from './models/leaf';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const leafCtrl = new LeafCtrl();
  const userCtrl = new UserCtrl();

  // Leafs
  router.route('/leafs').get(leafCtrl.getAll);
  router.route('/leafs/count').get(leafCtrl.count);
  router.route('/leaf').post(leafCtrl.insert);
  router.route('/leaf/:id').get(leafCtrl.get);
  router.route('/leaf/:id').put(leafCtrl.update);
  router.route('/leaf/:id').delete(leafCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
