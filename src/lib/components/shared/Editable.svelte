<script lang=ts>
    import canEdit from "../../stores/canEdit";
</script>

{#if $canEdit}
    <slot />
{/if}

{#if $canEdit}
    <slot name='editing' />
{:else}
    <slot name='showing' />
{/if}

