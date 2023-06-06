<script lang="ts">
    export let number: number

    const signed = (number: number): string => {
        let sign = number > 0 ? '+' : '-'

        return `${sign}${Math.abs(number)}`
    }
</script>

<span>
    {#if number == 0}
        &nbsp;0
    {:else}
        {signed(number)}
    {/if}
</span>
