'use client';

import { useActionState } from 'react';
import { login } from '../actions/auth';

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Reisekostenabrechnung</h1>
        <p className="login-subtitle">Bitte melden Sie sich an</p>
        <form action={formAction}>
          <div className="form-grid">
            <label htmlFor="username" className="form-label">
              Benutzername
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input required"
              autoComplete="username"
              autoFocus
              required
            />
          </div>
          {state?.error && (
            <div className="error-message">{state.error}</div>
          )}
          <div className="login-actions">
            <button type="submit" className="btn btn-primary">
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
