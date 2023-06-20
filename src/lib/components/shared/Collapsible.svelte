<script lang="ts">
    import { slide } from 'svelte/transition'
    import Separator from './Separator.svelte'

    let visible = false
    const toggle = () => (visible = !visible)
</script>

<slot {visible} />

<div>
    <div class="w-full flex items-center">
        <button class="mr-4" on:click={() => toggle()}>
            <i class="arrow p-1 border-amber-500" class:arrow-down={visible} class:arrow-right={!visible} />
        </button>

        <slot name="title" />
    </div>

    {#if visible}
        <Separator />

        <div transition:slide>
            <slot name="body" />
        </div>
    {/if}
</div>

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
