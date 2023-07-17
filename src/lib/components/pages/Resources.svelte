<script lang="ts">
    import { t } from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Coins from '../character/Coins.svelte'
    import Finite from '../character/Finite.svelte'
    import Recoverable from '../character/Recoverable.svelte'
    import Container from '../shared/Container.svelte'
    import EquippedItems from '../character/EquippedItems.svelte'
</script>

<Container>
    <Title title={t('display.resources.renewable')} />
    <Recoverable />

    <Title title={t('display.resources.finite')} />
    <Finite />

    <Title title={t('display.resources.coins')} />
    <Coins />

    <Title title={t('character.resources.equippedItems')} />
    <EquippedItems />
</Container>
