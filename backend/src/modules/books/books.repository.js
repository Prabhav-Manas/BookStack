const Books=require('../books/books.model');

exports.addBook=async(data)=>{
    return await Books.create(data);
}

exports.getAllBooks=async(userId)=>{
    return await Books.find({createdBy:userId});
}

exports.findBookById=async(bookId)=>{
    return await Books.findById(bookId);
}