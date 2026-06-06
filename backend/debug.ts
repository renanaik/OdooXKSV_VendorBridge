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
    
    const rfqId = '6a23d6390e1295a99d8006fb';
    
    const allQuotations = await Quotation.find({});
    console.log("Total quotations in DB:", allQuotations.length);
    if (allQuotations.length > 0) {
      console.log("Sample quotation:", JSON.stringify(allQuotations[0], null, 2));
    }
    
    console.log("Trying to compare quotations for RFQ:", rfqId);
    const result = await compareQuotations(rfqId);
    console.log("Compare success!", result.length, "results");
  } catch (err: any) {
    console.error("Error caught in debug script:", err.message);
    console.error(err.stack);
  } finally {
    process.exit(0);
  }
};

debug();
