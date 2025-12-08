import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface QuickLink {
  label: string
  href: string
  description?: string
}

interface QuickLinksProps {
  title?: string
  links: QuickLink[]
}

export default function QuickLinks({ title = 'Explore More', links }: QuickLinksProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-8">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div>
              <div className="font-medium text-gray-900 group-hover:text-blue-600">{link.label}</div>
              {link.description && (
                <div className="text-sm text-gray-500">{link.description}</div>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </Link>
        ))}
      </div>
    </div>
  )
}
