import express from "express";
import bodyParser from "body-parser";
import  viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
require('dotenv').config(); //process.env.
 
import cors from 'cors'; 



let app= express();

//cors
app.use(cors({ credentials: true, origin: true }));

//config app 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app)

connectDB();

let port = process.env.PORT || 1234; // lấy PORT trogn .env không đc thì chạy port: 1234

app.listen(port,()=>{
    //callback
    console.log("Web Full Stack is running: "+ port)
});




































