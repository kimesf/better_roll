<script lang="ts">
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Attacks from '../character/Attacks.svelte'
    import Container from '../shared/Container.svelte'
</script>

<Container>
    <Title title={i18n.t('display.actions.attacks')} />
    <Attacks />
</Container>
