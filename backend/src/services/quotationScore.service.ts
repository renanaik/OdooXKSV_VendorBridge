import Quotation from '../models/Quotation';
import Vendor from '../models/Vendor';

export const compareQuotations = async (rfqId: string) => {
  const quotations = await Quotation.find({ rfq: rfqId }).populate('vendor', 'companyName rating');
  
  if (!quotations || quotations.length === 0) {
    const error: any = new Error('No quotations found for this RFQ');
    error.statusCode = 404;
    throw error;
  }

  // Find the lowest price and fastest delivery to baseline
  const minPrice = Math.min(...quotations.map(q => q.grandTotal));
  const minDelivery = Math.min(...quotations.map(q => q.deliveryDays));

  const comparisonMatrix = quotations.map(q => {
    const vendorObj: any = q.vendor;
    const vendorRating = vendorObj.rating || 3; 
    
    const priceScore = (q.grandTotal > 0 ? (minPrice / q.grandTotal) : 1) * 50;
    const ratingScore = (vendorRating / 5) * 20;
    const deliveryScore = (q.deliveryDays > 0 ? (minDelivery / q.deliveryDays) : 1) * 15;
    const performanceScore = 8;
    const riskScore = 4.5;
    
    const procurementScore = Math.round(priceScore + ratingScore + deliveryScore + performanceScore + riskScore);
    
    return {
      ...q.toObject(),
      score: procurementScore,
      confidenceScore: Math.round(procurementScore * 0.95),
    };
  });

  comparisonMatrix.sort((a, b) => b.score - a.score);
  return comparisonMatrix;
};
