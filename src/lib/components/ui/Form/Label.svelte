<script lang="ts">
    import { tv } from 'tailwind-variants'
    import Stack from '../Stack.svelte'

    const variants = tv({
        base: 'text-neutral-200',
    })

    export let title: string
</script>

<label class={variants()} {...$$restProps}>
    <Stack direction="col" gap="xs">
        <div class="first-letter:capitalize text-primary">
            {title}
        </div>

        <slot />
    </Stack>
</label>
