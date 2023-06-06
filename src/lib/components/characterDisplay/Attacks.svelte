<script lang="ts">
    import { i18n } from '../../stores/i18n'
    import { selectedCharacter, type Attribute } from '../../stores/selectedCharacter'

    // TODO: repetition can be removed
    const PROFICIENCY_BONUS = {
        1: +2,
        2: +2,
        3: +2,
        4: +2,
        5: +3,
        6: +3,
        7: +3,
        8: +3,
        9: +4,
        10: +4,
        11: +4,
        12: +4,
        13: +5,
        14: +5,
        15: +5,
        16: +5,
        17: +6,
        18: +6,
        19: +6,
        20: +6,
    } as const

    // TODO: repetition can be removed
    $: proficiencyBonus = PROFICIENCY_BONUS[$selectedCharacter.level] as number

    // TODO: repetition can be removed
    const attributeMod = (attr: Attribute | null): number => {
        if (!attr) {
            return 0
        }

        const attrValue = $selectedCharacter.attributes[attr]

        return Math.floor((attrValue - 10) / 2)
    }
</script>

{#each $selectedCharacter.attacks as attack}
    <div>
        <h1 class="text-orange-500">
            {attack.name}
        </h1>

        <p>
            {i18n.t('display.attacks.hitBonus')}:
            {proficiencyBonus}
            +
            {attributeMod(attack.attribute)}
            +
            {attack.hitBonus}
            =
            {proficiencyBonus + attributeMod(attack.attribute) + attack.hitBonus}
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
