<script lang="ts">
    import { character } from '../../stores/currentCharacter'
    import CoreMechanics from './CoreMechanics.svelte'
</script>

<CoreMechanics />

<div>
    {#each $character.mechanics.other as mechanic}
        <p>
            {mechanic.name}:
            {mechanic.value}
        </p>
    {/each}
</div>
