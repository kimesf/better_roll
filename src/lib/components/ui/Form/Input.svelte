<script lang="ts">
    import { tv, type VariantProps } from 'tailwind-variants'
    import type { HTMLInputAttributes } from 'svelte/elements'

    // TODO: use same variants for input, textarea, select?
    const variants = tv({
        base: 'p-2 bg-neutral-500 rounded-md text-primary text-sm shadow-lg',
        variants: {
            type: {
                text: 'w-full',
                number: 'w-12 text-center',
            }
        },
    })

    type $$Props = HTMLInputAttributes & VariantProps<typeof variants>

    // type $$Props = HTMLInputAttributes & {
    //     something: string
    // }

    let klass: string | undefined | null = undefined
    export { klass as class }

    export let type: $$Props['type'] = undefined
    export let value: $$Props['value'] = undefined

    // export let checked: $$Props['checked'] = undefined
    // export let files: $$Props['files'] = undefined

    // let klass = ($$props.class as string | undefined) || ''
</script>

<input class={variants({ type, class: klass })} {...$$restProps} bind:value />

<!--
    .no_highlights{
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    button,
    textarea,
    input,
    select,
    a{
     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
     -webkit-tap-highlight-color: transparent;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
      user-select: none;
    }
-->


<!--
{#if type == 'text'}
    <input {id} bind:value class={twMerge('w-full', klass)} {placeholder} type="text" />
{:else if type == 'number'}
    <input {id} bind:value class={twMerge('w-12 text-center', klass)} type="number" />
{:else if type == 'textarea'}
    <textarea {id} bind:value class={twMerge('w-full', klass)} {placeholder} />
{:else if type == 'radio'}
    {#if label}
        <label for={id}>{label}</label>
    {/if}

    <input {id} bind:group {value} class={klass} type="radio" />
{:else if type == 'checkbox'}
    <span>
        <input {id} bind:checked class={klass} type="checkbox" />

        {#if label}
            <label for={id}>{label}</label>
        {/if}
    </span>
{:else if type == 'file'}
    <input {id} type="file" bind:files {accept} class={twMerge('w-full', klass)} />
{:else if type == 'select'}
    <select {id} bind:value>
        {#each options as [option, label]}
            <option value={option}>{label}</option>
        {/each}
    </select>
{/if}

<style lang="postcss">
    input,
    textarea,
    select {
        @apply
    }
</style>
-->
