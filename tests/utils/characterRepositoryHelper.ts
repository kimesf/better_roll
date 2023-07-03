import characterRepository from '../../src/lib/stores/characterRepository'
import { get } from 'svelte/store'

export const getCurrent = () => {
    return get(characterRepository).current
}

export const setCurrent = (hash) => {
    characterRepository.update((previous) => ({
        ...previous,
        current: hash,
    }))
}

export const addCharacter = (hash) => {
    characterRepository.update((previous) => ({
        ...previous,
        all: [...previous.all, hash],
    }))
}

export const clean = () => {
    characterRepository.set({
        current: null,
        all: [],
    })
}
