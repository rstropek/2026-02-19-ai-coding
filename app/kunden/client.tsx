'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, RefreshCw, X } from 'lucide-react';
import { createCustomerAction, updateCustomerAction, deleteCustomerAction } from './actions';
import type { CustomerWithCountry } from '@/lib/customers';
import type { Country } from '@/lib/countries';
import DataTable, { type DataTableColumn } from '@/components/DataTable';

interface CustomerManagementClientProps {
  customers: CustomerWithCountry[];
  countries: Country[];
}

export default function CustomerManagementClient({ 
  customers: initialCustomers,
  countries
}: CustomerManagementClientProps) {
  const [customers, setCustomers] = useState<CustomerWithCountry[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithCountry | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsEditing(false);
    setError(null);
    setIsPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedCustomer) {
      setIsEditing(true);
      setError(null);
      setIsPanelOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    
    if (confirm(`Kunde "${selectedCustomer.name}" wirklich löschen?`)) {
      const result = await deleteCustomerAction(selectedCustomer.id);
      if (result.error) {
        alert(result.error);
      } else {
        window.location.reload();
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const result = isEditing
      ? await updateCustomerAction(formData)
      : await createCustomerAction(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setIsPanelOpen(false);
      window.location.reload();
    }
  };

  const handleRowClick = (customer: CustomerWithCountry) => {
    setSelectedCustomer(customer);
  };

  const columns: DataTableColumn<CustomerWithCountry>[] = [
    { key: 'name', header: 'Name', render: (customer) => customer.name },
    { key: 'shortName', header: 'Kurzbezeichnung', render: (customer) => customer.short_name || '' },
    { key: 'street', header: 'Straße', render: (customer) => customer.street || '' },
    {
      key: 'postalAndCity',
      header: 'PLZ + Ort',
      render: (customer) =>
        customer.postal_code || customer.city
          ? `${customer.postal_code || ''} ${customer.city || ''}`.trim()
          : '',
    },
    { key: 'countryName', header: 'Land', render: (customer) => customer.country_name || '' },
  ];

  return (
    <div style={{ padding: 'var(--space-4)' }}>
      <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
        <button onClick={handleAdd} className="btn-toolbar">
          <Plus size={16} />
          Hinzufügen
        </button>
        <button onClick={handleEdit} className="btn-toolbar" disabled={!selectedCustomer}>
          <Edit size={16} />
          Bearbeiten
        </button>
        <button onClick={handleDelete} className="btn-toolbar" disabled={!selectedCustomer}>
          <Trash2 size={16} />
          Löschen
        </button>
        <button onClick={handleRefresh} className="btn-toolbar">
          <RefreshCw size={16} />
          Aktualisieren
        </button>
      </div>

      <DataTable
        items={customers}
        columns={columns}
        getRowKey={(customer) => customer.id}
        onRowClick={handleRowClick}
        isRowSelected={(customer) => selectedCustomer?.id === customer.id}
        getRowAriaLabel={(customer) => customer.name}
      />

      {isPanelOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 1000,
          }}
          onClick={() => setIsPanelOpen(false)}
        >
          <div
            className="panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              height: '100vh',
              width: '580px',
            }}
          >
            <div className="panel-header">
              <h2 className="panel-title">
                {isEditing ? 'Kunde bearbeiten' : 'Kunde hinzufügen'}
              </h2>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="btn-toolbar"
                style={{ marginLeft: 'auto' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="panel-body">
                <div className="form-grid">
                  {isEditing && (
                    <input type="hidden" name="id" value={selectedCustomer?.id} />
                  )}

                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input required"
                    defaultValue={isEditing ? selectedCustomer?.name : ''}
                    required
                  />

                  <label className="form-label">Kurzbezeichnung</label>
                  <input
                    type="text"
                    name="short_name"
                    className="form-input"
                    defaultValue={isEditing ? selectedCustomer?.short_name || '' : ''}
                  />

                  <label className="form-label">Straße</label>
                  <input
                    type="text"
                    name="street"
                    className="form-input"
                    defaultValue={isEditing ? selectedCustomer?.street || '' : ''}
                  />

                  <label className="form-label">PLZ</label>
                  <input
                    type="text"
                    name="postal_code"
                    className="form-input"
                    defaultValue={isEditing ? selectedCustomer?.postal_code || '' : ''}
                  />

                  <label className="form-label">Ort</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    defaultValue={isEditing ? selectedCustomer?.city || '' : ''}
                  />

                  <label className="form-label">Land</label>
                  <select
                    name="country_id"
                    className="form-input"
                    defaultValue={isEditing ? selectedCustomer?.country_id || '' : ''}
                  >
                    <option value="">-- Bitte wählen --</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="panel-footer">
                {error && (
                  <div className="validation-message" style={{ marginRight: 'auto' }}>
                    {error}
                  </div>
                )}
                <button type="submit" className="btn-primary">
                  Speichern
                </button>
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="btn-secondary"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
