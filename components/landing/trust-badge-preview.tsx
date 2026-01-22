import { Card, CardContent } from "@/components/ui/card"
import { TrustBadge } from "@/components/trust-badge"
import { ShieldCheck, Clock, Code } from "lucide-react"

export function TrustBadgePreview() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            Trust Badge
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Show the world you&apos;re verified
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Embed your verification badge anywhere. Build credibility instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Badge Preview */}
                <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-muted/30">
                  <div className="mb-8 p-8 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground mb-2">CloudMetrics Pro</div>
                      <div className="text-sm text-muted-foreground mb-4">Analytics Platform</div>
                      <TrustBadge status="verified" expiresAt={new Date("2025-03-01")} size="lg" showExpiry />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Your badge as it appears on your profile
                  </p>
                </div>

                {/* Features */}
                <div className="p-8 md:p-12 bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Badge Features</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                        <ShieldCheck className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Revenue Verified Status</div>
                        <div className="text-sm text-muted-foreground">Shows your metrics are independently verified</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                        <Clock className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Auto-Expiry Countdown</div>
                        <div className="text-sm text-muted-foreground">30-90 day validity with renewal reminders</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Code className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Embeddable Code</div>
                        <div className="text-sm text-muted-foreground">One-line embed for websites and pitch decks</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
