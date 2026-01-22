"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ArrowRight, TrendingUp, Users, Building2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Trusted by 500+ verified SaaS companies
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Verify Real SaaS Revenue.{" "}
            <span className="text-muted-foreground">Kill Fake Metrics.</span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
            Privacy-first revenue verification for SaaS founders, investors, and acquirers. 
            Stop trusting screenshots. Start trusting verified data.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="gap-2 px-8">
              <Link href="/signup">
                <ShieldCheck className="h-5 w-5" />
                Verify My SaaS
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 px-8 bg-transparent">
              <Link href="/verified">
                View Verified SaaS
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
              <Building2 className="h-6 w-6 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Verified Companies</div>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground">$50M+</div>
            <div className="text-sm text-muted-foreground mt-1">ARR Verified</div>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground">1,200+</div>
            <div className="text-sm text-muted-foreground mt-1">Active Investors</div>
          </div>
        </div>
      </div>
    </section>
  )
}
