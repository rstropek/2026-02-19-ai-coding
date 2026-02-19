import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

export const metadata: Metadata = {
  title: 'Reisekostenabrechnung',
  description: 'Reisekostenabrechnung für Mitarbeiter:innen',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  
  return (
    <html lang="de">
      <body>
        <div className="app-layout">
          {session.userId && (
            <NavBar 
              userName={session.userName || 'Benutzer:in'} 
              isAdmin={session.isAdmin || false}
              role={session.role}
            />
          )}
          <main className="app-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
