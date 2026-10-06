import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter_Tight } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-display',
});

const sans = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'ALBION — Oxford Education Consultancy',
    template: '%s · ALBION',
  },
  description:
    'From first assessments to postgraduate study: one continuous academic route, guided from Oxford.',
};

export const viewport: Viewport = {
  themeColor: '#0f1522',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
