import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string
  description?: string
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  isRange?: boolean
  className?: string
}

export function MetricsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  isRange = true,
  className,
}: MetricsCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {isRange && (
            <Lock className="h-3 w-3 text-muted-foreground" aria-label="Range-based data" />
          )}
        </div>
        {(description || trendValue) && (
          <div className="flex items-center gap-2 mt-1">
            {trendValue && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {trend === "up" && "+"}
                {trendValue}
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
