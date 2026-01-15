import { atom } from "jotai";

export const habitsAtom = atom([
  { id: 1, name: "Exercise", daily: true, completed: false },
  { id: 2, name: "Read 20 mins", daily: false, completed: false },
  { id: 3, name: "Drink 3L Water", daily: false, completed: false },
  { id: 4, name: "Meditate", daily: false, completed: false },
]);
