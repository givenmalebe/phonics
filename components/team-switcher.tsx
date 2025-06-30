"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Building, Users, BookOpen, Settings } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

interface Organization {
  id: string
  name: string
  logo: React.ElementType
  plan: string
  type: string
  description?: string
  memberCount?: number
  createdAt?: string
}

export function TeamSwitcher({
  teams: initialTeams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [teams, setTeams] = React.useState<Organization[]>([])
  const [activeTeam, setActiveTeam] = React.useState<Organization | null>(null)
  const [showAddDialog, setShowAddDialog] = React.useState(false)
  const [newOrg, setNewOrg] = React.useState({
    name: "",
    type: "",
    description: "",
    plan: "free",
  })

  // Load organizations from localStorage on mount
  React.useEffect(() => {
    const savedOrgs = localStorage.getItem("organizations")
    if (savedOrgs) {
      const parsedOrgs = JSON.parse(savedOrgs).map((org: any) => ({
        ...org,
        logo: getOrgIcon(org.type) // Ensure logo is a proper React component
      }))
      setTeams(parsedOrgs)
      if (parsedOrgs.length > 0) {
        setActiveTeam(parsedOrgs[0])
      }
    } else {
      // Initialize with default organization from props
      const defaultOrgs = initialTeams.map((team, index) => ({
        id: `org-${index}`,
        name: team.name,
        logo: team.logo,
        plan: team.plan,
        type: "school",
        memberCount: 25,
        createdAt: new Date().toISOString(),
      }))
      setTeams(defaultOrgs)
      if (defaultOrgs.length > 0) {
        setActiveTeam(defaultOrgs[0])
      }
    }
  }, [])

  // Save organizations to localStorage whenever teams change
  React.useEffect(() => {
    localStorage.setItem("organizations", JSON.stringify(teams))
  }, [teams])

  const getOrgIcon = (type: string) => {
    switch (type) {
      case "school":
        return Building
      case "tutoring":
        return Users
      case "homeschool":
        return BookOpen
      default:
        return Building
    }
  }

  const handleAddOrganization = () => {
    if (!newOrg.name || !newOrg.type) {
      alert("Please fill in all required fields")
      return
    }

    const newOrgData: Organization = {
      id: `org-${Date.now()}`,
      name: newOrg.name,
      logo: getOrgIcon(newOrg.type),
      plan: newOrg.plan,
      type: newOrg.type,
      description: newOrg.description,
      memberCount: 0,
      createdAt: new Date().toISOString(),
    }

    setTeams([...teams, newOrgData])
    setActiveTeam(newOrgData)
    setShowAddDialog(false)
    setNewOrg({ name: "", type: "", description: "", plan: "free" })
  }

  const handleSwitchTeam = (team: Organization) => {
    setActiveTeam(team)
    // Store the active organization in localStorage for persistence
    localStorage.setItem("activeOrganization", JSON.stringify(team))
  }

  // Show loading state if no active team
  if (!activeTeam) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Building className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Loading...</span>
              <span className="truncate text-xs">Please wait</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <>
      {/* Add Organization Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Organization</DialogTitle>
            <DialogDescription>
              Create a new organization to manage learners, tutors, and content.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Organization Name *</Label>
              <Input
                id="org-name"
                placeholder="Enter organization name"
                value={newOrg.name}
                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-type">Organization Type *</Label>
              <Select value={newOrg.type} onValueChange={(value) => setNewOrg({ ...newOrg, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="tutoring">Tutoring Center</SelectItem>
                  <SelectItem value="homeschool">Homeschool</SelectItem>
                  <SelectItem value="clinic">Learning Clinic</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-plan">Plan</Label>
              <Select value={newOrg.plan} onValueChange={(value) => setNewOrg({ ...newOrg, plan: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-description">Description</Label>
              <Textarea
                id="org-description"
                placeholder="Brief description of your organization"
                value={newOrg.description}
                onChange={(e) => setNewOrg({ ...newOrg, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddOrganization}>Create Organization</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {React.createElement(activeTeam.logo, { className: "size-4" })}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{activeTeam.name}</span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">Organizations</DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem key={team.id} onClick={() => handleSwitchTeam(team)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {React.createElement(team.logo, { className: "size-4 shrink-0" })}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{team.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{team.type} • {team.plan}</span>
                  </div>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={() => setShowAddDialog(true)}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add organization</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
