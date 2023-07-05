<script>
    import { t } from '../../stores/i18n'
    import Features from '../character/Features.svelte'
    import Container from '../shared/Container.svelte'
    import Title from '../shared/Title.svelte'
</script>

<Container>
    <Title title={t('display.features')} />
    <Features />
</Container>
