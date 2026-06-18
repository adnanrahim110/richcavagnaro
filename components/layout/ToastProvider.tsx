'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4500,
        style: {
          border: '2px solid #0f172a',
          borderRadius: '12px',
          boxShadow: '5px 5px 0 rgba(15, 23, 42, 1)',
          color: '#1e293b',
          fontFamily: 'var(--font-nunito), sans-serif',
          fontWeight: 700,
        },
        success: {
          iconTheme: {
            primary: '#18c458',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ff3b30',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
