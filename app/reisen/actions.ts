'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createTrip, updateTrip, deleteTrip, submitTrip, approveTrip, rejectTrip } from '@/lib/trips';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

const tripSchema = z.object({
  customer_id: z.number().nullable().optional(),
  start_date: z.string().min(1, 'Startdatum ist erforderlich'),
  end_date: z.string().min(1, 'Enddatum ist erforderlich'),
  purpose: z.string().min(1, 'Reisezweck ist erforderlich'),
  destination: z.string().min(1, 'Reiseziel ist erforderlich'),
});

export async function createTripAction(formData: FormData) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) {
    return { error: 'Nicht autorisiert' };
  }

  const customerIdStr = formData.get('customer_id') as string;
  const data = {
    customer_id: customerIdStr && customerIdStr !== '' ? parseInt(customerIdStr) : null,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
    purpose: formData.get('purpose') as string,
    destination: formData.get('destination') as string,
  };

  const result = tripSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    createTrip({ ...result.data, employee_id: session.userId });
    revalidatePath('/reisen');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Erstellen der Reise' };
  }
}

export async function updateTripAction(formData: FormData) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) {
    return { error: 'Nicht autorisiert' };
  }

  const customerIdStr = formData.get('customer_id') as string;
  const data = {
    id: parseInt(formData.get('id') as string),
    customer_id: customerIdStr && customerIdStr !== '' ? parseInt(customerIdStr) : null,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
    purpose: formData.get('purpose') as string,
    destination: formData.get('destination') as string,
  };

  const result = tripSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    updateTrip({ ...result.data, id: data.id });
    revalidatePath('/reisen');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Aktualisieren der Reise' };
  }
}

export async function deleteTripAction(tripId: number) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) {
    return { error: 'Nicht autorisiert' };
  }

  try {
    deleteTrip(tripId);
    revalidatePath('/reisen');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Löschen der Reise' };
  }
}

export async function submitTripAction(tripId: number) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) {
    return { error: 'Nicht autorisiert' };
  }

  try {
    submitTrip(tripId);
    revalidatePath('/reisen');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Einreichen der Reise' };
  }
}

export async function approveTripAction(tripId: number) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) {
    return { error: 'Nicht autorisiert' };
  }

  try {
    approveTrip(tripId);
    revalidatePath('/reisen');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Genehmigen der Reise' };
  }
}

export async function rejectTripAction(tripId: number) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.userId) {
    return { error: 'Nicht autorisiert' };
  }

  try {
    rejectTrip(tripId);
    revalidatePath('/reisen');
    return { success: true };
  } catch (error) {
    return { error: 'Fehler beim Ablehnen der Reise' };
  }
}