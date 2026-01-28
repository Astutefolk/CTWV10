# CTW 0365 Sender v10.0

A powerful bulk email sender built with Node.js, featuring multi-SMTP support, dynamic templating, and customizable configurations.

## Features

- **Multi-SMTP Support**: Rotate between multiple SMTP servers automatically
- **Dynamic Email Templates**: Use multiple HTML templates with random selection
- **Template Variables**: Dynamic content replacement with random data
- **Smart Delays**: Configurable delays between emails and pause intervals
- **Attachment Support**: Send multiple attachments with your emails
- **Custom Headers**: Add custom email headers
- **Logging**: Automatic logging of failed sends
- **Colorful Console Output**: Visual feedback with colors and ASCII art

## Quick Start

### Prerequisites

- Node.js installed on your system
- SMTP credentials (Gmail, Ionos, or any SMTP provider)

### Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

### Configuration

Edit `your-config.js` to configure your settings:

#### 1. SMTP Configuration
```javascript
exports.smtp = [
  { host: "smtp.ionos.de", port: "587", auth: true, user: "your@email.com", pass: "yourpass" },
  { host: "smtp.gmail.com", port: "587", auth: true, user: "your@gmail.com", pass: "yourpass" }
];
```

#### 2. Message Templates
```javascript
exports.message = [
  { fromName: "Support", fromEmail: "your@email.com", subject: "Your Subject" },
  { fromName: "Service", fromEmail: "your@gmail.com", subject: "Another Subject" }
];
```

#### 3. Sending Options
```javascript
exports.send = {
  delay: 3,              // Delay between emails (seconds)
  pauseAfter: 5,         // Pause after X emails
  pauseFor: 10,          // Pause duration (seconds)
  useAttach: true,       // Enable attachments
  useHeader: false,      // Enable custom headers
  text: "Email text",    // Plain text content
  letter: ["letter1.html", "letter2.html"],  // HTML templates
  list: "your-list.txt"  // Recipient list file
};
```

#### 4. Recipient List
Create `your-list.txt` with one email per line:
```
recipient1@example.com
recipient2@example.com
recipient3@example.com
```

### Running the Application

**Method 1: Double-Click (Recommended)**
- Simply double-click `START.bat` file

**Method 2: Command Line**
```bash
node just.js
```

## Template Variables

Use these dynamic variables in your HTML templates and subjects:

- `{email}` - Recipient email address
- `{date}` - Current date and time
- `{random_ip}` - Random IP address
- `{random_country}` - Random country name
- `{random_device}` - Random device (iPhone, iPad)
- `{random_browser}` - Random browser name
- `{random_subject}` - Random email subject
- `{random_fnamazon}` - Random Amazon sender name
- `{random_fnpaypal}` - Random PayPal sender name
- `{random_statement}` - Random statement phrase
- `{random_shortlink}` - Random shortlink from config
- `{random_number_10}` - Random 10-digit number
- `{random_letterup_5}` - Random 5 uppercase letters
- `{random_letterlow_5}` - Random 5 lowercase letters
- `{random_letteruplow_8}` - Random 8 mixed case letters
- `{random_letternumberuplow_12}` - Random 12 alphanumeric characters

### Example HTML Template

```html
<!DOCTYPE html>
<html>
<head>
    <title>Alert</title>
</head>
<body>
    <h1>Hello {email}</h1>
    <p>Date: {date}</p>
    <p>Login from: {random_ip} ({random_country})</p>
    <p>Device: {random_device}</p>
    <p>Reference: {random_number_10}</p>
</body>
</html>
```

## File Structure

```
CTW_V10/
├── just.js              # Main application file
├── your-config.js       # Configuration file
├── random.js            # Random data generator
├── your-list.txt        # Recipient email list
├── letter1.html         # Email template 1
├── letter2.html         # Email template 2
├── letter3.html         # Email template 3
├── START.bat            # Quick start batch file
├── package.json         # Dependencies
└── your-logs/           # Failed send logs
```

## Advanced Features

### Multiple Attachments
```javascript
exports.attach = {
  files: ["document1.pdf", "image.jpg", "report.xlsx"]
};
```

### Custom Headers
```javascript
exports.send = {
  useHeader: true,
  // ... other options
};

exports.custom_headers = {
  'X-Custom-Header': 'Custom Value',
  'X-Priority': '1'
};
```

### HTTP Proxy (Experimental)
```javascript
exports.send = {
  useHttpProxy: true,
  // ... other options
};

exports.proxy = {
  http: "proxy.example.com:8080"
};
```

## Logs

Failed sends are automatically logged in `your-logs/` directory with timestamp:
- Format: `your-failed-YYYYMMDDHHMMSS.txt`

## Important Notes

⚠️ **Legal Disclaimer**: This tool is for educational and legitimate bulk email purposes only. Always ensure you have permission to email recipients and comply with anti-spam laws (CAN-SPAM, GDPR, etc.).

- Use only with permission from recipients
- Respect unsubscribe requests
- Follow email marketing best practices
- Don't use for spam or malicious purposes

## Troubleshooting

**SMTP Authentication Errors**
- Verify your SMTP credentials
- Enable "Less Secure Apps" for Gmail accounts
- Check if 2FA is enabled (use app passwords)

**Emails Going to Spam**
- Use legitimate sender addresses
- Warm up new SMTP accounts gradually
- Include proper unsubscribe links
- Avoid spam trigger words

## License

MIT License - See LICENSE file for details

## Credits

- Version: v10.0
- Support: @astute_support
- First Author: Mukhlis Akbarrudin

## Support

For issues and questions, open an issue on the GitHub repository.
