const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
router.get('/profile/:id', passport.checkAuthentication,usersController.home);
router.get('/signin',passport.checkNotAuthenticated,usersController.signin);
router.get('/signup',passport.checkNotAuthenticated,usersController.signup);
router.get('/signout',usersController.signout);
router.post('/create',usersController.create);
router.post('/update/:id',usersController.update);
router.get('/creates',usersController.createSession);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),usersController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate( 'google',
{   failureRedirect: '/users/signin'}),usersController.createSession);
router.get('/resetP',usersController.reset);
router.post('/resetPin',usersController.initiateReset);
router.get('/newp',usersController.finalp);
router.post('/changeIt',usersController.pass);
module.exports=router;