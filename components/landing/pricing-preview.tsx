import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Rocket, TrendingUp, Building2 } from "lucide-react"

const plans = [
  {
    name: "Founder",
    description: "For SaaS founders who want verified credibility",
    price: "999",
    currency: "₹",
    period: "/month",
    icon: Rocket,
    features: [
      "Revenue verification badge",
      "Connect 1 revenue source",
      "Public profile listing",
      "30-day badge validity",
      "Email support",
    ],
    cta: "Start Verification",
    href: "/signup?plan=founder",
    popular: false,
  },
  {
    name: "Investor",
    description: "For angels & VCs doing due diligence",
    price: "25,000",
    currency: "₹",
    period: "/year",
    icon: TrendingUp,
    features: [
      "Search verified SaaS database",
      "Filter by revenue & growth",
      "View verification reports",
      "Watchlist & alerts",
      "Priority support",
    ],
    cta: "Get Access",
    href: "/signup?plan=investor",
    popular: true,
  },
  {
    name: "Acquirer",
    description: "For buyers needing detailed verification",
    price: "Custom",
    currency: "",
    period: "",
    icon: Building2,
    features: [
      "Detailed verification reports",
      "Historical data access",
      "Custom due diligence",
      "Direct founder intros",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    href: "/signup?plan=acquirer",
    popular: false,
  },
]

export function PricingPreview() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative border-border bg-card ${plan.popular ? "ring-2 ring-accent" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <plan.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm text-muted-foreground">{plan.currency}</span>
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/pricing" className="text-sm text-accent hover:underline">
            View full pricing details →
          </Link>
        </div>
      </div>
    </section>
  )
}
