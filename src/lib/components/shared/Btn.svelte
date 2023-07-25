<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import { t } from "../../stores/i18n"
    import Icon from "./Icon.svelte"
    import type { ComponentProps } from "svelte"
    import Link from "./Link.svelte"

    type HandlerEvent = (MouseEvent | TouchEvent) & { currentTarget: EventTarget & HTMLButtonElement }

    export let handler: (e: HandlerEvent) => void = null
    export let askConfirmation = false

    export let icon: string | null = null
    export let iconKind: ComponentProps<Icon>['kind'] = 'solid'

    export let kind: 'default' | 'link' | 'create' | 'update' | 'destroy' = 'default'
    export let shape: 'default' | 'round' = 'default'
    export let size: 'default' | 'small' = 'default'

    export let to: string | null = null

    const ICONS = {
        default: '',
        link: 'up-right-from-square',
        create: 'plus',
        update: 'pen',
        destroy: 'trash-can',
    }

    const handle = (e: HandlerEvent): void => {
        if (!handler) {
            return
        }

        if (askConfirmation && userCanceled()) {
            return
        }

        handler(e)
    }

    const userCanceled = () => {
        return !confirm(t('actions.confirm'))
    }

    const klass = ($$props.class as string | undefined) || ''
</script>

<!-- this only shows round buttons can be a differente component -->
<!-- by this I mean size only being relevant to round -->

<button
    class={klass}
    on:click={handle}
    class:shape-default={shape == 'default'}
    class:shape-round={shape == 'round'}
    class:size-default={shape == 'round' && size == 'default'}
    class:size-small={shape == 'round' && size == 'small'}
    class:bg-amber-500={kind == 'default' || kind == 'link'}
    class:bg-green-500={kind == 'create'}
    class:bg-blue-500={kind == 'update'}
    class:bg-red-500={kind == 'destroy'}
>
    {#if $$slots.default}
        <slot />
    {:else}
        {#if kind == 'link'}
            <Link {to}>
                <Icon name="up-right-from-square"/>
            </Link>
        {:else}
            <Icon name={icon || ICONS[kind]} kind={iconKind} />
        {/if}
    {/if}
</button>

<style lang="postcss">
    button {
        @apply shadow-xl;
    }
    .shape-default {
        @apply rounded-md text-xl flex items-center justify-center;
    }

    .shape-round {
        @apply rounded-full;
    }

    .size-default {
        @apply min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] text-lg;
    }

    .size-small {
        @apply min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] text-base;

    }
</style>
