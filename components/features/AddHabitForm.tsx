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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Название привычки"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      
      <input
        type="text"
        placeholder="Описание (опционально)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
        className="w-full p-2 border rounded"
      >
        <option value="daily">Ежедневно</option>
        <option value="weekly">Еженедельно</option>
      </select>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Добавить привычку
      </button>
    </form>
  );
}