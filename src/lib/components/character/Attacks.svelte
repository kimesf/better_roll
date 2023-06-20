<script lang="ts">
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import { type Attack, type Attribute } from '../../types'
    import Collapsible from '../shared/Collapsible.svelte'
    import SignedNumber from '../shared/SignedNumber.svelte'

    const attackHitBonus = ({ attribute, hitBonus }: Attack): number => {
        return $proficiencyBonus + modifier(attribute) + hitBonus
    }

    const modifier = (attr: Attribute | null): number => {
        return $attributesModifiers?.[attr] || 0
    }
</script>

{#each $character.attacks as attack}
    <Collapsible>
        <div slot="title" class="flex flex-col text-left my-2">
            {attack.name}

            <span class="text-xl">
                {#if attack.attribute}
                    <SignedNumber number={attackHitBonus(attack)} />
                    {attack.damage}<SignedNumber number={$attributesModifiers[attack.attribute]} />
                {:else}
                    {attack.damage}
                {/if}

                <span class="text-sm text-secondary">{attack.damageType}</span>
            </span>
        </div>

        <div slot="body">
            {attack.notes}
        </div>
    </Collapsible>
{/each}
