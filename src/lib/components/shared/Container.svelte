<script lang="ts">
    import { twMerge } from "tailwind-merge"

    export let row = false
    export let gap: 'small' | 'normal' = 'normal'

    const GAPS = {
        small: 2,
        normal: 4,
    }

    const orientation = row ? 'row' : 'col'

    let klass = ($$props.class as string | undefined) || ''
</script>

<div class={twMerge(`w-full flex flex-${orientation} gap-${GAPS[gap]}`, klass)}>
    <slot />
</div>
