"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does the verification process work?",
    answer: "You connect your Stripe account with read-only access. Our system automatically verifies your MRR, ARR, growth rate, and churn. All data is displayed as ranges only — we never show exact figures to protect your privacy.",
  },
  {
    question: "Is my financial data secure?",
    answer: "Absolutely. We use read-only OAuth connections and never store your raw financial data. All metrics are converted to ranges immediately, and we're SOC 2 compliant. You can disconnect your revenue source at any time.",
  },
  {
    question: "Why do you show ranges instead of exact numbers?",
    answer: "Privacy-first design. Exact revenue figures can be sensitive for competitive reasons. Ranges provide enough information for investors and acquirers to make decisions while protecting your business details.",
  },
  {
    question: "How long is my verification valid?",
    answer: "Verification badges are valid for 30-90 days depending on your plan. You'll receive reminders before expiry, and renewal is automatic if your revenue source stays connected.",
  },
  {
    question: "Can I use the badge on my website?",
    answer: "Yes! You'll receive an embeddable code snippet that you can add to your website, pitch deck, or social media profiles. The badge links back to your verified profile on VerifySaaS.",
  },
  {
    question: "What if I don't use Stripe?",
    answer: "We currently support Stripe as our primary revenue source. Support for other payment processors like Paddle, Chargebee, and direct bank connections is coming soon.",
  },
]

export function FAQSection() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about VerifySaaS.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
