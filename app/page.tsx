"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { TrustBadgePreview } from "@/components/landing/trust-badge-preview"
import { PricingPreview } from "@/components/landing/pricing-preview"
import { FAQSection } from "@/components/landing/faq-section"
import { AuthProvider } from "@/lib/auth-context"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">
          <HeroSection />
          <ProblemSection />
          <HowItWorksSection />
          <TrustBadgePreview />
          <PricingPreview />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
