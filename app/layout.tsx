import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Reisekostenabrechnung',
  description: 'Reisekostenabrechnung für Mitarbeiter:innen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <div className="app-layout">
          <NavBar />
          <main className="app-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
