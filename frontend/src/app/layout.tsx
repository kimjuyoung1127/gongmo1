import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WeWorkHere - Foreign Workers Community',
  description: 'Anonymous community platform for foreign workers',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
