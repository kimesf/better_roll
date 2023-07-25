<script lang="ts">
    import canEdit from '../../stores/canEdit'
    import Container from './Container.svelte'

    export let row = false
    export let onlyShow = false
</script>

{#if onlyShow}
    <Container class={$$props.class || ''} {row}>
        <slot name="showing" />
    </Container>
{:else if $$slots.default && $canEdit}
    <Container class={$$props.class || ''} {row}>
        <slot />
    </Container>
{:else if $canEdit && $$slots.editing}
    <Container class={$$props.class || ''} {row}>
        <slot name="editing" />
    </Container>
{:else if $$slots.showing}
    <Container class={$$props.class || ''} {row}>
        <slot name="showing" />
    </Container>
{/if}
