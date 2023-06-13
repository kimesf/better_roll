<script lang="ts">
    import CharacterDisplay from './lib/components/CharacterDisplay.svelte'
    import CharacterSelection from './lib/components/CharacterSelection.svelte'
    import { character } from './lib/stores/currentCharacter'
</script>

<main class="min-h-screen bg-neutral-900 text-neutral-200 font-mono">
    {#if $character}
        <CharacterDisplay />
    {:else}
        <CharacterSelection />
    {/if}
</main>
