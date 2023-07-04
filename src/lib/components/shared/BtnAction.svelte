<script lang="ts">
    import { t } from '../../stores/i18n'
    import Icon from './Icon.svelte'

    type Action = 'create' | 'destroy' | 'update'
    type HandlerEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }

    export let kind: Action
    export let handler: (e: HandlerEvent) => void

    const handle = (e: HandlerEvent) => {
        if (kind == 'destroy' && doesUserRegret()) {
            return
        }

        handler(e)
    }

    const doesUserRegret = () => {
        return !confirm(t('actions.confirm'))
    }
</script>

<button
    class="{$$props.class || ''} text-xl rounded-md flex items-center justify-center"
    class:bg-green-500={kind == 'create'}
    class:bg-red-500={kind == 'destroy'}
    class:bg-blue-500={kind == 'update'}
    on:click={handle}
>
    {#if kind == 'destroy'}
        <Icon name="trash-can" />
    {:else}
        <slot />
    {/if}
</button>
