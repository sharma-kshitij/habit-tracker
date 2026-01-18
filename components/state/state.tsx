import { atom } from "jotai";
import { habitType } from "../types/types";

export const habitsAtom = atom<habitType[]>([]);
