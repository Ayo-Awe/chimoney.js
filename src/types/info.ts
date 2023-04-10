export interface AccountData {
  countryCode: string;
  account_bank: string;
  account_number: string;
}

export interface BankData {
  name: string;
  id: number;
  code: string;
}

export interface LocalToUSDData {
  amountInOriginCurrency: string;
  originCurrency: string;
  amountInUSD: number;
  validUntil: string;
}

export interface USDToLocalData {
  amountInUSD: string;
  destinationCurrency: string;
  amountInDestinationCurrency: number;
  validUntil: string;
}

export interface AccountVerificationData {
  account_number: string;
  account_name: string;
}

export interface MomoData {
  name: string;
  code: string;
  country: string;
}
