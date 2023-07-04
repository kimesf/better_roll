<script lang="ts">
    import i18n from '../../stores/i18n'
    import { coins } from '../../constants'
    import characterRepository from '../../stores/characterRepository'
    import Incrementor from '../shared/Incrementor.svelte'
</script>

{#each coins as coin}
    <div class="flex justify-between">
        <h1 class="grow basis-0 flex items-center text-left">
            {i18n.t(`display.resources.coins.${coin}`)}
        </h1>

        <Incrementor
            id={coin}
            contentClasses="text-4xl"
            class="grow basis-0 text-6xl"
            bind:value={$characterRepository.current.resources.coins[coin]}
        />
    </div>
{/each}
