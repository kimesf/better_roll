<script lang="ts">
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import DistanceNumber from '../shared/DistanceNumber.svelte'
    import WeightNumber from '../shared/WeightNumber.svelte'
    import Container from '../shared/Container.svelte'
    import { character, attributesModifiers } from '../../stores/currentCharacter'

    $: jumpDistanceInFeet = $character.attributes.str
    $: jumpHeightInFeet = 3 + $attributesModifiers.str
    $: pushAndPullInPounds = 30 * $character.attributes.str
    $: maxLoadInPounds = 15 * $character.attributes.str
</script>

<Container>
    <div>
        <Title title={i18n.t('display.skills.jump')} />

        <div>
            <p class="text-sm text-secondary">{i18n.t('display.skills.distance')}</p>
            <p><DistanceNumber distanceInFeet={jumpDistanceInFeet} /></p>
        </div>

        <div>
            <p class="text-sm text-secondary">{i18n.t('display.skills.height')}</p>
            <p><DistanceNumber distanceInFeet={jumpHeightInFeet} /></p>
        </div>
    </div>

    <div>
        <Title title={i18n.t('display.skills.atletics')} />

        <div>
            <p class="text-sm text-secondary">{i18n.t('display.skills.pushAndPull')}</p>
            <p><WeightNumber weightInPounds={pushAndPullInPounds} /></p>
        </div>

        <div>
            <p class="text-sm text-secondary">{i18n.t('display.skills.maxLoad')}</p>
            <p><WeightNumber weightInPounds={maxLoadInPounds} /></p>
        </div>
    </div>
</Container>
