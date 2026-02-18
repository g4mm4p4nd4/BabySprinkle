/**
 * Google Apps Script for Victoria's Baby Sprinkle RSVP
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "Victoria Sprinkle RSVPs"
 * 2. Add these column headers in Row 1:
 *    Timestamp | Name | Email | Guests | Dietary Restrictions | Message
 * 3. Go to Extensions > Apps Script
 * 4. Paste this entire script into the editor
 * 5. Click Deploy > New Deployment
 * 6. Select type: "Web app"
 * 7. Set "Execute as": Me
 * 8. Set "Who has access": Anyone
 * 9. Click Deploy and copy the Web App URL
 * 10. Paste that URL into src/components/RSVPForm.jsx (replace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000); // Wait up to 10 seconds for other processes

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var guests = e.parameter.guests || '1';
    var dietary = e.parameter.dietary || '';
    var message = e.parameter.message || '';
    var timestamp = new Date();

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

function sendConfirmationEmail(name, email, guests) {
  if (!email) return;

  var subject = "Confirmation: Baby Sprinkle for Victoria";

  var htmlBody = '<!DOCTYPE html>' +
    '<html><head><style>' +
    'body { font-family: "Lato", "Helvetica Neue", sans-serif; color: #333333; background-color: #F9F9F9; margin: 0; padding: 0; }' +
    '.container { max-width: 560px; margin: 0 auto; padding: 40px 20px; }' +
    '.card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }' +
    '.header { text-align: center; margin-bottom: 30px; }' +
    '.header h1 { color: #4A74A3; font-size: 28px; margin: 0 0 8px 0; }' +
    '.header p { color: #888888; font-size: 14px; margin: 0; }' +
    '.divider { width: 60px; height: 2px; background: #F2C94C; margin: 20px auto; }' +
    '.details { background: #f8f7f4; border-radius: 12px; padding: 24px; margin: 20px 0; }' +
    '.details p { margin: 8px 0; font-size: 15px; }' +
    '.details strong { color: #333333; }' +
    '.highlight { color: #4A74A3; font-weight: 600; }' +
    '.raffle { background: #4A74A3; color: white; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }' +
    '.raffle p { margin: 4px 0; font-size: 14px; }' +
    '.footer { text-align: center; margin-top: 30px; color: #888888; font-size: 13px; }' +
    '</style></head><body>' +
    '<div class="container">' +
    '<div class="card">' +
    '<div class="header">' +
    '<h1>Bonjour ' + name + '!</h1>' +
    '<p>Your RSVP has been confirmed</p>' +
    '</div>' +
    '<div class="divider"></div>' +
    '<p style="text-align:center;font-size:16px;">We have reserved <span class="highlight">' + guests + ' seat(s)</span> for you at Victoria\'s Baby Sprinkle.</p>' +
    '<div class="details">' +
    '<p><strong>When:</strong> March 29, 2026 @ 2:00 PM</p>' +
    '<p><strong>Where:</strong> Eclair Affaire</p>' +
    '<p style="margin-left:52px;">1150 Weston Rd, Weston, FL 33326</p>' +
    '</div>' +
    '<div class="raffle">' +
    '<p><strong>Don\'t forget the Diaper Raffle!</strong></p>' +
    '<p>Bring a pack of diapers for a chance to win a prize.</p>' +
    '</div>' +
    '<p style="text-align:center;font-size:15px;">We look forward to celebrating with you!</p>' +
    '<div class="footer">' +
    '<p>Need to change plans? Simply reply to this email.</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</body></html>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}

// Test function - run this in the Apps Script editor to verify setup
function testSetup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Headers: ' + sheet.getRange(1, 1, 1, 6).getValues()[0]);
  Logger.log('Setup looks good!');
}
