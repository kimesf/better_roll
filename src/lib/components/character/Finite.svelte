<script lang="ts">
    import { tick } from 'svelte'
    import { t } from '../../stores/i18n'
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Editable from '../shared/Editable.svelte'
    import type { Finite } from '../../types'
    import BtnAction from '../shared/BtnAction.svelte'
    import Incrementor from '../shared/Incrementor.svelte'
    import Container from '../shared/Container.svelte'

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

    const create = async (): Promise<void> => {
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

<Container>
    <Editable>
        <BtnAction kind="create" class="w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
    </Editable>

    {#each $characterRepository.current.resources.finite as finite, index}
        <Collapsible>
            <div slot="title" class="flex w-full justify-between">
                <Editable class="grow basis-0 flex items-center text-left">
                    <input
                        slot="editing"
                        id="finite-{index}-name"
                        type="text"
                        class="input w-36"
                        bind:value={finite.name}
                    />

                    <span slot="showing">{finite.name}</span>
                </Editable>

                <Incrementor
                    id="finite-{index}-amount"
                    class="grow basis-0 flex text-4xl justify-between"
                    bind:value={finite.amount}
                >
                    <input
                        slot="extra"
                        id="finite-{index}-unity"
                        type="text"
                        class="input w-8 text-center"
                        bind:value={finite.unity}
                        placeholder={t('display.resources.finite.unity.placeholder')}
                    />

                    <span>{finite.amount}{finite.unity}</span>
                </Incrementor>
            </div>

            <Container slot="body">
                <Editable>
                    <BtnAction kind="destroy" class="w-20" handler={(_e) => destroy(index)} />

                    <Separator />
                </Editable>

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

                <Separator />

                <Editable>
                    <textarea
                        slot="editing"
                        id="finite-{index}-notes"
                        class="input w-full"
                        bind:value={finite.notes}
                        placeholder={t('display.missingNotes')}
                    />

                    <span slot="showing" class="whitespace-pre-wrap">{finite.notes || t('display.missingNotes')}</span>
                </Editable>
            </Container>
        </Collapsible>
    {/each}
</Container>
