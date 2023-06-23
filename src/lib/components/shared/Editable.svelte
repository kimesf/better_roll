<script lang=ts>
    import { slide } from "svelte/transition"
    import canEdit from "../../stores/canEdit";
</script>

{#if $$slots.default && $canEdit}
    <div transition:slide >
        <slot />
    </div>
{/if}

{#if $canEdit}
    <slot name='editing' />
{:else}
    <slot name='showing' />
{/if}

