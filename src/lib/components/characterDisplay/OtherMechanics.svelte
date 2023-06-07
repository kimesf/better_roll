<script lang="ts">
    import { character } from '../../stores/currentCharacter'
    import CoreMechanics from './CoreMechanics.svelte'
</script>

<CoreMechanics />

{#each $character.mechanics.other as mechanic}
    <div>
        {mechanic.name}:
        {mechanic.value}
    </div>
{/each}
