<script lang="ts">
    import characterRepository from '../../stores/characterRepository';
    import Editable from '../shared/Editable.svelte'
</script>

{#each $characterRepository.current.mechanics.other as mechanic, index}
    <div class="flex justify-between items-center p-1">
        <Editable>
            <input slot=editing id={`mechanic-${index}-name`} type="text" class="input w-5/12" bind:value={mechanic.name}>
            <span slot=showing>{mechanic.name}</span>
        </Editable>

        <Editable>
            <input slot=editing id={`mechanic-${index}-value`} type="text" class="input w-5/12" bind:value={mechanic.value}>
            <span slot=showing class="text-2xl">{mechanic.value}</span>
        </Editable>
    </div>
{/each}
