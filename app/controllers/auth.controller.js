import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import fs from "fs";
import lorem from "lorem-ipsum";
// import pkg from "../../client/src/pages/email.jsx";
import db from "../models/index.js";
import { secret } from "../config/auth.config.js";
const User = db.users;
const Role = db.role;
const UserDetails = db.userDetails;

const Op = db.Sequelize.Op;

const doc = new PDFDocument();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roleId: req.body?.roles ? req.body?.roles : 1, //default 1 is user role
    });
    const user_details = await UserDetails.create({
      userId: user.id
    });
    if (user_details) res.send({ message: "Registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 18000, //5 hours
      //expiresIn: 86400, // 24 hours
    });
    const role = await user.roleId;
    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      created: user.createAt,
      roles: role,
      token: token,
      message: "Sign In Successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // const emailHtml = render(Email({ url: "https://example.com" }));

  const options = {
    from: process.env.EMAIL,
    to: "nicsonsoh.sdh@gmail.com",
    subject: "Testing Node JS sending Email",
    // text: "Dear Recipient, thanks for subscribing",
    html: `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table, td, div, h1, p {font-family: Arial, sans-serif;}
      </style>
    </head>
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
              <tr>
                <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                  <img src="https://assets.codepen.io/210284/h1.png" alt="" width="300" style="height:auto;display:block;" />
                </td>
              </tr>
              <tr>
                <td style="padding:36px 30px 42px 30px;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:0 0 36px 0;color:#153643;">
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Creating Email Magic</h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan et dictum, nisi libero ultricies ipsum, posuere neque at erat.</p>
                        <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0;">
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                              <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/left.gif" alt="" width="260" style="height:auto;display:block;" /></p>
                              <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, est nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
                              <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">Blandit ipsum volutpat sed</a></p>
                            </td>
                            <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                            <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                              <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/right.gif" alt="" width="260" style="height:auto;display:block;" /></p>
                              <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Morbi porttitor, eget est accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed.</p>
                              <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:30px;background:#ee4c50;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:0;width:50%;" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                          &reg; Someone, Somewhere 2021<br/><a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Unsubscribe</a>
                        </p>
                      </td>
                      <td style="padding:0;width:50%;" align="right">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                            </td>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`,
    attachments: [
      {
        filename: "qrcode.pdf",
        path: "app/pdf/file.pdf",
      },
    ],
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.json({ yo: "error" });
      res.sendStatus(500);
    } else {
      console.log("Message sent: " + info.response);
      res.sendStatus(200);
    }
    return res.status(200).end();
  });
};

const qrCode = async (req, res) => {
  QRCode.toFile(
    "app/qrcode/" + "haha" + "filename.png",
    "http://10.13.3.110:3000",
    {
      color: {
        dark: "#000", // Black Dots
        light: "#FFF", // White Background
      },
    },
    function (err) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      console.log("done");
      res.sendStatus(200);
    }
  );
};

const createPDF = async (req, res) => {
  generateHeader(doc); // Invoke `generateHeader` function.
  generateFooter(doc); // Invoke `generateFooter` function.

  // finalize the PDF and end the stream
  doc.end();
  doc.pipe(fs.createWriteStream("app/pdf/file.pdf")); // write to PDF
  // doc.pipe(res); // HTTP response

  // add stuff to PDF here using methods described below...

  res.sendStatus(200);

  function generateHeader(doc) {
    doc
      .image("app/qrcode/filename.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("ACME Inc.", 110, 57)
      .fontSize(10)
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("New York, NY, 10025", 200, 80, { align: "right" })
      .moveDown();
  }

  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        580,
        { align: "center", width: 650 }
      );
  }
};

export default {
  signup,
  signin,
  signout,
  sendEmail,
  qrCode,
  createPDF,
};
