import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, applicantName, petName, status, message } = await request.json()

    if (!email || !applicantName || !petName || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log(`[EMAIL] Sending adoption status email to ${email}`)

    const getStatusColor = (status: string) => {
      switch (status) {
        case "approved":
          return "#10b981"
        case "rejected":
          return "#ef4444"
        default:
          return "#f59e0b"
      }
    }

    const getStatusTitle = (status: string) => {
      switch (status) {
        case "approved":
          return "Application Approved! 🎉"
        case "rejected":
          return "Application Update"
        default:
          return "Application Status Update"
      }
    }

    const emailContent = {
      to: email,
      subject: `PawFinds: ${getStatusTitle(status)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: ${getStatusColor(status)}; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">${getStatusTitle(status)}</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Update on your adoption application</p>
          </div>
          
          <div style="padding: 40px 20px; background: #fdf2f8;">
            <h2 style="color: #be123c; margin-top: 0;">Hi ${applicantName}!</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              We have an update regarding your adoption application for <strong>${petName}</strong>.
            </p>
            
            <div style="background: white; border-left: 4px solid ${getStatusColor(status)}; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin-top: 0; color: ${getStatusColor(status)}; text-transform: capitalize;">
                Status: ${status}
              </h3>
              <p style="color: #374151; line-height: 1.6; margin-bottom: 0;">
                ${message || "Thank you for your interest in adopting from PawFinds."}
              </p>
            </div>
            
            ${
              status === "approved"
                ? `
              <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h4 style="color: #065f46; margin-top: 0;">Next Steps:</h4>
                <ul style="color: #065f46; line-height: 1.6;">
                  <li>We'll contact you within 24 hours to schedule a meet and greet</li>
                  <li>Please prepare any questions you have about ${petName}</li>
                  <li>Bring a valid ID and proof of address</li>
                </ul>
              </div>
            `
                : ""
            }
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/application-status" 
                 style="background: #be123c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Application Status
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you have any questions, please contact us at (555) 123-4567 or adopt@pawfinds.org
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
      message: "Adoption status email sent successfully",
    })
  } catch (error) {
    console.error("Error sending adoption status email:", error)
    return NextResponse.json({ error: "Failed to send adoption status email" }, { status: 500 })
  }
}
