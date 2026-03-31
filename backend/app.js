const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser = require('cookie-parser');

const authRoute=require('./src/modules/auth/auth.routes');

const app=express();

const corsOptions={
    origin:['http://localhost:5173', process.env.FRONTEND_URL],
    methods:"GET,POST,HEAD,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    credentials:true
}

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/auth', authRoute);

module.exports=app;