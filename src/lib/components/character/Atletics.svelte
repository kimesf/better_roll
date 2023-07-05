<script lang="ts">
    import { t } from '../../stores/i18n'
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
    <Title title={t('display.skills.jump')} />

    <div >
        <p class="text-sm text-secondary">{t('display.skills.distance')}</p>
        <DistanceNumber distanceInFeet={jumpDistanceInFeet} />
    </div>

    <div>
        <p class="text-sm text-secondary">{t('display.skills.height')}</p>
        <DistanceNumber distanceInFeet={jumpHeightInFeet} />
    </div>
</Container>

<Container>
    <Title title={t('display.skills.atletics')} />

    <div>
        <p class="text-sm text-secondary">{t('display.skills.pushAndPull')}</p>
        <WeightNumber weightInPounds={pushAndPullInPounds} />
    </div>

    <div>
        <p class="text-sm text-secondary">{t('display.skills.maxLoad')}</p>
        <WeightNumber weightInPounds={maxLoadInPounds} />
    </div>
</Container>
