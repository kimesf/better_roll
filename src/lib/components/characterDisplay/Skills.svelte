<script lang="ts">
    import { i18n } from '../../stores/i18n'
    import { character, proficiencyBonus, skillsGroupedByAttribute } from '../../stores/currentCharacter'
    import { type Attribute, type Skill, type Tool } from '../../types'
    import { ATTRIBUTES } from '../../constants'
    import SignedNumber from '../shared/SignedNumber.svelte'

    let selectedAttr: Attribute | 'tool' | null = null

    const showSkills = (attr: Attribute | 'tool') => {
        if (attr == selectedAttr) {
            selectedAttr = null
            return
        }

        selectedAttr = attr
    }

    // TODO: repetition can be removed
    const attrModifier = (key: Attribute): number => {
        const attrValue = $character.attributes[key]

        return Math.floor((attrValue - 10) / 2)
    }

    const skillModifier = (skill: Skill): number => {
        return (
            attrModifier(skill.attribute) +
            (skill.proficiency ? $proficiencyBonus : 0) +
            (skill.expertise ? $proficiencyBonus : 0) +
            skill.otherBonus
        )
    }

    const toolModifier = (tool: Tool) => {
        return $proficiencyBonus * (tool.expertise ? 2 : 1) + tool.otherBonus
    }

    const presentAttribute = (value: number) => {
        return String(value).padStart(2, '0')
    }
</script>

{#each ATTRIBUTES as attr}
    <div>
        <button class='text-4xl' on:click={() => showSkills(attr)}>
            {i18n.t(`attributes.${attr}`)}
            <SignedNumber number={attrModifier(attr)} />
            {presentAttribute($character.attributes[attr])}
        </button>
        {#each $skillsGroupedByAttribute[attr] as skill}
            {#if selectedAttr == skill.attribute}
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
        <button class='text-4xl' on:click={() => showSkills('tool')}>{i18n.t("display.skills.tools")}</button>
        {#each $character.tools as tool}
            {#if selectedAttr == 'tool'}
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
