# 🌉 VendorBridge

**Next-Gen Procurement & Vendor Management Platform**

VendorBridge is a centralized Procurement & Vendor Management ERP built to digitize the complete procurement lifecycle. From raising Request for Quotations (RFQs) to AI-powered vendor selection, automated Purchase Order (PO) generation, and invoice tracking, VendorBridge bridges the gap between procurement teams and vendors seamlessly.

## 🚀 Key Features

*   **Intelligent RFQ Management:** Easily create, broadcast, and track Requests for Quotations across multiple vendors.
*   **AI-Driven Quotation Comparison:** Automatically analyzes submitted quotations and generates a "Procurement Score" based on price (50%), vendor rating (20%), delivery time (15%), historical performance (10%), and risk assessment (5%).
*   **One-Click Purchase Orders:** Convert winning quotations directly into official Purchase Orders with a single click.
*   **Automated Invoicing:** Generate, track, and pay vendor invoices through a streamlined dashboard.
*   **Role-Based Access Control (RBAC):** Secure, dedicated views for Procurement Officers, Managers, Admins, and Vendors.
*   **Real-time Analytics:** Track spending, vendor performance, and procurement bottlenecks from the dashboard.

## 💻 Tech Stack

### Frontend
*   **Framework:** Next.js 16.2 (App Router)
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui & Radix UI
*   **Icons:** Lucide React
*   **Data Fetching:** Axios

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB & Mongoose
*   **Authentication:** JSON Web Tokens (JWT) & bcrypt

## 📁 Project Structure

```text
/OdooXKSV_VendorBridge
├── /backend
│   ├── /src
│   │   ├── /config       # Database configuration
│   │   ├── /controllers  # API request handlers
│   │   ├── /middleware   # JWT Auth & Role guards
│   │   ├── /models       # Mongoose schemas
│   │   ├── /routes       # Express routes
│   │   └── /services     # Business logic (AI Scoring, PDF generation)
│   └── app.ts & server.ts
├── /frontend
│   ├── /src
│   │   ├── /app          # Next.js App Router pages
│   │   ├── /components   # Reusable UI components
│   │   ├── /contexts     # React Context (Auth)
│   │   └── /lib          # Utility functions & API configuration
│   └── next.config.ts
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB (Local or Atlas URL)

### 1. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vendorbridge
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend development server:
```bash
npm run dev
```

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:3000`.

## 🔒 Authentication & Roles

To test the application properly, use the built-in roles:
*   **Procurement Officer:** Full access to manage RFQs, compare quotations, and generate POs.
*   **Vendor:** Access to view RFQs and submit quotations.
*   **Manager / Admin:** Oversight and approval capabilities, plus the ability to mark invoices as paid.

## 🏆 Hackathon Submission

This project was built for the **Odoo X KSV Hackathon**. It demonstrates a full-stack, enterprise-grade architecture focusing on user experience, modular component design, and scalable backend services.

---
*Made with ❤️ for the future of procurement.*
