<script lang="ts">
    import { character } from '../../stores/currentCharacter'
    import i18n from '../../stores/i18n'
    import Separator from '../shared/Separator.svelte'
    import Title from '../shared/Title.svelte'
</script>

<Title title={i18n.t('display.mechanics')} />

<Separator />

<div>
    {#each $character.mechanics.other as mechanic}
        <div class='flex justify-between items-center p-1'>
            <span>
                {mechanic.name}
            </span>

            <span class='text-2xl'>
                {mechanic.value}
            </span>
        </div>
    {/each}
</div>
