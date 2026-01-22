"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ShieldCheck, Clock, AlertCircle } from "lucide-react"

interface TrustBadgeProps {
  status: "verified" | "pending" | "expired"
  expiresAt?: Date
  size?: "sm" | "md" | "lg"
  showExpiry?: boolean
  className?: string
}

export function TrustBadge({
  status,
  expiresAt,
  size = "md",
  showExpiry = false,
  className,
}: TrustBadgeProps) {
  const getDaysUntilExpiry = () => {
    if (!expiresAt) return null
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const daysLeft = getDaysUntilExpiry()

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  if (status === "verified") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Badge
          className={cn(
            "bg-success text-success-foreground hover:bg-success/90 gap-1.5",
            sizeClasses[size]
          )}
        >
          <ShieldCheck className={iconSizes[size]} />
          Revenue Verified
        </Badge>
        {showExpiry && daysLeft !== null && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {daysLeft > 0 ? `${daysLeft} days left` : "Expires today"}
          </span>
        )}
      </div>
    )
  }

  if (status === "pending") {
    return (
      <Badge
        className={cn(
          "bg-warning text-warning-foreground hover:bg-warning/90 gap-1.5",
          sizeClasses[size],
          className
        )}
      >
        <Clock className={iconSizes[size]} />
        Verification Pending
      </Badge>
    )
  }

  return (
    <Badge
      variant="destructive"
      className={cn("gap-1.5", sizeClasses[size], className)}
    >
      <AlertCircle className={iconSizes[size]} />
      Verification Expired
    </Badge>
  )
}

export function TrustBadgeEmbed({ companyName }: { companyName: string }) {
  const embedCode = `<a href="https://verifysaas.com/verified/${companyName.toLowerCase().replace(/\s+/g, "-")}" target="_blank" rel="noopener">
  <img src="https://verifysaas.com/badge/${companyName.toLowerCase().replace(/\s+/g, "-")}.svg" alt="Revenue Verified by VerifySaaS" />
</a>`

  return (
    <div className="rounded-lg border border-border bg-muted/50 p-4">
      <p className="text-sm font-medium text-foreground mb-2">Embed Code</p>
      <pre className="text-xs text-muted-foreground bg-background p-3 rounded overflow-x-auto">
        {embedCode}
      </pre>
    </div>
  )
}
