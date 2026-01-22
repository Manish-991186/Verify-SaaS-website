"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrustBadge } from "@/components/trust-badge"
import { mockReports, mockCompanies } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Building2, 
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Plus
} from "lucide-react"

export function AcquirerDashboard() {
  const { user } = useAuth()
  const [requestingReport, setRequestingReport] = useState<string | null>(null)

  const handleRequestReport = (companyId: string) => {
    setRequestingReport(companyId)
    setTimeout(() => setRequestingReport(null), 2000)
  }

  const handleDownload = () => {
    // Mock download
    alert("Report download started (mock)")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Acquirer Dashboard</h1>
          <p className="text-muted-foreground">Request and manage verification reports, {user?.name}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Request New Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockReports.length}</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">$5.4M</p>
                <p className="text-sm text-muted-foreground">Total ARR Reviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Reports */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Verification Reports
          </CardTitle>
          <CardDescription>
            Detailed verification reports for due diligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-muted/30 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.companyName}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.generatedAt.toLocaleDateString()}
                      </span>
                      <TrustBadge status={report.status} size="sm" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">MRR</p>
                      <p className="font-semibold text-foreground">{report.metrics.mrrRange}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Growth</p>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        {report.metrics.growthRate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1 bg-transparent">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="gap-1">
                      <Link href={`/saas/${report.companyId}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Companies */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Request Detailed Verification</CardTitle>
          <CardDescription>
            Request comprehensive verification reports for specific companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {mockCompanies.filter(c => c.verificationStatus === "verified").slice(0, 4).map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {company.metrics?.mrrRange}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleRequestReport(company.id)}
                    disabled={requestingReport === company.id}
                  >
                    {requestingReport === company.id ? "Requesting..." : "Request"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
