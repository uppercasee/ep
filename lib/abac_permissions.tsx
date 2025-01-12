'use client'

import type { Course } from '@/drizzle/db'
import { type ReactElement, useEffect, useState } from 'react'
import { hasPermission } from './abac'

export type Permissions = {
  courses: {
    dataType: Course
    action: 'create' | 'edit' | 'delete'
  }
}

type PermissionProps<Resource extends keyof Permissions> = {
  userId: string
  resource: Resource
  action: Permissions[Resource]['action']
  dataId?: string
  children: ReactElement
}

export function Permission<Resource extends keyof Permissions>({
  userId,
  resource,
  action,
  dataId,
  children,
}: PermissionProps<Resource>) {
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    async function checkPermission() {
      const allowed = await hasPermission(userId, resource, action, dataId)
      setIsAllowed(allowed)
    }
    checkPermission()
  }, [userId, resource, action, dataId])

  return isAllowed ? <>{children}</> : null
}
