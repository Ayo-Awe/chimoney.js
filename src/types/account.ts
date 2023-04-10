export interface TransactionData {
  id: string;
  chimoney: number;
  valueInUSD: number;
  issueID: string;
  totalPaid: number;
  fee: number;
  groupID?: string;
  personalizedMessage?: string;
  issuer: string;
  enabledToRedeem: string[];
  twitter?: string;
  chiRef: string;
  scheduleDate?: string;
  email?: string;
  issueDate: string;
  initiatedBy: string;
  redeemData: any;
  hashtag?: string;
  meta: any;
  updatedDate: string;
  paymentDate: string;
  status: string;
  integration: any;
  message?: {
    mId: string;
    mType: string;
    status: string;
  };
}

export interface TransferData {
  sender: string;
  wallet: string;
  amount: number;
  tnxID: string;
  receiver: string;
}

export interface DeletedTransaction {
  deleted: TransactionData;
}
