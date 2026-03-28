require('dotenv').config();

const mongoose=require('mongoose');

const connnectDB=async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
    }catch(error){
        console.log('Error in DB connection:=>', error);
        process.exit(1);
    }
}

module.exports=connnectDB;