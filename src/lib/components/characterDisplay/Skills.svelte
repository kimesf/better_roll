<script lang="ts">
    import { i18n } from '../../stores/i18n'
    import { selectedCharacter, type Attribute, type Skill } from '../../stores/selectedCharacter'

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
    $: proficiencyBonus = PROFICIENCY_BONUS[$selectedCharacter.level] as number

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

    $: skillsByAttr = $selectedCharacter.skills.reduce((acc, skill) => {
        const key = skill.attribute
        const group = (acc[key] || []).concat(skill)

        return Object.assign(acc, { [key]: group })
    }, {} as SkillsGroupedByAttr)

    const attributes: Attribute[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

    // TODO: repetition can be removed
    const attrModifier = (key: Attribute): number => {
        const attrValue = $selectedCharacter.attributes[key]

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

    // TODO: repetition can be removed
    const showSign = (mod: number) => {
        const signal = mod < 0 ? '-' : '+'

        return `${signal}${Math.abs(mod)}`
    }
</script>

<div>
    {#each attributes as attr}
        <div class="py-1">
            <button class="text-4xl" on:click={() => showSkills(attr)}>
                <span>{i18n.t(`attributes.${attr}`)}</span>
                <span>{showSign(attrModifier(attr))}</span>
                <span>{presentAttribute($selectedCharacter.attributes[attr])}</span>
            </button>
            {#each skillsByAttr[attr] as skill}
                {#if selectedAttr == skill.attribute}
                    <div>
                        <p>
                            <span
                                class:text-blue-500={skill.proficiency && !skill.expertise}
                                class:text-yellow-500={skill.proficiency && skill.expertise}
                            >
                                {showSign(skillModifier(skill))}
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
        {#each $selectedCharacter.tools as tool}
            {#if selectedAttr == 'tool'}
                <div>
                    <p>
                        <span class:text-blue-500={!tool.expertise} class:text-yellow-500={tool.expertise}>
                            {showSign(proficiencyBonus * (tool.expertise ? 2 : 1) + tool.otherBonus)}
                        </span>
                        {tool.name}
                    </p>
                </div>
            {/if}
        {/each}
    </div>
    <div />
</div>
