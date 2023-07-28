<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements'
    import { tv, type VariantProps } from 'tailwind-variants'

    const variants = tv({
        base: 'w-full grid',
        variants: {
            gap: {
                no: 'gap-0',
                xs: 'gap-1',
                sm: 'gap-2',
                md: 'gap-4',
            },
            cols: {
                2: 'grid-cols-2',
            }
        },
    })

    type $$Props = SvelteHTMLElements['div'] & VariantProps<typeof variants>

    export let gap: $$Props['gap'] = 'md'
    export let cols: $$Props['cols'] = 2

    const klass = ($$props.class as string | undefined) || ''
</script>

<div class={variants({ gap, cols, class: klass})}>
    <slot />
</div>
