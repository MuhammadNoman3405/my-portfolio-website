// Email utility for sending notifications
// Using Resend for email delivery

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY not configured");
        return { success: false, error: "Email service not configured" };
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Portfolio Contact <onboarding@resend.dev>", // Use your verified domain later
                to: [to],
                subject,
                html,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Email send failed:", error);
            return { success: false, error };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Email error:", error);
        return { success: false, error };
    }
}

// Template for contact notification
export function getContactNotificationEmail(name: string, email: string, message: string) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .message-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">New Contact Form Message</h2>
          </div>
          <div class="content">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div class="message-box">
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="margin-top: 30px;">
              <a href="https://my-portfolio-website-six-ashen.vercel.app/admin/messages" 
                 style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View in Admin Panel
              </a>
            </p>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Template for reply email
export function getReplyEmail(recipientName: string, replyMessage: string) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .message-box { background: white; padding: 20px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">Message from Muhammad Noman</h2>
          </div>
          <div class="content">
            <p>Hi ${recipientName},</p>
            <div class="message-box">
              <p>${replyMessage.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>Muhammad Noman</strong><br>
              <a href="mailto:23-cs-68@students.uettaxila.edu.pk">23-cs-68@students.uettaxila.edu.pk</a>
            </p>
          </div>
          <div class="footer">
            <p>This is a reply to your message sent via the portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
