<script lang="ts">
    import i18n from '../../stores/i18n';
    import canEdit from '../../stores/canEdit'
    import characterRepository from '../../stores/characterRepository';
    import Collapsible from '../shared/Collapsible.svelte'
</script>

{#each $characterRepository.current.features as feature, index}
    <Collapsible>
        <div slot="title" class="text-xl my-2 w-full">
            {#if $canEdit }
                <input id={`feature-${index}-name`} type="text" class="input w-full" bind:value={feature.name}>
            {:else}
                {feature.name}
            {/if}
        </div>

        <div slot="body">
            {#if $canEdit }
                <textarea id={`feature-${index}-notes`} class="input w-full" bind:value={feature.notes} placeholder={i18n.t('display.missingNotes')}/>
            {:else}
                {feature.notes || i18n.t('display.missingNotes')}
            {/if}
        </div>
    </Collapsible>
{/each}
