<script lang="ts">
    import { i18n } from '../../stores/i18n'
    import { character, type Attribute, type Skill } from '../../stores/character'
    import SignedNumber from '../shared/SignedNumber.svelte';

    // TODO: repetition can be removed
    const PROFICIENCY_BONUS = {
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6,
    } as const

    // TODO: repetition can be removed
    $: proficiencyBonus = PROFICIENCY_BONUS[$character.current.level] as number

    type SkillsGroupedByAttr = {
        [key in Attribute]: Skill[]
    }

    let selectedAttr: Attribute | 'tool' | null = null

    const showSkills = (attr: Attribute | 'tool') => {
        if (attr == selectedAttr) {
            selectedAttr = null
            return
        }

        selectedAttr = attr
    }

    $: skillsByAttr = $character.current.skills.reduce((acc, skill) => {
        const key = skill.attribute
        const group = (acc[key] || []).concat(skill)

        return Object.assign(acc, { [key]: group })
    }, {} as SkillsGroupedByAttr)

    const attributes: Attribute[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

    // TODO: repetition can be removed
    const attrModifier = (key: Attribute): number => {
        const attrValue = $character.current.attributes[key]

        return Math.floor((attrValue - 10) / 2)
    }

    const skillModifier = (skill: Skill): number => {
        return (
            attrModifier(skill.attribute) +
            (skill.proficiency ? proficiencyBonus : 0) +
            (skill.expertise ? proficiencyBonus : 0) +
            skill.otherBonus
        )
    }

    const presentAttribute = (value: number) => {
        return String(value).padStart(2, '0')
    }
</script>

<div>
    {#each attributes as attr}
        <div class="py-1">
            <button class="text-4xl" on:click={() => showSkills(attr)}>
                <span>{i18n.t(`attributes.${attr}`)}</span>
                <span>
                    <SignedNumber number={attrModifier(attr)} />
                </span>
                <span>{presentAttribute($character.current.attributes[attr])}</span>
            </button>
            {#each skillsByAttr[attr] as skill}
                {#if selectedAttr == skill.attribute}
                    <div>
                        <p>
                            <span
                                class:text-blue-500={skill.proficiency && !skill.expertise}
                                class:text-yellow-500={skill.proficiency && skill.expertise}
                            >
                                <SignedNumber number={skillModifier(skill)} />
                            </span>
                            {skill.name}
                        </p>
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
    <div>
        <button class="text-4xl" on:click={() => showSkills('tool')}> tools </button>
        {#each $character.current.tools as tool}
            {#if selectedAttr == 'tool'}
                <div>
                    <p>
                        <span class:text-blue-500={!tool.expertise} class:text-yellow-500={tool.expertise}>
                            <SignedNumber number={proficiencyBonus * (tool.expertise ? 2 : 1) + tool.otherBonus} />
                        </span>
                        {tool.name}
                    </p>
                </div>
            {/if}
        {/each}
    </div>
    <div />
</div>
