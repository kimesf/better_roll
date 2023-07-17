<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { t } from '../../stores/i18n'
    import Btn from './Btn.svelte'
    import type { ComponentProps } from 'svelte'
    import Icon from './Icon.svelte'

    export let handler: ComponentProps<Btn>['handler']

    const safeHandler: ComponentProps<Btn>['handler'] = (e)  => {
        if (userCanceled()) {
            return
        }

        // TODO: check if is indeed false positive
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handler(e)
    }

    const userCanceled = () => {
        return !confirm(t('actions.confirm'))
    }

    let klass = ($$props.class as string | undefined) || ''
</script>

<Btn handler={safeHandler} class={twMerge('bg-red-500', klass)}>
    {#if $$slots.default}
       <slot />
    {:else}
        <Icon name="trash-can" />
    {/if}
</Btn>
