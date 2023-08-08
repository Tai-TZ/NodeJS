
import db from '../models/index'
require('dotenv').config();

import emailService from '../services/emailService'

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.timeType || !data.doctorId || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {

                await emailService.sendSimpleEmail({//gửi email khi patient đăt lịch
                    receiverEmail: data.email,
                    patientname: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: "https://nodemailer.com/about/"
                })



                //upsert patient: tim thay thi trả ra user # khong tim thay thi create
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
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
                            timeType: data.timeType
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

module.exports = {
    postBookAppointment: postBookAppointment
}


