const express=require('express');
const router=express.Router();

const commentsController=require('../controllers/comments_controller');
router.post('/create',commentsController.create);
router.get('/delete',commentsController.destroy);
router.get('/like',commentsController.createLike);
router.get('/deleteLike',commentsController.deleteLike);
module.exports=router;