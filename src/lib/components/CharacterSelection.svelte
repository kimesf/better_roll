<script>
  import { characters } from "../stores/characters"
  import { selectedCharacter } from "../stores/selectedCharacter"
  import { i18n } from "../stores/i18n"

  const { select } = selectedCharacter
</script>

<div>
  <h1>
    {i18n.t("selection.title")}
    :
  </h1>

  <div>
    {#each $characters as character}
      <button on:click={() => select(character)}>
        {character.name}
      </button>
    {/each}
  </div>
</div>
