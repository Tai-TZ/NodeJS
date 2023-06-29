
// viết API

import userSevice from '../services/userService'
 

let handleLogin =  async (req, res) => {
    let email = req.body.email; //req.body lấy giá trị từ client
    let password = req.body.password;


    if (!email||!password) {
        return res.status(403).json({
            errCode:1,
            message: 'missing email, password'
        })
    }



    let userData = await userSevice.handleUserLogin(email, password) //hứng giá trị bên service

    return res.status(200).json({  
        errCode:userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    });

}

module.exports = {
    handleLogin:handleLogin,
}