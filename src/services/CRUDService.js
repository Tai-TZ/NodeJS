
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              Nhận data từ phía controllers và thao tác về phía databases 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import db from '../models/index'
import bcrypt from 'bcryptjs'; // hash password



const salt = bcrypt.genSaltSync(10);// hash password



//tạo mới user
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('ok create a new user successfully')
        } catch (e) {
            reject(e)
        }
    })


}

//Hàm mã hóa password
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

//lấy tất cả user để hiển thị
let getAllUsers = () => {
    //xử lý bất đồg bộ
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, //hiển thị dự liệu gốc
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


//hiển thị một user 
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}


//Hàm cập nhật User
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ //tìm id của user được chọn edit trong db, lấy data lên
                where: { id: data.id },
            })

            if (user) { //tìm được user, update các biết data truyền vào từ input
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); //lưu info

                let allUsers = await db.User.findAll();//tìm tất cả user để load trang display sau khi update
                resolve(allUsers);
            } else {
                resolve()
            }

        } catch (e) {
            reject(e)
        }
    })
}


//xóa user theo id
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await user.destroy();
            }
            resolve(); // == return 
        } catch (e) {
            reject(e)
        }
    })
}





module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}