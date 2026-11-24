import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, details } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    if (!details || typeof details !== "string" || !details.trim()) {
      return NextResponse.json(
        { error: "Project details are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set in environment variables.");
      return NextResponse.json(
        {
          error:
            "Resend API key is not configured. Please add RESEND_API_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Resend requires verified domain or onboarding@resend.dev for testing
    // You can customize RESEND_FROM_EMAIL (e.g. "Portfolio <me@yourdomain.com>") once domain is verified
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const toAddress =
      process.env.CONTACT_EMAIL ||
      process.env.RESEND_TO_EMAIL ||
      "vrajp9013@gmail.com";

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanProjectType = (projectType && typeof projectType === "string" && projectType.trim())
      ? projectType.trim()
      : "Not specified";
    const cleanBudget = (budget && typeof budget === "string" && budget.trim())
      ? budget.trim()
      : "Not specified";
    const cleanDetails = details.trim();

    // Sanitize HTML display
    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0c10; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #12141d; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, rgba(0,255,102,0.1) 0%, rgba(0,229,255,0.05) 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
              <div style="font-family: monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; color: #00ff66; text-transform: uppercase; margin-bottom: 8px;">
                NEW INQUIRY RECEIVED
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                ${escapeHtml(cleanName)} reached out
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: #94a3b8;">
                Submitted via Portfolio Contact Form
              </p>
            </td>
          </tr>

          <!-- Metadata Box -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-family: monospace; margin-bottom: 4px;">SENDER</div>
                    <div style="font-size: 15px; font-weight: 600; color: #f1f5f9;">${escapeHtml(cleanName)}</div>
                    <div style="font-size: 13px; color: #00e5ff;">
                      <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #00e5ff; text-decoration: none;">${escapeHtml(cleanEmail)}</a>
                    </div>
                  </td>
                  <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-family: monospace; margin-bottom: 4px;">PROJECT TYPE</div>
                    <div style="font-size: 14px; font-weight: 600; color: #f1f5f9;">${escapeHtml(cleanProjectType)}</div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding-bottom: 8px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-family: monospace; margin-bottom: 4px;">BUDGET (USD)</div>
                    <div style="font-size: 14px; font-weight: 600; color: #00ff66;">${escapeHtml(cleanBudget)}</div>
                  </td>
                  <td width="50%" style="padding-bottom: 8px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-family: monospace; margin-bottom: 4px;">SUBMITTED AT</div>
                    <div style="font-size: 13px; color: #94a3b8;">${new Date().toUTCString()}</div>
                  </td>
                </tr>
              </table>

              <!-- Project Details Box -->
              <div style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-family: monospace; margin-bottom: 8px;">
                  PROJECT BRIEF / DETAILS
                </div>
                <div style="background-color: #0a0b0f; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; color: #e2e8f0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(cleanDetails)}</div>
              </div>

              <!-- Quick Action / Reply Button -->
              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re:%20${encodeURIComponent(cleanProjectType)}%20Inquiry" 
                   style="display: inline-block; background: #00ff66; color: #000000; font-weight: 700; font-size: 13px; padding: 12px 28px; border-radius: 10px; text-decoration: none; letter-spacing: 0.02em;">
                  Reply to ${escapeHtml(cleanName)}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 32px; background-color: #0b0c10; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-family: monospace;">
                Portfolio Contact Form &bull; Powered by Resend
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const textContent = `
New Project Brief Received

Name: ${cleanName}
Email: ${cleanEmail}
Project Type: ${cleanProjectType}
Budget: ${cleanBudget}
Submitted At: ${new Date().toUTCString()}

Details:
${cleanDetails}
`;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: cleanEmail,
      subject: `[Portfolio Brief] ${cleanProjectType} - from ${cleanName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          error:
            error.message ||
            "Failed to send email through Resend. Please check your configuration.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project brief successfully sent!",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Unexpected error in contact route:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
