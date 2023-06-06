<script lang="ts">
    import CharacterDisplay from './lib/components/CharacterDisplay.svelte'
    import CharacterSelection from './lib/components/CharacterSelection.svelte'
    import { character } from './lib/stores/character';
</script>

<main class="min-h-screen bg-neutral-900 text-white font-mono">
    {#if $character.current}
        <CharacterDisplay />
    {:else}
        <CharacterSelection />
    {/if}
</main>
