<script lang="ts">
    import i18n from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Editable from '../shared/Editable.svelte'

    const proficiencies: ('weapons' | 'armors' | 'languages')[] = ['weapons', 'armors', 'languages']
</script>

{#each proficiencies as proficiency}
    <div class="mt-4 text-sm">
        <div class="text-sm text-secondary">{i18n.t(`display.skills.${proficiency}`)}</div>

        <Editable>
            <textarea
                slot="editing"
                id={`proficiency-${proficiency}`}
                class="input w-full"
                bind:value={$characterRepository.current[proficiency]}
            />

            <div slot="showing">{$characterRepository.current[proficiency]}</div>
        </Editable>
    </div>
{/each}
