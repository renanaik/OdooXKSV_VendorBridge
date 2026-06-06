import mongoose, { Document } from 'mongoose';

export interface IVendor extends Document {
  vendorCode: string;
  companyName: string;
  category: string;
  gstNumber: string;
  panNumber: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  status: 'Active' | 'Pending Verification' | 'Blocked';
  rating: number;
  documents?: { title: string; url: string; status: string }[];
  createdBy: mongoose.Types.ObjectId;
}

const vendorSchema = new mongoose.Schema(
  {
    vendorCode: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    category: { type: String, required: true },
    gstNumber: { type: String, required: true },
    panNumber: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    status: {
      type: String,
      enum: ['Active', 'Pending Verification', 'Blocked'],
      default: 'Pending Verification',
    },
    rating: { type: Number, default: 0 },
    documents: [
      {
        title: { type: String },
        url: { type: String },
        status: { type: String, default: 'Pending' },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVendor>('Vendor', vendorSchema);
