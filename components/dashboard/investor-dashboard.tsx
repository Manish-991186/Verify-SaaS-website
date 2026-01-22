"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrustBadge } from "@/components/trust-badge"
import { mockCompanies, categories, revenueRanges, growthRanges } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Search, Filter, ExternalLink, Building2, TrendingUp, Bookmark } from "lucide-react"

export function InvestorDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [revenueFilter, setRevenueFilter] = useState("All Ranges")
  const [growthFilter, setGrowthFilter] = useState("All Growth Rates")

  const verifiedCompanies = mockCompanies.filter((c) => c.verificationStatus === "verified")

  const filteredCompanies = verifiedCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "All Categories" || company.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Investor Dashboard</h1>
          <p className="text-muted-foreground">Discover verified SaaS companies, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{verifiedCompanies.length} verified companies</span>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-accent" />
            Search Verified SaaS
          </CardTitle>
          <CardDescription>
            Find companies with verified revenue metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={revenueFilter} onValueChange={setRevenueFilter}>
              <SelectTrigger className="flex-1 sm:max-w-[180px]">
                <SelectValue placeholder="Revenue Range" />
              </SelectTrigger>
              <SelectContent>
                {revenueRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={growthFilter} onValueChange={setGrowthFilter}>
              <SelectTrigger className="flex-1 sm:max-w-[180px]">
                <SelectValue placeholder="Growth Rate" />
              </SelectTrigger>
              <SelectContent>
                {growthRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {filteredCompanies.length} {filteredCompanies.length === 1 ? "Result" : "Results"}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="border-border bg-card hover:border-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{company.name}</CardTitle>
                      <CardDescription className="text-xs">{company.category}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">MRR</p>
                    <p className="text-sm font-semibold text-foreground">{company.metrics?.mrrRange}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Growth</p>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      {company.metrics?.growthRate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <TrustBadge status={company.verificationStatus} size="sm" />
                  <Button variant="ghost" size="sm" asChild className="gap-1">
                    <Link href={`/saas/${company.id}`}>
                      View Profile
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No results found</p>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Try adjusting your search or filters to find verified SaaS companies.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
