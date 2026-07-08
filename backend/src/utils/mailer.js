const { BrevoClient } = require('@getbrevo/brevo');

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

exports.sendEmail = async (to, subject, html) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      to: [{ email: to }],
      sender: { email: process.env.EMAIL_FROM, name: 'BookStack' },
      subject,
      htmlContent: html,
    });

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Send email failed:', error.response?.body || error.message);
    throw new Error('Failed to send email');
  }
};