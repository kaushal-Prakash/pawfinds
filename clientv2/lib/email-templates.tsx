export const emailTemplates = {
  welcome: (name: string) => ({
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
  }),

  adoptionStatus: (applicantName: string, petName: string, status: string, message?: string) => {
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

    return {
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
  },

  otpVerification: (otp: string, type: string) => ({
    subject: `PawFinds: Your verification code is ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #be123c; padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Verification Code</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">PawFinds Security</p>
        </div>
        
        <div style="padding: 40px 20px; background: #fdf2f8; text-align: center;">
          <h2 style="color: #be123c; margin-top: 0;">Your verification code</h2>
          
          <div style="background: white; border: 2px solid #be123c; border-radius: 8px; padding: 30px; margin: 30px 0; display: inline-block;">
            <div style="font-size: 36px; font-weight: bold; color: #be123c; letter-spacing: 8px;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            Enter this code to ${type === "registration" ? "complete your registration" : "reset your password"}.
          </p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            This code will expire in 10 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>© 2024 PawFinds. Connecting hearts, one paw at a time.</p>
        </div>
      </div>
    `,
  }),
}
