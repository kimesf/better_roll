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
    import InputWithSuggestions from '../shared/InputWithSuggestions.svelte'
    import { SCHOOLS, SPELL_CIRCLES } from '../../constants'

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
        SixtyFeet =  '60feet',
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

    const formComponents: ('verbal' | 'somatic' | 'material')[] = [
        'verbal',
        'somatic',
        'material'
    ]

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

<Title title={t('character.spells.title')} />

<Separator />

<Editable>
    <BtnAction kind=create class="w-full mt-2" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

<div class="overflow-x-scroll pt-2 flex flex-col gap-2">
    {#each $characterRepository.current.spells as spell, index}
        <div
            class="flex flex-col px-2 border border-l-8 border-neutral-500 text-secondary"
            class:border-l-green-500={spell.alwaysAvailable || spell.available}
            class:text-neutral-200={spell.alwaysAvailable || spell.available}
            on:click={() => toggle(index)}
            on:keydown={() => toggle(index)}
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

        {#if visible == index}
            <div transition:slide class="px-2">
                <Editable>
                    <div slot="showing">
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
                    </div>

                    <div slot="editing">
                        <div class="mb-2 flex flex-col gap-2">
                            <div class="flex gap-1">
                                <input type="text" id="spell-{index}-name" class="input grow" bind:value={spell.name} />

                                <select id="spell-{index}-circle" class="input" bind:value={spell.circle}>
                                    {#each SPELL_CIRCLES as option}
                                        <option value={option}>{option}</option>
                                    {/each}
                                </select>
                            </div>

                            <div class="flex gap-2">
                                <select id="spell-{index}-school" class="input" bind:value={spell.school}>
                                    {#each SCHOOLS as option}
                                        <option value={option}>{t(`spells.school.${option}`)}</option>
                                    {/each}
                                </select>


                                <BtnAction kind=destroy class="grow" handler={(_e) => destroy(index)} />
                            </div>

                            {#each booleanForms as key}
                                <div>
                                    <input
                                        id="spell-{index}-{key}"
                                        class="input"
                                        type="checkbox"
                                        bind:checked={spell[key]}
                                    />
                                    <label for="spell-{index}-{key}">{t(`character.spells.${key}`)}?</label>
                                </div>
                            {/each}
                        </div>

                        <div>
                            <Title title={t('character.spells.components')} />

                            <Separator />

                            {#each formComponents as key}
                                <div>
                                    <input
                                        id="spell-{index}-components-{key}"
                                        class="input"
                                        type="checkbox"
                                        bind:checked={spell.components[key]}
                                    />
                                    <label for="spell-{index}-{key}">{t(`character.spells.components.${key}`)}?</label>
                                </div>
                            {/each}

                            <input type="text" id="spell-{index}-components-notes" class="input w-full" bind:value={spell.components.notes} />
                        </div>

                        {#each formsWithSuggestions as [key, suggestions]}
                            <div class="mb-2">
                                <Title title={t(`character.spells.${key}`)} />

                                <Separator />

                                <InputWithSuggestions
                                    suggestions={suggestions}
                                    id="spell-{index}-{key}"
                                    bind:value={spell[key]}
                                />
                            </div>
                        {/each}

                        <div class="mb-2">
                            <Title title={t('character.spells.source')} />

                            <Separator />

                            <input
                                id="spell-{index}-source"
                                class="input w-full"
                                bind:value={spell.source}
                                placeholder={t('display.missingSource')}
                            />
                        </div>

                        <div class="mb-2">
                            <Title title={t('character.spells.notes')} />

                            <Separator />

                            <textarea
                                id="spell-{index}-notes"
                                class="input w-full"
                                bind:value={spell.notes}
                                placeholder={t('display.missingNotes')}
                            />
                        </div>
                    </div>
                </Editable>
            </div>
        {/if}
    {/each}
</div>
