<script lang="ts">
    import { slide } from 'svelte/transition'
    import Separator from './Separator.svelte'
    import Container from './Container.svelte'

    let visible = false
    const toggle = () => (visible = !visible)
</script>

<slot {visible} />

<Container>
    <div class="w-full flex items-center">
        <button class="mr-4" on:click={() => toggle()}>
            <i class="arrow p-1 border-amber-500" class:arrow-down={visible} class:arrow-right={!visible} />
        </button>

        <slot name="title" />
    </div>

    {#if visible}
        <Separator />

        <div transition:slide class="p-2 pt-0">
            <slot name="body" />
        </div>
    {/if}
</Container>

<style>
    .arrow {
        border-width: 0 3px 3px 0;
        transition: transform 0.1s linear;
        display: inline-block;
    }

    .arrow-right {
        transform: rotate(-45deg);
    }

    .arrow-down {
        transform: rotate(45deg);
    }
</style>
