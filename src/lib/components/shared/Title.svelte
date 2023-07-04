<script lang="ts">
    import Separator from './Separator.svelte'

    export let title: string
</script>

<h1 class="uppercase font-bold text-amber-500">
    {title}
    <Separator />
</h1>
