<script lang="ts">
    import i18n from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Editable from '../shared/Editable.svelte'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'

    const proficiencies: ('weapons' | 'armors' | 'languages')[] = ['weapons', 'armors', 'languages']
</script>

<Container>
    {#each proficiencies as proficiency}
        <div class="text-sm">
            <div class="text-secondary">{i18n.t(`display.skills.${proficiency}`)}</div>

            <Editable>
                <Input
                    slot="editing"
                    type="textarea"
                    id="proficiency-{proficiency}"
                    bind:value={$characterRepository.current[proficiency]}
                />

                <div slot="showing">{$characterRepository.current[proficiency]}</div>
            </Editable>
        </div>
    {/each}
</Container>
