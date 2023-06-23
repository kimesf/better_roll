<script lang="ts">
    import i18n from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
</script>

{#each $characterRepository.current.features as feature, index}
    <Collapsible>
        <div slot="title" class="text-xl my-2 w-full">
            <Editable>
                <input
                    slot="editing"
                    id={`feature-${index}-name`}
                    type="text"
                    class="input w-full"
                    bind:value={feature.name}
                />

                <span slot="showing">{feature.name}</span>
            </Editable>
        </div>

        <div slot="body" class="py-4">
            <Editable>
                <textarea
                    slot="editing"
                    id={`feature-${index}-notes`}
                    class="input w-full"
                    bind:value={feature.notes}
                    placeholder={i18n.t('display.missingNotes')}
                />

                <span slot="showing">{feature.notes || i18n.t('display.missingNotes')}</span>
            </Editable>
        </div>
    </Collapsible>
{/each}
