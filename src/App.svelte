<script lang="ts">
    import Display from './lib/components/Display.svelte'
    import Selection from './lib/components/Selection.svelte'
    import { character } from './lib/stores/currentCharacter'
</script>

<main class="min-h-screen bg-primary text-primary font-mono">
    {#if $character}
        <Display />
    {:else}
        <Selection />
    {/if}
</main>
