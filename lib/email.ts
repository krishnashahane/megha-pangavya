import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const data = await resend.emails.send({
      from: "Megha's Panchgavya <noreply@meghaspanchgavya.com>",
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export function orderConfirmationEmail(orderNumber: string, customerName: string, total: number) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: #1a5c2a; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-family: 'Playfair Display', serif; }
        .content { padding: 30px; }
        .order-number { background: #f0f7f1; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Megha's Panchgavya</h1>
          <p>It's Time To Choose Purity</p>
        </div>
        <div class="content">
          <h2>Order Confirmed! 🎉</h2>
          <p>Dear ${customerName},</p>
          <p>Thank you for your order! We've received your order and it's being processed with love and care.</p>
          <div class="order-number">
            <p><strong>Order Number:</strong></p>
            <h3 style="color: #1a5c2a;">${orderNumber}</h3>
          </div>
          <p><strong>Total Amount:</strong> ₹${total.toLocaleString("en-IN")}</p>
          <p>You can track your order status in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders" style="color: #1a5c2a;">dashboard</a>.</p>
          <p>If you have any questions, feel free to reach out to us on WhatsApp or email.</p>
          <p>With blessings of Gaumata,<br><strong>Team Megha's Panchgavya</strong></p>
        </div>
        <div class="footer">
          <p>Megha's Panchgavya | 100% Natural | No Chemicals | Cow-Based Products</p>
          <p>गौमाता के आशीर्वाद घर लाए</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
