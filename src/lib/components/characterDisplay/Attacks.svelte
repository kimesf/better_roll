<script lang='ts'>
    import i18n from '../../stores/i18n'
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import { type Attribute } from '../../types'

    const modifier = (attr: Attribute | null): number => {
        return $attributesModifiers?.[attr] || 0
    }
</script>

{#each $character.attacks as attack}
    <div>
        <h1 class='text-orange-500'>
            {attack.name}
        </h1>

        <p>
            {i18n.t('display.attacks.hitBonus')}:
            {$proficiencyBonus}
            +
            {modifier(attack.attribute)}
            +
            {attack.hitBonus}
            =
            {$proficiencyBonus + modifier(attack.attribute) + attack.hitBonus}
        </p>

        <p>
            {i18n.t('display.attacks.damage')}:
            {attack.damage} ({attack.damageType})
        </p>

        <p>
            {attack.notes}
        </p>
    </div>
{/each}
