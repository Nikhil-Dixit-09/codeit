const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));
console.log("Router setup complete!!");
router.get('/',homeController.home);
router.use('/users',require('./users'));

module.exports=router;