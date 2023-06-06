<script lang="ts">
    import characterRepository from '../stores/characterRepository'
    import { i18n } from '../stores/i18n'

    const { select } = characterRepository
</script>

<div>
    <h1>
        {i18n.t('selection.title')}
        :
    </h1>

    <div>
        {#each $characterRepository.all as availableCharacter}
            <button on:click={() => select(availableCharacter)}>
                {availableCharacter.name}
            </button>
        {/each}
    </div>
</div>
