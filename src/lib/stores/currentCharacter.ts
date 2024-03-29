import { derived, type Readable } from 'svelte/store'
import characters from './characterRepository'
import { ATTRIBUTES, PROFICIENCY_BONUS } from '../constants'
import { type Attribute, type Character, type ProficiencyBonus, type Skill } from '../types'

type SkillsGroupedByAttr = {
    [key in Attribute]: Skill[]
}

type AttributesMofifiers = {
    [key in Attribute]: number
}

export const character: Readable<Character> = derived(characters, ($characters) => $characters.current)

export const proficiencyBonus: Readable<ProficiencyBonus> = derived(character, ($character) => {
    if (!$character) {
        return 0 as ProficiencyBonus
    }

    return PROFICIENCY_BONUS[$character.level]
})

export const skillsGroupedByAttribute: Readable<SkillsGroupedByAttr> = derived(character, ($character) => {
    if (!$character) {
        return {} as SkillsGroupedByAttr
    }

    return $character.skills.reduce((acc, skill) => {
        const key = skill.attribute
        const group = (acc[key] || []).concat(skill)

        return Object.assign(acc, { [key]: group })
    }, {} as SkillsGroupedByAttr)
})

export const attributesModifiers: Readable<AttributesMofifiers> = derived(character, ($character) => {
    if (!$character) {
        return {} as AttributesMofifiers
    }

    return ATTRIBUTES.reduce((acc, attrName) => {
        const value = $character.attributes[attrName]
        const mod = Math.floor((value - 10) / 2)
        acc[attrName] = mod

        return acc
    }, {} as AttributesMofifiers)
})
