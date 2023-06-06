<script lang="ts">
    import { character } from '../../stores/character'

    let opened: string | null = null

    const open = (featureName: string) => {
        if (featureName == opened) {
            opened = null
            return
        }

        opened = featureName
    }
</script>

{#each $character.current.features as feature}
    <div>
        <button class="text-orange-500" on:click={() => open(feature.name)}>
            {feature.name}
        </button>

        {#if opened == feature.name}
            <div>{feature.notes}</div>
        {/if}
    </div>
{/each}
