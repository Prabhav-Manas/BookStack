const express=require('express');
const userController=require('./user.controller');
const authMiddleware=require('../../middleware/auth.middleware');

const router=express.Router();

router.get('/total-users', authMiddleware, userController.getTotalUsers);

module.exports=router;