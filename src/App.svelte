<script lang="ts">
    import Display from './lib/components/Display.svelte'
    import Selection from './lib/components/Selection.svelte'
    import characterRepository from './lib/stores/characterRepository'
</script>

<main class="min-h-screen bg-primary text-primary font-mono">
    {#if !!$characterRepository.current}
        <Display />
    {:else}
        <Selection />
    {/if}
</main>
