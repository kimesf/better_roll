<script lang='ts'>
    // import i18n from '../../stores/i18n'
    import { attributesModifiers, character, proficiencyBonus } from '../../stores/currentCharacter'
    import { type Attribute } from '../../types'
    import SignedNumber from '../shared/SignedNumber.svelte'

    const modifier = (attr: Attribute | null): number => {
        return $attributesModifiers?.[attr] || 0
    }

    let open: string | null = null

    const toggle = (item: string): void => {
        if(open == item) {
            open = null
            return
        }

        open = item
    }
</script>

{#each $character.attacks as attack}
    <div>
        <button class='text-orange-500' on:click={() => toggle(attack.name)}>
            {attack.name}
        </button>

        <p>
            <SignedNumber number={$proficiencyBonus + modifier(attack.attribute) + attack.hitBonus} />
            {attack.damage}
            {#if attack.attribute}
                <SignedNumber number={$attributesModifiers[attack.attribute]} />
            {/if}
            ({attack.damageType})
        </p>

        {#if open == attack.name}
            <p>
                {attack.notes}
            </p>
        {/if}
    </div>
{/each}
