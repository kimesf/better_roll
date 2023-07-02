<script lang="ts">
    import characterRepository from '../stores/characterRepository'
    import { t } from '../stores/i18n'
    import BtnAction from './shared/BtnAction.svelte'
    import Title from './shared/Title.svelte'
    import Separator from './shared/Separator.svelte'
    import Basics from './character/Basics.svelte'

    const { select, create, destroy } = characterRepository
</script>

<div class='p-2'>
    <Title title={t('display.characters')} />

    <Separator />

    <BtnAction kind=create class="w-full" handler={() => { create() }}>{t('actions.create')}</BtnAction>

    {#each $characterRepository.all as availableCharacter, index}
        <div class="flex flex-col mt-4 border border-neutral-500 rounded-md p-2">
            <button on:click={() => select(availableCharacter)}>
                <Basics character={availableCharacter} />
            </button>

            <BtnAction kind=destroy handler={() => { destroy(index)} }>r</BtnAction>
        </div>
    {/each}
</div>
