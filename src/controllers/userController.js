////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Nhận kết quả từ Services và hiển thị lên cho người dùng
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// viết API
import userSevice from '../services/userService'
 


//XỬ LÝ LOGIN
let handleLogin =  async (req, res) => {
    let email = req.body.email; //req.body lấy giá trị từ client
    let password = req.body.password;

    //check login  
    if (!email||!password) {
        return res.status(403).json({
            errCode:1,
            message: 'missing email, password'
        })
    }
  
    //hứng giá trị bên service
    let userData = await userSevice.handleUserLogin(email, password)  
    return res.status(200).json({  
        errCode:userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    });

}


// LẤY TẤT CẢ USER HIỆN LÊN FE
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //ALL, SINGLE


    //check none id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter ',
            users: []
        })
    }


    let users = await userSevice.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK luon!!',
        users 
    })
}



 



module.exports = {
    handleLogin:handleLogin,
    handleGetAllUsers:handleGetAllUsers,
}   