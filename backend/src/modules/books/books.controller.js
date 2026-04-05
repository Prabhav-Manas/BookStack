const booksService=require('../books/books.service');

exports.newBook=async(req, res, next)=>{
    try{
        console.log('req.body =>', req.body);
        console.log('req.file =>', req.file);
        console.log('req.user =>', req.user);

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

exports.getBook=async(req, res, next)=>{
    try{
        const bookId=req.params.id;
        // console.log('Book:=>', bookId)

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