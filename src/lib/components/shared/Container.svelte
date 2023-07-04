<script lang="ts">
    export let row = false

    const orientation = row ? 'row' : 'col'
</script>

<div class="{$$props.class || ''} w-full flex flex-{orientation} gap-2">
    <slot />
</div>
