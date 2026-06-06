import mongoose, { Document } from 'mongoose';

export interface IPurchaseOrder extends Document {
  poNumber: string;
  quotation: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  items: {
    itemName: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  status: 'Draft' | 'Sent to Vendor' | 'Accepted' | 'In Transit' | 'Delivered' | 'Cancelled';
  approvedBy: mongoose.Types.ObjectId;
}

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: { type: String, required: true, unique: true },
    quotation: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Quotation' },
    vendor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },
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
    grandTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Draft', 'Sent to Vendor', 'Accepted', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Draft',
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IPurchaseOrder>('PurchaseOrder', purchaseOrderSchema);
