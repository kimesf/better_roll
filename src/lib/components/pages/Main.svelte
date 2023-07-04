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
    import Basics from '../character/Basics.svelte'
    import Container from '../shared/Container.svelte'

    $: character = $characterRepository.current
</script>

<div class="flex">
    <div class="basis-2/5 h-screen overflow-y-scroll p-2 pb-20">
        <div>
            <CoreMechanics />
        </div>
    </div>

    <div class="basis-3/5 h-screen overflow-y-scroll p-2 pb-20 bg-secondary">
        <div class="text-center">
            <Editable>
                <span slot="showing">
                    <Basics {character} />
                </span>

                <Container>
                    <input
                        id="name"
                        type="text"
                        class="input w-full"
                        bind:value={$characterRepository.current.name}
                        placeholder={t('display.missingName')}
                    />

                    <Incrementor id="level" bind:value={$characterRepository.current.level} />

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
                </Container>
            </Editable>
        </div>

        <div class="flex flex-col">
            <Skills />

            <Collapsible>
                <div slot="title" class="text-2xl capitalize">
                    {i18n.t('display.other')}
                </div>

                <Container slot="body">
                    <Tools />

                    <Proficiencies />

                    <Atletics />
                </Container>
            </Collapsible>
        </div>
    </div>
</div>
