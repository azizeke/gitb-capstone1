import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Global IT Bootcamp',
  description: 'Kariyerini değiştirecek bootcamp programlarını keşfet.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="bg-background text-text flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}