<script lang="ts">
    import { i18n } from '../../stores/i18n'
    import { selectedCharacter, type Coin } from '../../stores/selectedCharacter'

    const coins: Coin[] = ['copper', 'silver', 'gold', 'platinum']
</script>

<div>
    <div>
        <h1 class="text-orange-500">{i18n.t('display.resources.coins')}</h1>

        {#each coins as coin}
            <span>
                {i18n.t(`display.resources.coins.${coin}`)}:
                {$selectedCharacter.resources.coins[coin]}
            </span>
        {/each}
    </div>

    <div>
        <h1 class="text-orange-500">{i18n.t('display.resources.renewable')}</h1>

        <div>
            {#each $selectedCharacter.resources.recoverable as recoverable}
                <p>
                    {recoverable.current}/{recoverable.total}
                    -
                    {recoverable.name}
                </p>
            {/each}
        </div>
    </div>

    <div>
        <h1 class="text-orange-500">{i18n.t('display.resources.finite')}</h1>

        <div>
            {#each $selectedCharacter.resources.finite as finite}
                <p>
                    {finite.amount}{finite.unity}
                    -
                    {finite.name}
                </p>
            {/each}
        </div>
    </div>
</div>
