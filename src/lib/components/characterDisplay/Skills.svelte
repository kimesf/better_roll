<script lang="ts">
    // TODO: use absolute imports?
    import i18n from '../../stores/i18n'
    import {
        attributesModifiers,
        character,
        proficiencyBonus,
        skillsGroupedByAttribute,
    } from '../../stores/currentCharacter'
    import { type Attribute, type Skill, type Tool } from '../../types'
    import { ATTRIBUTES } from '../../constants'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import DistanceNumber from '../shared/DistanceNumber.svelte'
    import WeightNumber from '../shared/WeightNumber.svelte'

    $: jumpDistanceInFeet = $character.attributes.str
    $: jumpHeightInFeet = 3 + $attributesModifiers.str
    $: pushAndPullInPounds = 30 * $character.attributes.str
    $: maxLoadInPounds = 15 * $character.attributes.str

    let visible: Attribute | 'other' | null = null

    const toggle = (attr: Attribute | 'other') => {
        if (attr == visible) {
            visible = null
            return
        }

        visible = attr
    }

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

{#each ATTRIBUTES as attr}
    <div>
        <button class="text-4xl" on:click={() => toggle(attr)}>
            {i18n.t(`attributes.${attr}`)}
            <SignedNumber number={$attributesModifiers[attr]} />
            {$character.attributes[attr]}
        </button>
        {#each $skillsGroupedByAttribute[attr] as skill}
            {#if visible == skill.attribute}
                <div>
                    <span
                        class:text-indigo-500={skill.proficiency && !skill.expertise}
                        class:text-teal-500={skill.proficiency && skill.expertise}
                    >
                        <SignedNumber number={skillModifier(skill)} />
                    </span>
                    {skill.name}
                </div>
            {/if}
        {/each}
    </div>
{/each}

<div>
    <button class="text-4xl" on:click={() => toggle('other')}>{i18n.t('display.skills.other')}</button>
    {#if visible == 'other'}
        {#each $character.tools as tool}
            <div>
                <span class:text-indigo-500={!tool.expertise} class:text-teal-500={tool.expertise}>
                    <SignedNumber number={toolModifier(tool)} />
                </span>
                {tool.name}
            </div>
        {/each}

        <br />

        <div>
            <p>{$character.weapons}</p>
            <p>{$character.armors}</p>
            <p>{$character.languages}</p>
        </div>

        <br />

        <div>
            <h1>{i18n.t('display.skills.jump')}</h1>

            <p>
                {i18n.t('display.skills.distance')}:
                <DistanceNumber distanceInFeet={jumpDistanceInFeet} />
            </p>
            <p>
                {i18n.t('display.skills.height')}:
                <DistanceNumber distanceInFeet={jumpHeightInFeet} />
            </p>
        </div>

        <br />

        <div>
            <h1>{i18n.t('display.skills.atletics')}</h1>

            <p>
                {i18n.t('display.skills.pushAndPull')}:
                <WeightNumber weightInPounds={pushAndPullInPounds} />
            </p>
            <p>
                {i18n.t('display.skills.maxLoad')}:
                <WeightNumber weightInPounds={maxLoadInPounds} />
            </p>
        </div>
    {/if}
</div>
