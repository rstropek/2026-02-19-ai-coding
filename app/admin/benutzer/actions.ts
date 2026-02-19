'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createUser, updateUser, deleteUser, type UserRole } from '@/lib/users';

const userSchema = z.object({
  username: z.string().min(1, 'Benutzername ist erforderlich'),
  name: z.string().min(1, 'Name ist erforderlich'),
  role: z.enum(['employee', 'accounting'], {
    message: 'Ungültige Rolle',
  }),
  is_admin: z.boolean(),
});

export async function createUserAction(formData: FormData) {
  const data = {
    username: formData.get('username') as string,
    name: formData.get('name') as string,
    role: formData.get('role') as UserRole,
    is_admin: formData.get('is_admin') === 'on',
  };

  const result = userSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    createUser(result.data);
    revalidatePath('/admin/benutzer');
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return { error: 'Benutzername existiert bereits' };
    }
    return { error: 'Fehler beim Erstellen des Benutzers' };
  }
}

export async function updateUserAction(formData: FormData) {
  const data = {
    id: parseInt(formData.get('id') as string),
    username: formData.get('username') as string,
    name: formData.get('name') as string,
    role: formData.get('role') as UserRole,
    is_admin: formData.get('is_admin') === 'on',
  };

  const result = userSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    updateUser({ ...result.data, id: data.id });
    revalidatePath('/admin/benutzer');
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return { error: 'Benutzername existiert bereits' };
    }
    return { error: 'Fehler beim Aktualisieren des Benutzers' };
  }
}

export async function deleteUserAction(userId: number) {
  try {
    deleteUser(userId);
    revalidatePath('/admin/benutzer');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Löschen des Benutzers' };
  }
}
