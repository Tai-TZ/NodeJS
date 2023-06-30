////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              Nhận data từ phía controllers và thao tác về phía databases 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import db from '../models/index' 
import bcrypt from 'bcryptjs'; // hash password

 

//xữ lý login
let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try { 

            let userData = {}
            let isExist = await checkUserEmail(email)

            if (isExist) {
                //tìm user 
                let user = await db.User.findOne({ //sequenlize
                    attributes: ['email','roleId','password'], //cần lấy pass để compare
                    where:{email: email},
                    raw: true, //lấy đầy đủ dữ liệu từ db *dạng object
                })

                if (user) {
                    //compare the password
                    let check = bcrypt.compareSync( password, user.password);
                     
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Ok`;

                        //xóa password trong userData{} để bảo mật
                        delete user.password;
                        userData.user = user;
                        console.log(userData.user);
                    }else{
                        userData.errCode = 3
                        userData.errMessage = `Wrong Password` 
                    }
                }

                else{
                    userData.errCode = 2
                    userData.errMessage = `User is not available`
                }  
            }else{
                //return error
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't Exist, please try again`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}



//check user exists
let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email  :userEmail}
            })

            if (user) {
                resolve(true)
            }
            else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}



 




module.exports = {
    handleUserLogin:handleUserLogin
}