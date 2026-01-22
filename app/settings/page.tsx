"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { 
  User, 
  Shield, 
  Link2, 
  Bell, 
  Trash2, 
  AlertTriangle,
  Check,
  Loader2,
  ExternalLink,
  Lock
} from "lucide-react"

function SettingsContent() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [verificationReminders, setVerificationReminders] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Data permissions
  const [shareProfile, setShareProfile] = useState(true)
  const [showInDirectory, setShowInDirectory] = useState(true)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  const handleDisconnect = () => {
    setDisconnecting(true)
    setTimeout(() => {
      setDisconnecting(false)
      alert("Revenue source disconnected (mock)")
    }, 1500)
  }

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">{user?.role}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {user?.role === "founder" && "Verify and showcase your SaaS revenue"}
                    {user?.role === "investor" && "Discover and research verified SaaS"}
                    {user?.role === "acquirer" && "Request detailed verification reports"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Access Permissions */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" />
                Data Access Permissions
              </CardTitle>
              <CardDescription>Control how your data is shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow your verified profile to be visible to investors and acquirers
                  </p>
                </div>
                <Switch checked={shareProfile} onCheckedChange={setShareProfile} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Directory Listing</Label>
                  <p className="text-sm text-muted-foreground">
                    Show your company in the verified SaaS directory
                  </p>
                </div>
                <Switch checked={showInDirectory} onCheckedChange={setShowInDirectory} />
              </div>
            </CardContent>
          </Card>

          {/* Connected Revenue Sources */}
          {user?.role === "founder" && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-accent" />
                  Connected Revenue Sources
                </CardTitle>
                <CardDescription>Manage your connected payment processors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#635BFF]/10">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635BFF"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Stripe</p>
                      <p className="text-sm text-muted-foreground">Connected • Read-only access</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDisconnect}
                      disabled={disconnecting}
                    >
                      {disconnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Disconnect"}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Disconnecting will remove your verification status. You can reconnect at any time.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates about your account
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verification Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified before your verification expires
                  </p>
                </div>
                <Switch checked={verificationReminders} onCheckedChange={setVerificationReminders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive news, tips, and product updates
                  </p>
                </div>
                <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </CardContent>
          </Card>

          {/* Security & Privacy */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Security & Privacy
              </CardTitle>
              <CardDescription>Manage your security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Download Your Data</p>
                  <p className="text-sm text-muted-foreground">Get a copy of your VerifySaaS data</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <div>
                  <p className="font-medium text-foreground">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            {saved && (
              <span className="text-sm text-success flex items-center gap-1">
                <Check className="h-4 w-4" />
                Settings saved
              </span>
            )}
            <Button onClick={handleSave} disabled={saving} className="min-w-[100px]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AuthProvider>
      <SettingsContent />
    </AuthProvider>
  )
}
