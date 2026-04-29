# WeValet — Change Log

**Date:** 24 April 2026 | **Author:** Gunjan Kumbhani | **Server:** WeValetMainServer (AWS EC2)

---

## Summary of Changes

### 1. SMS API Integration Refactor

- **New centralized SMS utility** created at `src/utils/sendSms.js`
- Platform used: **MSG91**
- Two API endpoints updated to use the new utility:
  - `UserLoginOtpSend` — handles OTP delivery at login
  - `ForgetPasswordOtpSend` — handles OTP delivery for password reset
- **Impact:** All future SMS sends should go through `sendSms.js` to keep MSG91 credentials and logic in one place.

---

### 2. Lat/Long (Geocoding) API Fix

- Updated the geocoding integration to comply with **Nominatim.org usage policy**
- Changes made:
  - Added a valid **Referer policy** header
  - Added a proper **User-Agent** header
- **Reference:** https://nominatim.org/release-docs/latest/api/Overview/#usage-policy
- **Impact:** Prevents request blocking or rate-limiting by Nominatim.

---

### 3. SSL Certificate Renewal

- SSL certificate has been **renewed and configured** via Nginx
- **Impact:** HTTPS connections are restored and valid; no action needed by developers.

---

## Deployment Instructions

### Pull Latest Code on Server

```bash
# Navigate to project directory
cd /october/Wevalet

# Switch to root
sudo su

# Pull latest changes
git pull
```

### Restart the Application

> **Important:** Exit `sudo` mode before restarting PM2.

```bash
# Navigate to project directory
cd /october/Wevalet

# Exit sudo mode if active
exit

# Restart PM2 process
pm2 restart 0
```

---

## Quick Reference

| Item              | Detail                  |
|-------------------|-------------------------|
| Server Name       | WeValetMainServer       |
| Cloud Provider    | AWS EC2                 |
| Project Path      | `/october/Wevalet`      |
| Process Manager   | PM2 (process ID: 0)     |
| SMS Platform      | MSG91                   |
| SMS Utility File  | `src/utils/sendSms.js`  |
| SSL Tool          | Nginx                   |

*For questions about these changes, contact **Gunjan Kumbhani**.*
