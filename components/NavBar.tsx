'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

const navItems = [
  { href: '/reisen', label: 'Reisen' },
  { href: '/barauslagen', label: 'Barauslagen' },
  { href: '/buchhaltung', label: 'Buchhaltung' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="nav-bar">
      <span className="nav-brand">Reisekosten</span>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item${pathname.startsWith(item.href) ? ' active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
      <span className="nav-spacer" />
      <div className="nav-user">
        <User size={16} />
        <span>Benutzer:in</span>
      </div>
    </nav>
  );
}
