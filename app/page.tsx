import Link from 'next/link';

const GREETINGS = [
  { language: 'Deutsch',    greeting: 'Hallo',      flag: '🇩🇪' },
  { language: 'English',    greeting: 'Hello',      flag: '🇬🇧' },
  { language: 'Français',   greeting: 'Bonjour',    flag: '🇫🇷' },
  { language: 'Español',    greeting: 'Hola',       flag: '🇪🇸' },
  { language: 'Italiano',   greeting: 'Ciao',       flag: '🇮🇹' },
  { language: 'Português',  greeting: 'Olá',        flag: '🇵🇹' },
  { language: 'Nederlands', greeting: 'Hallo',      flag: '🇳🇱' },
  { language: 'Polski',     greeting: 'Cześć',      flag: '🇵🇱' },
  { language: 'Čeština',    greeting: 'Ahoj',       flag: '🇨🇿' },
  { language: 'Русский',    greeting: 'Привет',     flag: '🇷🇺' },
  { language: '日本語',      greeting: 'こんにちは',  flag: '🇯🇵' },
  { language: '中文',        greeting: '你好',       flag: '🇨🇳' },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingTop: 'var(--space-7)' }}>
      <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
        Reisekostenabrechnung
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
        Willkommen in der Reisekostenabrechnung. Bitte wählen Sie einen Bereich aus der Navigation.
      </p>

      <div style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-card)',
      }}>
        <p style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-4)',
        }}>
          Willkommen in aller Welt
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {GREETINGS.map(({ language, greeting, flag }) => (
            <div
              key={language}
              title={language}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: 'var(--space-1) var(--space-3)',
                background: 'var(--color-bg-row-alt)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-text-primary)',
              }}
            >
              <span>{flag}</span>
              <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{greeting}</span>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {language}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Link href="/reisen" className="btn btn-primary">Reisen</Link>
        <Link href="/barauslagen" className="btn btn-secondary">Barauslagen</Link>
        <Link href="/buchhaltung" className="btn btn-secondary">Buchhaltung</Link>
      </div>
    </div>
  );
}
