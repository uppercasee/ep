import type React from 'react'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex items-center justify-center">{children}</div>
}
