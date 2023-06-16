<script>
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Separator from '../shared/Separator.svelte'
    import OtherMechanics from '../character/OtherMechanics.svelte'
</script>

<div>
    <Title title={i18n.t('display.mechanics')} />

    <Separator />

    <OtherMechanics />
</div>
