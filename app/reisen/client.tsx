'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, RefreshCw, X, Send, Check, XCircle } from 'lucide-react';
import { createTripAction, updateTripAction, deleteTripAction, submitTripAction, approveTripAction, rejectTripAction } from './actions';
import type { TripWithDetails } from '@/lib/trips';
import type { Customer } from '@/lib/customers';
import DataTable, { type DataTableColumn } from '@/components/DataTable';

interface TripManagementClientProps {
  trips: TripWithDetails[];
  customers: Customer[];
  isAccounting: boolean;
}

export default function TripManagementClient({
  trips: initialTrips,
  customers,
  isAccounting
}: TripManagementClientProps) {
  const [trips, setTrips] = useState<TripWithDetails[]>(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState<TripWithDetails | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedTrip(null);
    setIsEditing(false);
    setError(null);
    setIsPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedTrip) {
      setIsEditing(true);
      setError(null);
      setIsPanelOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedTrip) return;
    
    if (confirm(`Reise nach "${selectedTrip.destination}" wirklich löschen?`)) {
      const result = await deleteTripAction(selectedTrip.id);
      if (result.error) {
        alert(result.error);
      } else {
        window.location.reload();
      }
    }
  };

  const handleSubmitTrip = async () => {
    if (!selectedTrip) return;
    
    if (confirm(`Reise nach "${selectedTrip.destination}" wirklich einreichen?`)) {
      const result = await submitTripAction(selectedTrip.id);
      if (result.error) {
        alert(result.error);
      } else {
        window.location.reload();
      }
    }
  };

  const handleApproveTrip = async () => {
    if (!selectedTrip) return;
    
    if (confirm(`Reise nach "${selectedTrip.destination}" wirklich genehmigen?`)) {
      const result = await approveTripAction(selectedTrip.id);
      if (result.error) {
        alert(result.error);
      } else {
        window.location.reload();
      }
    }
  };

  const handleRejectTrip = async () => {
    if (!selectedTrip) return;
    
    if (confirm(`Reise nach "${selectedTrip.destination}" wirklich ablehnen?`)) {
      const result = await rejectTripAction(selectedTrip.id);
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
      ? await updateTripAction(formData)
      : await createTripAction(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setIsPanelOpen(false);
      window.location.reload();
    }
  };

  const handleRowClick = (trip: TripWithDetails) => {
    setSelectedTrip(trip);
  };

  const columns: DataTableColumn<TripWithDetails>[] = [
    { key: 'destination', header: 'Ziel', render: (trip) => trip.destination },
    { key: 'purpose', header: 'Zweck', render: (trip) => trip.purpose },
    { key: 'startDate', header: 'Start', render: (trip) => new Date(trip.start_date).toLocaleDateString() },
    { key: 'endDate', header: 'Ende', render: (trip) => new Date(trip.end_date).toLocaleDateString() },
    { key: 'customerName', header: 'Kunde', render: (trip) => trip.customer_name || '' },
    { key: 'employeeName', header: 'Mitarbeiter', render: (trip) => trip.employee_name },
    { key: 'status', header: 'Status', render: (trip) => trip.status },
  ];

  return (
    <div style={{ padding: 'var(--space-4)' }}>
      <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
        <button onClick={handleAdd} className="btn-toolbar">
          <Plus size={16} />
          Hinzufügen
        </button>
        <button onClick={handleEdit} className="btn-toolbar" disabled={!selectedTrip || selectedTrip.status !== 'draft' || (isAccounting && selectedTrip.employee_id !== selectedTrip.employee_id)}>
          <Edit size={16} />
          Bearbeiten
        </button>
        <button onClick={handleDelete} className="btn-toolbar" disabled={!selectedTrip || selectedTrip.status !== 'draft' || (isAccounting && selectedTrip.employee_id !== selectedTrip.employee_id)}>
          <Trash2 size={16} />
          Löschen
        </button>
        {!isAccounting && (
          <button onClick={handleSubmitTrip} className="btn-toolbar" disabled={!selectedTrip || selectedTrip.status !== 'draft' || (isAccounting && selectedTrip.employee_id !== selectedTrip.employee_id)}>
            <Send size={16} />
            Einreichen
          </button>
        )}
        {isAccounting && (
          <>
            <button onClick={handleApproveTrip} className="btn-toolbar" disabled={!selectedTrip || selectedTrip.status !== 'submitted' || (isAccounting && selectedTrip.employee_id !== selectedTrip.employee_id)}>
              <Check size={16} />
              Genehmigen
            </button>
            <button onClick={handleRejectTrip} className="btn-toolbar" disabled={!selectedTrip || selectedTrip.status !== 'submitted' || (isAccounting && selectedTrip.employee_id !== selectedTrip.employee_id)}>
              <XCircle size={16} />
              Ablehnen
            </button>
          </>
        )}
        <button onClick={handleRefresh} className="btn-toolbar">
          <RefreshCw size={16} />
          Aktualisieren
        </button>
      </div>

      <DataTable
        items={trips}
        columns={columns}
        getRowKey={(trip) => trip.id}
        onRowClick={handleRowClick}
        isRowSelected={(trip) => selectedTrip?.id === trip.id}
        getRowAriaLabel={(trip) => `${trip.destination} ${trip.purpose}`}
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
              width: '680px',
            }}
          >
            <div className="panel-header">
              <h2 className="panel-title">
                {isEditing ? 'Reise bearbeiten' : 'Reise hinzufügen'}
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
                    <input type="hidden" name="id" value={selectedTrip?.id} />
                  )}

                  <label className="form-label">Ziel *</label>
                  <input
                    type="text"
                    name="destination"
                    className="form-input required"
                    defaultValue={isEditing ? selectedTrip?.destination : ''}
                    required
                  />

                  <label className="form-label">Zweck *</label>
                  <input
                    type="text"
                    name="purpose"
                    className="form-input required"
                    defaultValue={isEditing ? selectedTrip?.purpose : ''}
                    required
                  />

                  <label className="form-label">Startdatum *</label>
                  <input
                    type="date"
                    name="start_date"
                    className="form-input required"
                    defaultValue={isEditing ? selectedTrip?.start_date : ''}
                    required
                  />

                  <label className="form-label">Enddatum *</label>
                  <input
                    type="date"
                    name="end_date"
                    className="form-input required"
                    defaultValue={isEditing ? selectedTrip?.end_date : ''}
                    required
                  />

                  <label className="form-label">Kunde</label>
                  <select
                    name="customer_id"
                    className="form-input"
                    defaultValue={isEditing ? selectedTrip?.customer_id || '' : ''}
                  >
                    <option value="">-- Bitte wählen --</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
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