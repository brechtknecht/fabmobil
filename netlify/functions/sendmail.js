const nodemailer = require('nodemailer')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { name, contactperson, request } = JSON.parse(event.body)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fabmobiltest@gmail.com',
      pass: 'kxpm zbnm nadx uxqq',
    },
  })

  const emailHtml = `
    <html>
    <head>
      <style>
        body { font-family: 'Roboto', sans-serif; }
        .email-container { max-width: 65ch; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        h1 { color: #333; }
        p { color: #555; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Neue Anfrage für das Fabmobil</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Kontaktperson:</strong> ${contactperson}</p>
        <p><strong>Anfrage:</strong> ${request}</p>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: 'fabmobiltest@gmail.com',
    to: 'juliane@fabmobil.org',
    subject: 'Neue Anfrage für das Fabmobil',
    html: emailHtml, // use 'html' instead of 'text'
  }

  try {
    await transporter.sendMail(mailOptions)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    }
  }
}
