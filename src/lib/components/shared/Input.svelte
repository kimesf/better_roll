<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    // todo: better types depending on type. eg. value required if text, checked required if checkbox etc.

    export let id: string
    export let type: 'text' | 'number' | 'textarea' | 'radio' | 'checkbox' | 'file' | 'select'
    export let placeholder = ''
    export let label = null
    export let group = null
    export let value = null
    export let checked = null
    export let files = null
    export let accept = null
    export let options = null

    let klass = ($$props.class as string | undefined) || ''
</script>

<!-- // Usar  composição -->
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
        @apply bg-neutral-500 rounded-md p-1 text-sm shadow-lg;
    }
</style>
