<script lang="ts">
    import { character } from '../stores/character';
    import { i18n } from '../stores/i18n'

    const { select } = character
</script>

<div>
    <h1>
        {i18n.t('selection.title')}
        :
    </h1>

    <div>
        {#each $character.all as character}
            <button on:click={() => select(character)}>
                {character.name}
            </button>
        {/each}
    </div>
</div>
