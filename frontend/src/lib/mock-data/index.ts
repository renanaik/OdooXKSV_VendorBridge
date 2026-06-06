export const KpiData = {
  activeRfqs: 50,
  pendingApprovals: 12,
  posThisMonth: 40,
  overdueInvoices: 5,
  totalSpend: "₹45,20,000",
  vendorCount: 30,
  avgCycleTime: "14 Days",
  savingsAchieved: "₹8,50,000"
};

export const MonthlyTrendData = [
  { name: 'Jan', spend: 4000000, savings: 240000 },
  { name: 'Feb', spend: 3000000, savings: 139000 },
  { name: 'Mar', spend: 2000000, savings: 980000 },
  { name: 'Apr', spend: 2780000, savings: 390000 },
  { name: 'May', spend: 1890000, savings: 480000 },
  { name: 'Jun', spend: 2390000, savings: 380000 },
  { name: 'Jul', spend: 3490000, savings: 430000 },
  { name: 'Aug', spend: 4520000, savings: 850000 },
];

export const SpendByCategoryData = [
  { name: 'IT Hardware', value: 400 },
  { name: 'Software Licenses', value: 300 },
  { name: 'Office Supplies', value: 300 },
  { name: 'Consulting', value: 200 },
];

export const RecentActivityFeed = [
  { id: 1, user: "Amit Patel", action: "Approved PO-2026-0045", time: "2 hours ago", avatar: "11" },
  { id: 2, user: "Priya Sharma", action: "Submitted Quotation for RFQ-889", time: "4 hours ago", avatar: "21" },
  { id: 3, user: "System", action: "Generated Invoice #INV-099", time: "5 hours ago", avatar: "0" },
  { id: 4, user: "Rahul Desai", action: "Created new RFQ for Laptops", time: "1 day ago", avatar: "33" },
];

export const VendorsList = [
  { id: "V001", name: "Reliance Retail Ltd", category: "Hardware", gst: "27AADCR4534K1Z2", rating: 4.8, status: "Active" },
  { id: "V002", name: "Tata Consultancy Services", category: "IT Services", gst: "27AAACT4567J1Z8", rating: 4.9, status: "Active" },
  { id: "V003", name: "Infosys Limited", category: "Software", gst: "29AAACI3487H1Z5", rating: 4.7, status: "Active" },
  { id: "V004", name: "Wipro Enterprises", category: "Hardware", gst: "29AAACW6789L1Z3", rating: 4.5, status: "Pending Approval" },
  { id: "V005", name: "Godrej & Boyce", category: "Furniture", gst: "27AAACG1234M1Z9", rating: 4.6, status: "Active" },
  { id: "V006", name: "L&T Infotech", category: "IT Services", gst: "27AAACL5678N1Z4", rating: 4.2, status: "Inactive" },
  { id: "V007", name: "Mahindra Logistics", category: "Logistics", gst: "27AAACM9012P1Z1", rating: 4.4, status: "Active" },
];

export const RfqList = [
  { id: "RFQ-2026-001", title: "Supply of Dell Laptops", category: "Hardware", deadline: "2026-06-15", budget: "₹15,00,000", status: "Open" },
  { id: "RFQ-2026-002", title: "Office Chair Procurement", category: "Furniture", deadline: "2026-06-10", budget: "₹2,50,000", status: "Reviewing" },
  { id: "RFQ-2026-003", title: "Cloud Hosting Renewal", category: "Software", deadline: "2026-06-20", budget: "₹8,00,000", status: "Draft" },
];

export const QuotationComparisonData = [
  {
    vendor: "Reliance Retail Ltd",
    price: 1450000,
    deliveryDays: 14,
    rating: 4.8,
    paymentTerms: "Net 30",
    score: 92,
    recommended: true
  },
  {
    vendor: "Wipro Enterprises",
    price: 1390000,
    deliveryDays: 21,
    rating: 4.5,
    paymentTerms: "Net 15",
    score: 85,
    recommended: false
  },
  {
    vendor: "Tata Consultancy Services",
    price: 1520000,
    deliveryDays: 10,
    rating: 4.9,
    paymentTerms: "Net 45",
    score: 88,
    recommended: false
  }
];
