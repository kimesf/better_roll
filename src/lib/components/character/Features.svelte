<script lang="ts">
    import { character } from '../../stores/currentCharacter'
    import Collapsible from '../shared/Collapsible.svelte'
</script>

{#each $character.features as feature}
    <Collapsible>
        <span slot="title" class="text-xl my-2">
            {feature.name}
        </span>

        <div slot="body">
            {feature.notes}
        </div>
    </Collapsible>
{/each}
