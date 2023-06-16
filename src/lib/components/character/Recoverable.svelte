<script lang="ts">
    import i18n from '../../stores/i18n'
    import { character } from '../../stores/currentCharacter'

    // TODO: use Collapsible
    let visible: string | null = null
    const toggle = (resource: string): void => {
        visible = resource == visible ? null : resource
    }

    // TEMP
    const canEdit = false
</script>

<!-- TODO: create component for resources depending on edit -->
{#each $character.resources.recoverable as recoverable}
    <div class="flex justify-between">
        <button class="grow basis-0 flex items-center text-left" on:click={() => toggle(recoverable.name)}>
            {#if recoverable.notes != '' || recoverable.source != ''}
                <!-- TODO: maybe remove this > dup here and in features -->
                <i
                    class="arrow mr-2 border-amber-500"
                    class:down={visible == recoverable.name}
                    class:right={visible != recoverable.name}
                />
            {/if}

            <span class="flex flex-col">
                {recoverable.name}
                <span class="text-xs text-neutral-500">
                    {i18n.t(`recoverable.${recoverable.recoveredBy}`)}
                </span>
            </span>
        </button>

        <div class="grow basis-0 flex text-6xl justify-between">
            <button class:invisible={!canEdit} class="text-red-500"> - </button>

            <div class="text-4xl flex items-center">
                {recoverable.current}/{recoverable.total}
            </div>

            <button class:invisible={!canEdit} class="text-green-500"> + </button>
        </div>
    </div>

    {#if recoverable.source != '' && visible == recoverable.name}
        <hr />

        <div class="py-4 underline text-sky-500">
            <a href={recoverable.source} target="_blank" rel="noopener noreferrer">{recoverable.source}</a>
        </div>
    {/if}

    {#if recoverable.notes != '' && visible == recoverable.name}
        <hr />

        <div class="py-4">
            {recoverable.notes}
        </div>
    {/if}
{/each}
