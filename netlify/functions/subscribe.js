const axios = require('axios')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { email } = JSON.parse(event.body)
    const response = await axios.post(
      'https://us17.api.mailchimp.com/3.0/lists/fabmobil/members/',
      {
        email_address: email,
        status: 'subscribed',
      },
      {
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        },
      }
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscribed successfully' }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error subscribing' }),
    }
  }
}
