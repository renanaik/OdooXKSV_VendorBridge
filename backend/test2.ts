import mongoose from 'mongoose';
import connectDB from './src/config/db';
import dotenv from 'dotenv';
import Quotation from './src/models/Quotation';
import { compareQuotations } from './src/services/quotationScore.service';

dotenv.config();

const debug = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    
    const rfqId = '6a23e101dc398516d68cce14'; // The RFQ that actually HAS a quotation
    
    console.log("Trying to compare quotations for RFQ:", rfqId);
    const result = await compareQuotations(rfqId);
    console.log("Compare success!", JSON.stringify(result, null, 2));
  } catch (err: any) {
    console.error("Error caught in debug script:", err.message);
    console.error(err.stack);
  } finally {
    process.exit(0);
  }
};

debug();
