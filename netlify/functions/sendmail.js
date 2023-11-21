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

  const mailOptions = {
    from: 'your_gmail_address@gmail.com',
    to: 'receiver_email@example.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nContact Person: ${contactperson}\nRequest: ${request}`,
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
