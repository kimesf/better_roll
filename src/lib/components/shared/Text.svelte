<script lang="ts">
    import { twMerge } from "tailwind-merge"

    let klass = ($$props.class as string | undefined) || ''
</script>

<div class={twMerge('whitespace-pre-wrap', klass)}>
    <slot />
</div>
