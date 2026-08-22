'use client';

import { Habit } from '@/types';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isAfter,
  startOfDay
} from 'date-fns';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HabitCalendarProps {
  habit: Habit;
  today: string;
  onToggleDay: (habitId: string, date: string) => void;
}

export function HabitCalendar({ habit, today, onToggleDay }: HabitCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(today));

  // Массив названий месяцев
  const monthOfYear = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
  ];

  // Получаем все дни месяца
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Дни недели (пн, вт, ср...)
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDayCompleted = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return habit.completions[dateStr] || false;
  };

  const addZero = (num: number) => ('0' + num).slice(-2);

  const handleDayClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');

    const today3 = new Date();
    const year = today3.getFullYear();
    const month = today3.getMonth();
    const day = today3.getDate();

    if (`${year}-${addZero(month + 1)}-${addZero(day)}` >= dateStr){  // если дата позже сегодняшней, то тогл не сработает
      onToggleDay(habit.id, dateStr);
    }
  };

  // Формируем заголовок: название месяца из массива + год
  const monthName = monthOfYear[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Заголовок с навигацией */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-1">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-orange-50 rounded transition-colors"
          >
            <ChevronLeft size={20} className="text-orange-500" />
          </button>
          <h3 className="font-semibold text-sm sm:text-2xl md:text-4xl text-orange-600 whitespace-nowrap">
            {`${monthName} ${year}`}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-orange-50 rounded transition-colors"
          >
            <ChevronRight size={20} className="text-orange-500" />
          </button>
        </div>
      </div>

      {/* Сетка дней недели */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-xl md:text-4xl font-medium text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Сетка дней месяца */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const completed = isDayCompleted(day);
          const isTodayDate = isToday(day);

          const today2 = startOfDay(new Date());
          const isFutureDay = isAfter(day, today2);

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              className={`
                aspect-square rounded-lg text-3xl font-medium transition-all
                flex items-center justify-center
                ${isFutureDay ? 'hover:bg-red-100 cursor-not-allowed' : ''}
                ${!isCurrentMonth ? 'text-gray-300 hover:text-gray-600' : ''}
                ${completed && !isFutureDay ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
                ${!completed && isCurrentMonth && !isFutureDay ? 'hover:bg-orange-50 text-gray-700' : ''}
                ${!completed && isCurrentMonth && isFutureDay ? 'hover:bg-orange-50 text-gray-700' : ''}
                ${!completed && !isCurrentMonth ? 'hover:bg-gray-50' : ''}
                ${isTodayDate && !completed ? 'ring-2 ring-orange-300 ring-offset-1' : ''}
                ${isTodayDate && completed ? 'ring-2 ring-white ring-offset-2 ring-offset-orange-500' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      {/* Статистика */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-2xl text-gray-500">
        <span>
          Выполнено: <strong className="text-orange-600">
            {Object.values(habit.completions).filter(value => value === true).length}
          </strong> дней
        </span>
        <span>
          Текущий стрик: <strong className="text-orange-600">{habit.streak}</strong> дней
        </span>
      </div>
    </div>
  );
}