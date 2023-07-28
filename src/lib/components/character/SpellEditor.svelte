<script lang="ts">
    import { t } from '../../stores/i18n'
    import { SCHOOLS, SPELL_CIRCLES } from '../../constants'
    import Form from '../ui/Form.svelte'
    import Stack from '../ui/Stack.svelte'
    import Grid from '../ui/Grid.svelte'
    import Steps from '../ui/Steps.svelte'
    import Card from '../shared/Card.svelte'
    import index from '../../stores/spellEditor'
    import characterRepository from '../../stores/characterRepository'

    enum ConjurationTimes {
        OneHour = '1hour',
        TenMinutes = '10minutes',
        OneMinute = '1minute',
        Reaction = 'reaction',
        Bonus = 'bonus',
        Action = 'action',
    }

    enum Ranges {
        SelfThirtyFootLine = 'self30footLine',
        SelfThirtyFootRadius = 'self30footRadius',
        OneHundredAndTwentyFeet = '120feet',
        NinetyFeet = '90feet',
        SixtyFeet = '60feet',
        ThirtyFeet = '30feet',
        Self = 'self',
        Touch = 'touch',
        // TenFeet = '10feet',
        // OneHundredAndFiftyFeet = '150feet',
        // FiveHundredFeet = '500feet',
        // SelfFiveFootRadius = 'self5footRadius',
        // SelfTenFootRadius = 'self10footRadius',
        // SelfFifteenFootCone = 'self15footCone',
        // SelfFifteenFootCube = 'self15footCube',
    }

    enum Targets {
        AllCreaturesInRange = 'allCreaturesInRange',
        UpToThreeCreature = 'upToThreeCreatures',
        OneCreatureWilling = 'oneCreatureWilling',
        OneCreatureInSight = 'oneCreatureInSight',
        OneCreature = 'oneCreature',
        Self = 'self',
    }

    enum Durations {
        Permanent = 'permanent',
        OneDay = '1day',
        EightHours = '8hours',
        Onehour = '1hour',
        TenMinutes = '10minutes',
        OneMinute = '1minute',
        OneRound = '1round',
        Instant = 'instant',
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

    const closeEditor = () => {
        $index = undefined
    }

    // TEMP TODO
    let checked = false
</script>

<Stack direction="col" class="h-full bg-primary bg-[rgb(0,0,0,0.8)]" gap="no">
    <button class="w-full grow" on:click={closeEditor} />

    <Card class="mx-4">
        <Steps let:Step onDone={closeEditor}>
            <Form let:F>
                <Step step={0}>
                    <F.Label title={t('spells.name')}>
                        <F.Input
                            type="text"
                            id="spell-{$index}-name"
                            bind:value={$characterRepository.current.spells[$index].name}
                            placeholder="Abrakadabra"
                        />
                    </F.Label>

                    <Stack>
                        <F.Label class="grow" title={t('spells.circle')}>
                            <F.Select
                                id="spell-{$index}-circle"
                                options={SPELL_CIRCLES.map((option) => [option, option])}
                                bind:value={$characterRepository.current.spells[$index].circle}
                            />
                        </F.Label>

                        <F.Label class="grow" title={t('spells.school')}>
                            <F.Select
                                id="spell-{$index}-school"
                                options={SCHOOLS.map((option) => [option, t(`spells.school.${option}`)])}
                                bind:value={$characterRepository.current.spells[$index].school}
                            />
                        </F.Label>
                    </Stack>
                </Step>

                {#each formsWithSuggestions as [key, options], i}
                    <Step step={i + 1}>
                        <F.InputOptions {options} bind:value={$characterRepository.current.spells[$index][key]} />

                        <F.Label title={t(`character.spells.${key}`)}>
                            <F.Input
                                type="text"
                                id="spell-{$index}-{key}"
                                bind:value={$characterRepository.current.spells[$index][key]}
                                placeholder={t('other')}
                            />
                        </F.Label>
                    </Step>
                {/each}

                <Step step={5}>
                    <F.Label title={t(`character.spells.components`)} />

                    <Stack>
                        {#each formComponents as key}
                            <Stack direction="col" align="center" gap="xs">
                                <F.Label
                                    for="spell-{$index}-components-{key}"
                                    title={t(`character.spells.components.${key}`)}
                                />

                                <F.Checkbox
                                    id="spell-{$index}-components-{key}"
                                    bind:checked={$characterRepository.current.spells[$index].components[key]}
                                />
                            </Stack>
                        {/each}

                        <!-- TODO TEMP -->
                        <Stack direction="col" align="center" gap="xs">
                            <F.Label for="spell-{$index}-components-cost" title="custo" />
                            <F.Checkbox id="spell-{$index}-components-cost" bind:checked />
                        </Stack>
                    </Stack>

                    <F.Label title="descrição">
                        <F.Textarea
                            id="spell-{$index}-components-notes"
                            bind:value={$characterRepository.current.spells[$index].components.notes}
                            placeholder={t('spells.components.placeholder')}
                        />
                    </F.Label>
                </Step>

                <Step step={6}>
                    <Grid>
                        {#each booleanForms as key}
                            <Stack direction="col" gap="xs" align="center">
                                <F.Label for="spell-{$index}-{key}" title={t(`character.spells.${key}`)} />
                                <F.Checkbox
                                    id="spell-{$index}-{key}"
                                    bind:checked={$characterRepository.current.spells[$index][key]}
                                />
                            </Stack>
                        {/each}
                    </Grid>
                </Step>

                <Step step={7}>
                    <F.Label title={t('character.spells.notes')}>
                        <F.Textarea
                            id="spell-{$index}-notes"
                            bind:value={$characterRepository.current.spells[$index].notes}
                            placeholder={t('display.missingNotes')}
                            rows={25}
                        />
                    </F.Label>
                </Step>

                <Step step={8}>
                    <F.Label title={t('character.spells.source')}>
                        <F.Input
                            type="text"
                            id="spell-{$index}-source"
                            bind:value={$characterRepository.current.spells[$index].source}
                            placeholder={t('display.missingSource')}
                        />
                    </F.Label>
                </Step>
            </Form>
        </Steps>
    </Card>

    <button class="w-full h-20" on:click={closeEditor} />
</Stack>
