<script lang="ts">
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Attacks from '../character/Attacks.svelte'
</script>

<div>
    <Title title={i18n.t('display.actions.attacks')} />

    <hr />

    <Attacks />
</div>
