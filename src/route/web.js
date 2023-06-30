import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"



let router = express.Router();
let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)

    //form action POST crud.ejs
    router.post('/post-crud', homeController.postCRUD)

    //table crud
    router.get('/get-crud', homeController.displayGetCRUD)

    //edit crud
    router.get('/edit-crud', homeController.getEditCRUD)

    //form action POST editCRUD.ejs = UPDATE
    router.post('/put-crud', homeController.putCRUD)

    //delete crud
    router.get('/delete-crud', homeController.deleteCRUD)

 


    //api cho front end
    router.post('/api/login',userController.handleLogin)
    router.get('/api/get-all-users',userController.handleGetAllUsers)

    return app.use("/", router)

}




module.exports = initWebRoutes;




































