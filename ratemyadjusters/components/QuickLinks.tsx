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
    <div className="bg-white rounded-2xl p-6 mt-8 border border-[#EEEEEE]">
      <h3 className="font-semibold text-[#0A3D62] mb-4">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl border border-[#EEEEEE] hover:border-[#0A3D62]/30 hover:shadow-sm transition-all group"
          >
            <div>
              <div className="font-medium text-[#333333] group-hover:text-[#0A3D62]">{link.label}</div>
              {link.description && (
                <div className="text-sm text-[#666666]">{link.description}</div>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-[#666666] group-hover:text-[#0A3D62]" />
          </Link>
        ))}
      </div>
    </div>
  )
}
