import type { SaaSCompany, User, VerificationReport } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "founder@example.com",
    name: "Alex Chen",
    role: "founder",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    email: "investor@example.com",
    name: "Sarah Miller",
    role: "investor",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    email: "acquirer@example.com",
    name: "Michael Park",
    role: "acquirer",
    createdAt: new Date("2024-03-10"),
  },
]

export const mockCompanies: SaaSCompany[] = [
  {
    id: "1",
    name: "CloudMetrics Pro",
    category: "Analytics",
    description: "Real-time analytics platform for SaaS businesses",
    founderId: "1",
    verificationStatus: "verified",
    verifiedAt: new Date("2024-12-01"),
    expiresAt: new Date("2025-03-01"),
    metrics: {
      mrrRange: "$10K - $25K",
      arrRange: "$120K - $300K",
      growthRate: "15% - 25%",
      churnRate: "2% - 4%",
      lastUpdated: new Date("2024-12-01"),
    },
  },
  {
    id: "2",
    name: "DevFlow",
    category: "Developer Tools",
    description: "CI/CD pipeline automation for modern teams",
    founderId: "4",
    verificationStatus: "verified",
    verifiedAt: new Date("2024-11-15"),
    expiresAt: new Date("2025-02-15"),
    metrics: {
      mrrRange: "$25K - $50K",
      arrRange: "$300K - $600K",
      growthRate: "20% - 35%",
      churnRate: "1% - 3%",
      lastUpdated: new Date("2024-11-15"),
    },
  },
  {
    id: "3",
    name: "SupportHub",
    category: "Customer Support",
    description: "AI-powered customer support automation",
    founderId: "5",
    verificationStatus: "verified",
    verifiedAt: new Date("2024-10-20"),
    expiresAt: new Date("2025-01-20"),
    metrics: {
      mrrRange: "$50K - $100K",
      arrRange: "$600K - $1.2M",
      growthRate: "10% - 20%",
      churnRate: "3% - 5%",
      lastUpdated: new Date("2024-10-20"),
    },
  },
  {
    id: "4",
    name: "DataSync",
    category: "Data Integration",
    description: "Real-time data synchronization across platforms",
    founderId: "6",
    verificationStatus: "pending",
    metrics: {
      mrrRange: "$5K - $10K",
      arrRange: "$60K - $120K",
      growthRate: "25% - 40%",
      churnRate: "4% - 6%",
      lastUpdated: new Date("2024-12-10"),
    },
  },
  {
    id: "5",
    name: "EmailForge",
    category: "Marketing",
    description: "Email marketing automation with AI personalization",
    founderId: "7",
    verificationStatus: "verified",
    verifiedAt: new Date("2024-12-05"),
    expiresAt: new Date("2025-03-05"),
    metrics: {
      mrrRange: "$100K - $250K",
      arrRange: "$1.2M - $3M",
      growthRate: "8% - 15%",
      churnRate: "2% - 3%",
      lastUpdated: new Date("2024-12-05"),
    },
  },
]

export const mockReports: VerificationReport[] = mockCompanies
  .filter((c) => c.verificationStatus === "verified")
  .map((company) => ({
    id: `report-${company.id}`,
    companyId: company.id,
    companyName: company.name,
    generatedAt: company.verifiedAt!,
    status: company.verificationStatus,
    metrics: company.metrics!,
  }))

export const categories = [
  "All Categories",
  "Analytics",
  "Developer Tools",
  "Customer Support",
  "Data Integration",
  "Marketing",
  "Finance",
  "HR Tech",
  "Security",
]

export const revenueRanges = [
  "All Ranges",
  "$0 - $10K MRR",
  "$10K - $50K MRR",
  "$50K - $100K MRR",
  "$100K+ MRR",
]

export const growthRanges = [
  "All Growth Rates",
  "0% - 10%",
  "10% - 25%",
  "25% - 50%",
  "50%+",
]
