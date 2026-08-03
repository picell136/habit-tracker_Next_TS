import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HabitProvider } from '@/context/HabitContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Habit Tracker',
  description: 'Track your daily habits',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <HabitProvider>{children}</HabitProvider>
      </body>
    </html>
  );
}