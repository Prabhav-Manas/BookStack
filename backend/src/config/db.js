require('dotenv').config();

const mongoose=require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error in DB connection:=>', error.message);
        process.exit(1);
    }
}

module.exports=connectDB;