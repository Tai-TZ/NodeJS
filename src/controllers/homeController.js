
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Nhận kết quả từ Services và hiển thị lên cho người dùng
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import db from '../models/index'
import CRUDService from '../services/CRUDService'




//home
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}

//Render form crud.ejs
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}



//Mã hóa passwords
let postCRUD = async (req, res) => { //việc tạo người dùng tốn thời gian nên phải sử dụng bất đồng bộ
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post CRUD from server')
}

//res.send('hello')
//res.render(crud.ejs)


//hiển thị CRUD 
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}


//render page edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)

        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('User not found!!!')

    }
}



let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })


}




//delete CRUD

let deleteCRUD = async (req, res) => {
    let id = req.query.id; // lấy id trên url

    if (id) {

        await CRUDService.deleteUserById(id)
        return res.send('delete user success!!')
    }
    else {
        return res.send('User not found !!!')

    }

}



module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}