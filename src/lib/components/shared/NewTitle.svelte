<script lang="ts">
    export let title: string
</script>

<div class="w-full uppercase text-xl font-bold flex justify-between items-center gap-4">
    <div class="line" />
    {title}
    <div class="line"/>
</div>

<style lang="postcss">
    .line {
        @apply grow border-t-2;
    }
</style>
