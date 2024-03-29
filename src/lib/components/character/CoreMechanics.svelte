<script lang="ts">
    import { attributesModifiers, proficiencyBonus } from '../../stores/currentCharacter'
    import { t } from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import DistanceNumber from '../shared/DistanceNumber.svelte'
    import Title from '../shared/Title.svelte'
    import Separator from '../shared/Separator.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Incrementor from '../shared/Incrementor.svelte'
    import Editable from '../shared/Editable.svelte'
    import Container from '../shared/Container.svelte'
    import { type ComponentType } from 'svelte/internal'

    $: mechanics = $characterRepository.current.mechanics
    $: initiativeBonus = $attributesModifiers.dex + mechanics.bonusInitiative

    const hitPoints: ('total' | 'current' | 'temporary' | 'debuff')[] = ['total', 'current', 'temporary', 'debuff']

    $: other = [
        ['defense'],
        ['darkVision', DistanceNumber, { distanceInFeet: mechanics.darkVision }],
        ['walkSpeed', DistanceNumber, { distanceInFeet: mechanics.walkSpeed }],
        ['climbSpeed', DistanceNumber, { distanceInFeet: mechanics.climbSpeed }],
        ['swimSpeed', DistanceNumber, { distanceInFeet: mechanics.swimSpeed }],
        ['flySpeed', DistanceNumber, { distanceInFeet: mechanics.flySpeed }],
    ] as [
        'defense' | 'darkVision' | 'walkSpeed' | 'climbSpeed' | 'swimSpeed' | 'flySpeed',
        ComponentType | null,
        { distanceInFeet: number } | null,
    ][]
</script>

<Container class="text-center">
    <Container>
        <Title title={t('display.coreMechanics.hitPoints')} />

        {#each hitPoints as hitPoint}
            <div>
                <div class="text-sm text-secondary">{t(`display.coreMechanics.hitPoints.${hitPoint}`)}</div>

                <Incrementor
                    id="attributes-hitPoints-{hitPoint}"
                    contentClasses={['total', 'current'].includes(hitPoint) ? 'text-4xl' : ''}
                    bind:value={$characterRepository.current.mechanics.hitPoints[hitPoint]}
                />
            </div>
        {/each}
    </Container>

    <Separator />

    <Container class="text-sm">
        <div>
            <div class="text-secondary">{t('display.coreMechanics.proficiencyBonus')}</div>
            <div><SignedNumber number={$proficiencyBonus} /></div>
        </div>

        <div>
            <div class="text-secondary">{t('display.coreMechanics.initiative')}</div>

            <Editable>
                <SignedNumber number={initiativeBonus} />
            </Editable>

            <Incrementor
                id={`mechanics-initiative`}
                bind:value={$characterRepository.current.mechanics.bonusInitiative}
            >
                <SignedNumber number={initiativeBonus} />
            </Incrementor>
        </div>

        {#each other as [mechanic, component, props]}
            <div>
                <div class="text-secondary">
                    {t(`display.coreMechanics.${mechanic}`)}
                </div>

                <Incrementor id="mechanics-{mechanic}" bind:value={$characterRepository.current.mechanics[mechanic]}>
                    {#if component}
                        <svelte:component this={component} {...props} />
                    {:else}
                        {mechanics[mechanic]}
                    {/if}
                </Incrementor>
            </div>
        {/each}
    </Container>
</Container>
