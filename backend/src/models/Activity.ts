import mongoose, { Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  action: string;
  module: string;
  description: string;
  ipAddress?: string;
}

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    action: { type: String, required: true },
    module: { type: String, required: true },
    description: { type: String, required: true },
    ipAddress: { type: String },
  },
  { timestamps: true } // Creates createdAt field automatically
);

export default mongoose.model<IActivity>('Activity', activitySchema);
