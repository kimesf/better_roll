<script lang=ts>
    import { t } from "../../stores/i18n";

    export let suggestions
    export let value
    export let id
</script>

<div class="grid gap-1 grid-cols-2">
    <input
        type="text"
        {id}
        class="input col-span-2 w-full"
        bind:value
        placeholder={t('other')}
    />

    {#each suggestions as suggestion}
        <button class="bg-blue-500 rounded-md" on:click={() => {value = suggestion}}>{suggestion}</button>
    {/each}
</div>
