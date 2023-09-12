<script lang="ts">
    import Editable from './Editable.svelte'
    import canEdit from '../../stores/canEdit'
    import Input from './Input.svelte'

    export let id
    export let contentClasses = ''
    export let value
</script>

<div class="{$$props.class || ''} w-full flex justify-around items-center">
    <button class:invisible={!$canEdit} class="text-red-500 text-4xl" on:click={() => value--}> - </button>

    <Editable class="w-fit">
        <div slot="editing" class="flex items-center">
            <Input type="number" {id} bind:value />

            {#if $$slots.extra}
                <span class="text-base"> | </span>
            {/if}

            <slot name="extra" />
        </div>

        <span slot="showing" class={contentClasses}>
            {#if $$slots.default}
                <slot />
            {:else}
                {value}
            {/if}
        </span>
    </Editable>

    <button class:invisible={!$canEdit} class="text-green-500 text-4xl" on:click={() => value++}> + </button>
</div>
