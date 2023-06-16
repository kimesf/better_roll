<script lang="ts">
    import { character } from '../../stores/currentCharacter'
</script>

{#each $character.mechanics.other as mechanic}
    <div class="flex justify-between items-center p-1">
        <span>
            {mechanic.name}
        </span>

        <span class="text-2xl">
            {mechanic.value}
        </span>
    </div>
{/each}
