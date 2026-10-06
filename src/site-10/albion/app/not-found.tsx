import Link from 'next/link';

/* Language-neutral 404: no mixed copy, just two doors home. */
export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: 'var(--gutter)',
      }}
    >
      <div>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          404
        </p>
        <p
          className="display"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            marginTop: 24,
            marginBottom: 32,
          }}
        >
          ALBION
        </p>
        <p style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
          <Link href="/en">Back to the beginning</Link>
          <Link href="/ru">Вернуться к началу</Link>
        </p>
      </div>
    </main>
  );
}
