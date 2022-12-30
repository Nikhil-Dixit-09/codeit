const express=require('express');
const router=express.Router();
const Passport=require('../config/passport');
const postsController=require('../controllers/posts_controller');
const { route } = require('./users');
router.post('/create',postsController.create);
router.get('/delete',Passport.checkAuthentication,postsController.destroy);
router.get('/like',postsController.createLike);
router.get('/deleteLike',postsController.deleteLike);
module.exports=router;