import { writable, type Readable } from "svelte/store"

type Coin = "copper" | "silver" | "gold" | "platinum"

type Attribute = "str" | "dex" | "con" | "int" | "wis" | "cha"

type School = "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation"

type Character = {
  name: string,
  lineages: string,
  level: number,
  classes: string,
  attributes: {
    [key in Attribute]: number
  },
  mechanics: {
    hitPoints: {
      total: number,
      current: number,
      temporary: number,
      debuff: number,
    },
    initiative: number,
    defense: number,
    walkSpeed: number,
    flySpeed: number,
    swimSpeed: number,
    darkVision: number,
    other: Mechanic[]
  }
  skills: Skill[],
  tools: Tool[],
  resources: {
    coins: {
      [key in Coin]: number
    },
    recoverable: Recoverable[],
    finite: Finite[],
  },
  features: Feature[],
  attacks: Attack[],
  spells: Spell[],
}

type Mechanic = {
  name: string,
  value: string,
}

type Skill = {
  name: string,
  attribute: Attribute,
  proficiency: boolean,
  expertise: boolean,
  otherBonus: number,
}

type Tool = {
  name: string,
  expertise: boolean,
  otherBonus: number,
}

type Recoverable = {
  name: string,
  current: number,
  total: number,
  recoveredBy: "long" | "short",
  notes: string,
  source: string,
}

type Finite = {
 name: string,
 amount: number,
 unity: string,
 notes: string,
 source: string,
}

type Feature = {
  name: string,
  notes: string,
  source: string,
}

type Attack = {
  name: string,
  addProficiency: boolean,
  attribute: Attribute | null,
  hitBonus: number,
  damage: string,
  damageType: string,
  notes: string,
  source: string,
}

type Spell = {
  circle: number,
  alwaysAvailable: boolean,
  available: boolean,
  name: string,
  school: School,
  conjurationTime: string,
  range: string,
  target: string,
  components: {
    verbal: boolean,
    somatic: boolean,
    material: boolean,
    notes: string,
  },
  duration: string,
  concentration: boolean,
  ritual: boolean,
  notes: string,
  source: string,
}

// TODO: change to character store and encasulate characters in here ???
// this would probably add methods like "current" and "all"
interface SelectedCharacterStore extends Readable<Character | null> {
  select: (character: Character) => void
}

const initStore = (): SelectedCharacterStore => {
  const { subscribe, set } = writable(null)

  const select: SelectedCharacterStore["select"] = (character) => set(character)

  return {
    subscribe,
    select
  }
}

export type { Character, Attribute, Skill, Coin, Spell }
export const selectedCharacter = initStore()
