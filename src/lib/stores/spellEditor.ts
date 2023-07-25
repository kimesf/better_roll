import { writable, type Readable } from 'svelte/store'
import type { Spell } from '../types'
// import characterRepository from './characterRepository'

type SpellIndex = number | null

// type SpellIndexesByKey = { [key: string]: number }

interface SpellEditorStore extends Readable<SpellIndex> {
    set: (index: number) => void
}

const initStore = (): SpellEditorStore => {
    const { subscribe, set } = writable(null)

    // const setFromAbsoluteIndex: SpellEditorStore['set'] = (spell) => {
    //     set(indexOf(spell))
    // }

    // const indexOf = (spell: Spell): number => {
    //     return spellIndexes[keyFor(spell)] as number
    // }

    // const spellIndexes = (): SpellIndexesByKey => {
    //     return get(characterRepository).current.spells.reduce((acc, spell, index) => {
    //         return Object.assign(acc, { [keyFor(spell)]: index })
    //     }, {}) as SpellIndexesByKey
    // }

    // const keyFor = (spell: Spell): keyof SpellIndexesByKey => {
    //     return spell.name
    // }

    return {
        subscribe,
        set,
    }
}

export default initStore()
