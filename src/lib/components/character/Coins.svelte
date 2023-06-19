<script lang="ts">
    import i18n from '../../stores/i18n'
    import { coins } from '../../constants'
    import { character } from '../../stores/currentCharacter'
    import canEdit from '../../stores/canEdit';
    import characterRepository from '../../stores/characterRepository';
    import type { Coin } from '../../types'

    const inc = (coin: Coin) => {
        $characterRepository.current.resources.coins[coin]++
    }

    const dec = (coin: Coin) => {
        $characterRepository.current.resources.coins[coin]--
    }
</script>

<!-- TODO: create component for "- text +" depending on edit -->
{#each coins as coin}
    <div class="flex justify-between">
        <h1 class="grow basis-0 flex items-center text-left">
            {i18n.t(`display.resources.coins.${coin}`)}
        </h1>

        <div class="grow basis-0 text-6xl flex justify-between">
            <button class:invisible={!$canEdit} class="text-red-500" on:click={() => dec(coin)}> - </button>

            <div class="text-4xl flex items-center">
                {#if $canEdit}
                    <input id={coin} type="number" class="input w-24 text-center" bind:value={$characterRepository.current.resources.coins[coin]}>
                {:else}
                    {$character.resources.coins[coin]}
                {/if}
            </div>

            <button class:invisible={!$canEdit} class="text-green-500" on:click={() => inc(coin)}> + </button>
        </div>
    </div>
{/each}
