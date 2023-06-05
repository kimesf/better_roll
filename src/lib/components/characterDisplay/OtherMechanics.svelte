<script lang="ts">
    import { selectedCharacter } from '../../stores/selectedCharacter'
    import CoreMechanics from './CoreMechanics.svelte'
</script>

<CoreMechanics />

<div>
    {#each $selectedCharacter.mechanics.other as mechanic}
        <p>
            {mechanic.name}:
            {mechanic.value}
        </p>
    {/each}
</div>
