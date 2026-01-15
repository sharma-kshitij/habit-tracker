import { habitType } from "@/components/types/types";

export const calculateCompletionPercentage = (habits: habitType[]) => {
  if (habits.length === 0) return 0;
  const completedHabits = habits.filter((habit) => habit.completed).length;
  const percentage = (completedHabits / habits.length) * 100;
  return Math.round(percentage);
};
