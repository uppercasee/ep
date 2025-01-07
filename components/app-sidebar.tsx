'use client'

import {
  BarChart2,
  Book,
  LayoutDashboardIcon,
  Settings,
  TrophyIcon,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ui/theme-toggle'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Courses',
    url: '/courses/explore',
    icon: Book,
  },
  {
    title: 'Leaderboard',
    url: '/leaderboard',
    icon: TrophyIcon,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart2,
  },
  {
    title: 'Settings',
    url: '/profile',
    icon: Settings,
  },
]

export function AppSidebar() {
  const currentPath = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <a href="/" className="text-lg mr-auto">
            Study With Us
          </a>
          <ThemeToggle />
        </div>
      </SidebarHeader>
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
