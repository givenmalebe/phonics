"use client"

import type * as React from "react"
import { BookOpen, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, Users, Award, BarChart3, TrendingUp } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Dr. Sarah Johnson",
    email: "sarah@phonographix.edu",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "Phono-Graphix Academy",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Organization",
      url: "/organization",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Learner Management",
      url: "/learners",
      icon: Users,
      items: [
        {
          title: "All Learners",
          url: "/learners",
        },
        {
          title: "Enroll New Learner",
          url: "/learners/enroll",
        },
        {
          title: "Progress Reports",
          url: "/learners/reports",
        },
      ],
    },
    {
      title: "Lessons",
      url: "/lessons",
      icon: BookOpen,
      items: [
        {
          title: "Pink Level",
          url: "/lessons/pink",
        },
        {
          title: "Blue Level",
          url: "/lessons/blue",
        },
        {
          title: "Yellow Level",
          url: "/lessons/yellow",
        },
        {
          title: "Purple Level",
          url: "/lessons/purple",
        },
      ],
    },
    {
      title: "Performance Tracking",
      url: "/performance",
      icon: TrendingUp,
      items: [
        {
          title: "Overview",
          url: "/performance",
        },
        {
          title: "Tutor Analytics",
          url: "/performance#tutors",
        },
        {
          title: "Learner Outcomes",
          url: "/performance#learners",
        },
        {
          title: "Advanced Analytics",
          url: "/performance#analytics",
        },
      ],
    },
    {
      title: "Tutor Tools",
      url: "/tutors",
      icon: Award,
      items: [
        {
          title: "Tutor Management",
          url: "/tutors",
        },
        {
          title: "Resource Library",
          url: "/tutors/resources",
        },
        {
          title: "Lesson Planning",
          url: "/tutors/planning",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Current Cohort 2024",
      url: "/cohorts/2024",
      icon: Frame,
    },
    {
      name: "Summer Program",
      url: "/programs/summer",
      icon: PieChart,
    },
    {
      name: "Assessment Tools",
      url: "/assessments",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
