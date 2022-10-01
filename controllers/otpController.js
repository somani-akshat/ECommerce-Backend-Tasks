// const dotenv = require("dotenv");
// dotenv.config({ path: __dirname + "/../.env" });

const asyncHandler = require("express-async-handler");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const wbm = require("wbm");

// const Vonage = require("@vonage/server-sdk");
// const https = require("https");
// privateKey="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvQeT1X+H/FRlPHioWvG+Wfk9bDkXVmpZyBkAN+V540KErkQO2OYrlgzHma7UeuTIDsxImB5LWaV5UDI8lu6kau6FEyx1Fmh3me2gpa/O3iBTjWUrkhCGkt+8UpXMCZu0JoNW6CKZKX6oOzn0CJWYZe/mZWprMgaGu6/0tmCxNqJzZdMhMDo6cyebLeeZ8hyTewZrGYkRg5LAJQ+domFOAhFdGJnkKS8lTZ7acWm6M3YzKNmTu1PnioYhut5H20NGI99fd6gnBQt7u+YtFfMCpXVO2DzPmnW5cYkz3Tsj2AgNPFA9H3wQ/reQyf+1oi/qYgaKtvF9I3zEDwgu+1B3dwIDAQAB"
// const vonage = new Vonage({
//   apiKey: "e145fdd8",
//   apiSecret: "iXAvgwtx1k27UTPL",
// });

// const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
//   process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

// const vonage = new Vonage(
//   {
//     apiKey: "e145fdd8",
//     apiSecret: "iXAvgwtx1k27UTPL",
//     applicationId: "2bdcd0e9-c6c2-49c5-9c86-48fb0db5c388",
//     // privateKey: process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH,
//   },
//   {
//     apiHost: "https://api.nexmo.com/",
//   }
// );
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

var client = require("twilio")(
  "AC6c6e37b58ff6a090804d0c645636fcaf",
  "c692b8fbe0e1f5ad77d036d4dccf1d19"
);
/*
LIST OF CONTROLLERS
1. Send email of otp
2. Check otp
3. Send message of Otp
4. Check otp
5. Send whatsapp message
6. Send mobile sms reminder for emi payment
7. Send email of EMI reminder
*/

// 1. Send email of otp
const sendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  const data = await Otp.findOne({ email: email });
  // console.log(data);
  if (data) {
    // console.log(data._id);
    await Otp.findByIdAndRemove(data._id);
  }
  try {
    const otpCode = Math.floor(Math.random() * 1000000 + 1);
    const otpData = new Otp({
      email: email,
      otpCode: otpCode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    const response = await otpData.save();
    // res.status(200).json({
    //   success: true,
    //   data: response,
    // });
    const output = `
      '<h2>OTP for email verification</h2>
    <p>Your OTP is ${otpCode}. OTP is valid for next 5 minutes.</p>
    <p></p>
    <p>Regards</p>
    <p>Team Full Stack Simplified</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.CODEMOON_EMAIL}`, // generated ethereal user
        pass: `${process.env.CODEMOON_PASSWORD}`, // generated ethereal password
      },
      // If on localhost
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
    });

    // send mail with defined transport object
    let mailOptions = {
      from: "Team Finance Buddy",
      to: `${email}`,
      subject: "OTP for email verification ✔",
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          success: true,
          emailSuccess: true,
          data: response,
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "Email does not exist ",
    });
  }

  // else {

  // }
});

