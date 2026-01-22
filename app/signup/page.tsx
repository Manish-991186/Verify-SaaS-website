"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import type { UserRole } from "@/lib/types"
import { Eye, EyeOff, Loader2, Rocket, TrendingUp, Building2 } from "lucide-react"
import { Suspense } from "react"
import Loading from "./loading"

const roles = [
  {
    value: "founder",
    label: "Founder",
    description: "I want to verify my SaaS revenue",
    icon: Rocket,
  },
  {
    value: "investor",
    label: "Investor",
    description: "I want to discover verified SaaS",
    icon: TrendingUp,
  },
  {
    value: "acquirer",
    label: "Acquirer",
    description: "I want detailed verification reports",
    icon: Building2,
  },
]

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signup } = useAuth()
  
  const planParam = searchParams.get("plan")
  const initialRole = (planParam === "investor" || planParam === "acquirer" || planParam === "founder") 
    ? planParam 
    : "founder"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>(initialRole)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    try {
      const success = await signup(email, password, name, role)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">VS</span>
            </div>
            <span className="text-2xl font-bold text-foreground">VerifySaaS</span>
          </Link>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-foreground">Create an account</CardTitle>
            <CardDescription className="text-center">
              Get started with VerifySaaS today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                  {error}
                </div>
              )}
              
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>I am a...</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="grid grid-cols-3 gap-3">
                  {roles.map((r) => (
                    <div key={r.value}>
                      <RadioGroupItem value={r.value} id={r.value} className="peer sr-only" />
                      <Label
                        htmlFor={r.value}
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-card p-3 hover:bg-accent/5 hover:border-accent/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 cursor-pointer transition-all"
                      >
                        <r.icon className="h-5 w-5 mb-2 text-muted-foreground peer-data-[state=checked]:text-accent" />
                        <span className="text-xs font-medium text-foreground">{r.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <p className="text-xs text-muted-foreground text-center">
                  {roles.find((r) => r.value === role)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-accent hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <SignupForm />
      </Suspense>
    </AuthProvider>
  )
}
