import { get } from 'svelte/store'
import store from './characterRepository'
import { type Character } from '../types'
import devCharacter from './devCharacter'

// TODO: dup
const createCharacter = () => devCharacter as Character
const loadStoreValue = () => get(store)

describe('Character Store', () => {
    afterEach(() => store.select(null))

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
})
