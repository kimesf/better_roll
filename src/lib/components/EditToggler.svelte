<script>
    import Draggable from './shared/Draggable.svelte'
    import canEdit from '../stores/canEdit'
    import Icon from './shared/Icon.svelte'
</script>

<Draggable class="z-30" top={12}>
    <button
        class="rounded-full shadow-xl"
        class:bg-blue-500={!$canEdit}
        class:bg-green-500={$canEdit}
        on:click={() => canEdit.toggle()}
    >
        {#if $canEdit}
            <Icon name="check" class="p-4" />
        {:else}
            <Icon name="edit" class="p-4" />
        {/if}
    </button>
</Draggable>
