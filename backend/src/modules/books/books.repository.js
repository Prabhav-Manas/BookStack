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

exports.findByIdAndUpdateBook=async(data, id)=>{
    return await Books.findByIdAndUpdate(id, {$set: data}, {new:true})
}

exports.findBookByIdAndDelete=async(id)=>{
    return await Books.findByIdAndDelete(id);
}

exports.getAllBooksForUsers = async () => {
    return await Books.find({}); //return all books - regardless of user role --> For User Dashboard
}