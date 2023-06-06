import { writable, type Readable } from 'svelte/store'
import { type Character } from '../types'
import devCharacter from './devCharacter'

type CharacterStoreState = {
    current: Character | null
    all: Character[]
}

interface CharacterStore extends Readable<CharacterStoreState> {
    select: (character: Character) => void
}

const initStore = (): CharacterStore => {
    const initialState = { current: null, all: [devCharacter] } as CharacterStoreState
    const store = writable(initialState)
    const { subscribe, update } = store

    const select: CharacterStore['select'] = (character) => {
        update((previousState) => ({
            ...previousState,
            current: character,
        }))
    }

    return {
        subscribe,
        select,
    }
}

export default initStore()
