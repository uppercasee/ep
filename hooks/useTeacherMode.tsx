'use client'

import { getUserRole, toggleUserRole } from '@/server/actions/userActions'
import { useEffect, useState } from 'react'

export const useTeacherMode = () => {
  const [teachersMode, setTeachersMode] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true)
      try {
        const role = await getUserRole()
        setTeachersMode(role === 'teacher')
      } catch (error) {
        console.error('Failed to fetch user role:', error)
      } finally {
        setLoading(false)
      }
    }

    if (teachersMode === null) {
      fetchRole()
    }
  }, [teachersMode])

  const toggleTeacherMode = async () => {
    if (teachersMode === null) return

    const previousState = teachersMode
    const newMode = !teachersMode
    setTeachersMode(newMode)

    try {
      const result = await toggleUserRole()
      if (result !== 'success') {
        setTeachersMode(previousState)
      }
    } catch (error) {
      console.error('Error toggling role:', error)
      setTeachersMode(previousState)
    }
  }

  return {
    teachersMode,
    loading,
    toggleTeacherMode,
  }
}
