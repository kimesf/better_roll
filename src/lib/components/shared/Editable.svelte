<script lang="ts">
    import { slide } from 'svelte/transition'
    import canEdit from '../../stores/canEdit'
    import Container from './Container.svelte'

    export let row = false
</script>

{#if $$slots.default && $canEdit}
    <div transition:slide>
        <Container class="{$$props.class || ''}" {row}>
            <slot />
        </Container>
    </div>
{/if}

{#if $$slots.editing || $$slots.showing}
    <div class="{$$props.class || ''}">
        {#if $canEdit}
            <slot name="editing" />
        {:else}
            <slot name="showing" />
        {/if}
    </div>
{/if}
