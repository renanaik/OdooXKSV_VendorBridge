import mongoose from 'mongoose';
import connectDB from './src/config/db';
import dotenv from 'dotenv';
import { compareQuotations } from './src/services/quotationScore.service';

dotenv.config();

const runTest = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    
    const rfqId = '6a23d6390e1295a99d8006fb';
    console.log(`Testing compareQuotations for RFQ: ${rfqId}`);
    
    const result = await compareQuotations(rfqId);
    console.log("Result:", JSON.stringify(result, null, 2));
    
  } catch (err: any) {
    console.error("ERROR CAUGHT:");
    console.error(err.message);
    console.error(err.stack);
  } finally {
    process.exit(0);
  }
};

runTest();
