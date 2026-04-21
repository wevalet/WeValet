const axios = require("axios");

/**
 * Send an OTP SMS via MSG91 Flow API.
 *
 * Required env vars:
 *   MSG91_AUTH_KEY    — your MSG91 authkey
 *   MSG91_URL         — https://control.msg91.com/api/v5/flow
 *   MSG91_TEMPLATE_ID — the SMS flow template ID from MSG91 dashboard
 *
 * Phone number is auto-normalised (strips +, spaces, dashes, parens).
 * The OTP is sent as VAR1 in the template recipients payload.
 *
 * @param {string} phone - Phone number in any format, e.g. "+91 98765 43210"
 * @param {string|number} otp - The OTP to send
 * @returns {Promise<object>} MSG91 API response data
 */
async function sendOtpSms(phone, otp) {
  if (!phone || !otp) {
    throw new Error("sendOtpSms: phone and otp are required");
  }
  if (!process.env.MSG91_URL || !process.env.MSG91_AUTH_KEY || !process.env.MSG91_TEMPLATE_ID) {
    throw new Error("sendOtpSms: MSG91_URL, MSG91_AUTH_KEY, and MSG91_TEMPLATE_ID must be set in .env");
  }

  const mobileNumber = String(phone).replace(/\+/g, "");
    
  const payload = {
    template_id: process.env.MSG91_TEMPLATE_ID,
    realTimeResponse: "1",
    recipients: [{ mobiles: mobileNumber, VAR1: String(otp) }],
  };

  try {
    const response = await axios.post(process.env.MSG91_URL, payload, {
      headers: {
        accept: "application/json",
        authkey: process.env.MSG91_AUTH_KEY,
        "content-type": "application/json",
      },
    });

    console.log("MSG91 response:", response.data);
    return response.data;
  } catch (err) {
    const status = err.response?.status;
    const detail = err.response?.data ?? err.message;
    console.error(`MSG91 SMS failed [${status ?? "network error"}]:`, detail);
    throw new Error(`Failed to send OTP SMS: ${JSON.stringify(detail)}`);
  }
}
module.exports = { sendOtpSms };
