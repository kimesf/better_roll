<script lang="ts">
    import { character, proficiencyBonus } from '../../stores/currentCharacter'
    import i18n from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte';

    $: mechanics = $character.mechanics
</script>

<div>
    {i18n.t('display.coreMechanics.hitPoints')}
</div>

<div>
    {i18n.t('display.coreMechanics.hitPoints.total')}
    {mechanics.hitPoints.total}
</div>

<div>
    {i18n.t('display.coreMechanics.hitPoints.current')}
    {mechanics.hitPoints.current}
</div>

<div>
    {i18n.t('display.coreMechanics.hitPoints.temporary')}
    {mechanics.hitPoints.temporary}
</div>

<div>
    {i18n.t('display.coreMechanics.hitPoints.debuff')}
    {mechanics.hitPoints.debuff}
</div>

<div>
    {i18n.t('display.coreMechanics.proficiencyBonus')}
    <SignedNumber number={$proficiencyBonus} />
</div>

<div>
    {i18n.t('display.coreMechanics.initiative')}
    <SignedNumber number={mechanics.initiative} />
</div>

<div>
    {i18n.t('display.coreMechanics.defense')}
    {mechanics.defense}
</div>

<div>
    {i18n.t('display.coreMechanics.walkSpeed')}
    {mechanics.walkSpeed}
</div>

<div>
    {i18n.t('display.coreMechanics.flySpeed')}
    {mechanics.flySpeed}
</div>

<div>
    {i18n.t('display.coreMechanics.swimSpeed')}
    {mechanics.swimSpeed}
</div>

<div>
    {i18n.t('display.coreMechanics.darkVision')}
    {mechanics.darkVision}
</div>
