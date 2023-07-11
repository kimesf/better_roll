<script lang="ts">
    import { t } from '../../stores/i18n'
    import { type Spell } from '../../types'
    import Title from '../shared/Title.svelte'
    import Separator from '../shared/Separator.svelte'
    import { slide } from 'svelte/transition'
    import Link from '../shared/Link.svelte'
    import BtnAction from '../shared/BtnAction.svelte'
    import Editable from '../shared/Editable.svelte'
    import characterRepository from '../../stores/characterRepository'
    import { SCHOOLS, SPELL_CIRCLES } from '../../constants'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'
    import InputWithSuggestions from '../shared/InputWithSuggestions.svelte'

    const SPACE = '\u0020'

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

    const presentComponents = (components: Spell['components']) => {
        const maybeAspect = (aspect: 'verbal' | 'somatic' | 'material') =>
            components[aspect] ? t(`spells.components.${aspect}`).at(0).toUpperCase() : ''

        const abbr = ['verbal', 'somatic', 'material'].map(maybeAspect).join('')
        const notes = components.material ? `${SPACE}(${components.notes})` : ''

        return abbr + notes
    }

    let visible: number | null = null

    const toggle = (spellIndex: number): void => {
        visible = spellIndex == visible ? null : spellIndex
    }

    const DEFAULT: Spell = {
        name: 'new',
        circle: 1,
        alwaysAvailable: false,
        available: false,
        school: 'abjuration',
        conjurationTime: '',
        range: '',
        target: '',
        components: {
            verbal: false,
            somatic: false,
            material: false,
            notes: '',
        },
        duration: '',
        concentration: false,
        ritual: false,
        notes: '',
        source: '',
    }

    const newSpell = (): Spell => {
        return structuredClone(DEFAULT)
    }

    // TODO: dup
    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    // TODO: dup
    const create = (): void => {
        $characterRepository.current.spells.push(newSpell())
        trigger()
    }

    // TODO: dup
    const destroy = (index: number): void => {
        $characterRepository.current.spells.splice(index, 1)
        trigger()
    }
</script>

<Container>
    <Title title={t('character.spells.title')} />

    <Editable>
        <BtnAction kind="create" class="w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
    </Editable>

    <div class="flex flex-col gap-2">
        {#each $characterRepository.current.spells as spell, index}
            <button on:click={() => toggle(index)}>
                <div
                    class="flex flex-col px-2 border border-l-8 border-neutral-500 text-secondary"
                    class:border-l-green-500={spell.alwaysAvailable || spell.available}
                    class:text-neutral-200={spell.alwaysAvailable || spell.available}
                >
                    <div class="flex justify-between">
                        <div class="text-lg">
                            {spell.name}
                        </div>

                        <div>
                            {spell.circle}
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <div>
                            {spell.conjurationTime}
                        </div>

                        <div>
                            {spell.range}
                        </div>

                        <div>
                            {spell.duration}
                        </div>

                        {#if spell.concentration}
                            <div class="uppercase">
                                {t('character.spells.concentration').at(0)}
                            </div>
                        {/if}

                        {#if spell.ritual}
                            <div class="uppercase">
                                {t('character.spells.ritual').at(0)}
                            </div>
                        {/if}
                    </div>
                </div>
            </button>

            {#if visible == index}
                <div transition:slide class="px-2">
                    <Editable>
                        <Container slot="showing">
                            <div class="flex justify-between">
                                <div>
                                    {spell.target}
                                </div>

                                <div class="uppercase text-sm">
                                    {t(`spells.school.${spell.school}`)}
                                </div>
                            </div>

                            <div>
                                {presentComponents(spell.components)}
                            </div>

                            {#if spell.source}
                                <Separator />

                                <div>
                                    <Link to={spell.source} />
                                </div>
                            {/if}

                            {#if spell.notes}
                                <Separator />

                                <div class="whitespace-pre-wrap">
                                    {spell.notes}
                                </div>
                            {/if}
                        </Container>

                        <Container slot="editing">
                            <Container>
                                <Container row>
                                    <Input type="text" id="spell-{index}-name" bind:value={spell.name} />

                                    <Input
                                        type="select"
                                        id="spell-{index}-circle"
                                        options={SPELL_CIRCLES.map(option => [option, option])}
                                        bind:value={spell.circle}
                                    />
                                </Container>

                                <Container row>
                                    <Input
                                        type="select"
                                        id="spell-{index}-school"
                                        options={SCHOOLS.map(option => [option, t(`spells.school.${option}`)])}
                                        bind:value={spell.school}
                                    />

                                    <BtnAction kind="destroy" class="grow" handler={(_e) => destroy(index)} />
                                </Container>

                                {#each booleanForms as key}
                                    <Input
                                        type="checkbox"
                                        id="spell-{index}-{key}"
                                        label="{t(`character.spells.${key}`)}?"
                                        bind:checked={spell[key]}
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
                                        bind:checked={spell.components[key]}
                                    />
                                {/each}

                                <Input
                                    type="text"
                                    id="spell-{index}-components-notes"
                                    bind:value={spell.components.notes}
                                />
                            </Container>

                            {#each formsWithSuggestions as [key, suggestions]}
                                <Container>
                                    <Title title={t(`character.spells.${key}`)} />

                                    <InputWithSuggestions
                                        id="spell-{index}-{key}"
                                        {suggestions}
                                        bind:value={spell[key]}
                                    />
                                </Container>
                            {/each}

                            <Container>
                                <Title title={t('character.spells.source')} />

                                <Input
                                    type="text"
                                    id="spell-{index}-source"
                                    bind:value={spell.source}
                                    placeholder={t('display.missingSource')}
                                />
                            </Container>

                            <Container>
                                <Title title={t('character.spells.notes')} />

                                <Input
                                    type="textarea"
                                    id="spell-{index}-notes"
                                    bind:value={spell.notes}
                                    placeholder={t('display.missingNotes')}
                                />
                            </Container>
                        </Container>
                    </Editable>
                </div>
            {/if}
        {/each}
    </div>
</Container>
