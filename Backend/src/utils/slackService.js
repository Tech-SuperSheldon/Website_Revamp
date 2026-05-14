const { WebClient } = require('@slack/web-api');

// Initialize Slack client
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * Send a formatted Slack message for new form submissions
 * @param {Object} formData - Form submission data
 * @returns {Promise<{ok: boolean, message?: string, error?: string}>}
 */
const sendSlackMessage = async (formData) => {
  try {
    if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_CHANNEL_ID) {
      console.log('Slack credentials not configured, skipping Slack notification');
      return { ok: true, message: 'Slack not configured' };
    }

    const { fullName, email, mobile, childAgeYear, grade, subject, createdAt } = formData;

    const subjectText = subject || 'N/A';
    const ageOrGradeText = grade ? `Grade ${grade}` : childAgeYear ? childAgeYear : 'N/A';

    // Format the Slack message
    const message = {
      channel: process.env.SLACK_CHANNEL_ID,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: ':tada: New Demo Lead!',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `:bust_in_silhouette: *Name:*\n${fullName || 'N/A'}`
            },
            {
              type: 'mrkdwn',
              text: `:telephone_receiver: *Phone:*\n${mobile || 'N/A'}`
            },
            {
              type: 'mrkdwn',
              text: `:e-mail: *Email:*\n${email || 'N/A'}`
            },
            {
              type: 'mrkdwn',
              text: `:books: *Subject:*\n${subjectText}`
            },
            {
              type: 'mrkdwn',
              text: `:round_pushpin: *Age / Grade:*\n${ageOrGradeText}`
            },
            {
              type: 'mrkdwn',
              text: `:date: *Created:*\n${createdAt ? new Date(createdAt).toLocaleString() : new Date().toLocaleString()}`
            }
          ]
        },
        {
          type: 'divider'
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: ':label: Lead Status: CREATED | :pushpin: Source: Demo Form'
            }
          ]
        }
      ]
    };

    // Send message to Slack
    const response = await slack.chat.postMessage(message);

    if (response.ok) {
      console.log('Slack message sent successfully:', response.ts);
      return { ok: true, message: 'Slack notification sent' };
    } else {
      console.error('Slack API error:', response.error);
      return { ok: false, error: response.error };
    }
  } catch (error) {
    console.error('Error sending Slack message:', error);
    return { ok: false, error: error.message };
  }
};

module.exports = { sendSlackMessage };
