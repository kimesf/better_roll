import { writable, type Readable } from "svelte/store"

type Character = {
  name: string,
  lineages: string,
  level: number,
  classes: string,
}

interface SelectedCharacterStore extends Readable<Character | null> {
  select: (character: Character) => void
}

const initStore = (): SelectedCharacterStore => {
  const { subscribe, set } = writable(null)

  const select = (character) => set(character)

  return {
    subscribe,
    select
  }
}

export type { Character }
export const selectedCharacter = initStore()
