import { writable, type Writable } from 'svelte/store'
import { type Character } from '../types'
import defaultCharacter from '../defaultCharacter'
// import devCharacter from './devCharacter'

type CharacterStoreState = {
    current: Character | null
    all: Character[]
}

interface CharacterStore extends Writable<CharacterStoreState> {
    select: (character: Character) => void
    create: () => void
    destroy: (index: number) => void
}

const initStore = (): CharacterStore => {
    const initialState = { current: null, all: [] } as CharacterStoreState
    const store = writable(initialState)
    const { subscribe, update, set } = store

    const select: CharacterStore['select'] = (character) => {
        update((previousState) => ({
            ...previousState,
            current: character,
        }))
    }

    const create: CharacterStore['create'] = () => {
        const newCharacter = structuredClone(defaultCharacter)

        update((previousState) => ({
            ...previousState,
            all: [...previousState.all, newCharacter],
        }))
    }

    const destroy: CharacterStore['destroy'] = (index) => {
        update((previousState) => {
            const newAllState = [...previousState.all]
            newAllState.splice(index, 1)

            return {
                ...previousState,
                all: newAllState
            }
        })
    }

    return {
        subscribe,
        select,
        create,
        destroy,
        set,
        update,
    }
}

export default initStore()
