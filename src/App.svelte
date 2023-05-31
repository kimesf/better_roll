<script lang="ts">
  import { characters as characterStore } from "./lib/stores/characters";

  let characters = $characterStore;
</script>

<main>
  <h1>Better Roll</h1>

  {#each characters as character}
    {character.name}
  {/each}
</main>

<style>
</style>
