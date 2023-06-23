// TODO: implement source and notes

export type Coin = 'copper' | 'silver' | 'gold' | 'platinum'

export type Attribute = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

export type ProficiencyBonus = 2 | 3 | 4 | 5 | 6

export type SpellCircle = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type School =
    | 'abjuration'
    | 'conjuration'
    | 'divination'
    | 'enchantment'
    | 'evocation'
    | 'illusion'
    | 'necromancy'
    | 'transmutation'

export type Character = {
    name: string
    lineages: string
    level: Level
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
        bonusInitiative: number
        defense: number
        walkSpeed: number
        climbSpeed: number
        flySpeed: number
        swimSpeed: number
        darkVision: number
        other: Mechanic[]
    }
    weapons: string
    armors: string
    languages: string
    skills: Skill[]
    tools: Tool[]
    resources: {
        coins: Coins
        recoverable: Recoverable[]
        finite: Finite[]
    }
    features: Feature[]
    attacks: Attack[]
    spellMechanics: SpellMechanics
    spells: Spell[]
}

export type Coins = {
    [key in Coin]: number
}

export type Mechanic = {
    name: string
    value: string
}

export type Skill = {
    name: string
    attribute: Attribute
    proficiency: boolean
    expertise: boolean
    otherBonus: number
}

export type Tool = {
    name: string
    attribute: Attribute
    expertise: boolean
    otherBonus: number
}

export type Recoverable = {
    name: string
    current: number
    total: number
    recoveredBy: 'long' | 'short'
    notes: string
    source: string
}

export type Finite = {
    name: string
    amount: number
    unity: string
    notes: string
    source: string
}

export type Feature = {
    name: string
    notes: string
    source: string
}

export type Attack = {
    name: string
    addProficiency: boolean
    attribute: Attribute | null
    hitBonus: number
    damage: string
    damageType: string
    notes: string
    source: string
}

export type SpellMechanics = {
    attribute: Attribute
    hitBonus: number
    availablePerDay: number
    saveDifficultyBonus: number
    slots: SpellSlot[]
}

export type SpellSlot = {
    circle: SpellCircle
    total: number
    current: number
}

export type Spell = {
    circle: SpellCircle
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
