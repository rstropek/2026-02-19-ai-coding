'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createCountry, updateCountry, deleteCountry } from '@/lib/countries';

const countrySchema = z.object({
  code: z.string().min(2, 'Ländercode ist erforderlich').max(2, 'Ländercode muss 2 Zeichen haben'),
  name: z.string().min(1, 'Ländername ist erforderlich'),
});

export async function createCountryAction(formData: FormData) {
  const data = {
    code: formData.get('code') as string,
    name: formData.get('name') as string,
  };

  const result = countrySchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    createCountry(result.data);
    revalidatePath('/laender');
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return { error: 'Ländercode existiert bereits' };
    }
    return { error: 'Fehler beim Erstellen des Landes' };
  }
}

export async function updateCountryAction(formData: FormData) {
  const data = {
    id: parseInt(formData.get('id') as string),
    code: formData.get('code') as string,
    name: formData.get('name') as string,
  };

  const result = countrySchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    updateCountry({ ...result.data, id: data.id });
    revalidatePath('/laender');
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return { error: 'Ländercode existiert bereits' };
    }
    return { error: 'Fehler beim Aktualisieren des Landes' };
  }
}

export async function deleteCountryAction(countryId: number) {
  try {
    deleteCountry(countryId);
    revalidatePath('/laender');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Löschen des Landes' };
  }
}
