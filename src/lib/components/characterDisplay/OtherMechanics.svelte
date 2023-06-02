<script>
  import { selectedCharacter } from "../../stores/selectedCharacter";
  import CoreMechanics from "./CoreMechanics.svelte";

  $: mechanics = $selectedCharacter.mechanics.other
</script>

<CoreMechanics />

<div>
  {#each mechanics as mechanic}
    <p>
      {mechanic.name}:
      {mechanic.value}
    </p>
  {/each}
</div>
