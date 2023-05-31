<script>
  import { characters } from "../stores/characters";
  import { selectedCharacter } from "../stores/selectedCharacter";

  const { select } = selectedCharacter
</script>

<div>
  <h1>Selecione ser personagem:</h1>

  <div>
    {#each $characters as character}
      <button on:click={() => select(character)}>
        {character.name}
      </button>
    {/each}
  </div>
</div>
