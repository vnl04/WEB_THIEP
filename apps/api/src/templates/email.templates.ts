export const emailTemplates = {
  invitation: (guestName: string, cardTitle: string, cardUrl: string, senderName: string) => ({
    subject: `You're invited to ${cardTitle}`,
    html: `
      <h1>Wedding Invitation</h1>
      <p>Dear ${guestName},</p>
      <p>${senderName} invites you to their wedding celebration: <strong>${cardTitle}</strong></p>
      <p>Click the link below to view the wedding card and RSVP:</p>
      <a href="${cardUrl}" style="background: #d4af37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
        View Wedding Card
      </a>
      <p>We look forward to celebrating with you!</p>
      <p>Warm regards,<br>${senderName}</p>
    `,
    text: `
      Wedding Invitation
      
      Dear ${guestName},
      
      ${senderName} invites you to their wedding celebration: ${cardTitle}
      
      View the wedding card and RSVP here:
      ${cardUrl}
      
      We look forward to celebrating with you!
      
      Warm regards,
      ${senderName}
    `,
  }),

  rsvpConfirmation: (guestName: string, status: string, cardTitle: string) => ({
    subject: 'RSVP Confirmation',
    html: `
      <h1>RSVP Confirmation</h1>
      <p>Dear ${guestName},</p>
      <p>Thank you for your RSVP to the wedding: <strong>${cardTitle}</strong></p>
      <p>Your status: <strong>${status.toUpperCase()}</strong></p>
      <p>If you need to make any changes, please visit the wedding card page to update your response.</p>
      <p>Thank you!</p>
    `,
    text: `
      RSVP Confirmation
      
      Dear ${guestName},
      
      Thank you for your RSVP to the wedding: ${cardTitle}
      
      Your status: ${status.toUpperCase()}
      
      If you need to make any changes, please visit the wedding card page to update your response.
      
      Thank you!
    `,
  }),

  wishSubmitted: (senderName: string, cardTitle: string) => ({
    subject: 'New Wish Received',
    html: `
      <h1>New Wish Received</h1>
      <p>You have received a new wish for your wedding: <strong>${cardTitle}</strong></p>
      <p>From: <strong>${senderName}</strong></p>
      <p>Log in to your dashboard to view and moderate wishes.</p>
    `,
    text: `
      New Wish Received
      
      You have received a new wish for your wedding: ${cardTitle}
      
      From: ${senderName}
      
      Log in to your dashboard to view and moderate wishes.
    `,
  }),

  giftReceived: (senderName: string, amount: number, currency: string, cardTitle: string) => ({
    subject: 'Gift Received',
    html: `
      <h1>Gift Received</h1>
      <p>Thank you! You have received a gift for your wedding: <strong>${cardTitle}</strong></p>
      <p>From: <strong>${senderName}</strong></p>
      <p>Amount: <strong>${amount.toLocaleString()} ${currency}</strong></p>
      <p>Check your dashboard to see all gifts and contributions.</p>
    `,
    text: `
      Gift Received
      
      Thank you! You have received a gift for your wedding: ${cardTitle}
      
      From: ${senderName}
      
      Amount: ${amount.toLocaleString()} ${currency}
      
      Check your dashboard to see all gifts and contributions.
    `,
  }),

  paymentConfirmation: (transactionId: string, amount: number, currency: string, method: string) => ({
    subject: 'Payment Confirmation',
    html: `
      <h1>Payment Confirmation</h1>
      <p>Your payment has been received successfully.</p>
      <div style="background: #f0f0f0; padding: 15px; border-radius: 4px;">
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Amount:</strong> ${amount.toLocaleString()} ${currency}</p>
        <p><strong>Payment Method:</strong> ${method}</p>
        <p><strong>Status:</strong> Confirmed</p>
      </div>
      <p>Your subscription is now active. You can create unlimited wedding cards!</p>
      <p>Thank you for your support.</p>
    `,
    text: `
      Payment Confirmation
      
      Your payment has been received successfully.
      
      Transaction ID: ${transactionId}
      Amount: ${amount.toLocaleString()} ${currency}
      Payment Method: ${method}
      Status: Confirmed
      
      Your subscription is now active. You can create unlimited wedding cards!
      
      Thank you for your support.
    `,
  }),

  resetPassword: (resetLink: string) => ({
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset</h1>
      <p>We received a request to reset your password.</p>
      <p>Click the link below to reset your password (valid for 24 hours):</p>
      <a href="${resetLink}" style="background: #d4af37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
        Reset Password
      </a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    text: `
      Password Reset
      
      We received a request to reset your password.
      
      Reset your password here:
      ${resetLink}
      
      (Valid for 24 hours)
      
      If you didn't request this, please ignore this email.
    `,
  }),
};
