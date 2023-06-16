<script lang="ts">
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Coins from '../character/Coins.svelte'
    import Finite from '../character/Finite.svelte'
    import Recoverable from '../character/Recoverable.svelte'
</script>

<div>
    <Title title={i18n.t('display.resources.coins')} />

    <hr />

    <Coins />
</div>

<div>
    <Title title={i18n.t('display.resources.renewable')} />

    <hr />

    <Recoverable />
</div>

<div>
    <Title title={i18n.t('display.resources.finite')} />

    <hr />

    <Finite />
</div>
