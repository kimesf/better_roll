<script lang="ts">
    import type { SvelteHTMLElements } from 'svelte/elements'
    import { tv, type VariantProps } from 'tailwind-variants'

    const variants = tv({
        base: 'w-full flex',
        variants: {
            direction: {
                row: 'flex-row',
                col: 'flex-col',
            },
            gap: {
                no: 'gap-0',
                xs: 'gap-1',
                sm: 'gap-2',
                md: 'gap-4',
            },
            justify: {
                no: 'justify-normal',
                start: 'justify-start',
                end: 'justify-end',
                between: 'justify-between',
                center: 'justify-center',
            },
            align: {
                no: 'content-normal',
                center: 'items-center',
            },
        },
    })

    type $$Props = SvelteHTMLElements['div'] & VariantProps<typeof variants>

    export let direction: $$Props['direction'] = 'row'
    export let gap: $$Props['gap'] = 'md'
    export let justify: $$Props['justify'] = 'no'
    export let align: $$Props['align'] = 'no'

    const klass = ($$props.class as string | undefined) || ''
</script>

<div class={variants({ direction, gap, justify, align, class: klass})}>
    <slot />
</div>
