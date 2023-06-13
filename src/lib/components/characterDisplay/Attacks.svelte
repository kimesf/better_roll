<script lang="ts">
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import i18n from '../../stores/i18n'
    import { type Attack, type Attribute } from '../../types'
    import Collapsible from '../shared/Collapsible.svelte'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Title from '../shared/Title.svelte'

    const attackHitBonus = ({ attribute, hitBonus }: Attack): number => {
        return $proficiencyBonus + modifier(attribute) + hitBonus
    }

    const modifier = (attr: Attribute | null): number => {
        return $attributesModifiers?.[attr] || 0
    }
</script>

<Title title={i18n.t('display.actions.attacks')} />

<hr>

{#each $character.attacks as attack}
    <Collapsible let:visible>
        <div slot='title' class='flex items-center my-4'>
            <i
                class='arrow mr-2 border-amber-500'
                class:down={visible}
                class:right={!visible}
            />

            <div class='flex flex-col text-left'>
                {attack.name}

                <span class='text-xl'>
                    {#if attack.attribute}
                        <SignedNumber number={attackHitBonus(attack)} />
                        {attack.damage}<SignedNumber number={$attributesModifiers[attack.attribute]} />
                    {:else}
                        {attack.damage}
                    {/if}

                    <span class='text-sm text-neutral-500'>{attack.damageType}</span>
                </span>
            </div>
        </div>

        <div slot='body'>
            <hr>

            <div class='py-4'>
                {attack.notes}
            </div>
        </div>
    </Collapsible>
{/each}
