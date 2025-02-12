import { get_fullname } from '@/features/user_profile/actions/full_name'
import { set_fullname } from '@/features/user_profile/actions/full_name'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const useProfileFullName = () => {
  const [fullName, setFullName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Fetch the current full name when the component mounts
  useEffect(() => {
    const fetchFullName = async () => {
      setLoading(true)
      try {
        const name = await get_fullname()
        setFullName(name)
      } catch (error) {
        toast.error('Error fetching full name')
      } finally {
        setLoading(false)
      }
    }

    fetchFullName()
  }, [])

  // Function to update the full name
  const updateFullName = async (newFullName: string) => {
    setLoading(true)
    try {
      const success = await set_fullname(newFullName)
      if (success) {
        setFullName(newFullName)
        toast.success('Full name updated successfully')
      } else {
        toast.error('Failed to update full name')
      }
    } catch (error) {
      toast.error('Error updating full name')
    } finally {
      setLoading(false)
    }
  }

  return {
    fullName,
    loading,
    updateFullName,
  }
}
