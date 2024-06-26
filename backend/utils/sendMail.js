const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email, // Ensure options.to is properly defined
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
    // console.log('mail sent')
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle the error here, perhaps log it or return an error response
    throw new Error("Failed to send email");
  }
};

module.exports = sendMail;
