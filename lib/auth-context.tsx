"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { User, UserRole } from "./types"
import { mockUsers } from "./mock-data"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock login - find user by email or create demo user
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setUser(existingUser)
      return true
    }
    // Create a demo founder user for any email
    const demoUser: User = {
      id: "demo-" + Date.now(),
      email,
      name: email.split("@")[0],
      role: "founder",
      createdAt: new Date(),
    }
    setUser(demoUser)
    return true
  }, [])

  const signup = useCallback(
    async (email: string, _password: string, name: string, role: UserRole): Promise<boolean> => {
      const newUser: User = {
        id: "user-" + Date.now(),
        email,
        name,
        role,
        createdAt: new Date(),
      }
      setUser(newUser)
      return true
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const switchRole = useCallback((role: UserRole) => {
    setUser((prev) => (prev ? { ...prev, role } : null))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
