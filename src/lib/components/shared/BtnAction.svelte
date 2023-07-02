<script lang=ts>
    import { t } from "../../stores/i18n";

    type Action = 'create' | 'destroy'
    type HandlerEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }

    export let kind: Action
    export let handler: (e: HandlerEvent) => void

    const handle = (e: HandlerEvent) => {
        if(kind == 'destroy' && doesUserRegret()) {
            return
        }

        handler(e)
    }

    const doesUserRegret = () => {
        return !confirm(t('actions.confirm'))
    }
</script>

<!-- TODO: get garbage icon for destroy -->
<button
    class="{$$props.class || ''} text-xl rounded-md"
    class:bg-green-500={kind == 'create'}
    class:bg-red-500={kind == 'destroy'}
    on:click={handle}
>
    <slot />
</button>
