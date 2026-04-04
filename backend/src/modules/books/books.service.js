const booksRepository=require('../books/books.repository');
const createError=require('http-errors');

exports.createBookService=async(data)=>{
    const {title, author, publisher, genre, publishYear, price, isbn, description, quantity, language, userId}=data;
    
    if (!title || !author || !publisher || !genre || !publishYear || !price || !isbn || !description || !quantity || !language) {
        throw createError(400, 'Missing required fields');
    }

    if(!userId) throw createError(401, 'Unauthorized - user not found');

    if(!data.file) throw createError(400, "Cover image is required");

    const bookImg=data.file.path;

    return await booksRepository.addBook({...data, bookImg, createdBy: userId});
}

exports.fetchAllBooks=async(userId)=>{
    const allBooks=await booksRepository.getAllBooks(userId);

    if(!allBooks || allBooks.length===0) throw createError(400, 'Books not found!');

    return allBooks;
}

exports.getSingleBookService=async(bookId)=>{
    const book=await booksRepository.findBookById(bookId);

    if(!book) throw createError(404, 'Book not found');

    return book;
}