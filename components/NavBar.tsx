'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, LogOut } from 'lucide-react';
import { logout } from '@/app/actions/auth';

interface NavBarProps {
  userName: string;
  isAdmin: boolean;
  role?: 'employee' | 'accounting';
}

export default function NavBar({ userName, isAdmin, role }: NavBarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/reisen', label: 'Reisen' },
    { href: '/barauslagen', label: 'Barauslagen' },
    { href: '/buchhaltung', label: 'Buchhaltung' },
  ];

  if (role === 'accounting' || isAdmin) {
    navItems.push({ href: '/kunden', label: 'Kunden' });
    navItems.push({ href: '/laender', label: 'Länder' });
  }

  if (isAdmin) {
    navItems.push({ href: '/admin/benutzer', label: 'Benutzerverwaltung' });
  }

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
        <span>{userName}</span>
        <form action={logout} style={{ display: 'inline' }}>
          <button
            type="submit"
            className="btn-toolbar"
            title="Abmelden"
            style={{ padding: '4px 8px', marginLeft: '8px' }}
          >
            <LogOut size={16} />
          </button>
        </form>
      </div>
    </nav>
  );
}
