<script>
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import OtherMechanics from '../character/OtherMechanics.svelte'
    import Container from '../shared/Container.svelte'
</script>

<Container>
    <Title title={i18n.t('display.mechanics')} />
    <OtherMechanics />
</Container>
