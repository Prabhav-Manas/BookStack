const express=require('express');
const authMiddleware=require('../../middleware/auth.middleware');
const booksController=require('../books/books.controller');
const upload=require('../../middleware/multerConfig.middleware');

const router=express.Router();

router.post('/new-book', authMiddleware, upload.single("coverImage"), booksController.newBook);
router.get('/all-books', authMiddleware, booksController.getAllbooks);
router.get('/all', authMiddleware, booksController.getAllBooksForUsers);

router.get('/:id', authMiddleware, booksController.getBook);
router.patch('/:id', authMiddleware, upload.single("coverImage"), booksController.updateBook);
router.delete('/:id', authMiddleware, booksController.deleteBook);


module.exports=router;