require('dotenv').config();
import nodemailer from "nodemailer"


//send verification S2
let sendSimpleEmail = async (dataSend) => {
    console.log('dataSend', dataSend)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Booking Care Service ☊" <taiheo234@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line 
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

//base email theo Vi - En
let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientname}!</h3>
        <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh online trên website BookingCare của chúng tôi.</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Để xác thực bạn đã đặt lịch bên chúng tôi, vui lòng click vào đường link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>

        <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `  
        <h3>Dear ${dataSend.patientname}!</h3>
        <p>You received this email because you booked an online medical appointment on our BookingCare website.</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>To confirm you have made an appointment with us, please click on the link below to complete the procedure to book an appointment.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>

        <div>Sincerely thank !</div>
        `
    }

    return result;
}



//send email remedy S3
let sendAttachment = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Booking Care Service ☊" <taiheo234@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line 
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split('base64,')[1],
                encoding: 'base64'

            }

        ],
    });
}


let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Cảm ơn bạn đã sử dụng dịch vụ khám của chúng tôi! </p>
        <p>Thông tin đơn thuốc.hoá đơn được gửi trong file dính kèm:</p>
         
        <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `  
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>Thank you for using our examination service!</p>
        <p>Prescription information. Invoices are sent in the attached file:</p>
        

        <div>Sincerely thank !</div>
        `
    }

    return result;
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}