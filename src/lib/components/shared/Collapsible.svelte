<script lang='ts'>
    let visible = false

    const toggle = () => visible = !visible
</script>

<slot {visible} />

<div>
    <button class='w-full flex items-center' on:click={() => toggle()}>
        <i
            class='arrow mr-2 border-amber-500'
            class:down={visible}
            class:right={!visible}
        />

        <slot name=title />
    </button>

    {#if visible}
        <div class='pb-4'>
            <slot name=body />
        </div>

        <hr class='border-neutral-500'>
    {/if}
</div>
