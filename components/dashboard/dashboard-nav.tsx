"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { User, LogOut, Settings, ChevronDown, LayoutDashboard, ShieldCheck, Search, FileText } from "lucide-react"

export function DashboardNav() {
  const { user, logout, switchRole } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getNavLinks = () => {
    const baseLinks = [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    ]

    switch (user?.role) {
      case "founder":
        return [
          ...baseLinks,
          { href: "/dashboard/verification", label: "Verification", icon: ShieldCheck },
        ]
      case "investor":
        return [
          ...baseLinks,
          { href: "/dashboard/discover", label: "Discover", icon: Search },
        ]
      case "acquirer":
        return [
          ...baseLinks,
          { href: "/dashboard/reports", label: "Reports", icon: FileText },
        ]
      default:
        return baseLinks
    }
  }

  const navLinks = getNavLinks()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case "founder":
        return "bg-accent/10 text-accent"
      case "investor":
        return "bg-success/10 text-success"
      case "acquirer":
        return "bg-warning/10 text-warning"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">VS</span>
            </div>
            <span className="text-xl font-bold text-foreground">VerifySaaS</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className={cn("text-xs font-medium px-2 py-1 rounded-full capitalize", getRoleBadgeColor())}>
              {user.role}
            </span>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline max-w-[100px] truncate">{user?.name || "User"}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role (Demo)</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => switchRole("founder")} className={user?.role === "founder" ? "bg-accent/10" : ""}>
                Founder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole("investor")} className={user?.role === "investor" ? "bg-accent/10" : ""}>
                Investor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole("acquirer")} className={user?.role === "acquirer" ? "bg-accent/10" : ""}>
                Acquirer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
