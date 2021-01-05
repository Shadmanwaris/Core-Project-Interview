var express = require('express');
import * as UserController from '../controllers/session.controller';
const router = express.Router();

router.route('/register').post(UserController.addUser);
router.route('/login').post(UserController.validateUser);
router.route('/user-verify').post(UserController.userVerifyWithToken);
router.route('/get-user').get(UserController.getUser);
router.route('/edit-user/:id').put(UserController.updateUser);
router.route('/addEducation/:id').post(UserController.addEducation);
router.route('/getEducation/:id').get(UserController.getEducation);
router.route('/delete-user/:id').delete(UserController.deleteUser);

export default router;