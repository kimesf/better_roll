import { get } from 'svelte/store'
import { vi } from 'vitest'

const store = await vi.hoisted(async () => {
    const { writable } = await vi.importActual<typeof import('svelte/store')>('svelte/store')

    return writable({ current: null, all: [] })
})

export const charactersMock = {
    default: {
        subscribe: store.subscribe,
        select: vi.fn(),
    },
}

export const setCurrent = (hash) => {
    store.update((previous) => ({
        ...previous,
        current: hash,
    }))
}

export const addCharacter = (hash) => {
    store.update((previous) => ({
        ...previous,
        all: [...previous.all, hash],
    }))
}
