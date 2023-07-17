<script lang="ts">
    import { t } from '../../stores/i18n'
    import Input from './Input.svelte'

    export let name
    export let item: { source: string }
</script>

<Input
    class={$$props.class || ''}
    type="text"
    id="{name}-source"
    bind:value={item.source}
    placeholder={t('placeholder.source')}
/>
