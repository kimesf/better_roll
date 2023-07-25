<script lang="ts">
    import { t } from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import characterRepository from '../../stores/characterRepository'
    import { ATTRIBUTES } from '../../constants'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'
    import Card from '../shared/Card.svelte'
    import NewEditable from '../shared/NewEditable.svelte'
    import Separator from '../shared/Separator.svelte'
    import NewIncrementor from '../shared/NewIncrementor.svelte'

    $: spellAttribute = $character.spellMechanics.attribute

    $: spellAttack =
        $proficiencyBonus + $attributesModifiers[spellAttribute] + $characterRepository.current.spellMechanics.hitBonus

    $: spellSaveDifficulty =
        8 + $proficiencyBonus + $attributesModifiers[spellAttribute] + $character.spellMechanics.saveDifficultyBonus
</script>

<div class="grid gap-4 grid-cols-2">
    <Card>
        <Container gap="small">
            <div class="flex flex-col items-center">
                <span class="text-3xl">
                    <SignedNumber number={spellAttack} />
                </span>

                <span class="text-secondary">
                    {t('character.spellMechanics.hitBonus')}
                </span>
            </div>

            <NewEditable>
                <Container slot="editing">
                    <Separator />

                    <NewIncrementor
                        id="spellMechanics-hitBonus"
                        bind:value={$characterRepository.current.spellMechanics.hitBonus}
                    />
                </Container>
            </NewEditable>
        </Container>
    </Card>

    <Card>
        <Container gap="small">
            <div class="flex flex-col items-center">
                <span class="text-3xl">
                    {spellSaveDifficulty}
                </span>

                <span class="text-secondary">
                    {t('character.spellMechanics.saveDifficulty')}
                </span>
            </div>

            <NewEditable>
                <Container slot="editing">
                    <Separator />

                    <NewIncrementor
                        id="spellMechanics-saveDifficultyBonus"
                        bind:value={$characterRepository.current.spellMechanics.saveDifficultyBonus}
                    />
                </Container>
            </NewEditable>
        </Container>
    </Card>

    <Card>
        <Container gap="small">
            <div class="flex flex-col items-center">
                <span class="text-xl">
                    {t(`attributes.${spellAttribute}.full`)}
                </span>

                <span class="text-secondary">
                    {t('character.spellMechanics.attribute')}
                </span>
            </div>

            <NewEditable>
                <Container slot="editing">
                    <Separator />

                    <Input
                        type="select"
                        id="spellMechanics-attribute"
                        options={ATTRIBUTES.map((attr) => [attr, t(`attributes.${attr}.full`)])}
                        bind:value={$characterRepository.current.spellMechanics.attribute}
                    />
                </Container>
            </NewEditable>
        </Container>
    </Card>

    <Card>
        <Container gap="small">
            <div class="flex flex-col items-center">
                <span class="text-xl">
                    {$characterRepository.current.spellMechanics.availablePerDay}
                </span>

                <span class="text-secondary">
                    {t('character.spellMechanics.availablePerDay')}
                </span>
            </div>

            <NewEditable>
                <Container slot="editing">
                    <Separator />

                    <NewIncrementor
                        id="spellMechanics-availablePerDay"
                        bind:value={$characterRepository.current.spellMechanics.availablePerDay}
                    />
                </Container>
            </NewEditable>
        </Container>
    </Card>
</div>
