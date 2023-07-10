import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"


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
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.getAllCode)


    //api doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)


    return app.use("/", router)

}




module.exports = initWebRoutes;




































