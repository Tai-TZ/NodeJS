import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"

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
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)

    // Phương thức bulk cho phép chèn nhiều bản ghi vào bảng cơ sở dữ liệu bằng một lệnh gọi hàm duy nhất
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)

    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate) //lấy schedule lên cli
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById) //lấy các thông tin address, price, province

    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById) //lấy thông tin show lên modal


    //api patients
    router.post('/api/patient-book-appointment', patientController.postBookAppointment) // dành cho user book mà không tạo tài khoản, mình tự tạo cho user này



    return app.use("/", router)

}




module.exports = initWebRoutes;




































