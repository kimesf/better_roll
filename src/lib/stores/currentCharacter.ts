import { derived } from 'svelte/store'
import characters from './characterRepository'
import { PROFICIENCY_BONUS } from '../constants'

export const character = derived(characters, ($characters) => $characters.current)

export const proficiencyBonus = derived(character, ($character) => PROFICIENCY_BONUS[$character.level])

export const skillsGroupedByAttribute = derived(character, ($character) => $character.skills)
