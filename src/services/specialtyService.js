
import db from '../models/index'

//tạo chuyên khoá mới
let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: "Ok"
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}


//lấy tất cả chuyên khoa 
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()

            //conver img buffer -> base64 (dạng string)
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}


//api get detail Specialty theo id
let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            }
            else {

                //lấy decs của từng chuyên khoa 
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'] // chỉ lấy 2 trường này từ db
                }) //return object(true)  undentified(false)



                if (data) {
                    let doctorSpecialty = []
                    if (location === 'ALL') {
                        //tìm tất cả các bản ghi có specialtyId là inputId truyền vào
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        //find doctor by location/ tìm theo vị trí 
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty //gán vào data
                } else data = {}

                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data
                })


            }
        } catch (e) {
            reject(e);
        }
    })

}


module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,

}