import { get } from 'svelte/store'
import store from './characterRepository'
import { type Character } from '../types'
import defaultCharacter from '../defaultCharacter'

// TODO: dup
const createCharacter = () => defaultCharacter
const loadStoreValue = () => get(store)

describe('Character Store', () => {
    afterEach(() => store.set({all: [], current: null}))

    describe('#select', () => {
        it('changes current character', () => {
            const initialState = loadStoreValue()
            expect(initialState.current).toBe(null)

            const newCharacter = createCharacter()
            newCharacter.name = 'Jake'
            store.select(newCharacter)

            const finalState = loadStoreValue()
            expect(finalState).toBeTruthy()
            expect(finalState.current.name).toBe('Jake')
        })
    })

    describe('#create', () => {
        it('creates a new character', () => {
            const initialState = loadStoreValue()
            expect(initialState.all).toStrictEqual([])

            store.create()
            expect(loadStoreValue().all).not.toEqual([])
        })
    })

    describe('#destroy', () => {
        it('destroy character in given position', () => {
            const char1 = { name: 'Joe' } as Character
            const char2 = { name: 'Ana' } as Character
            const char3 = { name: 'Maria' } as Character

            store.set({ all: [char1, char2, char3], current: null})
            expect(loadStoreValue().all).toEqual([char1, char2, char3])

            store.destroy(1)
            expect(loadStoreValue().all).toEqual([char1, char3])
        })
    })
})
