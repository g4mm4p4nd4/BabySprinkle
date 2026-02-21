/**
 * Google Apps Script for Victoria's Baby Sprinkle RSVP
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "Victoria Sprinkle RSVPs"
 * 2. Add these column headers in Row 1:
 *    Timestamp | Name | Email | Guests | Dietary Restrictions | Message
 * 3. Go to Project Settings (gear icon) -> Script Properties and add:
 *    Property: TURNSTILE_SECRET_KEY
 *    Value: (your Turnstile secret key)
 * 4. Go to Extensions > Apps Script
 * 5. Paste this entire script into the editor
 * 6. Click Deploy > New Deployment
 * 7. Select type: "Web app"
 * 8. Set "Execute as": Me
 * 9. Set "Who has access": Anyone
 * 10. Click Deploy and copy the Web App URL
 * 11. Paste that URL into your .env.local file as VITE_RSVP_ENDPOINT
 */

const SCRIPT_PROP = PropertiesService.getScriptProperties();
const ALLOWED_ORIGINS = [
    'https://thepandaandthepenguin.com',
    'https://www.thepandaandthepenguin.com',
    'http://localhost:5173',
    'http://localhost:4174'
];

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    // 1. CORS & Origin Validation (Reference / Optional strict checking)
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    lock.waitLock(10000); // Wait up to 10 seconds for other processes

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Fallback parser since 'no-cors' fetch strips headers impacting e.parameter assembly
    var payload = {};
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      payload = e.parameter;
    } else if (e.postData && e.postData.contents) {
      if (e.postData.contents.startsWith('{')) {
        payload = JSON.parse(e.postData.contents);
      } else {
        // Parse raw URL-encoded string manually
        var parts = e.postData.contents.split('&');
        for (var i = 0; i < parts.length; i++) {
          var keyValue = parts[i].split('=');
          if (keyValue.length === 2) {
            payload[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1].replace(/\+/g, ' '));
          }
        }
      }
    }

    // 2. Length restrictions and sanitization
    var name = (payload.name || '').trim().substring(0, 100);
    var email = (payload.email || '').trim().substring(0, 255);
    var guests = (payload.guests || '1').trim().substring(0, 10);
    var dietary = (payload.dietary || '').trim().substring(0, 200);
    var message = (payload.message || '').trim().substring(0, 500);
    var turnstileToken = payload['cf-turnstile-response'] || '';
    var timestamp = new Date();
    
    if (!name || !email) {
      throw new Error("Missing required fields");
    }

    // 3. Turnstile validation
    const secretKey = SCRIPT_PROP.getProperty('TURNSTILE_SECRET_KEY');
    
    if (secretKey) {
      if (!turnstileToken) {
        throw new Error("Missing Cloudflare Turnstile token");
      }
      
      const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const verifyOptions = {
        'method' : 'post',
        'payload' : {
          'secret' : secretKey,
          'response' : turnstileToken
        }
      };
      
      const verifyResponse = UrlFetchApp.fetch(turnstileVerifyUrl, verifyOptions);
      const verifyResult = JSON.parse(verifyResponse.getContentText());
      
      if (!verifyResult.success) {
        throw new Error("Turnstile validation failed: " + JSON.stringify(verifyResult['error-codes']));
      }
    }

    // Append the RSVP data to the sheet
    sheet.appendRow([timestamp, name, email, guests, dietary, message]);

    // Send confirmation email
    sendConfirmationEmail(name, email, guests);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Handle preflight CORS requests from browser
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(name, email, guests) {
  if (!email) return;

  var subject = "Confirmation: Baby Sprinkle for Victoria";

  // Email Template matching website aesthetic
  var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; background-color: #F9F9F9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background: #ffffff; border-radius: 20px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #4A74A3; font-family: Georgia, serif; font-size: 32px; margin: 0 0 10px 0; font-weight: normal; }
        .header p { color: #888888; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin: 0; }
        .divider { width: 40px; height: 1px; background: #F2C94C; margin: 25px auto; }
        
        .content { font-size: 16px; line-height: 1.6; color: #333333; }
        .highlight-box { background-color: #f4f6f8; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
        .info-row { margin-bottom: 15px; }
        .info-label { font-weight: bold; color: #4A74A3; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; }
        .info-value { font-size: 18px; color: #333333; }
        
        .raffle-box { border: 2px dashed #4A74A3; border-radius: 12px; padding: 20px; text-align: center; margin-top: 30px; background-color: #fafbfc; }
        .raffle-title { color: #4A74A3; font-weight: bold; font-size: 18px; margin-bottom: 8px; }
        
        .footer { text-align: center; margin-top: 40px; color: #999999; font-size: 12px; }
        .footer a { color: #4A74A3; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <p>Confirmation</p>
            <h1>Bonjour ${name}!</h1>
          </div>
          
          <div class="divider"></div>
          
          <div class="content">
            <p style="text-align: center; margin-bottom: 30px;">
              We are delighted to confirm your attendance at Victoria's Baby Sprinkle.
              We have reserved <strong>${guests} ${guests == 1 ? 'seat' : 'seats'}</strong> for you.
            </p>
            
            <div class="highlight-box">
              <div class="info-row">
                <span class="info-label">When</span>
                <span class="info-value">Sunday, March 29, 2026<br>2:00 PM – 4:00 PM</span>
              </div>
              <div class="info-row" style="margin-bottom: 0;">
                <span class="info-label">Where</span>
                <span class="info-value">Eclair Affaire<br>1150 Weston Rd, Weston, FL</span>
              </div>
            </div>
            
            <div class="raffle-box">
              <div class="raffle-title">🎟️ The Diaper Raffle</div>
              <p style="margin: 0; font-size: 14px;">Bring a pack of diapers (size one and up) for a chance to win a prize!</p>
            </div>
            
            <p style="text-align: center; margin-top: 30px; font-style: italic; color: #888888;">
              See you in Paris!
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p>Need to change your RSVP? Simply reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}
