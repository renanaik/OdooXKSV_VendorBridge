import { sendEmail as mailerSend } from '../config/mail';

export const sendInvoiceEmail = async (email: string, invoiceNumber: string, pdfPath?: string) => {
  const subject = `Invoice ${invoiceNumber} from VendorBridge`;
  const message = `
    Dear Vendor/Client,

    Please find attached the details for Invoice ${invoiceNumber}.
    Kindly process the payment at your earliest convenience.

    Regards,
    VendorBridge Finance Team
  `;

  const attachments = pdfPath
    ? [
        {
          filename: `Invoice-${invoiceNumber}.pdf`,
          path: pdfPath,
        },
      ]
    : [];

  return await mailerSend({ email, subject, message, attachments });
};
