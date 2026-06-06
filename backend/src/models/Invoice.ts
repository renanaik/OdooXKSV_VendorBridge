import mongoose, { Document } from 'mongoose';

export interface IInvoice extends Document {
  invoiceNumber: string;
  purchaseOrder: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  invoiceDate: Date;
  dueDate: Date;
  items: {
    itemName: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Rejected';
}

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    purchaseOrder: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'PurchaseOrder' },
    vendor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    items: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        total: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Overdue', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);
