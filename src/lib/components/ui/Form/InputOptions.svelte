<script lang="ts">
    import Button from "../Button.svelte"
    import Grid from "../Grid.svelte"

    export let options: string[]
    export let value: string
</script>

<Grid>
    {#each options as option}
        <Button action="update" size="sm" on:click={() => { value = option}}>
            {option}
        </Button>
    {/each}
</Grid>
