<script lang="ts">
    import i18n from '../../stores/i18n'
    import Collapsible from '../shared/Collapsible.svelte'
    import Title from '../shared/Title.svelte'
    import DistanceNumber from '../shared/DistanceNumber.svelte'
    import WeightNumber from '../shared/WeightNumber.svelte'
    import CoreMechanics from '../character/CoreMechanics.svelte'
    import Skills from '../character/Skills.svelte'
    import Tools from '../character/Tools.svelte'
    import { character } from '../../stores/currentCharacter'
    import Proficiencies from '../character/Proficiencies.svelte'
    import Atletics from '../character/Atletics.svelte'
</script>

<div class="flex">
    <div class="basis-2/5 h-screen overflow-y-scroll">
        <div class="mb-20">
            <CoreMechanics />
        </div>
    </div>

    <div class="basis-3/5 h-screen overflow-y-scroll bg-neutral-950">
        <div class="text-center p-1">
            <p>
                {$character.name} | {$character.lineages} | {$character.level}
            </p>

            <p>{$character.classes}</p>
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
