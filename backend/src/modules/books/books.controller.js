const booksService=require('../books/books.service');

// Create Book
exports.newBook=async(req, res, next)=>{
    try{
        const data={
            ...req.body,
            file:req.file,
            userId:req.user.id //logged in user's id from auth middleware
        };

        const book = await booksService.createBookService(data);

        res.status(201).json({
            status:201,
            message:'New Book added!',
            book
        })
    }catch(error){
        next(error);
    }
}

// Fetch All Books
exports.getAllbooks=async(req, res, next)=>{
    try{
        const userId=req.user.id;

        const books=await booksService.fetchAllBooks(userId);

        res.status(200).json({
            status:200,
            message:'All Books Fetched!',
            books:books
        })
    }catch(error){
        next(error);
    }
}

// Fetch A Single Book
exports.getBook=async(req, res, next)=>{
    try{
        const bookId=req.params.id;

        const book=await booksService.getSingleBookService(bookId);

        res.status(200).json({
            status:200,
            message:'Book fetched!',
            book:book
        })
    }catch(error){
        next(error)
    }
}

// Update Book
exports.updateBook=async(req, res, next)=>{
    try{
        const {id}=req.params;

        const data={
            ...req.body,
            ...req.file && {bookImg:req.file.path} // Only update image if a new one is uploaded
        }

        const book=await booksService.updateBookService(data, id);

        res.status(200).json({
            status:200,
            message:'Book updated!',
            updatedBook:book
        })
    }catch(error){
        next(error)
    }
}

// Delete Book
exports.deleteBook=async(req, res, next)=>{
    try{
        const {id}=req.params;

        const book=await booksService.deleteBookService(id);

        res.status(200).json({
            status:200,
            message:'Book deleted!'
        })
    }catch(error){
        next(error)
    }
}

// Fetch All Books For Users
exports.getAllBooksForUsers = async (req, res, next) => {
    try {
        const books = await booksService.fetchAllBooksForUsers();

        res.status(200).json({
            status: 200,
            message: 'All Books Fetched!',
            books
        });
    } catch (error) {
        next(error);
    }
}