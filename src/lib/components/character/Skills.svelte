<script lang="ts">
    // TODO: use absolute imports?
    import { attributesModifiers, proficiencyBonus, skillsGroupedByAttribute } from '../../stores/currentCharacter'
    import { type Skill } from '../../types'
    import { ATTRIBUTES } from '../../constants'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Attribute from './Attribute.svelte'

    const skillModifier = ({ attribute, proficiency, expertise, otherBonus }: Skill): number => {
        return (
            $attributesModifiers[attribute] +
            (proficiency ? $proficiencyBonus : 0) +
            (expertise ? $proficiencyBonus : 0) +
            otherBonus
        )
    }
</script>

{#each ATTRIBUTES as attr}
    <Collapsible>
        <Attribute slot=title {attr} />

        <svelte:fragment slot="body">
            {#each $skillsGroupedByAttribute[attr] as skill}
                <div>
                    <span
                        class:text-proficient={skill.proficiency && !skill.expertise}
                        class:text-expert={skill.proficiency && skill.expertise}
                    >
                        <SignedNumber number={skillModifier(skill)} />
                    </span>
                    {skill.name}
                </div>
            {/each}
        </svelte:fragment>
    </Collapsible>
{/each}
