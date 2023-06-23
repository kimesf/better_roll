import { writable, type Readable } from 'svelte/store'

interface canEditStore extends Readable<boolean> {
    toggle: () => void
}

const initStore = (): canEditStore => {
    const { subscribe, update } = writable(false)

    const toggle = () => {
        update((previous) => !previous)
    }

    return {
        subscribe,
        toggle,
    }
}

export default initStore()
