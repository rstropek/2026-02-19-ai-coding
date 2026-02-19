import { getAllCountries } from '@/lib/countries';
import CountryManagementClient from './client';

export default function LaenderPage() {
  const countries = getAllCountries();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Länderverwaltung</h1>
      </div>
      <CountryManagementClient countries={countries} />
    </div>
  );
}
