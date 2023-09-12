<script lang="ts">
    import { tv, type VariantProps } from "tailwind-variants";
    import type { HTMLTextareaAttributes } from 'svelte/elements'

    const variants = tv({
        base: 'bg-neutral-500 rounded-md p-1 text-primary text-sm shadow-lg'
    })

    type $$Props = HTMLTextareaAttributes & VariantProps<typeof variants>

    let klass: string | undefined | null = undefined
    export { klass as class }

    export let value: $$Props['value'] = undefined
</script>

<textarea class={variants({ class: klass })} bind:value {...$$restProps} />
