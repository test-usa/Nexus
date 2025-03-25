export interface User {
    _id: string;
    name?: string;
    email?: string;
  }
  
  export interface Order {
    _id: string;
    key: string;
    keyType: string;
    createdAt: string;
    expiresAt: string | null;
    status: string;
    LicenseKey: string;
    RedeemedBy: User[];
    userId: string;
  }
  
  export interface RedeemUserPayload {
    keyId: string;
    userEmail: string;
  }
  
  export interface KeyStatus {
    label: string;
    className: string;
  }