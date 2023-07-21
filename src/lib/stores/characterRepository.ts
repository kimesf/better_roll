import { get, writable, type Writable } from 'svelte/store'
import {
    type Attack,
    type Character,
    type EquippedItem,
    type Feature,
    type Finite,
    type Mechanic,
    type Recoverable,
    type Spell,
    type SpellSlot,
    type Tool,
} from '../types'
import defaultCharacter from '../defaultCharacter'

const LS_KEY = 'characters'

type CharacterStoreState = {
    current: Character | null
    all: Character[]
}

type Relations = {
    attacks: Attack
    features: Feature
    'mechanics.other': Mechanic
    'resources.finite': Finite
    'resources.recoverable': Recoverable
    'resources.equippedItems': EquippedItem
    spells: Spell
    'spellMechanics.slots': SpellSlot
    tools: Tool
}

interface CharacterStore extends Writable<CharacterStoreState> {
    select: (character: Character) => void
    create: () => void
    createRelation: (path: keyof Relations, relation: Relations[typeof path]) => void
    destroyRelation: (path: keyof Relations, index: number) => void
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

    const createRelation: CharacterStore['createRelation'] = (path, relation) => {
        digFromCurrent(path).push(structuredClone(relation))
        triggerUpdate()
    }

    const destroyRelation: CharacterStore['destroyRelation'] = (path, index) => {
        digFromCurrent(path).splice(index, 1)
        triggerUpdate()
    }

    const digFromCurrent = (path: keyof Relations): Relations[typeof path][] => {
        return path
            .split('.')
            .reduce((o, i) => o[i], current()) as Relations[typeof path][] // eslint-disable-line
    }

    const current = (): Character => {
        return get(store).current
    }

    const triggerUpdate = (): void => {
        store.set(get(store))
    }

    return {
        subscribe,
        select,
        create,
        createRelation,
        destroyRelation,
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
