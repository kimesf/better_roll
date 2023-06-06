<script lang="ts">
    import { i18n } from '../../stores/i18n'
    import { character, type Attribute } from '../../stores/character'

    // TODO: repetition can be removed
    const attributeMod = (attr: Attribute | null): number => {
        if (!attr) {
            return 0
        }

        const attrValue = $character.current.attributes[attr]

        return Math.floor((attrValue - 10) / 2)
    }
</script>

{#each $character.current.attacks as attack}
    <div>
        <h1 class="text-orange-500">
            {attack.name}
        </h1>

        <p>
            {i18n.t('display.attacks.hitBonus')}:
            {character.proficiencyBonus()}
            +
            {attributeMod(attack.attribute)}
            +
            {attack.hitBonus}
            =
            {character.proficiencyBonus() + attributeMod(attack.attribute) + attack.hitBonus}
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
