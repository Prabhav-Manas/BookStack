require('dotenv').config();

const http=require('http');
const app=require('./app');
const connectDB = require('./src/config/db');

const PORT=process.env.PORT || 8000;

const server=http.createServer(app);

connectDB()

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

// Username: Manas
// Password: 5cJj3hY9af0BSC1l