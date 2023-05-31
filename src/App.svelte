<script lang="ts">
  import CharacterSelection from "./lib/components/CharacterSelection.svelte";
  import { selectedCharacter } from "./lib/stores/selectedCharacter";
</script>

<main>
  <h1>Better Roll</h1>

  {#if $selectedCharacter}
    CharacterSheet TODO
  {:else}
    <CharacterSelection />
  {/if}
</main>

<style>
</style>
