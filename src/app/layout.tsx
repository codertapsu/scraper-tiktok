import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  other: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <Head>
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self';" />
      </Head> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
