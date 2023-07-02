<script lang="ts">
    import characterRepository from '../../stores/characterRepository'
    import { t } from '../../stores/i18n'
    import Editable from '../shared/Editable.svelte'
    import Separator from '../shared/Separator.svelte'
    import Title from '../shared/Title.svelte'
    import BtnAction from '../shared/BtnAction.svelte'
    import type { Mechanic } from '../../types'

    const DEFAULT: Mechanic = {
        name: '',
        value: ''
    }

    const newMechanic = (): Mechanic => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository.current.mechanics.other = $characterRepository.current.mechanics.other
    }

    const create = (): void => {
        $characterRepository.current.mechanics.other.push(newMechanic())
        trigger()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.mechanics.other.splice(index, 1)
        trigger()
    }
</script>

<Title title={t('display.mechanics')} />

<Separator />

<Editable>
    <BtnAction kind=create class="mt-2 w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

{#each $characterRepository.current.mechanics.other as mechanic, index}
    <div class="flex justify-between items-center p-1">
        <Editable>
            <input
                slot="editing"
                id="mechanic-{index}-name"
                type="text"
                class="input w-5/12"
                bind:value={mechanic.name}
            />
            <span slot="showing">{mechanic.name}</span>
        </Editable>

        <Editable>
            <input
                slot="editing"
                id="mechanic-{index}-value"
                type="text"
                class="input w-5/12 ml-2"
                bind:value={mechanic.value}
            />
            <span slot="showing" class="text-2xl">{mechanic.value}</span>
        </Editable>

        <Editable>
            <BtnAction kind=destroy class="w-16 ml-2" handler={(_e) => destroy(index)} />
        </Editable>
    </div>
{/each}
