<script lang="ts">
    import { character } from '../../stores/character'
    import CoreMechanics from './CoreMechanics.svelte'
</script>

<CoreMechanics />

<div>
    {#each $character.current.mechanics.other as mechanic}
        <p>
            {mechanic.name}:
            {mechanic.value}
        </p>
    {/each}
</div>
