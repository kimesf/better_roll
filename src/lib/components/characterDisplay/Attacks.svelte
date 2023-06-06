<script lang='ts'>
    import { i18n } from '../../stores/i18n'
    import { character, proficiencyBonus } from '../../stores/currentCharacter'
    import { type Attribute } from '../../types'

    // TODO: repetition can be removed
    const attributeMod = (attr: Attribute | null): number => {
        if (!attr) {
            return 0
        }

        const attrValue = $character.attributes[attr]

        return Math.floor((attrValue - 10) / 2)
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
            {attributeMod(attack.attribute)}
            +
            {attack.hitBonus}
            =
            {$proficiencyBonus + attributeMod(attack.attribute) + attack.hitBonus}
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
