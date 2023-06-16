<script lang="ts">
    import { slide } from 'svelte/transition';
    import Separator from './Separator.svelte'

    let visible = false
    const toggle = () => (visible = !visible)
</script>

<slot {visible} />

<div>
    <button class="w-full flex items-center" on:click={() => toggle()}>
        <i class="arrow mr-2 border-amber-500" class:arrow-down={visible} class:arrow-right={!visible} />

        <slot name="title" />
    </button>

    {#if visible}
        <Separator />

        <div transition:slide class="pt-2">
            <slot name="body" />
        </div>
    {/if}
</div>

<style>
    .arrow {
        border-width: 0 3px 3px 0;
        padding: 3px;
        transition: transform .1s linear;
        display: inline-block;

    }

    .arrow-right {
        transform: rotate(-45deg);
    }

    .arrow-down {
        transform: rotate(45deg);
    }
</style>
