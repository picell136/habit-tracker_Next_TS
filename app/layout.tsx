import type { Metadata } from 'next';
import './globals.css';
import { HabitProvider } from '@/context/HabitContext';

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
      <body>
        <HabitProvider>{children}</HabitProvider>
      </body>
    </html>
  );
}