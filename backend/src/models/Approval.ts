import mongoose, { Document } from 'mongoose';

export interface IApproval extends Document {
  documentId: mongoose.Types.ObjectId;
  documentType: 'RFQ' | 'Quotation' | 'PurchaseOrder' | 'Invoice';
  approvalLevel: 'L1 Review' | 'Finance Approval' | 'Final Approval';
  approver: mongoose.Types.ObjectId;
  remarks?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  actionDate?: Date;
}

const approvalSchema = new mongoose.Schema(
  {
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    documentType: {
      type: String,
      required: true,
      enum: ['RFQ', 'Quotation', 'PurchaseOrder', 'Invoice'],
    },
    approvalLevel: {
      type: String,
      required: true,
      enum: ['L1 Review', 'Finance Approval', 'Final Approval'],
    },
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    remarks: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    actionDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IApproval>('Approval', approvalSchema);
