<script lang="ts">
    import i18n, { t } from '../../stores/i18n'
    import Collapsible from '../shared/Collapsible.svelte'
    import CoreMechanics from '../character/CoreMechanics.svelte'
    import Skills from '../character/Skills.svelte'
    import Tools from '../character/Tools.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Proficiencies from '../character/Proficiencies.svelte'
    import Atletics from '../character/Atletics.svelte'
    import Editable from '../shared/Editable.svelte'
    import Incrementor from '../shared/Incrementor.svelte'

    $: character = $characterRepository.current
</script>

<div class="flex">
    <div class="basis-2/5 h-screen overflow-y-scroll">
        <div class="mb-20">
            <CoreMechanics />
        </div>
    </div>

    <div class="basis-3/5 h-screen overflow-y-scroll bg-secondary">
        <div class="text-center p-2">
            <Editable>
                <span slot=showing>
                    <p>
                        {character.name} | {character.lineages} | {character.level}
                    </p>

                    <p>{character.classes}</p>
                </span>

                <div class="flex gap-2 flex-col">
                    <input
                        id="name"
                        type="text"
                        class="input w-full"
                        bind:value={$characterRepository.current.name}
                        placeholder={t('display.missingName')}
                    />

                    <Incrementor id="level" bind:value={$characterRepository.current.level}/>

                    <input
                        id="lineages"
                        type="text"
                        class="input w-full"
                        bind:value={$characterRepository.current.lineages}
                    />

                    <input
                        id="classes"
                        type="text"
                        class="input w-full"
                        bind:value={$characterRepository.current.classes}
                    />
                </div>
            </Editable>
        </div>

        <div class="p-2 mb-20 flex flex-col">
            <Skills />

            <Collapsible>
                <div slot="title" class="text-2xl px-3">
                    {i18n.t('display.other')}
                </div>

                <svelte:fragment slot="body">
                    <Tools />

                    <Proficiencies />

                    <Atletics />
                </svelte:fragment>
            </Collapsible>
        </div>
    </div>
</div>
