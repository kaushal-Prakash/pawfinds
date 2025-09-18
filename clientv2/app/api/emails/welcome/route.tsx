import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
    }

    // In production, use actual email service
    console.log(`[EMAIL] Sending welcome email to ${email} for ${name}`)

    // Mock email template
    const emailContent = {
      to: email,
      subject: "Welcome to PawFinds! 🐾",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #be123c, #ec4899); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to PawFinds!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Find your perfect pet companion</p>
          </div>
          
          <div style="padding: 40px 20px; background: #fdf2f8;">
            <h2 style="color: #be123c; margin-top: 0;">Hi ${name}! 👋</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Thank you for joining PawFinds! We're excited to help you find your perfect pet companion.
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              Here's what you can do next:
            </p>
            
            <ul style="color: #374151; line-height: 1.8;">
              <li>Browse our available pets</li>
              <li>Save your favorites</li>
              <li>Submit adoption applications</li>
              <li>Track your application status</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/browse" 
                 style="background: #be123c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Start Browsing Pets
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you have any questions, feel free to contact us at support@pawfinds.org
            </p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>© 2024 PawFinds. Connecting hearts, one paw at a time.</p>
          </div>
        </div>
      `,
    }

    // Mock email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Welcome email sent successfully",
    })
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 })
  }
}
