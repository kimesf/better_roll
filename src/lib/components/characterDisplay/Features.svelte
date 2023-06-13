<script lang="ts">
    import { character } from '../../stores/currentCharacter'
    import Title from '../shared/Title.svelte'
    import i18n from '../../stores/i18n';
    import Collapsible from '../shared/Collapsible.svelte'
</script>

<Title title={i18n.t('display.features')}/>

<hr>

{#each $character.features as feature}
    <Collapsible>
        <span slot=title class='text-xl my-2'>
            {feature.name}
        </span>

        <div slot=body>
            {feature.notes}
        </div>
    </Collapsible>
{/each}
