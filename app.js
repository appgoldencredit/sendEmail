const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");
const port=process.env.port || 3000;

const app = express();
const corsOptions = {
  origin: 'http://199.36.158.100', // Reemplaza con la IP que deseas permitir
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("The server started on port "+port+" !!!!!!");
});

app.post("/sendmail", (req, res) => {
  console.log("Request came");
  let form = req.body;
  sendMail(form, info => {
    console.log(`The mail has been sent 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(form, callback) {
  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"App Golden Credit" <example.gmail.com>',
    to: 'cartera@goldencredit.co',
    subject: "¡Interesado en conocer más sobre los servicios de Golden Credit!",
    html: `
      <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #ffcc00; text-align: center;">¡Hola equipo de Golden Credit!</h1>
        <div style="background-color: #ffffff; padding: 30px; margin-top: 20px;">
          <h2 style="color: #333333;">¡Tenemos un nuevo interesado en los servicios de Golden Credit!</h2>
          <table style="width: 100%; margin-top: 30px;">
            <tr>
              <td style="width: 30%; font-weight: bold;">Nombre y Apellido:</td>
              <td>${form.name}</td>
            </tr>
            <tr>
              <td style="width: 30%; font-weight: bold;">Pagaduria:</td>
              <td>${form.pagadurias}</td>
            </tr>
            <tr>
              <td style="width: 30%; font-weight: bold;">Correo electronico:</td>
              <td>${form.email}</td>
            </tr>
            <tr>
              <td style="width: 30%; font-weight: bold;">Numero de telefono:</td>
              <td>${form.phone}</td>
            </tr>
          </table>
          <p style="font-size: 18px; color: #333333; margin-top: 30px;">
            Mensaje del interesado:
          </p>
          <p style="font-size: 16px; color: #555555; margin-top: 10px;">
            ${form.message}
          </p>
          ${
            form.checkdata2 === true
              ? `<p style="font-size: 18px; color: #333333; margin-top: 30px;">
                  La persona desea suscribirse a las ofertas mensuales de la empresa.
                </p>`
              : ''
          }
          <p style="font-size: 18px; color: #333333; margin-top: 30px;">
            Por favor, pónganse en contacto con la persona para brindarle más información.
          </p>
          <p style="font-size: 18px; color: #333333; margin-top: 20px;">
            ¡Esperamos que esta oportunidad sea el comienzo de una relación exitosa con un nuevo cliente!
          </p>
          <h4 style="color: #ffcc00; text-align: center; margin-top: 30px;">¡Gracias y saludos cordiales!</h4>
        </div>
      </div>
    `
  };
  
  
  
  
  

  // Send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
