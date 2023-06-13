<script lang="ts">
    import { character } from '../../stores/currentCharacter'
    import Title from '../shared/Title.svelte'
    import i18n from '../../stores/i18n';

    let visible: string | null = null

    const toggle = (featureName: string) => {
        visible = featureName == visible
            ? null
            : featureName
    }
</script>

<Title title={i18n.t('display.features')}/>

<hr>

{#each $character.features as feature}
    <div>
        <button class='flex items-center text-xl my-4' on:click={() => toggle(feature.name)}>
            <!-- TODO: maybe remove this > dup here and in features -->
            <i
                class='arrow mr-2 border-amber-500'
                class:down={visible == feature.name}
                class:right={visible != feature.name}
            />
            {feature.name}
        </button>

        {#if visible == feature.name}
            <div>{feature.notes}</div>
        {/if}
    </div>
{/each}
