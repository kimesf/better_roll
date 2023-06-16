<script>
    import i18n from '../../stores/i18n'
    import Features from '../character/Features.svelte'
    import Title from '../shared/Title.svelte'
</script>

<div>
    <Title title={i18n.t('display.features')} />

    <hr />

    <Features />
</div>
