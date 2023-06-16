<script lang="ts">
    import i18n from '../../stores/i18n'
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'

    $: spellAttribute = $character.spellMechanics.attribute

    $: spellAttack = $proficiencyBonus + $attributesModifiers[spellAttribute] + $character.spellMechanics.hitBonus

    $: spellSaveDifficulty =
        8 + $proficiencyBonus + $attributesModifiers[spellAttribute] + $character.spellMechanics.saveDifficultyBonus
</script>

<div>
    <p>
        {i18n.t('display.spell.attribute')}:
        {i18n.t(`attributes.${spellAttribute}.full`)}
    </p>

    <p>
        {i18n.t('display.spell.availablePerDay')}:
        {$character.spellMechanics.availablePerDay}
    </p>

    <p>
        {i18n.t('display.spell.hitBonus')}:
        {spellAttack}
    </p>

    <p>
        {i18n.t('display.spell.saveDifficulty')}:
        {spellSaveDifficulty}
    </p>

    {#each $character.spellMechanics.slots as slot}
        <div>
            <!-- TODO: i18n -->
            slots circle {slot.circle}: {slot.current}/{slot.total}
        </div>
    {/each}
</div>
