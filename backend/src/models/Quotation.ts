import mongoose, { Document } from 'mongoose';

export interface IQuotation extends Document {
  quotationNumber: string;
  rfq: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  items: {
    itemName: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    discount: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
  deliveryDays: number;
  paymentTerms: string;
  warranty: string;
  supportTerms?: string;
  notes?: string;
  attachments?: string[];
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
}

const quotationSchema = new mongoose.Schema(
  {
    quotationNumber: { type: String, required: true, unique: true },
    rfq: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RFQ' },
    vendor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    items: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
    paymentTerms: { type: String, required: true },
    warranty: { type: String, required: true },
    supportTerms: { type: String },
    notes: { type: String },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Under Review', 'Accepted', 'Rejected'],
      default: 'Submitted',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IQuotation>('Quotation', quotationSchema);
