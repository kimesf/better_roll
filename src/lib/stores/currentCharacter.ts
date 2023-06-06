import { derived } from 'svelte/store'
import characters from './characterRepository'
import { PROFICIENCY_BONUS } from '../constants'
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
