'use client';

import { useState } from 'react';
import { useHabits } from '@/context/HabitContext';

export function AddHabitForm() {
  const { addHabit } = useHabits();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name: name.trim(),
      description: description.trim() || undefined,
      frequency,
    });

    setName('');
    setDescription('');
    setFrequency('daily');
  };

  return (
    <form onSubmit={handleSubmit} className="sketch  space-y-4 p-6 bg-white/70">
      <input
        type="text"
        placeholder="Название привычки"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full text-4xl p-2 border rounded placeholder:text-gray-400 text-gray-900"
        required
      />
      
      <input
        type="text"
        placeholder="Описание (опционально)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-4xl p-2 border rounded placeholder:text-gray-400 text-gray-900"
      />
      
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
        className="w-full text-4xl p-2 border rounded text-gray-900"
      >
        <option value="daily">Ежедневно</option>
        <option value="weekly">Еженедельно</option>
      </select>
      
      <button
        type="submit"
        className="w-full text-5xl bg-green-500 text-black p-2 rounded hover:cursor-pointer"
      >
        Добавить привычку
      </button>
    </form>
  );
}