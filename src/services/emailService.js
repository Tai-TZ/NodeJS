require('dotenv').config();
import nodemailer from "nodemailer"

let sendSimpleEmail = async (dataSend) => {
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




module.exports = {
    sendSimpleEmail: sendSimpleEmail
}