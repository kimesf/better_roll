<script lang="ts">
    import { t } from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Editable from '../shared/Editable.svelte'
    import Incrementor from '../shared/Incrementor.svelte'
    import BtnAction from '../shared/BtnAction.svelte'
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import characterRepository from '../../stores/characterRepository'
    import { ATTRIBUTES } from '../../constants'
    import type { SpellCircle, SpellSlot } from '../../types'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'

    $: spellAttribute = $character.spellMechanics.attribute

    $: spellAttack =
        $proficiencyBonus + $attributesModifiers[spellAttribute] + $characterRepository.current.spellMechanics.hitBonus

    $: spellSaveDifficulty =
        8 + $proficiencyBonus + $attributesModifiers[spellAttribute] + $character.spellMechanics.saveDifficultyBonus

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

    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    const createSlot = (): void => {
        if ($characterRepository.current.spellMechanics.slots.length == 9) {
            return
        }

        $characterRepository.current.spellMechanics.slots.push(newSlot())
        trigger()
    }

    const destroyLastSlot = (): void => {
        $characterRepository.current.spellMechanics.slots.pop()
        trigger()
    }
</script>

<Container>
    <Title title={t('character.spellMechanics.title')} />

    <div class="grid gap-4 grid-cols-2">
        <div class="flex flex-col items-center">
            <Editable class="text-4xl">
                <SignedNumber number={spellAttack} />
            </Editable>

            <Incrementor id="spellMechanics-hitBonus" bind:value={$characterRepository.current.spellMechanics.hitBonus}>
                <span class="text-4xl"><SignedNumber number={spellAttack} /></span>
            </Incrementor>

            <span class="text-secondary">{t('character.spellMechanics.hitBonus')}</span>
        </div>

        <div class="flex flex-col items-center">
            <Editable class="text-4xl">
                {spellSaveDifficulty}
            </Editable>

            <Incrementor
                id="spellMechanics-saveDifficultyBonus"
                contentClasses="text-4xl"
                bind:value={$characterRepository.current.spellMechanics.saveDifficultyBonus}
            >
                <span class="text-4xl">{spellSaveDifficulty}</span>
            </Incrementor>

            <span class="text-secondary">{t('character.spellMechanics.saveDifficulty')}</span>
        </div>

        <div class="flex flex-col items-center">
            <Editable>
                <Input
                    slot="editing"
                    type="select"
                    id="spellMechanics-attribute"
                    options={ATTRIBUTES.map(attr => [attr, t(`attributes.${attr}.full`)])}
                    bind:value={$characterRepository.current.spellMechanics.attribute}
                />

                <span slot="showing" class="text-2xl">{t(`attributes.${spellAttribute}.full`)}</span>
            </Editable>

            <span class="text-secondary">{t('character.spellMechanics.attribute')}</span>
        </div>

        <div class="flex flex-col items-center">
            <Incrementor
                id="spellMechanics-availablePerDay"
                contentClasses="text-4xl"
                bind:value={$characterRepository.current.spellMechanics.availablePerDay}
            />

            <span class="text-secondary">{t('character.spellMechanics.availablePerDay')}</span>
        </div>
    </div>

    <Title title={t('character.spellMechanics.slots')} />

    <Editable>
        <BtnAction kind="create" class="w-full" handler={(_e) => createSlot()}>
            {t('actions.create')}
        </BtnAction>

        <BtnAction kind="destroy" class="w-full" handler={(_e) => destroyLastSlot()}>
            {t('character.spellMechanics.slots.destroyLast')}
        </BtnAction>
    </Editable>

    <div class="grid gap-4 grid-cols-2">
        {#each $characterRepository.current.spellMechanics.slots as slot, index}
            <div class="flex flex-col items-center">
                <Incrementor
                    id="spellMechanics-slots-{index}-current"
                    contentClasses="text-4xl"
                    bind:value={slot.current}
                >
                    <span class="text-4xl">{slot.current}/{slot.total}</span>

                    <Input
                        slot="extra"
                        type="number"
                        id="spellMechanics-slots-{index}-total"
                        bind:value={slot.total}
                    />
                </Incrementor>

                <span class="text-secondary">{t('character.spellMechanics.circle')} {slot.circle}</span>
            </div>
        {/each}
    </div>
</Container>
