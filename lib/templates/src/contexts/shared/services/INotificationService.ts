/**
 * Interface for Notification Services.
 * @interface INotificationService
 *
 * @example
* // A class implementing the INotificationService interface might look like this:
* class EmailNotificationService implements INotificationService {
*   async sendNotification(to: string, message: string): Promise<void> {
*     // Logic to send email
*   }
* }
*/
export interface INotificationService {
 /**
  * Sends a notification to a specified recipient.
  * @param {string} to - The recipient's contact information (e.g., email address, phone number).
  * @param {string} message - The content of the notification to send.
  *
  * @returns {Promise<void>} A promise that resolves when the notification has been sent.
  *
  * @example
  * // Example of usage:
  * const emailService = new EmailNotificationService();
  * await emailService.sendNotification('user@example.com', 'Welcome to our platform!');
  */
 sendNotification(to: string, message: string): Promise<void>;
}
