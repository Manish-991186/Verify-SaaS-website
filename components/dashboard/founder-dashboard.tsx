"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MetricsCard } from "@/components/metrics-card"
import { TrustBadge, TrustBadgeEmbed } from "@/components/trust-badge"
import { mockCompanies } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Link2, 
  ShieldCheck, 
  Calendar,
  ExternalLink,
  Copy,
  Check
} from "lucide-react"

export function FounderDashboard() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [connecting, setConnecting] = useState(false)
  
  // Get mock company data (use first company as demo)
  const company = mockCompanies[0]
  const isVerified = company.verificationStatus === "verified"

  const handleConnect = () => {
    setConnecting(true)
    setTimeout(() => setConnecting(false), 2000)
  }

  const handleCopyEmbed = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Founder Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <TrustBadge status={company.verificationStatus} expiresAt={company.expiresAt} showExpiry />
      </div>

      {/* Connect Revenue Source */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-accent" />
            Connect Revenue Source
          </CardTitle>
          <CardDescription>
            Securely connect your payment processor for automated verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#635BFF]/10">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635BFF"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Stripe</p>
                <p className="text-sm text-muted-foreground">Read-only access</p>
              </div>
            </div>
            <Button onClick={handleConnect} disabled={connecting} className="shrink-0">
              {connecting ? "Connecting..." : isVerified ? "Reconnect" : "Connect Stripe"}
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            We only request read-only access. Your data is never stored in raw form.
          </p>
        </CardContent>
      </Card>

      {/* Verified Metrics */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Verified Metrics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="MRR Range"
            value={company.metrics?.mrrRange || "Not verified"}
            icon={DollarSign}
            description="Monthly Recurring Revenue"
          />
          <MetricsCard
            title="ARR Range"
            value={company.metrics?.arrRange || "Not verified"}
            icon={DollarSign}
            description="Annual Recurring Revenue"
          />
          <MetricsCard
            title="Growth Rate"
            value={company.metrics?.growthRate || "Not verified"}
            icon={TrendingUp}
            trend="up"
            description="Month-over-month"
          />
          <MetricsCard
            title="Churn Rate"
            value={company.metrics?.churnRate || "Not verified"}
            icon={TrendingDown}
            trend="neutral"
            description="Monthly customer churn"
          />
        </div>
      </div>

      {/* Verification Status & Badge */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-success" />
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Verified On</p>
                  <p className="text-sm text-muted-foreground">
                    {company.verifiedAt?.toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    }) || "Not yet verified"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Expires On</p>
                  <p className="text-sm text-muted-foreground">
                    {company.expiresAt?.toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    }) || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full" variant={isVerified ? "outline" : "default"}>
              {isVerified ? "Renew Verification" : "Start Verification"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Trust Badge</CardTitle>
            <CardDescription>Share your verification status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold text-foreground mb-2">{company.name}</p>
              <p className="text-sm text-muted-foreground mb-4">{company.category}</p>
              <TrustBadge status={company.verificationStatus} size="lg" />
            </div>
            <TrustBadgeEmbed companyName={company.name} />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={handleCopyEmbed}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Embed"}
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent" asChild>
                <a href={`/saas/${company.id}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
