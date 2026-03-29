const categories = [
  {
    label: "Legal AI & LegalTech Books",
    url: "https://www.amazon.com/s?k=legal+technology+AI+law+books&tag=legaltechhub-20",
    icon: "⚖️",
  },
  {
    label: "Contract & Business Law",
    url: "https://www.amazon.com/s?k=contract+law+business+legal+guides&tag=legaltechhub-20",
    icon: "📋",
  },
  {
    label: "Home Office Essentials",
    url: "https://www.amazon.com/s?k=home+office+attorney+desk+essentials&tag=legaltechhub-20",
    icon: "🖥️",
  },
];

export default function SidebarAmazon() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Shop on Amazon</p>
            <p className="text-white/80 text-xs">Legal AI &amp; law books</p>
          </div>
        </div>
      </div>

      {/* Category links */}
      <div className="p-4 space-y-2">
        {categories.map((cat) => (
          <a
            key={cat.label}
            href={cat.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 w-full rounded-xl bg-white border border-blue-100 px-4 py-3 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="flex-1">{cat.label}</span>
            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}

        <a
          href="https://www.amazon.com/?tag=legaltechhub-20"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors mt-3"
        >
          Browse Amazon →
        </a>
      </div>

      <p className="px-4 pb-3 text-center text-xs text-gray-400">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
    </div>
  );
}
