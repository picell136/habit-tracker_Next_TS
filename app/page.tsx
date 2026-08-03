'use client';

import { useHabits } from '@/context/HabitContext';
import { HabitCard } from '@/components/features/HabitCard';
import { AddHabitForm } from '@/components/features/AddHabitForm';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  const { habits, getTodayCompletions, getTotalHabits } = useHabits();
  const today = new Date().toISOString().split('T')[0];

  // Сортируем: невыполненные сверху
  const sortedHabits = [...habits].sort((a, b) => {
    const aDone = a.completions[today] || false;
    const bDone = b.completions[today] || false;
    return aDone === bDone ? 0 : aDone ? 1 : -1;
  });

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Привычки</h1>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle size={16} className="text-green-500" />
            {getTodayCompletions()}/{getTotalHabits()}
          </span>
        </div>
      </header>

      <AddHabitForm />

      {habits.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>Нет привычек. Добавьте первую!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedHabits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </main>
  );
}