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

                <Editable>
                    <Separator />

                    <div class="py-4 text-secondary text-sm">
                        <div>
                            <input
                                id={`skill-${index}-proficiency`}
                                type="checkbox"
                                bind:checked={$characterRepository.current.skills[skillIndex(skill)]
                                    .proficiency}
                            />
                            <label for={`skill-${index}-proficiency`}>{t('display.skills.proficiency')}</label>
                        </div>
                        <div>
                            <input
                                id={`skill-${index}-expertise`}
                                type="checkbox"
                                bind:checked={$characterRepository.current.skills[skillIndex(skill)]
                                    .expertise}
                            />
                            <label for={`skill-${index}-expertise`}>{t('display.skills.expertise')}</label>
                        </div>
                        <div class="flex items-center justify-start">
                            <label for={`skill-${index}-otherBonus`}>{t('bonus')}:</label>
                            <Incrementor
                                id={`skill-${index}-otherBonus`}
                                signClasses={'text-4xl'}
                                bind:value={$characterRepository.current.skills[skillIndex(skill)].otherBonus}
                            />
                        </div>
                    </div>
                </Editable>
            {/each}
        </svelte:fragment>
    </Collapsible>
{/each}
