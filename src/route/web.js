import express from "express";
import homeController from "../controllers/homeController";

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


    return app.use("/", router)

}




module.exports = initWebRoutes;




































