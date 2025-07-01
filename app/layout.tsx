import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Claira - Your AI Women's Health Companion",
  description: "Meet Claira, your AI-powered women's health companion. Get personalized insights, expert guidance, and compassionate support for every stage of your menstrual journey.",
  keywords: "women's health, period tracking, AI health, menstrual cycle, Claira, health companion, reproductive health, cycle insights, personalized health, women's wellness",
  authors: [{ name: 'Claira Team' }],
  creator: 'Claira',
  publisher: 'Claira',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://claira.health'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://claira.health',
    title: "Claira - Your AI Women's Health Companion",
    description: "Meet Claira, your AI-powered women's health companion. Get personalized insights, expert guidance, and compassionate support for every stage of your menstrual journey.",
    siteName: 'Claira',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Claira - Your AI Women\'s Health Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Claira - Your AI Women's Health Companion",
    description: "Meet Claira, your AI-powered women's health companion. Get personalized insights, expert guidance, and compassionate support for every stage of your menstrual journey.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
} 