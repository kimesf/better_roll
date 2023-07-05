<script lang="ts">
    import { t } from '../../stores/i18n'
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
        <CoreMechanics />
    </div>

    <div class="basis-3/5 h-screen overflow-y-scroll p-2 pb-20 bg-secondary">
        <Editable class="text-center">
            <Basics slot="showing" {character} />

            <Container slot="editing">
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

        <Skills />

        <Collapsible>
            <span slot="title" class="text-2xl capitalize">
                {t('display.other')}
            </span>

            <Container slot="body">
                <Tools />

                <Proficiencies />

                <Atletics />
            </Container>
        </Collapsible>
    </div>
</div>
