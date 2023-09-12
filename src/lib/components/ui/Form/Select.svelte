<script lang="ts">
    import { tv, type VariantProps } from "tailwind-variants"
    import type { HTMLSelectAttributes } from 'svelte/elements'

    const variants = tv({
        base: 'p-2 bg-neutral-500 rounded-md text-primary  text-sm shadow-lg w-full',
    })

    type Option = string | number
    type Label = string | number

    type $$Props = HTMLSelectAttributes & VariantProps<typeof variants> &{
        options: [Option, Label][]
    }

    export let value: $$Props['value'] = undefined
    export let options: $$Props['options']
</script>

<select {...$$restProps} class={variants()} bind:value>
    {#each options as [option, label]}
        <option value={option}>{label}</option>
    {/each}
</select>
