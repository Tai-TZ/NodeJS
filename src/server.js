import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
require('dotenv').config(); //process.env.

// import cors from 'cors';
let app = express();




//fix lỗi CORS chrome chặn tên miền gọi api
app.use(function (req, res, next) { //middleware cho phép đường link 3000 gọi api lên server BE

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});




//config app 
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' })) //tăng giới hạn file upload
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


viewEngine(app);
initWebRoutes(app)

connectDB();

let port = process.env.PORT || 1234; // lấy PORT trogn .env không đc thì chạy port: 1234

app.listen(port, () => {
    //callback
    console.log("Web Full Stack is running: " + port)
});




































