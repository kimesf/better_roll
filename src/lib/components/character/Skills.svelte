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
    import { t } from '../../stores/i18n'
    import Incrementor from '../shared/Incrementor.svelte'
    import Separator from '../shared/Separator.svelte'
    import Input from '../shared/Input.svelte'

    const skillModifier = ({ attribute, proficiency, expertise, otherBonus }: Skill): number => {
        return (
            $attributesModifiers[attribute] +
            (proficiency ? $proficiencyBonus : 0) +
            (expertise ? $proficiencyBonus : 0) +
            otherBonus
        )
    }

    const keyFor = ({ name, attribute }: Skill): string => {
        return `${name}${attribute}`
    }

    $: skillIndexesByKey = $characterRepository.current.skills.reduce((acc, skill, index) => {
        return Object.assign(acc, { [keyFor(skill)]: index })
    }, {}) as { [key: string]: number }

    const skillIndex = (skill: Skill): number => {
        return skillIndexesByKey[keyFor(skill)]
    }
</script>

{#each ATTRIBUTES as attr}
    <Collapsible>
        <Attribute slot="title" {attr} />

        <svelte:fragment slot="body">
            {#each $skillsGroupedByAttribute[attr] as skill, index}
                <div>
                    <span
                        class:text-proficient={skill.proficiency && !skill.expertise}
                        class:text-expert={skill.proficiency && skill.expertise}
                    >
                        <SignedNumber number={skillModifier(skill)} />
                    </span>
                    {skill.name}
                </div>

                <Editable class="text-secondary text-sm">
                    <Separator />

                    <Input
                        type="checkbox"
                        id="skill-{attr}-{index}-proficiency"
                        label={t('display.skills.proficiency')}
                        bind:checked={$characterRepository.current.skills[skillIndex(skill)].proficiency}
                    />

                    <Input
                        type="checkbox"
                        id="skill-{attr}-{index}-expertise"
                        label={t('display.skills.expertise')}
                        bind:checked={$characterRepository.current.skills[skillIndex(skill)].expertise}
                    />

                    <!-- TODO: label to incrementor -->
                    <div class="flex items-center justify-start">
                        <label for="skill-{attr}-{index}-otherBonus">{t('bonus')}:</label>
                        <Incrementor
                            id="skill-{attr}-{index}-otherBonus"
                            bind:value={$characterRepository.current.skills[skillIndex(skill)].otherBonus}
                        />
                    </div>
                </Editable>
            {/each}
        </svelte:fragment>
    </Collapsible>
{/each}
