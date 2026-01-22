"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Check, Rocket, TrendingUp, Building2, Zap, Shield, Clock, HelpCircle } from "lucide-react"

const founderFeatures = [
  "Revenue verification badge",
  "Connect 1 revenue source (Stripe)",
  "Public profile listing",
  "30-day badge validity",
  "Metrics displayed as ranges",
  "Embeddable badge code",
  "Email support",
]

const investorFeatures = [
  "Full verified SaaS database access",
  "Advanced search & filters",
  "View all verification reports",
  "Company watchlist & alerts",
  "Export search results",
  "Priority support",
  "API access (coming soon)",
]

const acquirerFeatures = [
  "Everything in Investor plan",
  "Detailed verification reports",
  "Historical data access",
  "Custom due diligence requests",
  "Direct founder introductions",
  "Dedicated account manager",
  "SLA guarantees",
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">
          {/* Hero */}
          <section className="bg-background py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                Simple Pricing
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
                Choose your plan
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing for founders, investors, and acquirers. 
                No hidden fees, no surprises.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className={`text-sm ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  Monthly
                </span>
                <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                <span className={`text-sm ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  Annual
                </span>
                {isAnnual && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Save 20%
                  </Badge>
                )}
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                {/* Founder Plan */}
                <Card className="border-border bg-card relative">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                      <Rocket className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">Founder</CardTitle>
                    <CardDescription>For SaaS founders who want verified credibility</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted-foreground">₹</span>
                      <span className="text-5xl font-bold text-foreground">
                        {isAnnual ? "799" : "999"}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground">
                        Billed annually (₹9,588/year)
                      </p>
                    )}
                    <ul className="space-y-3">
                      {founderFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <Link href="/signup?plan=founder">Start Verification</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Investor Plan */}
                <Card className="border-accent bg-card relative ring-2 ring-accent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">Investor</CardTitle>
                    <CardDescription>For angels & VCs doing due diligence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted-foreground">₹</span>
                      <span className="text-5xl font-bold text-foreground">
                        {isAnnual ? "20,000" : "2,500"}
                      </span>
                      <span className="text-muted-foreground">{isAnnual ? "/year" : "/month"}</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground">
                        Save ₹10,000 vs monthly
                      </p>
                    )}
                    <ul className="space-y-3">
                      {investorFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup?plan=investor">Get Access</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Acquirer Plan */}
                <Card className="border-border bg-card relative">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">Acquirer</CardTitle>
                    <CardDescription>For buyers needing detailed verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-foreground">Custom</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pay-per-report or enterprise pricing
                    </p>
                    <ul className="space-y-3">
                      {acquirerFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <Link href="/signup?plan=acquirer">Contact Sales</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Why choose VerifySaaS?
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 mx-auto mb-4">
                    <Shield className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Privacy-First</h3>
                  <p className="text-sm text-muted-foreground">
                    Your exact revenue is never exposed. We only show ranges to protect your business.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 mx-auto mb-4">
                    <Zap className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Instant Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your Stripe and get verified in minutes, not weeks.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 mx-auto mb-4">
                    <Clock className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Always Current</h3>
                  <p className="text-sm text-muted-foreground">
                    Auto-expiring badges ensure verification data stays fresh and accurate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-2 mb-8">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-2xl font-bold text-foreground">Pricing FAQ</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Can I cancel anytime?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Do you offer refunds?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We offer a 14-day money-back guarantee for all new subscriptions. No questions asked.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">What payment methods do you accept?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We accept all major credit cards, debit cards, and UPI payments through our secure Stripe checkout.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Is there a free trial?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We offer a 7-day free trial for the Investor plan. Founders can explore the platform before connecting their revenue source.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
