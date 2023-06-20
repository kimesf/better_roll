<script lang="ts">
    import i18n from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository';
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import canEdit from '../../stores/canEdit';

    const inc = (index: number): void => {
        $characterRepository.current.resources.recoverable[index].current++
    }

    const dec = (index: number): void => {
        $characterRepository.current.resources.recoverable[index].current--
    }
</script>

{#each $characterRepository.current.resources.recoverable as recoverable, index}
    <Collapsible>
        <div slot="title" class="flex w-full items-center">
            <div class="grow basis-0 flex flex-col">
                {#if $canEdit }
                    <input id={`recoverable-${index}-name`} type="text" class="input w-36" bind:value={recoverable.name}>
                {:else}
                    {recoverable.name}
                {/if}

                <span class="text-xs text-secondary">
                    {i18n.t(`recoverable.${recoverable.recoveredBy}`)}
                </span>
            </div>

            <div class="grow basis-0 flex text-6xl justify-between">
                <button class:invisible={!$canEdit} class="text-red-500" on:click={() => dec(index)}> - </button>

                <div class="text-4xl flex items-center">
                    {recoverable.current}/{recoverable.total}
                </div>

                <button class:invisible={!$canEdit} class="text-green-500" on:click={() => inc(index)}> + </button>
            </div>
        </div>

        <div slot="body">
            {#if $canEdit}
                <div class=' py-4 text-secondary'>
                    <label for="short">{i18n.t('recoverable.short')}</label>
                    <input class=input type="radio" id='short' bind:group={recoverable.recoveredBy} value=short>
                    <label for="long">{i18n.t('recoverable.long')}</label>
                    <input class=input type="radio" id='long' bind:group={recoverable.recoveredBy} value=long>
                </div>

                <Separator />
            {/if}


            <div class="py-4">
                {#if $canEdit }
                    <input id={`recoverable-${index}-source`} type="text" class="input w-full" bind:value={recoverable.source} placeholder={i18n.t('display.resources.missingSource')} >
                {:else}
                    {#if recoverable.source}
                        <a class="underline text-sky-500" href={recoverable.source} target="_blank" rel="noopener noreferrer">
                            {recoverable.source}
                        </a>
                    {:else}
                        <span>
                            {i18n.t('display.resources.missingSource')}
                        </span>
                    {/if}
                {/if}
            </div>

            <Separator />

            <div class="py-4">
                {#if $canEdit }
                    <textarea id={`recoverable-${index}-notes`} class="input w-full" bind:value={recoverable.notes} placeholder={i18n.t('display.resources.missingNotes')}/>
                {:else}
                    {recoverable.notes || i18n.t('display.resources.missingNotes')}
                {/if}
            </div>
        </div>
    </Collapsible>
{/each}
