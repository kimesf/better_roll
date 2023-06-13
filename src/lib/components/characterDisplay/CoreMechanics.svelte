<script lang="ts">
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import i18n from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import DistanceNumber from '../shared/DistanceNumber.svelte'
    import Title from '../shared/Title.svelte'
    import Separator from '../shared/Separator.svelte'

    $: mechanics = $character.mechanics
    $: initiativeBonus = $attributesModifiers.dex + mechanics.bonusInitiative
</script>

<!-- TODO: remove overflow -->
<div class="p-2 text-center overflow-y-scroll">
    <!-- TODO: a lot dup -->
    <div>
        <Title title={i18n.t('display.coreMechanics.hitPoints')} />

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.hitPoints.total')}</p>
            <p class="text-4xl">{mechanics.hitPoints.total}</p>
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.hitPoints.current')}</p>
            <p class="text-4xl">{mechanics.hitPoints.current}</p>
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.hitPoints.temporary')}</p>
            <p>{mechanics.hitPoints.temporary}</p>
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.hitPoints.debuff')}</p>
            <p>{mechanics.hitPoints.debuff}</p>
        </div>
    </div>

    <div class="pt-2">
        <Separator />
    </div>

    <div>
        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.proficiencyBonus')}</p>
            <p><SignedNumber number={$proficiencyBonus} /></p>
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.initiative')}</p>
            <p><SignedNumber number={initiativeBonus} /></p>
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.defense')}</p>
            <p>{mechanics.defense}</p>
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.walkSpeed')}</p>
            <DistanceNumber distanceInFeet={mechanics.walkSpeed} />
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.flySpeed')}</p>
            <DistanceNumber distanceInFeet={mechanics.flySpeed} />
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.swimSpeed')}</p>
            <DistanceNumber distanceInFeet={mechanics.swimSpeed} />
        </div>

        <div class="pt-4">
            <p class="text-sm text-neutral-500">{i18n.t('display.coreMechanics.darkVision')}</p>
            <DistanceNumber distanceInFeet={mechanics.darkVision} />
        </div>
    </div>
</div>
