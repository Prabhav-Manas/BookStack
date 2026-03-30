const express=require('express');
const authController=require('../auth/auth.controller');

const router=express.Router();

router.post('/signup', authController.signup);
router.post('/verify-email/:email/:token', authController.verifyEmail);

module.exports=router;