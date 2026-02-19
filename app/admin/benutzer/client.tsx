'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { createUserAction, updateUserAction, deleteUserAction } from './actions';
import type { User } from '@/lib/users';
import DataTable, { type DataTableColumn } from '@/components/DataTable';

interface UserManagementClientProps {
  users: User[];
}

type Mode = 'list' | 'create' | 'edit';

export default function UserManagementClient({ users }: UserManagementClientProps) {
  const [mode, setMode] = useState<Mode>('list');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    setMode('create');
    setSelectedUser(null);
    setError(null);
  };

  const handleEdit = (user: User) => {
    setMode('edit');
    setSelectedUser(user);
    setError(null);
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
      return;
    }
    const result = await deleteUserAction(userId);
    if (result.error) {
      alert(result.error);
    }
  };

  const handleClose = () => {
    setMode('list');
    setSelectedUser(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = mode === 'create' 
      ? await createUserAction(formData)
      : await updateUserAction(formData);

    if (result.error) {
      setError(result.error);
    } else {
      handleClose();
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'employee' ? 'Mitarbeiter' : 'Buchhaltung';
  };

  const columns: DataTableColumn<User>[] = [
    { key: 'username', header: 'Benutzername', render: (user) => user.username },
    { key: 'name', header: 'Name', render: (user) => user.name },
    { key: 'role', header: 'Rolle', render: (user) => getRoleLabel(user.role) },
    { key: 'isAdmin', header: 'Admin', render: (user) => (user.is_admin ? 'Ja' : 'Nein') },
    {
      key: 'actions',
      header: 'Aktionen',
      headerStyle: { width: '120px' },
      render: (user) => (
        <>
          <button
            onClick={() => handleEdit(user)}
            className="btn-toolbar"
            title="Bearbeiten"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="btn-toolbar"
            title="Löschen"
            style={{ marginLeft: 'var(--space-1)' }}
          >
            <Trash2 size={14} />
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <button onClick={handleAdd} className="btn btn-primary">
          <Plus size={16} />
          Hinzufügen
        </button>
      </div>

      <DataTable
        items={users}
        columns={columns}
        getRowKey={(user) => user.id}
      />

      {mode !== 'list' && (
        <div className="panel-overlay" onClick={handleClose}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h2 className="panel-title">
                {mode === 'create' ? 'Neuer Benutzer' : 'Benutzer bearbeiten'}
              </h2>
              <div style={{ flex: 1 }} />
              <button
                onClick={handleClose}
                className="btn-toolbar"
                title="Schließen"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="panel-body">
                <div className="form-grid">
                  {mode === 'edit' && (
                    <input type="hidden" name="id" value={selectedUser?.id} />
                  )}

                  <label htmlFor="username" className="form-label">
                    Benutzername
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-input required"
                    defaultValue={selectedUser?.username || ''}
                    required
                  />

                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input required"
                    defaultValue={selectedUser?.name || ''}
                    required
                  />

                  <label htmlFor="role" className="form-label">
                    Rolle
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-input required"
                    defaultValue={selectedUser?.role || 'employee'}
                    required
                  >
                    <option value="employee">Mitarbeiter</option>
                    <option value="accounting">Buchhaltung</option>
                  </select>

                  <label htmlFor="is_admin" className="form-label">
                    Admin
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      id="is_admin"
                      name="is_admin"
                      type="checkbox"
                      defaultChecked={selectedUser?.is_admin === 1}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                </div>

                {error && (
                  <div className="validation-message" style={{ marginTop: 'var(--space-4)' }}>
                    {error}
                  </div>
                )}
              </div>

              <div className="panel-footer">
                <button type="submit" className="btn btn-primary">
                  Speichern
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-secondary"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
