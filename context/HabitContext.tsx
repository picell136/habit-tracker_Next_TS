'use client';

import { createContext, useContext, ReactNode } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from 'use-local-storage';
import { Habit } from '@/types';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'streak' >) => void;
  toggleHabit: (habitId: string, date: string) => void;
  deleteHabit: (habitId: string) => void;
  getTodayCompletions: () => number;
  getTotalHabits: () => number;
  getTotalStreak: (habitId: string) => number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const defaultHabits: Habit[] = [];

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', defaultHabits);

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'streak' >) => {
    const newHabit: Habit = {
      ...habitData,
      id: nanoid(5),
      createdAt: new Date(),
      completions: {},
      streak: 0,
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (habitId: string, date: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== habitId) return habit;
        
        const newCompletions = {
          ...habit.completions,
          [date]: !habit.completions[date],
        };
        
        const newStreak = calculateStreak(newCompletions); // Пересчитываем стрек при каждом изменении
        
        return {
          ...habit,
          completions: newCompletions,
          streak: newStreak,
        };
      })
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  const getTodayCompletions = () => {
    const today = new Date().toISOString().split('T')[0];
    return habits.filter((habit) => habit.completions[today]).length;
  };

  const getTotalHabits = () => habits.length;

  ///

  // 
  const calculateStreak = (completions: Record<string, boolean>): number => {
    const today = new Date().toISOString().split('T')[0];
    
    if (completions[today] !== true) {
      return 0;
    }
    
    let streak = 1;
    const currentDate = new Date(today);
    
    while (completions[today] === true) {
      currentDate.setDate(currentDate.getDate() - 1);
      const dateStr = currentDate.toISOString().split('T')[0];
      
      if (completions[dateStr] !== true) {
        break;
      }
      streak++;
    }
    
    return streak;
  };

  const getTotalStreak = (): number => {
    return habits.reduce((total, habit) => total + habit.streak, 0);
  };

  ///

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
        getTodayCompletions,
        getTotalHabits,
        getTotalStreak,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}