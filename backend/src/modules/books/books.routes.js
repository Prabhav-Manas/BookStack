const express=require('express');
const authMiddleware=require('../../middleware/auth.middleware');
const booksController=require('../books/books.controller');
const upload=require('../../middleware/multerConfig.middleware');

const router=express.Router();

router.post('/new-book', authMiddleware, upload.single("coverImage"), booksController.newBook);
router.get('/all-books', authMiddleware, booksController.getAllbooks);
router.get('/:id', authMiddleware, booksController.getBook)
module.exports=router;