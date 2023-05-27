//===========================================================//
//                      Accounts Types                      //
//==========================================================//
export interface AuthRequest {
  dmsDealerId: number;
  username: string;
  password: string;
  productId: string;
  clientId: string;
  clientSecret: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

//===========================================================//
//                     Dashboard Types                      //
//==========================================================//
interface Transaction {
  externalTransId: string;
  transactionType: string;
  transactionReference: string;
  transactionAmount: number;
  cashierId: string;
  customerId: number;
  customerName: string;
  isDeviceTransaction: boolean;
  deviceName: string | null;
  isApproved: boolean;
  approvalResultNumber: number | null;
  isPartialApproval: boolean;
  amountProcessed: number;
  transactionDate: string;
  uniqueTransId: string;
  result: string;
}

interface Transactions {
  data: Transaction[];
  currentPage: number;
  pageCount: number;
  rowCount: number;
  pageSize: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
}

export interface IDashboardResponse {
  totalApprovedTransactions: number;
  totalAmountProcessed: number;
  transactions: Transactions;
}

export interface IDashboardRequest {
  dealerId: number;
  fromDate: Date | string;
  toDate: Date | string;
  isRemotePayments: boolean;
  transactionType: string;
}

//===========================================================//
//                    Transaction Types                     //
//==========================================================//
export interface ITransaction {
  externalTransId: string;
  transactionType: string;
  transactionReference: string;
  transactionAmount: number;
  cashierId: string;
  customerId: number;
  customerName: string;
  isDeviceTransaction: boolean;
  deviceName: string | null;
  isApproved: boolean;
  approvalResultNumber: number | null;
  isPartialApproval: boolean;
  amountProcessed: number;
  transactionDate: string;
  uniqueTransId: string;
  result: string;
}

export interface IGetDealerTransactionsResponse {
  data: ITransaction[];
  currentPage: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
}

export interface IGetDealerTransactionsRequest {
  dealerId: number;
  page: number;
  rowsPerPage: number;
  customerName: string;
  cardNumber: string;
}

//===========================================================//
//                      Setting Types                       //
//==========================================================//
export interface ISettingsForm {
  DealerId: number | null;
  Oid: string;
  AuthToken: string;
  SecretPhrase: string;
  AllowTextToPay: boolean;
  IsSandbox: boolean;
  AllowGiftCards: boolean;
  MerchantName: string;
  MerchantKey: string;
}

export interface IGetDealerSettingsResponse {
  oid: string;
  authToken: string;
  secretPhrase: string;
  allowTextToPay: boolean;
  isSandbox: boolean;
  allowGiftCards: boolean;
  merchantName: string;
  merchantKey: string;
}

//===========================================================//
//                        Users Types                       //
//==========================================================//
export interface IUser {
  userId: number;
  userName: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  isDmsAdmin: boolean;
}

export interface UserResponse {
  users: IUser[];
}

//===========================================================//
//                     Vaulted Card Types                   //
//==========================================================//
export interface VaultedCardsRequest {
  dealerId: number;
  customerId: number;
}

interface Card {
  cardNumber: string;
  cardType: string;
  cardToken: string;
}

export interface VaultedCardsResponse {
  count: number;
  vaultedCards: Card[];
}
