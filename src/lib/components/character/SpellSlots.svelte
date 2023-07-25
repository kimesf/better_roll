<script lang="ts">
    import type { SpellCircle, SpellSlot } from '../../types'
    import { t } from '../../stores/i18n'
    import Btn from '../shared/Btn.svelte'
    import Card from '../shared/Card.svelte'
    import Container from '../shared/Container.svelte'
    import Separator from '../shared/Separator.svelte'
    import NewIncrementor from '../shared/NewIncrementor.svelte'
    import NewEditable from '../shared/NewEditable.svelte'
    import NewTitle from '../shared/NewTitle.svelte'
    import characterRepository from '../../stores/characterRepository'

    const { createRelation, destroyRelation } = characterRepository

    const DEFAULT_SLOT: SpellSlot = {
        circle: 1,
        current: 1,
        total: 1,
    }

    const newSlot = (): SpellSlot => {
        const nextCircle = ($characterRepository.current.spellMechanics.slots.length + 1) as SpellCircle
        let slot = structuredClone(DEFAULT_SLOT)
        slot.circle = nextCircle

        return slot
    }

    const lastSlotIndex = (): number => {
        return $characterRepository.current.spellMechanics.slots.length - 1
    }
</script>

<NewEditable>
    <Container row slot="editing" class="items-center">
        <Btn kind="create" shape="round" handler={(_) => createRelation('spellMechanics.slots', newSlot())} />
        <Btn askConfirmation kind="destroy" shape="round" handler={(_) => destroyRelation('spellMechanics.slots', lastSlotIndex())} />
        <NewTitle title={t('character.spellMechanics.slots')} />
    </Container>
</NewEditable>

<div class="grid gap-4 grid-cols-2">
    {#each $characterRepository.current.spellMechanics.slots as slot, index}
        <Card>
            <Container gap="small">
                <div class="flex flex-col items-center">
                    <span class="text-3xl">
                        {slot.current}/{slot.total}
                    </span>

                    <span class="text-secondary">
                        {t('character.spellMechanics.circle')}
                        {slot.circle}
                    </span>
                </div>

                <NewEditable>
                    <Container slot="editing">
                        <Separator />

                        <div class="flex flex-col items-center">
                            <NewIncrementor id="spellMechanics-slots-{index}-current" bind:value={slot.current} />
                            {t('character.spellMechanics.slots.current')}
                        </div>

                        <div class="flex flex-col items-center">
                            <NewIncrementor id="spellMechanics-slots-{index}-total" bind:value={slot.total} />
                            {t('character.spellMechanics.slots.total')}
                        </div>
                    </Container>
                </NewEditable>
            </Container>
        </Card>
    {/each}
</div>
