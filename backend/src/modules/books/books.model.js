const mongoose=require('mongoose');

const booksSchema=new mongoose.Schema({
    title:{type:String, trim:true, required:true},
    author:{type:String, trim:true, required:true},
    publisher:{type:String, trim:true, required:true},
    genre:{type:String, trim:true, required:true},
    publishYear:{type:Number, required:true},
    price:{type:Number, required:true},
    isbn:{type:String, trim:true, required:true},
    description:{type:String, trim:true, required:true},
    bookImg:{type:String, trim:true, required:true},
    quantity:{type:Number, required:true},
    language:{type:String, trim:true, required:true},

    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
}, {timestamps:true});

module.exports=mongoose.model('Books', booksSchema);