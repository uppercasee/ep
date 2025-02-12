import { get_number } from '@/features/user_profile/actions/get_number'
import { set_number } from '@/features/user_profile/actions/set_number'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const useProfilePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Fetch the current phone number when the component mounts
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      setLoading(true)
      try {
        const number = await get_number()
        setPhoneNumber(String(number))
      } catch (error) {
        toast.error('Error fetching phone number')
      } finally {
        setLoading(false)
      }
    }

    fetchPhoneNumber()
  }, [])

  // Function to update the phone number
  const updatePhoneNumber = async (newPhoneNumber: string) => {
    setLoading(true)
    try {
      const success = await set_number(newPhoneNumber)
      if (success) {
        setPhoneNumber(newPhoneNumber)
        toast.success('Phone number updated successfully')
      } else {
        toast.error('Failed to update phone number')
      }
    } catch (error) {
      toast.error('Error updating phone number')
    } finally {
      setLoading(false)
    }
  }

  return {
    phoneNumber,
    loading,
    updatePhoneNumber,
  }
}
