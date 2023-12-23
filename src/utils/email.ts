import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type DefaultMailConfig = { username: string; email: string };

type VerificationMailConfig = {
    type: "Verify";
    code: number;
    url: string;
} & DefaultMailConfig;

type NotificationMailConfig = {
    type: "Notification";
    message: string[];
} & DefaultMailConfig;

type DebugMailConfig = {
    type: "Debug";
    message: string[];
} & DefaultMailConfig;

type MailConfig = VerificationMailConfig | NotificationMailConfig | DebugMailConfig;

export default class MailService {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    constructor(config: { user: string; pass: string }) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: config,
        });
    }

    public async sendMail(config: MailConfig) {
        switch (config.type) {
            case "Verify":
                await this.transporter.sendMail({
                    from: "Qresher.com",
                    to: config.email,
                    subject: "Authentication",
                    html: this.verificationMailHTML({
                        username: config.username,
                        code: config.code,
                        url: config.url,
                    }),
                });
                break;
            case "Notification":
                // TODO: creating a mail template for notification
                throw new Error("Notification mail template is not yet implemented");

            case "Debug":
                const { formattedTime, isoTime } = this.getCurrentTime();

                await this.transporter.sendMail({
                    from: "Qresher.com",
                    to: config.email,
                    subject: "Debugging Purposes",
                    html: this.debugMailHTML({
                        messages: config.message,
                        time: { formatted: formattedTime, isoFormat: isoTime },
                        userEmail: config.email,
                    }),
                });
        }
    }

    getCurrentTime(): { formattedTime: string; isoTime: string } {
        const now = new Date();

        // Formatting options for the desired format
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC", // Modify this based on your timezone requirements
        };

        // Formatted time string
        const formattedTime = now.toLocaleString("en-US", options);

        // ISO formatted time string
        const isoTime = now.toISOString();

        return { formattedTime, isoTime };
    }

    private debugMailHTML(debugInfo: {
        userEmail: string;
        messages: string[];
        time: {
            isoFormat: string;
            formatted: string;
        };
    }) {
        const {
            messages,
            userEmail,
            time: { formatted, isoFormat },
        } = debugInfo;

        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Debug Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #333;">Debug Email Template</h2>
        <p style="text-align: center; color: #666; margin-bottom: 20px;">This is a sample email for checking and debugging purposes.</p>
        
        <h3 style="color: #333;">Debugging Information:</h3>
        <p><strong>App Name:</strong> Qresher.com</p>
        <p><strong>User's Email:</strong> ${userEmail}</p>
        <p><strong>Time of Sending (ISO Format):</strong> ${isoFormat}</p>
        <p><strong>Time of Sending (Formatted):</strong> ${formatted}</p>
        <p><strong>Additional Messages:</strong> ${messages.map(
            message => `<p>${message}</p>`
        )}</p>
        

        <p style="text-align: center; color: #666; margin-top: 20px;">Feel free to modify and use this template for testing your Nodemailer setup.</p>
        
        <p style="text-align: center; color: #999; margin-top: 30px;">Thank you!</p>
      </div>
    </body>
    </html>
  `;
    }

    private verificationMailHTML(option: {
        username: string;
        code: number;
        url: string;
    }) {
        return `<!DOCTYPE html>
<html>
<head>
  <title>Email Verification</title>
  <style>
    /* Style for the button */
    .button {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 20px;
      text-decoration: none;
      color: #ffffff;
      background-color: #007bff;
      border-radius: 5px;
    }
    /* Style for the button hover effect */
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <p>Dear User,</p>
  <p>Please click the button below to verify your email address:</p>
  <a class="button" href="${option.url}">Verify Email</a>
  <p>If you are unable to click the button above, you can also <a href="${option.url}">click here</a> or copy/paste the following URL into your browser:</p>
  <p>${option.url}</p>
  <p>Thank you!</p>
</body>
</html>
`;
    }
}
