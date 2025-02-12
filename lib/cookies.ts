'use client'

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`
}

export const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}
