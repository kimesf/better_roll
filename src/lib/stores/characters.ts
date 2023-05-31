import { writable, type Readable } from "svelte/store";
import devCharacter from "./devCharacter";

type Character = {
  name: string,
  lineages: string,
  level: number,
  classes: string,
}

type Characters = Character[];

interface CharacterStore extends Readable<Characters> { }

const initStore = (): CharacterStore => {
  const initialCharacters: Characters = [devCharacter];

  const { subscribe, set, update } = writable(initialCharacters);

  return {
    subscribe,
  }
}

export type { Character }
export const characters = initStore();
