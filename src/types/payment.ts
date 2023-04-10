export interface paymentOptions {
  valueInUSD: number;
  payerEmail: string;
  redirect_url?: string;
  meta?: any;
}

export interface PaymentData {
  id: string;
  valueInUSD: number;
  chimoney: number;
  paymentLink: string;
  issueID: string;
  chiRef: string;
  meta?: any;
  type: string;
  issuer: string;
  payerEmail: string;
  initiatedBy: string;
  issueDate: string;
  status: string;
  paymentRef: string;
  redirect_url?: string;
}

export type VerifyPaymentData = Omit<PaymentData, "paymentLink">;
