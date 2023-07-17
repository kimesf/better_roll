<script lang="ts">
    import { twMerge } from "tailwind-merge"

    type HandlerEvent = (MouseEvent | TouchEvent) & { currentTarget: EventTarget & HTMLButtonElement }

    export let handler: (e: HandlerEvent) => void = null

    const handle = (e: HandlerEvent): void => {
        if (!handler) {
            return
        }

        handler(e)
    }

    const klass = ($$props.class as string | undefined) || ''
</script>

<button
    class={twMerge('text-xl rounded-md flex items-center justify-center', klass)}
    on:click={handle}
>
    <slot />
</button>
