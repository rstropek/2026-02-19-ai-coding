'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { getUserByUsername } from '@/lib/users';

export async function login(prevState: { error: string } | null, formData: FormData) {
  const username = formData.get('username') as string;

  if (!username || username.trim() === '') {
    return { error: 'Benutzername ist erforderlich' };
  }

  const user = getUserByUsername(username.trim());

  if (!user) {
    return { error: 'Benutzer nicht gefunden' };
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.userId = user.id;
  session.userName = user.name;
  session.role = user.role;
  session.isAdmin = user.is_admin === 1;
  await session.save();

  redirect('/');
}

export async function logout() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
  redirect('/login');
}
