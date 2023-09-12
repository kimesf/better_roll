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
    import Button from '../ui/Button.svelte'
    import Stack from '../ui/Stack.svelte'
    import Grid from '../ui/Grid.svelte'
    import Icon from '../shared/Icon.svelte'

    let editorVisible = true

    const toggleEditor = () => {
        editorVisible = !editorVisible
    }

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

    const createNext = (): void => {
        const slot = newSlot()

        if (slot.circle > 9) {
            return
        }

        createRelation('spellMechanics.slots', newSlot())
    }

    const destroyLast = (): void => {
        const index = lastSlotIndex()

        if (index < 0) {
            return
        }

        destroyRelation('spellMechanics.slots', index)
    }

    const lastSlotIndex = (): number => {
        return $characterRepository.current.spellMechanics.slots.length - 1
    }
</script>

<!-- TODO: improve spell slots ux -->
<!-- <NewEditable>
    <Container row slot="editing" class="items-center">
        <Btn kind="create" shape="round" handler={createNext} />
        <Btn askConfirmation kind="destroy" shape="round" handler={destroyLast} />
        <Btn kind="update" shape="round" handler={toggleEditor} />
        <NewTitle left right title={t('character.spellMechanics.slots')} />
    </Container>
</NewEditable>

<Stack>
    {#each $characterRepository.current.spellMechanics.slots as slot }
        <Stack gap="xs" justify="center" align="center" direction="col" class="text-sm">
            <span class="text-xs">
                {slot.circle}
            </span>

            <span>
                {slot.current}/{slot.total}
            </span>
        </Stack>
    {/each}
</Stack> -->

<NewEditable>
    <Stack slot="editing">
        <!-- TODO: decide if Icons will be inside Button -->
        <Button action="create" shape="round" on:click={createNext}>
            <Icon name="plus" />
        </Button>

        <!-- TODO: use new button -->
        <Btn askConfirmation kind="destroy" shape="round" handler={destroyLast} />

        <NewTitle left right title={t('character.spellMechanics.slots')} />
    </Stack>
</NewEditable>

<Grid>
    {#each $characterRepository.current.spellMechanics.slots as slot, index}
        <Card>
            <Stack direction="col" gap="sm">
                <Stack direction="col" align="center" justify="center" gap="xs">
                    <span class="text-3xl">
                        {slot.current}/{slot.total}
                    </span>

                    <span class="text-secondary">
                        {t('character.spellMechanics.circle')}
                        {slot.circle}
                    </span>
                </Stack>

                <NewEditable>
                    <Stack slot="editing" direction="col">
                        <Separator />

                        <Stack direction="col" align="center" gap="xs">
                            <NewIncrementor id="spellMechanics-slots-{index}-current" bind:value={slot.current} />
                            {t('character.spellMechanics.slots.current')}
                        </Stack>

                        <Stack direction="col" align="center" gap="xs">
                            <NewIncrementor id="spellMechanics-slots-{index}-total" bind:value={slot.total} />
                            {t('character.spellMechanics.slots.total')}
                        </Stack>
                    </Stack>
                </NewEditable>
            </Stack>
        </Card>
    {/each}
</Grid>
