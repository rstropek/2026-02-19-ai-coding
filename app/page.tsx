import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingTop: 'var(--space-7)' }}>
      <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
        Reisekostenabrechnung
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        Willkommen in der Reisekostenabrechnung. Bitte wählen Sie einen Bereich aus der Navigation.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Link href="/reisen" className="btn btn-primary">Reisen</Link>
        <Link href="/barauslagen" className="btn btn-secondary">Barauslagen</Link>
        <Link href="/buchhaltung" className="btn btn-secondary">Buchhaltung</Link>
      </div>
    </div>
  );
}
