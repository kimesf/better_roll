<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { t } from '../../stores/i18n'
    import Btn from './Btn.svelte'
    import type { ComponentProps } from 'svelte'

    export let handler: ComponentProps<Btn>['handler']

    let klass = ($$props.class as string | undefined) || ''
</script>

<Btn {handler} class={twMerge('bg-green-500', klass)}>
    {#if $$slots.default}
       <slot />
    {:else}
        {t('actions.create')}
    {/if}
</Btn>
