import { writable, type Readable } from "svelte/store";
import { type Character } from "./selectedCharacter";
import devCharacter from "./devCharacter";

type Characters = Character[];

interface CharactersStore extends Readable<Characters> {}

const initStore = (): CharactersStore => {
  const initialCharacters: Characters = [devCharacter];

  const { subscribe, set, update } = writable(initialCharacters);

  return {
    subscribe,
  }
}

export type { Character }
export const characters = initStore();
