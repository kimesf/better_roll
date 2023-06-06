import { writable, type Readable, get } from 'svelte/store'
import devCharacter from './devCharacter'

type Coin = 'copper' | 'silver' | 'gold' | 'platinum'

type Attribute = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'

type School =
    | 'abjuration'
    | 'conjuration'
    | 'divination'
    | 'enchantment'
    | 'evocation'
    | 'illusion'
    | 'necromancy'
    | 'transmutation'

const PROFICIENCY_BONUS: { [key: number]: number } = {
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 3,
    9: 4,
    10: 4,
    11: 4,
    12: 4,
    13: 5,
    14: 5,
    15: 5,
    16: 5,
    17: 6,
    18: 6,
    19: 6,
    20: 6,
} as const

type Character = {
    name: string
    lineages: string
    level: number
    classes: string
    attributes: {
        [key in Attribute]: number
    }
    mechanics: {
        hitPoints: {
            total: number
            current: number
            temporary: number
            debuff: number
        }
        initiative: number
        defense: number
        walkSpeed: number
        flySpeed: number
        swimSpeed: number
        darkVision: number
        other: Mechanic[]
    }
    skills: Skill[]
    tools: Tool[]
    resources: {
        coins: {
            [key in Coin]: number
        }
        recoverable: Recoverable[]
        finite: Finite[]
    }
    features: Feature[]
    attacks: Attack[]
    spells: Spell[]
}

type Mechanic = {
    name: string
    value: string
}

type Skill = {
    name: string
    attribute: Attribute
    proficiency: boolean
    expertise: boolean
    otherBonus: number
}

type Tool = {
    name: string
    expertise: boolean
    otherBonus: number
}

type Recoverable = {
    name: string
    current: number
    total: number
    recoveredBy: 'long' | 'short'
    notes: string
    source: string
}

type Finite = {
    name: string
    amount: number
    unity: string
    notes: string
    source: string
}

type Feature = {
    name: string
    notes: string
    source: string
}

type Attack = {
    name: string
    addProficiency: boolean
    attribute: Attribute | null
    hitBonus: number
    damage: string
    damageType: string
    notes: string
    source: string
}

type Spell = {
    circle: number
    alwaysAvailable: boolean
    available: boolean
    name: string
    school: School
    conjurationTime: string
    range: string
    target: string
    components: {
        verbal: boolean
        somatic: boolean
        material: boolean
        notes: string
    }
    duration: string
    concentration: boolean
    ritual: boolean
    notes: string
    source: string
}

type CharacterStoreState = {
    current: Character | null,
    all: Character[],
}

interface CharacterStore extends Readable<CharacterStoreState> {
    select: (character: Character) => void,
    proficiencyBonus: () => number,
}

const initStore = (): CharacterStore => {
    const initialState = {
        current: null,
        all: [devCharacter]
    } as CharacterStoreState

    const store = writable(initialState)
    const { subscribe, update } = store

    const select: CharacterStore['select'] = (character) => {
        update((previousState) => ({
            ...previousState,
            current: character,
        }))
    }

    const proficiencyBonus: CharacterStore['proficiencyBonus'] = () => {
        const level = get(store).current.level

        return PROFICIENCY_BONUS[level]
    }

    return {
        subscribe,
        select,
        proficiencyBonus,
    }
}

export type { Character, Attribute, Skill, Coin, Spell }
export const character = initStore()
