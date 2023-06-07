<script lang="ts">
    import i18n from '../../stores/i18n'
    import { attributesModifiers, character, proficiencyBonus, skillsGroupedByAttribute } from '../../stores/currentCharacter'
    import { type Attribute, type Skill, type Tool } from '../../types'
    import { ATTRIBUTES } from '../../constants'
    import SignedNumber from '../shared/SignedNumber.svelte'

    let opened: Attribute | 'tool' | null = null

    const toggle = (attr: Attribute | 'tool') => {
        if (attr == opened) {
            opened = null
            return
        }

        opened = attr
    }

    const skillModifier = ({ attribute, proficiency, expertise, otherBonus }: Skill): number => {
        return (
            $attributesModifiers[attribute] +
            (proficiency ? $proficiencyBonus : 0) +
            (expertise ? $proficiencyBonus : 0) +
            otherBonus
        )
    }

    const toolModifier = (tool: Tool) => {
        return $proficiencyBonus * (tool.expertise ? 2 : 1) + tool.otherBonus
    }
</script>

{#each ATTRIBUTES as attr}
    <div>
        <button class='text-4xl' on:click={() => toggle(attr)}>
            {i18n.t(`attributes.${attr}`)}
            <SignedNumber number={$attributesModifiers[attr]} />
            {$character.attributes[attr]}
        </button>
        {#each $skillsGroupedByAttribute[attr] as skill}
            {#if opened == skill.attribute}
                <div>
                    <span
                        class:text-blue-500={skill.proficiency && !skill.expertise}
                        class:text-yellow-500={skill.proficiency && skill.expertise}
                    >
                        <SignedNumber number={skillModifier(skill)} />
                    </span>
                    {skill.name}
                </div>
            {/if}
        {/each}
    </div>
{/each}

{#if !!$character.tools.length}
    <div>
        <button class='text-4xl' on:click={() => toggle('tool')}>{i18n.t("display.skills.tools")}</button>
        {#each $character.tools as tool}
            {#if opened == 'tool'}
                <div>
                    <span class:text-blue-500={!tool.expertise} class:text-yellow-500={tool.expertise}>
                        <SignedNumber number={toolModifier(tool)} />
                    </span>
                    {tool.name}
                </div>
            {/if}
        {/each}
    </div>
{/if}
