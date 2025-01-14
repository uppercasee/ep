'use client'

import { GraduationCapIcon } from 'lucide-react'

const links = [
  { link: '/about', label: 'About Us' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/terms', label: 'Terms of Service' },
  { link: '/privacy', label: 'Privacy Policy' },
  { link: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <div className="bg-gray-900 text-white py-4 flex justify-between items-center flex-col md:flex-row px-14">
      <div className="text-center mb-4 flex gap-2 items-center justify-center">
        <GraduationCapIcon />
        <p className="text-lg font-semibold">Study With Us</p>
      </div>

      {/* Links Section */}
      <ul className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 pr-14">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.link}
              className="text-sm text-gray-400 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
