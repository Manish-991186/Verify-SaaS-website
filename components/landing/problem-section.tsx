import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ImageOff, TrendingDown, ShieldOff } from "lucide-react"

const problems = [
  {
    icon: ImageOff,
    title: "Fake Revenue Screenshots",
    description: "Anyone can edit a Stripe dashboard screenshot in 2 minutes. Screenshots are not proof.",
  },
  {
    icon: TrendingDown,
    title: "Inflated Growth Claims",
    description: "Social media is full of 'hitting $100K MRR' posts with zero verification.",
  },
  {
    icon: ShieldOff,
    title: "No Trust Standard",
    description: "There's no industry standard for verifying SaaS revenue claims before investing or acquiring.",
  },
]

export function ProblemSection() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
            <AlertTriangle className="h-4 w-4" />
            The Problem
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Fake MRR claims are everywhere
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The SaaS ecosystem has a trust problem. Revenue screenshots are worthless, 
            and there&apos;s no way to verify claims before making critical decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {problems.map((problem) => (
            <Card key={problem.title} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 mb-4">
                  <problem.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
