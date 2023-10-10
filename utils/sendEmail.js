const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // service: process.env.SMPT_SERVICE,
        // // service: 'gmail',
        // auth:{
        //     user: process.env.SMPT_MAIL,
        //     pass:process.env.SMPT_PASSWORD,
        // },
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "270e1538c38b68",
            pass: "b7fe1e9b9a0860"
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;