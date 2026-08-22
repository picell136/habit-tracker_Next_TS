'use client';

import { useHabits } from '@/context/HabitContext';
import { HabitCard } from '@/components/features/HabitCard';
import { AddHabitForm } from '@/components/features/AddHabitForm';
import { CheckCircle } from 'lucide-react';

interface HomeClientProps {
  today: string;
}

export default function HomeClient({ today }: HomeClientProps) {

    const { habits, getTodayCompletions, getTotalHabits } = useHabits();

  // Сортируем: невыполненные сверху
    const sortedHabits = [...habits].sort((a, b) => {

    const aDone = a.completions[today] || false;
    const bDone = b.completions[today] || false;

    if (aDone === bDone) return 0;
    if (aDone) return 1;
    return -1;
  });

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-1">
      <header className="flex justify-between items-center gap-2 min-w-0">
        <h1 className="text-5xl sm:text-6xl md:text-8xl text-black min-w-0 truncate">
          Привычки
        </h1>

        <div className="flex shrink-0 text-m">
          <span className="flex items-center gap-1 text-black">
            <CheckCircle 
              size={25} 
              className="text-green-400 shrink-0" 
            />
            <span className="completions">
              {getTodayCompletions()}/{getTotalHabits()}
            </span>
          </span>
        </div>
      </header>

      <AddHabitForm />

      {habits.length === 0 ? (

        <div className="text-3xl text-center py-12 text-orange-600">
          <p>
            Нет привычек. Добавьте первую!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedHabits.map((habit) => (
            <HabitCard 
              key={habit.id}
              habit={habit}
              today={today}
            />
          ))}
        </div>
      )}
    </main>
  );
}