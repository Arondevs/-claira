'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Posts', href: '/dashboard/posts' },
  { name: 'Calendar', href: '/dashboard/calendar' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Social Accounts', href: '/dashboard/social-accounts' },
  { name: 'Team', href: '/dashboard/team' },
  { name: 'Settings', href: '/dashboard/settings' },
  { name: 'Billing', href: '/dashboard/billing' },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-accentPink text-white p-3 rounded-full shadow-lg lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-end lg:hidden" onClick={() => setOpen(false)}>
          <nav className="w-full bg-white rounded-t-2xl p-6 space-y-4" onClick={e => e.stopPropagation()}>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-lg font-medium ${pathname === item.href ? 'bg-pink-100 text-accentPink' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
} 