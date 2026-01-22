"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrustBadge } from "@/components/trust-badge"
import { AuthProvider } from "@/lib/auth-context"
import { mockCompanies, categories, revenueRanges } from "@/lib/mock-data"
import { Search, Filter, Building2, TrendingUp, ExternalLink, ShieldCheck } from "lucide-react"
import Loading from "./loading"

export default function VerifiedSaaSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [revenueFilter, setRevenueFilter] = useState("All Ranges")
  const searchParams = useSearchParams()

  const verifiedCompanies = mockCompanies.filter((c) => c.verificationStatus === "verified")

  const filteredCompanies = verifiedCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "All Categories" || company.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">
          {/* Hero */}
          <section className="bg-secondary/30 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                {verifiedCompanies.length} Verified Companies
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
                Discover Verified SaaS
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse companies with independently verified revenue metrics. 
                No more fake screenshots or inflated claims.
              </p>
            </div>
          </section>

          {/* Search & Filters */}
          <section className="py-8 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, category, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={revenueFilter} onValueChange={setRevenueFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Revenue Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredCompanies.length}</span> verified companies
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="border-border bg-card hover:border-accent/50 transition-all hover:shadow-lg group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                            <Building2 className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{company.name}</CardTitle>
                            <CardDescription>{company.category}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-1">MRR Range</p>
                          <p className="text-sm font-semibold text-foreground">{company.metrics?.mrrRange}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-xs text-muted-foreground mb-1">Growth</p>
                          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-success" />
                            {company.metrics?.growthRate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <TrustBadge status={company.verificationStatus} size="sm" />
                        <Button variant="ghost" size="sm" asChild className="gap-1 group-hover:bg-accent/10">
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
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Search className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-xl font-medium text-foreground mb-2">No companies found</p>
                    <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                      Try adjusting your search or filters to find verified SaaS companies.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("All Categories")
                      setRevenueFilter("All Ranges")
                    }}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary text-primary-foreground py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Want to get your SaaS verified?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join hundreds of founders building credibility with verified revenue metrics.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Get Verified Now</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
