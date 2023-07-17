<script lang="ts">
    import { t } from '../../stores/i18n'
    import Input from './Input.svelte'

    export let name
    export let item: { notes: string }
</script>

<Input
    class={$$props.class || ''}
    type="textarea"
    id="{name}-notes"
    bind:value={item.notes}
    placeholder={t('placeholder.notes')}
/>
