export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  createdAt: Date;
  completions: Record<string, boolean>;
}