// 2. Check otp
const checkOtp = asyncHandler(async (req, res) => {
  const { email, otpCode } = req.body;

  const data = await Otp.find({ email: email, otpCode: otpCode });

  if (data) {
    const currentTime = new Date().getTime();
    const difference = data.expiresIn - currentTime;
    // console.log(otpCode);
    // console.log(data[0].otpCode);
    if (difference < 0) {
      res.status(404).json({
        success: false,
        data: "Otp expired ",
      });
    } else if (Number(otpCode) !== Number(data[0].otpCode)) {
      res.status(404).json({
        success: false,
        data: "Otp not correct ",
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  }
});

// 3. Send message of Otp
const sendMobileOtp = asyncHandler(async (req, res) => {
  const { mobileNumber } = req.body;
  const data = await Otp.findOne({ mobileNumber: mobileNumber });

  if (data) {
    // console.log(data._id);
    await Otp.findByIdAndRemove(data._id);
  }
  try {
    const otpCode = Math.floor(Math.random() * 1000000 + 1);
    const otpData = new Otp({
      mobileNumber: mobileNumber,
      otpCode: otpCode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    console.log(mobileNumber);
    const response = await otpData.save();
    // res.status(200).json({
    //   success: true,
    //   data: response,
    // });

    client.messages
      .create({
        from: "+12162421648",
        to: "+917977757495",
        body: `Welcome to Finance Buddy. Your OTP for mobile number verification is ${otpCode}. Otp is valid for the next 5 minutes.`,
      })
      .then((message) => console.log(message.sid));

    // const from = "Vonage APIs";
    // const to = mobileNumber;
    // const text = `Welcome to Full Stack Simplified. Your OTP for mobile number verification is ${otpCode}. Otp is valid for the next 5 minutes.`;

    // vonage.message.sendSms(from, to, text, (err, responseData) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     if (responseData.messages[0]["status"] === "0") {
    //       console.log("Message sent successfully.");
    //     } else {
    //       console.log(
    //         `Message failed with error: ${responseData.messages[0]["error-text"]}`
    //       );
    //     }
    //   }
    // });
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "Email does not exist ",
    });
  }
});

// 4. Check Mobile otp
const checkMobileOtp = asyncHandler(async (req, res) => {
  const { mobileNumber, otpCode } = req.body;

  const data = await Otp.find({ mobileNumber: mobileNumber, otpCode: otpCode });

  if (data) {
    const currentTime = new Date().getTime();
    const difference = data.expiresIn - currentTime;
    if (difference < 0) {
      res.status(404).json({
        success: false,
        data: "Otp expired ",
      });
    } else if (Number(otpCode) !== Number(data[0].otpCode)) {
      res.status(404).json({
        success: false,
        data: "Otp not correct ",
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  }
});

// 5. Send Whatsapp Message
const sendWhatsappMessage = asyncHandler(async (req, res) => {
  const { mobileNumber, agentName, date, customerName, amount } = req.body;
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: `Hello ${customerName}! Your EMI of Amount Rs 8305 is due on 02/12/2021. Collection Agent: Jigar Shah will be visiting on 02/12/2021 for the amount collection. Thank you! Team Finance Buddy`,
      to: "whatsapp:+919920521656",
    })
    .then((message) => console.log(message.sid));

  res.status(200).json({
    success: true,
    data: "Whatsapp Message sent",
  });
});

// 8. Send mobile sms reminder for emi payment
const sendMobileEMIReminder = asyncHandler(async (req, res) => {
  const { mobileNumber, agentName, date, customerName, amount } = req.body;

  try {
    client.messages
      .create({
        from: "+12162421648",
        to: "+917977757495",
        body: `Hello ${customerName}! Your EMI of Amount Rs 8305 is due on ${date}. Collection Agent ${agentName} will be visiting on  ${date} for the amount collection. Thank you! Team Finance Buddy`,
      })
      .then((message) => console.log(message.sid));

    res.status(200).json({
      success: true,
      data: "Message sent",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "Error in sending SMS",
    });
  }
});

// 7. Send email of EMI reminder
const sendEmailEMIReminder = asyncHandler(async (req, res) => {
  const { email, date, customerName, amount } = req.body;
  const agentName = req.user.name;

  try {
    const output = `
      '<h2>EMI Reminder</h2>
      <p>Hello ${customerName}! Your EMI Amount of Rs 8305 is due on ${date}. Collection Agent ${agentName} will be visiting on  ${date} for the amount collection.</p> 
    <p>Regards</p>
    <p>Team Full Stack Simplified</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.CODEMOON_EMAIL}`, // generated ethereal user
        pass: `${process.env.CODEMOON_PASSWORD}`, // generated ethereal password
      },
      // If on localhost
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
    });

    // send mail with defined transport object
    let mailOptions = {
      from: "Team Finance Buddy",
      to: `${email}`,
      subject: "EMI Reminder ✔",
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          success: true,
          emailSuccess: true,
          data: response,
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "Email does not exist ",
    });
  }
});

// 6. Send Payment Link
const sendPaymentLink = asyncHandler(async (req, res) => {
  const { mobileNumber, date, customerName, amount } = req.body;

  try {
    client.messages
      .create({
        from: "+12162421648",
        to: "+917977757495",
        body: `Hello ${customerName}! Your EMI of Amount Rs${amount} is due on ${date}. Payment Link: "https://rzp.io/l/P6XaLNke". Kindly complete your payment on time. Thank you! Team Finance Buddy`,
      })
      .then((message) => console.log(message.sid));

    res.status(200).json({
      success: true,
      data: "Message sent",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "Error in sending SMS",
    });
  }
});

module.exports = {
  sendEmail,
  checkOtp,
  sendMobileOtp,
  checkMobileOtp,
  sendWhatsappMessage,
  sendMobileEMIReminder,
  sendEmailEMIReminder,
  sendPaymentLink,
};