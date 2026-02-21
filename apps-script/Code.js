/**
 * Google Apps Script for Baby Sprinkle RSVP
 * Setup Instructions:
 * 1. Open your Google Sheet, go to Extensions -> Apps Script
 * 2. Paste this code.
 * 3. Go to Project Settings (gear icon) -> Script Properties and add:
 *    Property: TURNSTILE_SECRET_KEY
 *    Value: (your Turnstile secret key)
 * 4. Deploy as Web App -> Execute as "Me", Access "Anyone"
 */

const SCRIPT_PROP = PropertiesService.getScriptProperties();
const ALLOWED_ORIGINS = [
    'https://thepandaandthepenguin.com',
    'https://www.thepandaandthepenguin.com',
    'http://localhost:5173',
    'http://localhost:4174'
];

function doPost(e) {
    try {
        // 1. CORS & Origin Validation
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        };

        // (Optional strict origin checking: uncomment in production if not using 'no-cors' mode
        // However, react uses mode: 'no-cors', which strips out headers on the client side,
        // so origin checking can be problematic. We'll rely on Turnstile for bot protection.)

        const payload = e.parameter;

        // 2. length restrictions and sanitization
        const name = (payload.name || '').trim().substring(0, 100);
        const email = (payload.email || '').trim().substring(0, 255);
        const guests = (payload.guests || '').trim().substring(0, 10);
        const dietary = (payload.dietary || '').trim().substring(0, 200);
        const message = (payload.message || '').trim().substring(0, 500);
        const turnstileToken = payload['cf-turnstile-response'] || '';

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
                'method': 'post',
                'payload': {
                    'secret': secretKey,
                    'response': turnstileToken
                }
            };

            const verifyResponse = UrlFetchApp.fetch(turnstileVerifyUrl, verifyOptions);
            const verifyResult = JSON.parse(verifyResponse.getContentText());

            if (!verifyResult.success) {
                throw new Error("Turnstile validation failed: " + JSON.stringify(verifyResult['error-codes']));
            }
        }

        // 4. Save to Google Sheet
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = doc.getSheetByName('RSVPs');

        if (!sheet) {
            sheet = doc.insertSheet('RSVPs');
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Guests', 'Dietary', 'Message']);
            sheet.getRange("A1:F1").setFontWeight("bold");
        }

        sheet.appendRow([
            new Date(),
            name,
            email,
            guests,
            dietary,
            message
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'error', error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Handle preflight CORS requests from browser (required if you remove 'no-cors' mode)
function doOptions(e) {
    return ContentService.createTextOutput("")
        .setMimeType(ContentService.MimeType.JSON);
}
