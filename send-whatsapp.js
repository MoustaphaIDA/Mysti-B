const twilio = require('twilio');

exports.handler = async function (event) {
  const { name, phone, message } = JSON.parse(event.body).payload;
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  const ownerPhone = process.env.OWNER_PHONE; // Votre numéro WhatsApp

  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886', // Votre numéro Twilio WhatsApp
      to: `whatsapp:${ownerPhone}`,
      body: `Nouveau message de ${name} (${phone}): ${message}`,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message WhatsApp envoyé' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de l'envoi' }),
    };
  }
};