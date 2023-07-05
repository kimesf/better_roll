<script lang="ts">
    import { t } from '../../stores/i18n'
    import { coins } from '../../constants'
    import characterRepository from '../../stores/characterRepository'
    import Incrementor from '../shared/Incrementor.svelte'
    import Container from '../shared/Container.svelte'
</script>

<Container>
    {#each coins as coin}
        <div class="flex items-center">
            <h1 class="grow basis-0">
                {t(`display.resources.coins.${coin}`)}
            </h1>

            <Incrementor
                id={coin}
                class="grow basis-0"
                contentClasses="text-4xl"
                bind:value={$characterRepository.current.resources.coins[coin]}
            />
        </div>
    {/each}
</Container>
