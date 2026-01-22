import { Link2, ShieldCheck, BadgeCheck } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Link2,
    title: "Connect Your Revenue Source",
    description: "Securely connect your Stripe account with read-only access. We never store raw financial data.",
  },
  {
    step: "02",
    icon: ShieldCheck,
    title: "Automated Verification",
    description: "Our system verifies your MRR, ARR, growth rate, and churn. All data is displayed as ranges only.",
  },
  {
    step: "03",
    icon: BadgeCheck,
    title: "Get Your Trust Badge",
    description: "Receive a verified badge with auto-expiry. Share it on your website, social profiles, and pitch decks.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Verification in 3 simple steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get verified in minutes. Privacy-first, opt-in only.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <div key={item.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-border">
                    <item.icon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
