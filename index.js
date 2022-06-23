const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "mail.aerio.cloud",
  port: 587,
  secure: false,
  auth: { user: "phosphor@bogi.si", pass: "Test1234" },
});

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

app.post("/post", (req, res) => {
  const text =
    "Full Name: " +
    req.body.fullname +
    "\n" +
    "Email: " +
    req.body.email +
    "\n" +
    "Message: " +
    req.body.text;
  const mailOptions = {
    from: "phosphor@bogi.si",
    to: "phosphor@bogi.si",
    subject: req.body.fullname,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, suc) => {
    if (error) {
      console.log("There was an error");
      console.log(error);
    } else {
      console.log("Sending successful");
      console.log(suc);
    }
  });

  console.log(req.body);
  res.send("/");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
