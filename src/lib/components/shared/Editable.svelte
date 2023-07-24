<script lang="ts">
    import canEdit from '../../stores/canEdit'
    import Container from './Container.svelte'

    export let row = false
    export let onlyShow = false
</script>

<Container class={$$props.class || ''} {row}>
    {#if onlyShow}
        <slot name="showing" />
    {:else if $$slots.default && $canEdit}
        <slot />
    {:else if $canEdit}
        <slot name="editing" />
    {:else}
        <slot name="showing" />
    {/if}
</Container>
