import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'DataSwift - Instant Data Bundles',
  description: 'Buy affordable data bundles instantly. MTN, Telecel & AirtelTigo. Fast delivery, best prices in Ghana.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1A1A2E',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px'
              },
              success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
