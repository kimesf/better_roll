<script lang="ts">
    import { tick } from 'svelte'
    import { t } from '../../stores/i18n'
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import canEdit from '../../stores/canEdit'
    import characterRepository from '../../stores/characterRepository'
    import Editable from '../shared/Editable.svelte'
    import type { Finite } from '../../types'
    import BtnAction from '../shared/BtnAction.svelte'

    const inc = (index: number): void => {
        $characterRepository.current.resources.finite[index].amount++
    }

    const dec = (index: number): void => {
        $characterRepository.current.resources.finite[index].amount--
    }

    const DEFAULT: Finite = {
        name: '',
        amount: 1,
        unity: '',
        notes: '',
        source: '',
    }

    const newFinite = (): Finite => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    const create =  async (): Promise<void> => {
        $characterRepository.current.resources.finite.push(newFinite())
        trigger()

        // TODO: do that for all, maybe find other solution
        await tick()
        focusLast()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.resources.finite.splice(index, 1)
        trigger()
    }

    const focusLast = (): void => {
        const lastId = `finite-${$characterRepository.current.resources.finite.length - 1}-name`
        const last = document.getElementById(lastId)

        last.focus()
    }
</script>

<Editable>
    <BtnAction kind=create class="w-full mt-2" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

<!-- TODO: use incrementor? -->
{#each $characterRepository.current.resources.finite as finite, index}
    <div>
    </div>
    <Collapsible>
        <div slot="title" class="flex w-full justify-between">
            <div class="grow basis-0 flex items-center text-left">
                <Editable>
                    <input
                        slot="editing"
                        id="finite-{index}-name"
                        type="text"
                        class="input w-36"
                        bind:value={finite.name}
                    />

                    <span slot="showing">{finite.name}</span>
                </Editable>
            </div>

            <div class="grow basis-0 flex text-6xl justify-between">
                <button class:invisible={!$canEdit} class="text-red-500" on:click={() => dec(index)}> - </button>

                <Editable>
                    <div slot="editing" class="flex items-center">
                        <input
                            id="finite-{index}-amount"
                            type="number"
                            class="input w-16 mr-1 text-center"
                            bind:value={finite.amount}
                        />
                        <input
                            id="finite-{index}-unity"
                            type="text"
                            class="input w-8 text-center"
                            bind:value={finite.unity}
                            placeholder={t('display.resources.finite.unity.placeholder')}
                        />
                    </div>

                    <span class="text-4xl" slot="showing">{finite.amount}{finite.unity}</span>
                </Editable>

                <button class:invisible={!$canEdit} class="text-green-500" on:click={() => inc(index)}> + </button>
            </div>
        </div>

        <div slot="body">
            <Editable>
                <div class="py-4 flex">
                    <BtnAction kind=destroy class="w-16" handler={(_e) => destroy(index)}>r</BtnAction>
                </div>

                <Separator />
            </Editable>

            <div class="py-4">
                <Editable>
                    <input
                        slot="editing"
                        id="finite-{index}-source"
                        type="text"
                        class="input w-full"
                        bind:value={finite.source}
                        placeholder={t('display.missingSource')}
                    />

                    <div slot="showing">
                        {#if finite.source}
                            <a
                                class="underline text-sky-500"
                                href={finite.source}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {finite.source}
                            </a>
                        {:else}
                            <span>
                                {t('display.missingSource')}
                            </span>
                        {/if}
                    </div>
                </Editable>
            </div>

            <Separator />

            <div class="py-4">
                <Editable>
                    <textarea
                        slot="editing"
                        id="finite-{index}-notes"
                        class="input w-full"
                        bind:value={finite.notes}
                        placeholder={t('display.missingNotes')}
                    />

                    <span slot="showing">{finite.notes || t('display.missingNotes')}</span>
                </Editable>
            </div>
        </div>
    </Collapsible>
{/each}
