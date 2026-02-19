'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createCustomer, updateCustomer, deleteCustomer } from '@/lib/customers';

const customerSchema = z.object({
  name: z.string().min(1, 'Kundenname ist erforderlich'),
  short_name: z.string().optional(),
  street: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  country_id: z.number().nullable().optional(),
});

export async function createCustomerAction(formData: FormData) {
  const countryIdStr = formData.get('country_id') as string;
  const data = {
    name: formData.get('name') as string,
    short_name: formData.get('short_name') as string,
    street: formData.get('street') as string,
    postal_code: formData.get('postal_code') as string,
    city: formData.get('city') as string,
    country_id: countryIdStr && countryIdStr !== '' ? parseInt(countryIdStr) : null,
  };

  const result = customerSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  try {
    createCustomer(result.data);
    revalidatePath('/kunden');
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return { error: 'Kundenname existiert bereits' };
    }
    return { error: 'Fehler beim Erstellen des Kunden' };
  }
}

export async function updateCustomerAction(formData: FormData) {
  const countryIdStr = formData.get('country_id') as string;
  const data = {
    id: parseInt(formData.get('id') as string),
    name: formData.get('name') as string,
    short_name: formData.get('short_name') as string,
    street: formData.get('street') as string,
    postal_code: formData.get('postal_code') as string,
    city: formData.get('city') as string,
    country_id: countryIdStr && countryIdStr !== '' ? parseInt(countryIdStr) : null,
  };

  const result = customerSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  try {
    updateCustomer({ ...result.data, id: data.id });
    revalidatePath('/kunden');
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return { error: 'Kundenname existiert bereits' };
    }
    return { error: 'Fehler beim Aktualisieren des Kunden' };
  }
}

export async function deleteCustomerAction(customerId: number) {
  try {
    deleteCustomer(customerId);
    revalidatePath('/kunden');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Löschen des Kunden' };
  }
}
