<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    const klass = ($$props.class as string | undefined) || ''
</script>

<div class={twMerge("bg-secondary opacity-100 p-2 rounded-md shadow-[0_5px_5px_0_rgba(23,23,23,1)]", klass)}>
    <slot />
</div>
