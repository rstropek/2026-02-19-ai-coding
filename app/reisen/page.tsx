import { getAllTrips } from '@/lib/trips';
import { getAllCustomers } from '@/lib/customers';
import TripManagementClient from './client';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export default async function ReisenPage() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  const trips = getAllTrips();
  const customers = getAllCustomers();
  const isAccounting = session.role === 'accounting';

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reisen</h1>
      </div>
      <TripManagementClient trips={trips} customers={customers} isAccounting={isAccounting} />
    </div>
  );
}
