import { getAllCustomers } from '@/lib/customers';
import { getAllCountries } from '@/lib/countries';
import CustomerManagementClient from './client';

export default function KundenPage() {
  const customers = getAllCustomers();
  const countries = getAllCountries();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Kundenstamm</h1>
      </div>
      <CustomerManagementClient customers={customers} countries={countries} />
    </div>
  );
}
