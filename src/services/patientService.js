
import db from '../models/index'
require('dotenv').config();

import emailService from '../services/emailService'
import { v4 as uuidv4 } from 'uuid'; //tạo ra chuỗi unique


//tạo link verification
let buildUrlEmail = (doctorId, token) => {

    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.timeType || !data.doctorId || !data.date || !data.fullName
                || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {
                //gửi email khi patient đăt lịch
                let token = uuidv4(); //token
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientname: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                //upsert patient: tim thay thi trả ra user # khong tim thay thi create trong table users
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName
                    },
                    raw: true
                });
                // console.log('user ', user[0])

                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor patient successfully"
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}


//verify link email by token and doctor id
let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) { //lấy token từ link url của buildUrlEmail()
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {
                //tìm lịch hẹn trùng để update status
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1' //tìm trạng thái lịch hẹn S1
                    },
                    raw: false // (sequelize obj) để raw = false mới dùng đc hàm save()
                    //raw :true trả ra obj js -> ko dùng được save()
                })


                //nếu có thì update status S1 -> S2
                if (appointment) {
                    appointment.statusId = 'S2' //cập nhật status S2 cho token đã verify
                    await appointment.save()

                    resolve({
                        errCode: 0,
                        errMessage: 'Update Appointment success!!'
                    })
                }
                else { // trường hợp đã update hoặc token không tồn tại
                    resolve({
                        errCode: 2,
                        errMessage: "The account has been activated or does not exist"
                    })
                }

            }


        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}


