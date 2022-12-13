const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
router.get('/profile', passport.checkAuthentication,usersController.home);
router.get('/signin',passport.checkNotAuthenticated,usersController.signin);
router.get('/signup',passport.checkNotAuthenticated,usersController.signup);
router.get('/signout',usersController.signout);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),usersController.createSession);
module.exports=router;