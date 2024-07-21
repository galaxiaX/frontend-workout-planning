import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/auth/context';
import { Toaster } from 'react-hot-toast';
import { NavbarProvider } from '@/components/navbar/navbar-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <NavbarProvider>
            <Toaster />
            {children}
          </NavbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
