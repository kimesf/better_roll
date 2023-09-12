<script lang="ts">
    export let title: string
    export let left = false
    export let right = false
</script>

<div class="w-full uppercase text-xl font-bold flex justify-between items-center gap-4">
    {#if left}
        <div class="line" />
    {/if}

    {title}

    {#if right}
        <div class="line" />
    {/if}
</div>

<style lang="postcss">
    .line {
        @apply grow border-t-2;
    }
</style>
