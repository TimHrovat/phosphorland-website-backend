const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: { user: "phosphorland.dev@outlook.com", pass: "Test@2022" },
  tls: { rejectUnauthorized: false },
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
    from: "phosphorland.dev@outlook.com",
    to: "phosphorland.dev@outlook.com",
    subject: req.body.fullname,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, suc) => {
    if (error) {
      console.log(error);
    }
  });

  console.log(req.body);
  res.send("/");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
