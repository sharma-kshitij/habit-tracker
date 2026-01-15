import { atom } from "jotai";

export const habitsAtom = atom([
  { id: 1, name: "Exercise", completed: false },
  { id: 2, name: "Read 20 mins", completed: false },
  { id: 3, name: "Drink 3L Water", completed: false },
  { id: 4, name: "Meditate", completed: false },
]);
