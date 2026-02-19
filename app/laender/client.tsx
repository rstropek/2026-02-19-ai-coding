'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, RefreshCw, X } from 'lucide-react';
import { createCountryAction, updateCountryAction, deleteCountryAction } from './actions';
import type { Country } from '@/lib/countries';
import DataTable, { type DataTableColumn } from '@/components/DataTable';

interface CountryManagementClientProps {
  countries: Country[];
}

export default function CountryManagementClient({ countries: initialCountries }: CountryManagementClientProps) {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedCountry(null);
    setIsEditing(false);
    setError(null);
    setIsPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedCountry) {
      setIsEditing(true);
      setError(null);
      setIsPanelOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedCountry) return;
    
    if (confirm(`Land "${selectedCountry.name}" wirklich löschen?`)) {
      const result = await deleteCountryAction(selectedCountry.id);
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
      ? await updateCountryAction(formData)
      : await createCountryAction(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setIsPanelOpen(false);
      window.location.reload();
    }
  };

  const handleRowClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const columns: DataTableColumn<Country>[] = [
    { key: 'code', header: 'Code', render: (country) => country.code },
    { key: 'name', header: 'Name', render: (country) => country.name },
  ];

  return (
    <div style={{ padding: 'var(--space-4)' }}>
      <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
        <button onClick={handleAdd} className="btn-toolbar">
          <Plus size={16} />
          Hinzufügen
        </button>
        <button onClick={handleEdit} className="btn-toolbar" disabled={!selectedCountry}>
          <Edit size={16} />
          Bearbeiten
        </button>
        <button onClick={handleDelete} className="btn-toolbar" disabled={!selectedCountry}>
          <Trash2 size={16} />
          Löschen
        </button>
        <button onClick={handleRefresh} className="btn-toolbar">
          <RefreshCw size={16} />
          Aktualisieren
        </button>
      </div>

      <DataTable
        items={countries}
        columns={columns}
        getRowKey={(country) => country.id}
        onRowClick={handleRowClick}
        isRowSelected={(country) => selectedCountry?.id === country.id}
        getRowAriaLabel={(country) => `${country.code} ${country.name}`}
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
              width: '480px',
            }}
          >
            <div className="panel-header">
              <h2 className="panel-title">
                {isEditing ? 'Land bearbeiten' : 'Land hinzufügen'}
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
                    <input type="hidden" name="id" value={selectedCountry?.id} />
                  )}

                  <label className="form-label">Code *</label>
                  <input
                    type="text"
                    name="code"
                    className="form-input required"
                    defaultValue={isEditing ? selectedCountry?.code : ''}
                    required
                    maxLength={2}
                    style={{ textTransform: 'uppercase' }}
                  />

                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input required"
                    defaultValue={isEditing ? selectedCountry?.name : ''}
                    required
                  />
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
