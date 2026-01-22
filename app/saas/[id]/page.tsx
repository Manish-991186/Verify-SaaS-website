"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MetricsCard } from "@/components/metrics-card"
import { TrustBadge } from "@/components/trust-badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { mockCompanies } from "@/lib/mock-data"
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Lock
} from "lucide-react"

export default function SaaSProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const company = mockCompanies.find((c) => c.id === id)

  if (!company) {
    notFound()
  }

  const isVerified = company.verificationStatus === "verified"

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6 gap-2">
            <Link href="/verified">
              <ArrowLeft className="h-4 w-4" />
              Back to Verified SaaS
            </Link>
          </Button>

          {/* Company Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 border border-border">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
                  {isVerified && <Badge variant="secondary">{company.category}</Badge>}
                </div>
                <p className="text-muted-foreground max-w-xl">{company.description}</p>
              </div>
            </div>
            <TrustBadge 
              status={company.verificationStatus} 
              expiresAt={company.expiresAt} 
              size="lg" 
              showExpiry 
            />
          </div>

          {/* Verified Banner */}
          {isVerified && (
            <Card className="border-success/30 bg-success/5 mb-8">
              <CardContent className="flex items-center gap-4 py-4">
                <ShieldCheck className="h-8 w-8 text-success" />
                <div>
                  <p className="font-semibold text-foreground">Verified by VerifySaaS</p>
                  <p className="text-sm text-muted-foreground">
                    Revenue metrics independently verified on {company.verifiedAt?.toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metrics Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Verified Metrics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                title="MRR Range"
                value={company.metrics?.mrrRange || "Not available"}
                icon={DollarSign}
                description="Monthly Recurring Revenue"
              />
              <MetricsCard
                title="ARR Range"
                value={company.metrics?.arrRange || "Not available"}
                icon={DollarSign}
                description="Annual Recurring Revenue"
              />
              <MetricsCard
                title="Growth Rate"
                value={company.metrics?.growthRate || "Not available"}
                icon={TrendingUp}
                trend="up"
                description="Month-over-month growth"
              />
              <MetricsCard
                title="Churn Rate"
                value={company.metrics?.churnRate || "Not available"}
                icon={TrendingDown}
                trend="neutral"
                description="Monthly customer churn"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Verification Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Verification Status</span>
                  <TrustBadge status={company.verificationStatus} size="sm" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Verified Date</span>
                  <span className="text-sm font-medium text-foreground">
                    {company.verifiedAt?.toLocaleDateString() || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Valid Until</span>
                  <span className="text-sm font-medium text-foreground">
                    {company.expiresAt?.toLocaleDateString() || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium text-foreground">
                    {company.metrics?.lastUpdated.toLocaleDateString() || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  Privacy Notice
                </CardTitle>
                <CardDescription>
                  How we protect sensitive data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All metrics displayed on this page are shown as <strong className="text-foreground">ranges only</strong>. 
                    Exact revenue figures are never exposed to protect business confidentiality.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This verification is <strong className="text-foreground">opt-in</strong>. The company has chosen to 
                    verify their metrics through VerifySaaS to build trust with investors and acquirers.
                  </p>
                </div>
                <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                  <Link href="/pricing">
                    Request Detailed Report
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
