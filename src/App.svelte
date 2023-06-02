<script lang="ts">
  import CharacterDisplay from "./lib/components/CharacterDisplay.svelte";
  import CharacterSelection from "./lib/components/CharacterSelection.svelte";
  import { selectedCharacter } from "./lib/stores/selectedCharacter";
</script>

<main class="min-h-screen bg-neutral-900 text-white font-mono">
  {#if $selectedCharacter}
    <CharacterDisplay />
  {:else}
    <CharacterSelection />
  {/if}
</main>
