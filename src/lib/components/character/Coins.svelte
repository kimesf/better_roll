<script lang="ts">
    import i18n from '../../stores/i18n'
    import { coins } from '../../constants'
    import { character } from '../../stores/currentCharacter'

    // TEMP
    const canEdit = false
</script>

<!-- TODO: create component for "- text +" depending on edit -->
{#each coins.reverse() as coin}
    <div class="flex justify-between">
        <h1 class="grow basis-0 flex items-center text-left">
            {i18n.t(`display.resources.coins.${coin}`)}
        </h1>

        <div class="grow basis-0 text-6xl flex justify-between">
            <button class:invisible={!canEdit} class="text-red-500"> - </button>

            <div class="text-4xl flex items-center">
                {$character.resources.coins[coin]}
            </div>

            <button class:invisible={!canEdit} class="text-green-500"> + </button>
        </div>
    </div>
{/each}
