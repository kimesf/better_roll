<script lang="ts">
  import { selectedCharacter } from "../../stores/selectedCharacter";

  let opened: string | null = null

  const open = (featureName: string) => {
    if(featureName == opened) {
      opened = null
      return
    }

    opened = featureName
  }
</script>

{#each $selectedCharacter.features as feature}
  <div>
    <button class="text-orange-500" on:click={() => open(feature.name)}>
      {feature.name}
    </button>

    {#if opened == feature.name}
      <div>{feature.notes}</div>
    {/if}
  </div>
{/each}
