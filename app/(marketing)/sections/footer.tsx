'use client'

const links = [
  { link: '/about', label: 'About Us' },
  { link: '/terms', label: 'Terms of Service' },
  { link: '/privacy', label: 'Privacy Policy' },
  { link: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <div className="bg-gray-900 text-white py-8 flex">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Study With Us</p>
        </div>

        {/* Links Section */}
        <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
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
    </div>
  )
}
