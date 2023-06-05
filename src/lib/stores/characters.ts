import { writable, type Readable } from 'svelte/store'
import { type Character } from './selectedCharacter'
import devCharacter from './devCharacter'

type Characters = Character[]

type CharactersStore = Readable<Characters>

const initStore = (): CharactersStore => {
    const initialCharacters: Characters = [devCharacter as Character]

    const { subscribe } = writable(initialCharacters)

    return {
        subscribe,
    }
}

export type { Character }
export const characters = initStore()
