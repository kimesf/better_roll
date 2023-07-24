<script lang="ts">
    import { twMerge } from "tailwind-merge"

    export let row = false

    const orientation = row ? 'row' : 'col'

    let klass = ($$props.class as string | undefined) || ''
</script>

<div class={twMerge(`w-full flex flex-${orientation} gap-2`, klass)}>
    <slot />
</div>
