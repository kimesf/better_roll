<script lang='ts'>
    import { character } from '../../stores/currentCharacter'

    let opened: string | null = null

    const toggle = (featureName: string) => {
        if (featureName == opened) {
            opened = null
            return
        }

        opened = featureName
    }
</script>

{#each $character.features as feature}
    <div>
        <button class='text-orange-500' on:click={() => toggle(feature.name)}>
            {feature.name}
        </button>

        {#if opened == feature.name}
            <div>{feature.notes}</div>
        {/if}
    </div>
{/each}
