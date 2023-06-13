<script lang='ts'>
    let visible = false

    const toggle = () => visible = !visible
</script>

<slot {visible} />

<div>
    <button on:click={() => toggle()}>
        <slot  name='title' />
    </button>

    {#if visible}
        <slot name='body' />
    {/if}
</div>
