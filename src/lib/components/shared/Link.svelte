<script lang="ts">
    export let to: string

    const withHttp = (url: string): string => {
        return !/^https?:\/\//i.test(url) ? `http://${url}` : url
    }
</script>

<a href={withHttp(to)} target="_blank" rel="noopener noreferrer">
    {#if $$slots.default}
        <slot />
    {:else}
        <span class="underline text-sky-500">
            {to}
        </span>
    {/if}
</a>
