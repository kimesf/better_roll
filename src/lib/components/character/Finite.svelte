<script lang="ts">
    import { character } from '../../stores/currentCharacter'

    // TODO: use Collapsible
    let visible: string | null = null
    const toggle = (resource: string): void => {
        visible = resource == visible ? null : resource
    }

    // TEMP
    const canEdit = false
</script>

{#each $character.resources.finite as finite}
    <div class="flex justify-between">
        <button class="grow basis-0 flex items-center text-left" on:click={() => toggle(finite.name)}>
            {#if finite.notes != '' || finite.source != ''}
                <i
                    class="arrow mr-2 border-amber-500"
                    class:down={visible == finite.name}
                    class:right={visible != finite.name}
                />
            {/if}

            {finite.name}
        </button>

        <div class="grow basis-0 flex text-6xl justify-between">
            <button class:invisible={!canEdit} class="text-red-500"> - </button>

            <div class="text-4xl flex items-center">
                {finite.amount}{finite.unity}
            </div>

            <button class:invisible={!canEdit} class="text-green-500"> + </button>
        </div>
    </div>

    {#if finite.source != '' && visible == finite.name}
        <hr />

        <div class="py-4 underline text-sky-500">
            <a href={finite.source} target="_blank" rel="noopener noreferrer">{finite.source}</a>
        </div>
    {/if}

    {#if finite.notes != '' && visible == finite.name}
        <hr />

        <div class="py-4">
            {finite.notes}
        </div>
    {/if}
{/each}
