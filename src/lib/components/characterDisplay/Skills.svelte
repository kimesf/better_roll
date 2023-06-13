<script lang="ts">
    // TODO: use absolute imports?
    import i18n from '../../stores/i18n'
    import {
        attributesModifiers,
        character,
        proficiencyBonus,
        skillsGroupedByAttribute,
    } from '../../stores/currentCharacter'
    import { type Skill, type Tool } from '../../types'
    import { ATTRIBUTES } from '../../constants'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import DistanceNumber from '../shared/DistanceNumber.svelte'
    import WeightNumber from '../shared/WeightNumber.svelte'
    import Collapsible from '../shared/Collapsible.svelte'
    import Title from '../shared/Title.svelte'

    $: jumpDistanceInFeet = $character.attributes.str
    $: jumpHeightInFeet = 3 + $attributesModifiers.str
    $: pushAndPullInPounds = 30 * $character.attributes.str
    $: maxLoadInPounds = 15 * $character.attributes.str

    const skillModifier = ({ attribute, proficiency, expertise, otherBonus }: Skill): number => {
        return (
            $attributesModifiers[attribute] +
            (proficiency ? $proficiencyBonus : 0) +
            (expertise ? $proficiencyBonus : 0) +
            otherBonus
        )
    }

    const toolModifier = ({ attribute, expertise, otherBonus }: Tool): number => {
        return $proficiencyBonus * (expertise ? 2 : 1) + $attributesModifiers[attribute] + otherBonus
    }
</script>

<!-- TODO: dup items -->
<div class='flex flex-col'>
    {#each ATTRIBUTES as attr}
        <Collapsible>
            <div slot=title class='grow flex items-center justify-between'>
                <span class='grow basis-0 text-2xl uppercase'>
                    {i18n.t(`attributes.${attr}`)}
                </span>

                <span class='grow basis-0 text-4xl'>
                    <SignedNumber number={$attributesModifiers[attr]} />
                </span>

                <span class='grow basis-0 text-2xl text-neutral-500'>
                    ({$character.attributes[attr]})
                </span>
            </div>


            <svelte:fragment slot='body'>
                {#each $skillsGroupedByAttribute[attr] as skill}
                    <div>
                        <span
                            class:text-indigo-500={skill.proficiency && !skill.expertise}
                            class:text-teal-500={skill.proficiency && skill.expertise}
                        >
                            <SignedNumber number={skillModifier(skill)} />
                        </span>
                        {skill.name}
                    </div>
                {/each}
            </svelte:fragment>
        </Collapsible>
    {/each}

    <Collapsible>
        <div slot='title' class="text-2xl px-3">
            {i18n.t('display.skills.other')}
        </div>

        <svelte:fragment slot=body>
            {#each $character.tools as tool}
                <div>
                    <span class:text-indigo-500={!tool.expertise} class:text-teal-500={tool.expertise}>
                        <SignedNumber number={toolModifier(tool)} />
                    </span>

                    {tool.name}
                </div>
            {/each}

            <!-- TODO: dup -->
            <div class='mt-4 text-sm'>
                <p class='text-sm text-neutral-500'>{i18n.t('display.skills.weapons')}</p>
                <p>{$character.weapons}</p>
            </div>

            <div class='mt-4 text-sm'>
                <p class='text-sm text-neutral-500'>{i18n.t('display.skills.armors')}</p>
                <p>{$character.armors}</p>
            </div>

            <div class='mt-4 text-sm'>
                <p class='text-sm text-neutral-500'>{i18n.t('display.skills.languages')}</p>
                <p>{$character.languages}</p>
            </div>

            <!-- TODO: dup -->
            <div class='mt-4'>
                <Title title={i18n.t('display.skills.jump')}/>

                <div>
                    <p class='text-sm text-neutral-500'>{i18n.t('display.skills.distance')}</p>
                    <p><DistanceNumber distanceInFeet={jumpDistanceInFeet} /></p>
                </div>

                <div>
                    <p class='text-sm text-neutral-500'>{i18n.t('display.skills.height')}</p>
                    <p><DistanceNumber distanceInFeet={jumpHeightInFeet} /></p>
                </div>
            </div>

            <div class='mt-4'>
                <Title title={i18n.t('display.skills.atletics')} />

                <div>
                    <p class='text-sm text-neutral-500'>{i18n.t('display.skills.pushAndPull')}</p>
                    <p><WeightNumber weightInPounds={pushAndPullInPounds} /></p>
                </div>

                <div>
                    <p class='text-sm text-neutral-500'>{i18n.t('display.skills.maxLoad')}</p>
                    <p><WeightNumber weightInPounds={maxLoadInPounds} /></p>
                </div>
            </div>
        </svelte:fragment>
    </Collapsible>
</div>
