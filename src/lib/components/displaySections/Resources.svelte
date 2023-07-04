<script lang="ts">
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Coins from '../character/Coins.svelte'
    import Finite from '../character/Finite.svelte'
    import Recoverable from '../character/Recoverable.svelte'
    import Container from '../shared/Container.svelte'
</script>

<Container>
    <Title title={i18n.t('display.resources.coins')} />

    <Coins />
</Container>

<Container>
    <Title title={i18n.t('display.resources.renewable')} />

    <Recoverable />
</Container>

<Container>
    <Title title={i18n.t('display.resources.finite')} />

    <Finite />
</Container>
