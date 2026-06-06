import mongoose from 'mongoose';
import Vendor from './src/models/Vendor';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vendorbridge';

const commonFields = {
  address: 'Corporate Park, Phase 1',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  postalCode: '400051',
  bankName: 'HDFC Bank',
  accountNumber: '50200012345678',
  ifscCode: 'HDFC0001234',
  createdBy: new mongoose.Types.ObjectId()
};

const vendorsData = [
  {
    vendorCode: 'VND-83726190',
    companyName: 'Dell Technologies India',
    email: 'enterprise.sales@dell.com',
    phone: '+91 80000 12345',
    category: 'IT Hardware',
    taxId: '29ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    gstNumber: '29ABCDE1234F1Z5',
    status: 'Active',
    rating: 4.8,
    ...commonFields
  },
  {
    vendorCode: 'VND-29384756',
    companyName: 'Infosys Procurement Services',
    email: 'vendor.relations@infosys.com',
    phone: '+91 80 2852 0261',
    category: 'Software',
    taxId: '29AAACI4336B1Z7',
    panNumber: 'AAACI4336B',
    gstNumber: '29AAACI4336B1Z7',
    status: 'Active',
    rating: 4.5,
    ...commonFields
  },
  {
    vendorCode: 'VND-56473829',
    companyName: 'Godrej Interio',
    email: 'b2b.orders@godrej.com',
    phone: '+91 22 6796 5656',
    category: 'Furniture',
    taxId: '27AAACG0219J1Z4',
    panNumber: 'AAACG0219J',
    gstNumber: '27AAACG0219J1Z4',
    status: 'Active',
    rating: 4.2,
    ...commonFields
  },
  {
    vendorCode: 'VND-91827364',
    companyName: 'Blue Dart Express',
    email: 'corporate@bluedart.com',
    phone: '+91 22 2839 6444',
    category: 'Logistics',
    taxId: '27AAACB0446L1ZQ',
    panNumber: 'AAACB0446L',
    gstNumber: '27AAACB0446L1ZQ',
    status: 'Pending Verification',
    rating: 0,
    ...commonFields
  },
  {
    vendorCode: 'VND-10293847',
    companyName: 'Cisco Systems India',
    email: 'india-sales@cisco.com',
    phone: '+91 80 4159 3000',
    category: 'IT Hardware',
    taxId: '29AAACC1234C1ZA',
    panNumber: 'AAACC1234C',
    gstNumber: '29AAACC1234C1ZA',
    status: 'Active',
    rating: 4.9,
    ...commonFields
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    await Vendor.insertMany(vendorsData);
    console.log('Vendors Seeded Successfully!');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
