<script lang="ts">
    import { t } from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import type { Tool } from '../../types'
    import { attributesModifiers, proficiencyBonus } from '../../stores/currentCharacter'
    import characterRepository from '../../stores/characterRepository'
    import Incrementor from '../shared/Incrementor.svelte'
    import Separator from '../shared/Separator.svelte'
    import Editable from '../shared/Editable.svelte'

    const toolModifier = ({ attribute, expertise, otherBonus }: Tool): number => {
        return $proficiencyBonus * (expertise ? 2 : 1) + $attributesModifiers[attribute] + otherBonus
    }
</script>

{#each $characterRepository.current.tools as tool, index}
    <div>
        <span class:text-proficient={!tool.expertise} class:text-expert={tool.expertise}>
            <SignedNumber number={toolModifier(tool)} />
        </span>

        {tool.name}
    </div>

    <Editable>
        <Separator />

        <div>
            <input id={`tool-${index}-expertise`} type="checkbox" bind:checked={tool.expertise} />
            <label for={`skill-${index}-expertise`}>{t('display.skills.expertise')}</label>
        </div>

        <div class="flex items-center justify-start">
            <label for={`tool-${index}-otherBonus`}>{t('bonus')}:</label>
            <Incrementor id={`tool-${index}-otherBonus`} signClasses={'text-4xl'} bind:value={tool.otherBonus} />
        </div>
    </Editable>
{/each}
