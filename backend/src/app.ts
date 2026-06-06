import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware';

import authRoutes from './routes/auth.routes';
import vendorRoutes from './routes/vendor.routes';
import rfqRoutes from './routes/rfq.routes';
import quotationRoutes from './routes/quotation.routes';
import approvalRoutes from './routes/approval.routes';
import purchaseOrderRoutes from './routes/purchaseOrder.routes';
import invoiceRoutes from './routes/invoice.routes';
import reportRoutes from './routes/report.routes';
import notificationRoutes from './routes/notification.routes';
import activityRoutes from './routes/activity.routes';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic route
app.get('/', (req, res) => {
  res.send('VendorBridge API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/rfqs', rfqRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity', activityRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
