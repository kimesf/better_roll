<script lang="ts">
    import SignedNumber from '../shared/SignedNumber.svelte'
    import { character, proficiencyBonus, attributesModifiers } from '../../stores/currentCharacter'
    import type { Tool } from '../../types'

    const toolModifier = ({ attribute, expertise, otherBonus }: Tool): number => {
        return $proficiencyBonus * (expertise ? 2 : 1) + $attributesModifiers[attribute] + otherBonus
    }
</script>

{#each $character.tools as tool}
    <div>
        <span class:text-indigo-500={!tool.expertise} class:text-teal-500={tool.expertise}>
            <SignedNumber number={toolModifier(tool)} />
        </span>

        {tool.name}
    </div>
{/each}