import { derived } from 'svelte/store'
import characters from './characterRepository'
import { ATTRIBUTES, PROFICIENCY_BONUS } from '../constants'
import { type Attribute, type Skill } from '../types'

type SkillsGroupedByAttr = {
    [key in Attribute]: Skill[]
}

export const character = derived(characters, ($characters) => $characters.current)

export const proficiencyBonus = derived(character, ($character) => PROFICIENCY_BONUS[$character.level])

export const skillsGroupedByAttribute = derived(character, ($character) => {
    return $character.skills.reduce((acc, skill) => {
        const key = skill.attribute
        const group = (acc[key] || []).concat(skill)

        return Object.assign(acc, { [key]: group })
    }, {} as SkillsGroupedByAttr)
})

export const attributesModifiers = derived(character, ($character) => {
    return ATTRIBUTES.reduce((acc, attrName) => {
        const value = $character.attributes[attrName]
        const mod = Math.floor((value - 10) / 2)
        acc[attrName] = mod

        return acc
    }, {} as { [key in Attribute]: number })
})
