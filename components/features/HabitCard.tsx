'use client';

import { useState } from 'react';
import { Habit } from '@/types';
import { useHabits } from '@/context/HabitContext';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { HabitCalendar } from './HabitCalendar';

interface HabitCardProps {
  habit: Habit;
  today: string;
}

export function HabitCard({ habit, today }: HabitCardProps) {
  const { toggleHabit, deleteHabit } = useHabits();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const isCompleted = habit.completions[today] || false;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Основная часть карточки */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => toggleHabit(habit.id, today)}
            className="w-5 h-5 cursor-pointer accent-orange-500"
          />
          
          <div className="flex-1">
            <h3 className={`
              text-base font-bold
              ${isCompleted ? 'text-orange-400 line-through' : 'text-orange-600'}
            `}>
              {habit.name}
            </h3>

            {habit.description && (
              <p className="text-sm text-gray-800">{habit.description}</p>
            )}
            
            <div className="flex gap-2 mt-1 text-xs">
              <span className="text-gray-800 font-medium">
                🔥 {habit.streak} дней
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700 capitalize">{habit.frequency}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="text-gray-500 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded"
            title="Календарь"
          >
            {isCalendarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <button
            onClick={() => deleteHabit(habit.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Календарь (показывается при открытии) */}
      {isCalendarOpen && (
        <div className="px-4 pb-4">
          <HabitCalendar 
            habit={habit}
            today={today}
            onToggleDay={toggleHabit}
          />
        </div>
      )}
    </div>
  );
}