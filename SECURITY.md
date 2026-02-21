# RSVP Security Setup Guide

This guide covers setting up Cloudflare Turnstile bot protection for the RSVP form, configuring the Google Apps Script backend, and implementing Cloudflare-level caching/WAF rules.

## 1. Cloudflare Turnstile Configuration
Turnstile is a privacy-first CAPTCHA alternative. It ensures the requests submitting the RSVP form are legitimate users.

### Step-by-Step:
1. Log into your **Cloudflare Dashboard**.
2. From the main menu, navigate to **Turnstile**, and click **Add site**.
3. **Site name**: enter a memorable name (e.g., `Baby Sprinkle RSVP`).
4. **Domain**: add your production domain (`thepandaandthepenguin.com`) AND `localhost` to ensure testing works automatically.
5. **Widget Type**: Select **Managed** or **Non-interactive**.
6. Click **Create**. Copy both the **Site Key** and **Secret Key**.

### Frontend Configuration:
Inside your repository, update your `.env.local` to include your Site Key:

`VITE_TURNSTILE_SITE_KEY=your_site_key_here`

For Vercel/GitHub Pages or wherever you manage CI/CD, ensure you add the `VITE_TURNSTILE_SITE_KEY` as an environment variable physically during the build stage.

---

## 2. Google Apps Script Configuration
We need our backend (Apps Script) to independently verify the Turnstile token using your **Secret Key**.

### Step-by-Step:
1. Open your Google Sheet spreadsheet that manages RSVPs.
2. Go to **Extensions -> Apps Script**.
3. Clear out the existing code completely and paste in the code found in `apps-script/Code.js`.
4. Click the **Gear icon (Project Settings)** on the left sidebar in Apps Script.
5. Scroll down to **Script Properties** -> **Add script property**.
6. Set the Property exactly as: `TURNSTILE_SECRET_KEY`
7. Set the Value to the **Secret Key** you acquired from Cloudflare.
8. Click **Save**.
9. Redeploy the script. Click **Deploy -> Manage Deployments** (or New Deployment). Remember to **Execute as: Me** and **Who has access: Anyone**. 
10. Update your frontend `VITE_RSVP_ENDPOINT` to match the newly deployed Web App URL if it changed.

---

## 3. Recommended Cloudflare WAF & Rate Limiting Rules
Because Google Apps Script doesn't issue standard HTTP response headers to easily stop bots via standard networking, restricting bot traffic at the Cloudflare layer is vital.

Since your domain is proxied through Cloudflare (orange cloud icon in DNS settings), add these extra WAF rules:

### A. Rate Limiting Rule
Cloudflare Dashboard -> Security -> WAF -> Rate limiting rules -> **Create rule**
- **Rule Name:** Limit RSVP POST Requests
- **If Custom filter expression:** 
  - `(http.request.uri.path contains "/" and http.request.method eq "POST")` 
  - *(Alternatively, if your RSVP backend was hosted on the same domain, we would filter by endpoints like `/api/rsvp`, but Apps Script URLs bypass Cloudflare WAF because they target `script.google.com`. Therefore, Turnstile within script apps is exactly the perfect layer in lieu of proximal WAF!)*

Wait, let's correct this nuance: Since the form is submitted directly to `script.google.com/macros/...`, Cloudflare WAF on your website **cannot directly rate-limit the POST request to Google.** 
*This is why placing Turnstile Client validation AND Apps Script Server verification is non-negotiable and fulfills the protection pipeline!* 

Your frontend rate limits requests to once every 60 seconds (via Local Storage caching protection), but actual hostile actors bypassing the frontend will hit Turnstile's server-side block configured in Step 2.
