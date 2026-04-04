const booksService=require('../books/books.service');

exports.newBook=async(req, res, next)=>{
    try{
        // console.log('req.body =>', req.body);
        // console.log('req.file =>', req.file);
        // console.log('req.user =>', req.user);

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