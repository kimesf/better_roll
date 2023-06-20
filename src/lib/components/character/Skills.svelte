<script lang="ts">
    // TODO: use absolute imports?
    import i18n from '../../stores/i18n'
    import {
        attributesModifiers,
        character,
        proficiencyBonus,
        skillsGroupedByAttribute,
    } from '../../stores/currentCharacter'
    import { type Skill } from '../../types'
    import { ATTRIBUTES } from '../../constants'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Collapsible from '../shared/Collapsible.svelte'

    const skillModifier = ({ attribute, proficiency, expertise, otherBonus }: Skill): number => {
        return (
            $attributesModifiers[attribute] +
            (proficiency ? $proficiencyBonus : 0) +
            (expertise ? $proficiencyBonus : 0) +
            otherBonus
        )
    }
</script>

<!-- TODO: dup items -->
{#each ATTRIBUTES as attr}
    <Collapsible>
        <div slot="title" class="grow flex items-center justify-between">
            <span class="grow basis-0 text-2xl uppercase">
                {i18n.t(`attributes.${attr}`)}
            </span>

            <span class="grow basis-0 text-4xl">
                <SignedNumber number={$attributesModifiers[attr]} />
            </span>

            <span class="grow basis-0 text-2xl text-secondary">
                ({$character.attributes[attr]})
            </span>
        </div>

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
