'use client'

import {
  BarChart2,
  GraduationCapIcon,
  LayoutDashboardIcon,
  MessageSquare,
  SearchIcon,
  Settings,
  TrophyIcon,
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
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import ThemeToggle from './ui/theme-toggle'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: SearchIcon,
  },
  {
    title: 'Forum',
    url: '/forum',
    icon: MessageSquare,
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
  const { state } = useSidebar()

  const currentPath = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={`flex gap-2 items-center justify-between ${
            state === 'collapsed' ? 'flex-col' : 'flex-row'
          }`}
        >
          <a href="/" className="text-lg">
            <div className="flex justify-between items-center gap-2">
              <GraduationCapIcon />
              <span className={`${state === 'collapsed' ? 'hidden' : 'block'}`}>
                Study With Us
              </span>
            </div>
          </a>
          <ThemeToggle />
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
