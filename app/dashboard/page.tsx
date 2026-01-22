"use client"

import { useAuth } from "@/lib/auth-context"
import { FounderDashboard } from "@/components/dashboard/founder-dashboard"
import { InvestorDashboard } from "@/components/dashboard/investor-dashboard"
import { AcquirerDashboard } from "@/components/dashboard/acquirer-dashboard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  switch (user.role) {
    case "founder":
      return <FounderDashboard />
    case "investor":
      return <InvestorDashboard />
    case "acquirer":
      return <AcquirerDashboard />
    default:
      return <FounderDashboard />
  }
}
