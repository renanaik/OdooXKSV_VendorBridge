import mongoose, { Document } from 'mongoose';

export interface IRFQ extends Document {
  rfqNumber: string;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  budget: number;
  deadline: Date;
  department: string;
  lineItems: {
    itemName: string;
    sku?: string;
    quantity: number;
    unit: string;
    expectedPrice: number;
    tax: number;
  }[];
  assignedVendors: mongoose.Types.ObjectId[];
  attachments?: string[];
  status: 'Draft' | 'Published' | 'Quotation Received' | 'Under Review' | 'Approved' | 'Closed';
  createdBy: mongoose.Types.ObjectId;
}

const rfqSchema = new mongoose.Schema(
  {
    rfqNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    budget: { type: Number, required: true },
    deadline: { type: Date, required: true },
    department: { type: String, required: true },
    lineItems: [
      {
        itemName: { type: String, required: true },
        sku: { type: String },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        expectedPrice: { type: Number, required: true },
        tax: { type: Number, default: 0 },
      },
    ],
    assignedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Quotation Received', 'Under Review', 'Approved', 'Closed'],
      default: 'Draft',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRFQ>('RFQ', rfqSchema);
