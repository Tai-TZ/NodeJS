import db from '../models/index'


//tạo phòng khám mới
let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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
            reject(e)
        }
    })
}

//lấy tất cả phòng khám
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()


            //convert img buffer to string(base64)
            if (data && data.length > 0) {
                data.map((item, index) => {
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
            reject(e)
        }
    })
}



//lấy phòng khám theo id
let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                //lấy decs của từng phòng khám
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'] // chỉ lấy 4 trường này từ db
                })


                //lấy doctor tại clinic đó
                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })
                    data.doctorClinic = doctorClinic
                }

                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}