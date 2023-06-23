<script lang="ts">
    import Editable from "./Editable.svelte";
    import canEdit from "../../stores/canEdit"

    export let id
    export let contentClasses = ''
    export let signClasses = ''
    export let value
</script>

<div class="flex justify-around items-center">
    <button
        class:invisible={!$canEdit}
        class={`text-red-500 ${signClasses}`}
        on:click={() => value--}
    >
        -
    </button>

    <Editable>
        <input
            slot="editing"
            {id}
            type="number"
            class="input w-12 text-center"
            bind:value
        />
        <span slot="showing" class={contentClasses}>
            {#if $$slots.default}
                <slot />
            {:else}
                {value}
            {/if}
        </span>
    </Editable>

    <button
        class:invisible={!$canEdit}
        class={`text-green-500 ${signClasses}`}
        on:click={() => value++}
    >
        +
    </button>
</div>
