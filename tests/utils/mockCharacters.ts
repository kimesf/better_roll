import { vi } from 'vitest'

const store = await vi.hoisted(async () => {
    const { writable } = await vi.importActual<typeof import('svelte/store')>('svelte/store')

    return writable({ current: {} })
})

export const charactersMock = { default: store }

export const setCharacter = (hash) => {
    store.set({ current: hash })
}

