"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  Users,
  BookOpen,
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  UserPlus,
  FileText,
  BarChart3,
  Calendar
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Organization {
  id: string
  name: string
  type: string
  plan: string
  description?: string
  memberCount?: number
  createdAt?: string
}

interface OrganizationContent {
  id: string
  title: string
  type: "lesson" | "assessment" | "resource"
  level: string
  createdBy: string
  createdAt: string
  status: "draft" | "published" | "archived"
}

export default function OrganizationPage() {
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null)
  const [orgContent, setOrgContent] = useState<OrganizationContent[]>([])
  const [showAddContentDialog, setShowAddContentDialog] = useState(false)
  const [showEditOrgDialog, setShowEditOrgDialog] = useState(false)
  const [newContent, setNewContent] = useState({
    title: "",
    type: "lesson" as "lesson" | "assessment" | "resource",
    level: "",
    description: "",
  })
  const [editOrgData, setEditOrgData] = useState({
    name: "",
    type: "",
    description: "",
    plan: "",
  })

  useEffect(() => {
    // Load active organization from localStorage
    const savedActiveOrg = localStorage.getItem("activeOrganization")
    if (savedActiveOrg) {
      const org = JSON.parse(savedActiveOrg)
      setActiveOrg(org)
      setEditOrgData({
        name: org.name,
        type: org.type,
        description: org.description || "",
        plan: org.plan,
      })
    }

    // Load organization content
    const savedContent = localStorage.getItem(`org-content-${activeOrg?.id}`)
    if (savedContent) {
      setOrgContent(JSON.parse(savedContent))
    }
  }, [activeOrg?.id])

  const handleAddContent = () => {
    if (!newContent.title || !newContent.type || !newContent.level) {
      alert("Please fill in all required fields")
      return
    }

    const content: OrganizationContent = {
      id: `content-${Date.now()}`,
      title: newContent.title,
      type: newContent.type,
      level: newContent.level,
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      status: "draft",
    }

    const updatedContent = [...orgContent, content]
    setOrgContent(updatedContent)
    localStorage.setItem(`org-content-${activeOrg?.id}`, JSON.stringify(updatedContent))

    setShowAddContentDialog(false)
    setNewContent({ title: "", type: "lesson", level: "", description: "" })
  }

  const handleUpdateOrganization = () => {
    if (!activeOrg || !editOrgData.name || !editOrgData.type) {
      alert("Please fill in all required fields")
      return
    }

    const updatedOrg = {
      ...activeOrg,
      name: editOrgData.name,
      type: editOrgData.type,
      description: editOrgData.description,
      plan: editOrgData.plan,
    }

    // Update in organizations list
    const savedOrgs = localStorage.getItem("organizations")
    if (savedOrgs) {
      const orgs = JSON.parse(savedOrgs)
      const updatedOrgs = orgs.map((org: Organization) =>
        org.id === activeOrg.id ? updatedOrg : org
      )
      localStorage.setItem("organizations", JSON.stringify(updatedOrgs))
    }

    // Update active organization
    localStorage.setItem("activeOrganization", JSON.stringify(updatedOrg))
    setActiveOrg(updatedOrg)
    setShowEditOrgDialog(false)
  }

  const deleteContent = (contentId: string) => {
    const updatedContent = orgContent.filter(content => content.id !== contentId)
    setOrgContent(updatedContent)
    localStorage.setItem(`org-content-${activeOrg?.id}`, JSON.stringify(updatedContent))
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return BookOpen
      case "assessment":
        return BarChart3
      case "resource":
        return FileText
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!activeOrg) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-semibold">No Organization Selected</h2>
          <p className="text-muted-foreground">Please select an organization from the sidebar to manage content.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{activeOrg.name}</h2>
          <p className="text-muted-foreground">
            {activeOrg.type} • {activeOrg.plan} plan • {activeOrg.memberCount || 0} members
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowEditOrgDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Organization
          </Button>
          <Button onClick={() => setShowAddContentDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgContent.length}</div>
            <p className="text-xs text-muted-foreground">Lessons, assessments & resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orgContent.filter(c => c.status === "published").length}
            </div>
            <p className="text-xs text-muted-foreground">Live content items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrg.memberCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeOrg.createdAt ? new Date(activeOrg.createdAt).toLocaleDateString() : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Organization founded</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content Library</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Content</CardTitle>
              <CardDescription>
                Manage lessons, assessments, and resources for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orgContent.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold">No content yet</h3>
                  <p className="text-muted-foreground">Start by adding your first lesson or resource.</p>
                  <Button className="mt-4" onClick={() => setShowAddContentDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Content
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orgContent.map((content) => {
                    const IconComponent = getContentTypeIcon(content.type)
                    return (
                      <div key={content.id} className="flex items-center space-x-4 rounded-lg border p-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold">{content.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span className="capitalize">{content.type}</span>
                            <span>•</span>
                            <span>{content.level} Level</span>
                            <span>•</span>
                            <span>Created by {content.createdBy}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(content.status)}>
                            {content.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteContent(content.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Members</CardTitle>
              <CardDescription>Manage users and permissions for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold">Member management coming soon</h3>
                <p className="text-muted-foreground">Invite and manage organization members.</p>
                <Button className="mt-4" disabled>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Configure your organization preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold">Advanced settings coming soon</h3>
                <p className="text-muted-foreground">Configure permissions, integrations, and more.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Content Dialog */}
      <Dialog open={showAddContentDialog} onOpenChange={setShowAddContentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Create new educational content for your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-title">Title *</Label>
              <Input
                id="content-title"
                placeholder="Enter content title"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-type">Content Type *</Label>
              <Select
                value={newContent.type}
                onValueChange={(value: "lesson" | "assessment" | "resource") =>
                  setNewContent({ ...newContent, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lesson">Lesson</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-level">Level *</Label>
              <Select
                value={newContent.level}
                onValueChange={(value) => setNewContent({ ...newContent, level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pink">Pink Level</SelectItem>
                  <SelectItem value="Blue">Blue Level</SelectItem>
                  <SelectItem value="Yellow">Yellow Level</SelectItem>
                  <SelectItem value="Purple">Purple Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-description">Description</Label>
              <Textarea
                id="content-description"
                placeholder="Brief description of the content"
                value={newContent.description}
                onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddContentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContent}>Create Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Organization Dialog */}
      <Dialog open={showEditOrgDialog} onOpenChange={setShowEditOrgDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Update your organization information and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-org-name">Organization Name *</Label>
              <Input
                id="edit-org-name"
                placeholder="Enter organization name"
                value={editOrgData.name}
                onChange={(e) => setEditOrgData({ ...editOrgData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-org-type">Organization Type *</Label>
              <Select
                value={editOrgData.type}
                onValueChange={(value) => setEditOrgData({ ...editOrgData, type: value })}
              >
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
              <Label htmlFor="edit-org-plan">Plan</Label>
              <Select
                value={editOrgData.plan}
                onValueChange={(value) => setEditOrgData({ ...editOrgData, plan: value })}
              >
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
              <Label htmlFor="edit-org-description">Description</Label>
              <Textarea
                id="edit-org-description"
                placeholder="Brief description of your organization"
                value={editOrgData.description}
                onChange={(e) => setEditOrgData({ ...editOrgData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditOrgDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrganization}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
