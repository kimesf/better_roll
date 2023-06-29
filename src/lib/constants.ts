import type { Attribute, Level, ProficiencyBonus, Coin, SpellCircle, School } from './types'

export const ATTRIBUTES: Attribute[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

export const SPELL_CIRCLES: SpellCircle[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const SCHOOLS: School[] = [
    'abjuration',
    'conjuration',
    'divination',
    'enchantment',
    'evocation',
    'illusion',
    'necromancy',
    'transmutation',
]

export const PROFICIENCY_BONUS: { [key in Level]: ProficiencyBonus } = {
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

export const coins: Coin[] = ['copper', 'silver', 'gold', 'platinum']
