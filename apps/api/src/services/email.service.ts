import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import { emailTemplates } from '../templates/email.templates';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);

  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }
  }

  private isEmailConfigured(): boolean {
    return !!process.env.SENDGRID_API_KEY;
  }

  /**
   * Send invitation email to guest
   */
  async sendInvitation(guest: any, card: any, inviteLink: string, senderName: string) {
    try {
      this.logger.log(`Sending invitation to ${guest.email} for card ${card.id}`);

      const template = emailTemplates.invitation(
        guest.name,
        card.title,
        inviteLink,
        senderName
      );

      if (!this.isEmailConfigured()) {
        this.logger.warn(`SendGrid not configured. Email not sent to ${guest.email}`);
        return { success: true, messageId: `mock-${Date.now()}`, sent: false };
      }

      const msg = {
        to: guest.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@weddingcards.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await sgMail.send(msg);
      return { success: true, messageId: result[0].headers['x-message-id'], sent: true };
    } catch (error) {
      this.logger.error(`Failed to send invitation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send RSVP confirmation email
   */
  async sendRsvpConfirmation(guest: any, card: any, rsvpStatus: string) {
    try {
      this.logger.log(`Sending RSVP confirmation to ${guest.email}`);

      const template = emailTemplates.rsvpConfirmation(
        guest.name,
        rsvpStatus,
        card.title
      );

      if (!this.isEmailConfigured()) {
        this.logger.warn(`SendGrid not configured. Email not sent to ${guest.email}`);
        return { success: true, messageId: `mock-${Date.now()}`, sent: false };
      }

      const msg = {
        to: guest.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@weddingcards.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await sgMail.send(msg);
      return { success: true, messageId: result[0].headers['x-message-id'], sent: true };
    } catch (error) {
      this.logger.error(`Failed to send confirmation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send gift received notification
   */
  async sendGiftNotification(cardOwnerEmail: string, senderName: string, amount: number, currency: string, cardTitle: string) {
    try {
      this.logger.log(`Sending gift notification for card owner`);

      const template = emailTemplates.giftReceived(
        senderName,
        amount,
        currency,
        cardTitle
      );

      if (!this.isEmailConfigured()) {
        this.logger.warn(`SendGrid not configured. Email not sent to ${cardOwnerEmail}`);
        return { success: true, messageId: `mock-${Date.now()}`, sent: false };
      }

      const msg = {
        to: cardOwnerEmail,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@weddingcards.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await sgMail.send(msg);
      return { success: true, messageId: result[0].headers['x-message-id'], sent: true };
    } catch (error) {
      this.logger.error(`Failed to send gift notification: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send wish received notification (to card owner)
   */
  async sendWishNotification(cardOwnerEmail: string, senderName: string, cardTitle: string) {
    try {
      this.logger.log(`Sending wish notification for card owner`);

      const template = emailTemplates.wishSubmitted(senderName, cardTitle);

      if (!this.isEmailConfigured()) {
        this.logger.warn(`SendGrid not configured. Email not sent to ${cardOwnerEmail}`);
        return { success: true, messageId: `mock-${Date.now()}`, sent: false };
      }

      const msg = {
        to: cardOwnerEmail,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@weddingcards.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await sgMail.send(msg);
      return { success: true, messageId: result[0].headers['x-message-id'], sent: true };
    } catch (error) {
      this.logger.error(`Failed to send wish notification: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send payment confirmation email
   */
  async sendPaymentConfirmation(email: string, transactionId: string, amount: number, currency: string, method: string) {
    try {
      this.logger.log(`Sending payment confirmation to ${email}`);

      const template = emailTemplates.paymentConfirmation(
        transactionId,
        amount,
        currency,
        method
      );

      if (!this.isEmailConfigured()) {
        this.logger.warn(`SendGrid not configured. Email not sent to ${email}`);
        return { success: true, messageId: `mock-${Date.now()}`, sent: false };
      }

      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@weddingcards.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await sgMail.send(msg);
      return { success: true, messageId: result[0].headers['x-message-id'], sent: true };
    } catch (error) {
      this.logger.error(`Failed to send payment confirmation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async sendResetPasswordEmail(email: string, resetLink: string) {
    try {
      this.logger.log(`Sending password reset email to ${email}`);

      const template = emailTemplates.resetPassword(resetLink);

      if (!this.isEmailConfigured()) {
        this.logger.warn(`SendGrid not configured. Email not sent to ${email}`);
        return { success: true, messageId: `mock-${Date.now()}`, sent: false };
      }

      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@weddingcards.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await sgMail.send(msg);
      return { success: true, messageId: result[0].headers['x-message-id'], sent: true };
    } catch (error) {
      this.logger.error(`Failed to send reset password email: ${error.message}`);
      throw error;
    }
  }
}
