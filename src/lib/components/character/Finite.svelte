<script lang="ts">
    import i18n from '../../stores/i18n';
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import canEdit from '../../stores/canEdit';
    import characterRepository from '../../stores/characterRepository';

    const inc = (index: number): void => {
        $characterRepository.current.resources.finite[index].amount++
    }

    const dec = (index: number): void => {
        $characterRepository.current.resources.finite[index].amount--
    }
</script>

{#each $characterRepository.current.resources.finite as finite, index}
    <Collapsible>
        <div slot='title' class='flex w-full justify-between'>
            <div class="grow basis-0 flex items-center text-left">
                {#if $canEdit }
                    <input id={`finite-${index}-name`} type="text" class="input w-36" bind:value={finite.name}>
                {:else}
                    {finite.name}
                {/if}
            </div>

            <div class="grow basis-0 flex text-6xl justify-between">
                <button class:invisible={!$canEdit} class="text-red-500" on:click={() => dec(index)}> - </button>

                <div class="text-4xl flex items-center">
                    {#if $canEdit }
                        <input id={`finite-${index}-amount`} type="number" class="input w-16 mr-1 text-center" bind:value={finite.amount}>
                        <input id={`finite-${index}-unity`} type="text" class="input w-8 text-center" bind:value={finite.unity}>
                    {:else}
                        {finite.amount}{finite.unity}
                    {/if}
                </div>

                <button class:invisible={!$canEdit} class="text-green-500" on:click={() => inc(index)}> + </button>
            </div>
        </div>

        <div slot='body'>
            <div class="py-4">
                {#if $canEdit }
                    <input id={`finite-${index}-source`} type="text" class="input w-full" bind:value={finite.source} placeholder={i18n.t('display.missingSource')}>
                {:else}
                    {#if finite.source}
                        <a class="underline text-sky-500" href={finite.source} target="_blank" rel="noopener noreferrer">
                            {finite.source}
                        </a>
                    {:else}
                        <span>
                            {i18n.t('display.missingSource')}
                        </span>
                    {/if}
                {/if}
            </div>

            <Separator />

            <div class="py-4">
                {#if $canEdit }
                    <textarea id={`finite-${index}-notes`} class="input w-full" bind:value={finite.notes} placeholder={i18n.t('display.missingNotes')}/>
                {:else}
                    {finite.notes || i18n.t('display.missingNotes')}
                {/if}
            </div>
        </div>
    </Collapsible>
{/each}
