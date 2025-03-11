'use client'

import {
  BarChart2,
  BookIcon,
  BookKey,
  ClipboardList,
  FileCheck,
  FileText,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MessageSquare,
  SearchIcon,
  Settings,
  TrophyIcon,
  UserCheck,
  Users,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import ThemeToggle from './ui/theme-toggle'

const adminItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboardIcon },
  { title: 'User Management', url: '/admin/users', icon: Users },
  { title: 'Courses Management', url: '/admin/courses', icon: BookKey },
  // { title: 'Reports', url: '/admin/reports', icon: FileText },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart2 },
  { title: 'Settings', url: '/profile', icon: Settings },
]

const studentItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
  { title: 'Explore', url: '/explore', icon: SearchIcon },
  { title: 'Courses', url: '/courses', icon: BookKey },
  { title: 'Leaderboard', url: '/leaderboard', icon: TrophyIcon },
  // { title: 'Statistics', url: '/statistics', icon: BarChart2 },
  { title: 'Settings', url: '/profile', icon: Settings },
]

const teacherItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
  { title: 'Explore', url: '/explore', icon: SearchIcon },
  { title: 'Courses', url: '/courses/created', icon: BookIcon },
  { title: 'Course Approvals', url: '/courses/approvals', icon: FileCheck },
  { title: 'Leaderboard', url: '/leaderboard', icon: TrophyIcon },
  // { title: 'Manage Students', url: '/students', icon: UserCheck },
  // { title: 'Analytics', url: '/analytics', icon: BarChart2 },
  { title: 'Settings', url: '/profile', icon: Settings },
]

interface SidebarItem {
  title: string
  url: string
  icon: React.ElementType
}

function RoleBasedSidebar({ items }: { items: SidebarItem[] }) {
  const { state } = useSidebar()
  const currentPath = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className="group flex gap-2 items-center justify-between"
          data-collapsible={state}
        >
          <Link href="/" className="text-lg font-semibold">
            <div className="flex justify-between items-center gap-2">
              <GraduationCapIcon />
              <span className={cn({ hidden: state === 'collapsed' })}>
                Study With Us
              </span>
            </div>
          </Link>
          <div className={cn({ hidden: state === 'collapsed' })}>
            <ThemeToggle />
          </div>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === currentPath}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function AdminSidebar() {
  return <RoleBasedSidebar items={adminItems} />
}

export function StudentSidebar() {
  return <RoleBasedSidebar items={studentItems} />
}

export function TeacherSidebar() {
  return <RoleBasedSidebar items={teacherItems} />
}
