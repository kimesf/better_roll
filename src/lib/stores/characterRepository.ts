import { get, writable, type Writable } from 'svelte/store'
import { type Character } from '../types'
import defaultCharacter from '../defaultCharacter'

const LS_KEY = 'characters'

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
    const initialState = { current: null, all: loadFromLocalStore() } as CharacterStoreState
    const store = writable(initialState)
    const { subscribe } = store

    const saveOnLocalStorage = () => {
        const characters = get(store).all

        window.localStorage.setItem(LS_KEY, JSON.stringify(characters))
    }

    const set: typeof store.set = (value) => {
        store.set(value)
        saveOnLocalStorage()
    }

    const update: typeof store.update = (updater) => {
        store.update(updater)
        saveOnLocalStorage()
    }

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
                all: newAllState,
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

const loadFromLocalStore = (): Character[] => {
    const storedCharacters = JSON.parse(window.localStorage.getItem('characters')) as Character[]

    return storedCharacters || []
}

export default initStore()
