import { INotificationService } from "./INotificationService";

/**
 * Service for sending email notifications.
 *
 * @class EmailNotificationService
 * @implements {INotificationService}
 *
 * @example
 * const emailService = new EmailNotificationService();
 * emailService.sendNotification('user@example.com', 'Welcome to our service!');
 */
export class EmailNotificationService implements INotificationService {
  /**
   * Sends an email notification.
   *
   * @param {string} to - The recipient's email address.
   * @param {string} message - The content of the email message.
   *
   * @returns {Promise<void>} A promise that resolves when the notification is sent.
   *
   * @throws {Error} Throws an error if sending the email fails (not implemented in this example).
   *
   * @example
   * const emailService = new EmailNotificationService();
   * emailService.sendNotification('user@example.com', 'Your order has been shipped.');
   * // Output: Email sent to user@example.com: Your order has been shipped.
   */
  async sendNotification(to: string, message: string): Promise<void> {
    // Logic to send email (simulated here)
  }
}
