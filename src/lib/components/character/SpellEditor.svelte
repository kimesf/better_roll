<script lang="ts">
    import { t } from '../../stores/i18n'
    import index from '../../stores/spellEditor'
    import { SCHOOLS, SPELL_CIRCLES } from '../../constants'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'
    import Title from '../shared/Title.svelte'
    import InputWithSuggestions from '../shared/InputWithSuggestions.svelte'
    import characterRepository from '../../stores/characterRepository'

    enum ConjurationTimes {
        Action = 'action',
        Bonus = 'bonus',
        Reaction = 'reaction',
        OneMinute = '1minute',
        TenMinutes = '10minutes',
        OneHour = '1hour',
    }

    enum Ranges {
        Touch = 'touch',
        TenFeet = '10feet',
        ThirtyFeet = '30feet',
        SixtyFeet = '60feet',
        NinetyFeet = '90feet',
        OneHundredAndTwentyFeet = '120feet',
        OneHundredAndFiftyFeet = '150feet',
        FiveHundredFeet = '500feet',
        Self = 'self',
        SelfFiveFootRadius = 'self5footRadius',
        SelfTenFootRadius = 'self10footRadius',
        SelfThirtyFootRadius = 'self30footRadius',
        SelfFifteenFootCone = 'self15footCone',
        SelfFifteenFootCube = 'self15footCube',
        SelfThirtyFootLine = 'self30footLine',
    }

    enum Targets {
        Self = 'self',
        OneCreature = 'oneCreature',
        OneCreatureInSight = 'oneCreatureInSight',
        OneCreatureWilling = 'oneCreatureWilling',
        UpToThreeCreature = 'upToThreeCreatures',
        AllCreaturesInRange = 'allCreaturesInRange',
    }

    enum Durations {
        Instant = 'instant',
        OneRound = '1round',
        OneMinute = '1minute',
        TenMinutes = '10minutes',
        Onehour = '1hour',
        EightHours = '8hours',
        OneDay = '1day',
        Permanent = 'permanent',
    }

    const conjurationTimes = Object.values(ConjurationTimes).map((key) => t(`character.spells.conjurationTime.${key}`))
    const ranges = Object.values(Ranges).map((key) => t(`character.spells.range.${key}`))
    const targets = Object.values(Targets).map((key) => t(`character.spells.target.${key}`))
    const durations = Object.values(Durations).map((key) => t(`character.spells.duration.${key}`))

    const formsWithSuggestions: ['conjurationTime' | 'range' | 'target' | 'duration', string[]][] = [
        ['conjurationTime', conjurationTimes],
        ['range', ranges],
        ['target', targets],
        ['duration', durations],
    ]

    const booleanForms: ('alwaysAvailable' | 'available' | 'ritual' | 'concentration')[] = [
        'available',
        'alwaysAvailable',
        'concentration',
        'ritual',
    ]

    const formComponents: ('verbal' | 'somatic' | 'material')[] = ['verbal', 'somatic', 'material']
</script>

<button on:click={() => $index = null}>
    TESTE
</button>

<Container>
    <Container row>
        <Input
            type="text"
            id="spell-{index}-name"
            bind:value={$characterRepository.current.spells[$index].name}
        />

        <Input
            type="select"
            id="spell-{index}-circle"
            options={SPELL_CIRCLES.map((option) => [option, option])}
            bind:value={$characterRepository.current.spells[$index].circle}
        />
    </Container>

    <Input
        type="select"
        id="spell-{index}-school"
        options={SCHOOLS.map((option) => [option, t(`spells.school.${option}`)])}
        bind:value={$characterRepository.current.spells[$index].school}
    />

    {#each booleanForms as key}
        <Input
            type="checkbox"
            id="spell-{index}-{key}"
            label="{t(`character.spells.${key}`)}?"
            bind:checked={$characterRepository.current.spells[$index][key]}
        />
    {/each}
</Container>

<Container>
    <Title title={t('character.spells.components')} />

    {#each formComponents as key}
        <Input
            type="checkbox"
            id="spell-{index}-components-{key}"
            label="{t(`character.spells.components.${key}`)}?"
            bind:checked={$characterRepository.current.spells[$index].components[key]}
        />
    {/each}

    <Input
        type="text"
        id="spell-{index}-components-notes"
        bind:value={$characterRepository.current.spells[$index].components.notes}
    />
</Container>

{#each formsWithSuggestions as [key, suggestions]}
    <Container>
        <Title title={t(`character.spells.${key}`)} />

        <InputWithSuggestions
            id="spell-{index}-{key}"
            {suggestions}
            bind:value={$characterRepository.current.spells[$index][key]}
        />
    </Container>
{/each}

<Container>
    <Title title={t('character.spells.notes')} />

    <Input
        type="textarea"
        id="spell-{index}-notes"
        bind:value={$characterRepository.current.spells[$index].notes}
        placeholder={t('display.missingNotes')}
    />
</Container>

<Container>
    <Title title={t('character.spells.source')} />

    <Input
        type="text"
        id="spell-{index}-source"
        bind:value={$characterRepository.current.spells[$index].source}
        placeholder={t('display.missingSource')}
    />
</Container>
