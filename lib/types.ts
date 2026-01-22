export type UserRole = "founder" | "investor" | "acquirer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
}

export interface SaaSCompany {
  id: string
  name: string
  category: string
  description: string
  founderId: string
  verificationStatus: "pending" | "verified" | "expired"
  verifiedAt?: Date
  expiresAt?: Date
  metrics?: VerifiedMetrics
  logoUrl?: string
}

export interface VerifiedMetrics {
  mrrRange: string
  arrRange: string
  growthRate: string
  churnRate: string
  lastUpdated: Date
}

export interface VerificationReport {
  id: string
  companyId: string
  companyName: string
  generatedAt: Date
  status: "verified" | "pending" | "expired"
  metrics: VerifiedMetrics
}
