<script lang="ts">
    import Separator from './Separator.svelte'

    let visible = false
    const toggle = () => (visible = !visible)
</script>

<slot {visible} />

<div>
    <button class="w-full flex items-center" on:click={() => toggle()}>
        <i class="arrow mr-2 border-amber-500" class:down={visible} class:right={!visible} />

        <slot name="title" />
    </button>

    {#if visible}
        <Separator />

        <div class="pt-2">
            <slot name="body" />
        </div>
    {/if}
</div>
