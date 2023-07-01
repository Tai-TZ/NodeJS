////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              Nhận data từ phía controllers và thao tác về phía databases 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import db from '../models/index'
import bcrypt from 'bcryptjs'; // hash password


const salt = bcrypt.genSaltSync(10);// hash password

// api xữ lý login /api/login
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userData = {}
            let isExist = await checkUserEmail(email)

            if (isExist) {
                //tìm user 
                let user = await db.User.findOne({ //sequenlize
                    attributes: ['email', 'roleId', 'password'], //cần lấy pass để compare
                    where: { email: email },
                    raw: true, //lấy đầy đủ dữ liệu từ db *dạng object
                })

                if (user) {
                    //compare the password
                    let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Ok`;

                        //xóa password trong userData{} để bảo mật
                        delete user.password;
                        userData.user = user;
                        console.log(userData.user);
                    } else {
                        userData.errCode = 3
                        userData.errMessage = `Wrong Password`
                    }
                }

                else {
                    userData.errCode = 2
                    userData.errMessage = `User is not available`
                }
            } else {
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
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

// api lấy tất cả USERS /api/get-all-users
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'] //ngoại trừ password
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'] //ngoại trừ password
                    }

                })
            }

            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}



// api tạo mới user /api/create-new-user
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used, pls try another email!!'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false, // femaile = 0 , male = 1
                    roleId: data.role,
                })

                resolve({
                    errCode: 0,
                    message: 'ok'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


//Hàm mã hóa password để tạo user
let hashUserPassword = (password) => {
    // dùng promises đảm bảo hàm này luôn trả kết quả ra và tránh xử lý bất đồng bộ của js
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); //xữ lý hash password từ pack bcryptjs
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

//api xóa user /api/delete-user
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })

        if (!foundUser) { //check user 
            resolve({
                errCode: 2,
                message: `User isn't exist`
            })
        }
        else {
            await db.User.destroy({
                where: { id: userId }
            })

            resolve({
                errCode: 0,
                message: `User deleted successfully`
            })
        }
    })
}


//api sửa user /api/edit-user
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) { //check id
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!!'
                })
            }

            let user = await db.User.findOne({ //tìm id của user được chọn edit trong db, lấy data lên
                where: { id: data.id },
                raw: false
            })

            if (user) { //tìm được user, update các biến data truyền vào từ input

                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,

                    await user.save() //lưu lại info
                resolve({
                    errCode: 0,
                    message: 'Update successful!!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}