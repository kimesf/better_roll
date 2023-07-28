<script lang="ts">
    import { tv, type VariantProps } from 'tailwind-variants'
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

    const variants = tv({
        base: 'shadow-xl flex items-center justify-center select-none',
        variants: {
            action: {
                navigate: 'bg-amber-500',
                create: 'bg-green-500',
                update: 'bg-blue-500',
                destroy: 'bg-red-500',
                empty: 'bg-neutral-600',
            },
            shape: {
                rect: 'rounded-md p-2',
                round: 'rounded-full',
                square: 'rounded-md border border-neutral-500',
            },
            size: {
                sm: 'text-base',
                md: 'text-lg',
            },
            disabled: {
                true: 'bg-neutral-500 text-neutral-400',
            },
        },
        compoundVariants: [
            {
                shape: ['round', 'square'],
                size: 'md',
                class: 'min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px]',
            },
            {
                shape: ['round', 'square'],
                size: 'sm',
                class: 'min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]',
            },
        ],
    })

    type Button = VariantProps<typeof variants>

    interface AnchorElement extends Button, HTMLAnchorAttributes {
        href?: HTMLAnchorAttributes['href']
        type?: never
    }

    interface ButtonElement extends Button, HTMLButtonAttributes {
        type?: HTMLButtonAttributes['type']
        href?: never
    }

    type $$Props = ButtonElement | AnchorElement

    let klass: string | undefined | null = undefined
    export { klass as class }

    export let type: $$Props['type'] = 'button'
    export let href: $$Props['href'] = undefined

    export let action: $$Props['action'] = 'navigate'
    export let shape: $$Props['shape'] = 'rect'
    export let size: $$Props['size'] = 'md'
    export let disabled: $$Props['disabled'] = false

    const withHttp = (url: string): string => {
        return !/^https?:\/\//i.test(url) ? `http://${url}` : url
    }
</script>

<svelte:element
    this={href ? 'a' : 'button'}
    type={href ? undefined : type}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    href={href && withHttp(href)}
    tabindex="0"
    role="button"
    {disabled}
    aria-disabled={disabled}
    class={variants({ action, shape, size, disabled, class: klass })}
    {...$$restProps}
    on:click
>
    <slot />
</svelte:element>
