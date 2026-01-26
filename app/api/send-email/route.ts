import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {

    try {
        const body = await request.json();
        const { name, email, phone, company, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email to the business owner
        const emailData = {
            from: 'Contact Form <onboarding@resend.dev>', // You'll need to use your verified domain
            to: ['export@sunenterprises.ind.in'], // Your business email
            replyTo: email, // Customer's email
            subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(135deg, #FFD700, #FFA500);
                            color: #000;
                            padding: 20px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .content {
                            background: #f9f9f9;
                            padding: 30px;
                            border: 1px solid #e0e0e0;
                            border-radius: 0 0 8px 8px;
                        }
                        .field {
                            margin-bottom: 20px;
                            padding: 15px;
                            background: white;
                            border-radius: 6px;
                            border-left: 4px solid #FFD700;
                        }
                        .label {
                            font-weight: 600;
                            color: #666;
                            font-size: 12px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 5px;
                        }
                        .value {
                            color: #000;
                            font-size: 16px;
                        }
                        .message-box {
                            background: white;
                            padding: 20px;
                            border-radius: 6px;
                            border-left: 4px solid #FFD700;
                            white-space: pre-wrap;
                            word-wrap: break-word;
                        }
                        .footer {
                            margin-top: 30px;
                            text-align: center;
                            color: #999;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1 style="margin: 0; font-size: 24px;">🌟 New Contact Form Submission</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Shree Uma Nath Enterprises</p>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name</div>
                            <div class="value">${name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email</div>
                            <div class="value"><a href="mailto:${email}" style="color: #FFD700; text-decoration: none;">${email}</a></div>
                        </div>
                        
                        ${phone ? `
                        <div class="field">
                            <div class="label">Phone</div>
                            <div class="value">${phone}</div>
                        </div>
                        ` : ''}
                        
                        ${company ? `
                        <div class="field">
                            <div class="label">Company</div>
                            <div class="value">${company}</div>
                        </div>
                        ` : ''}
                        
                        ${subject ? `
                        <div class="field">
                            <div class="label">Subject</div>
                            <div class="value">${subject}</div>
                        </div>
                        ` : ''}
                        
                        <div class="field">
                            <div class="label">Message</div>
                            <div class="message-box">${message}</div>
                        </div>
                        
                        <div class="footer">
                            <p>This email was sent from the contact form on your website.<br>
                            Reply directly to this email to respond to ${name}.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };


        const data = await resend.emails.send(emailData);


        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
