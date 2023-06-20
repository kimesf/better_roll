<script lang="ts">
    import i18n from '../../stores/i18n'
    import { character } from '../../stores/currentCharacter'
</script>

<!-- TODO: dup -->
<div class="mt-4 text-sm">
    <p class="text-sm text-secondary">{i18n.t('display.skills.weapons')}</p>
    <p>{$character.weapons}</p>
</div>

<div class="mt-4 text-sm">
    <p class="text-sm text-secondary">{i18n.t('display.skills.armors')}</p>
    <p>{$character.armors}</p>
</div>

<div class="mt-4 text-sm">
    <p class="text-sm text-secondary">{i18n.t('display.skills.languages')}</p>
    <p>{$character.languages}</p>
</div>
