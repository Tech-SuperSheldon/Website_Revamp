/**
 * Send a new demo-form submission to a Google Sheet via an Apps Script Web App webhook.
 * @param {Object} formData - Form submission data
 * @returns {Promise<{ok: boolean, message?: string, error?: string}>}
 */
const sendToGoogleSheet = async (formData) => {
  try {
    if (!process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      console.log('Google Sheet webhook not configured, skipping Sheet notification');
      return { ok: true, message: 'Google Sheet not configured' };
    }

    const {
      fullName, email, mobile, country, grade, subject, createdAt,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    } = formData;

    const response = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: fullName || '',
        email: email || '',
        mobile: mobile || '',
        country: country || '',
        grade: grade || '',
        subject: subject || '',
        createdAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        utm_content: utm_content || '',
        utm_term: utm_term || '',
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.status !== 'error') {
      console.log('Google Sheet row added successfully');
      return { ok: true, message: 'Google Sheet notification sent' };
    } else {
      console.error('Google Sheet webhook error:', result.error || response.statusText);
      return { ok: false, error: result.error || response.statusText };
    }
  } catch (error) {
    console.error('Error sending to Google Sheet:', error);
    return { ok: false, error: error.message };
  }
};

module.exports = { sendToGoogleSheet };
