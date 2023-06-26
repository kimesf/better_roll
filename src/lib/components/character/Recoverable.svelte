<script lang="ts">
    import { t } from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import canEdit from '../../stores/canEdit'
    import Editable from '../shared/Editable.svelte'
    import BtnAction from '../shared/BtnAction.svelte'
    import type { Recoverable } from '../../types'

    const inc = (index: number): void => {
        $characterRepository.current.resources.recoverable[index].current++
    }

    const dec = (index: number): void => {
        $characterRepository.current.resources.recoverable[index].current--
    }

    const DEFAULT: Recoverable = {
        name: '',
        current: 0,
        total: 1,
        recoveredBy: 'long',
        notes: '',
        source: '',
    }

    const newRecoverable = (): Recoverable => {
        return structuredClone(DEFAULT)
    }

    // TODO: dup
    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    // TODO: dup
    const create = (): void => {
        $characterRepository.current.resources.recoverable.push(newRecoverable())
        trigger()
    }

    // TODO: dup
    const destroy = (index: number): void => {
        $characterRepository.current.resources.recoverable.splice(index, 1)
        trigger()
    }
</script>

<Editable>
    <BtnAction kind=create class='w-full mt-2' handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

<!-- TODO: use incrementor? -->
{#each $characterRepository.current.resources.recoverable as recoverable, index}
    <Collapsible>
        <div slot="title" class="flex w-full items-center">
            <div class="grow basis-0 flex flex-col">
                <Editable>
                    <input
                        slot="editing"
                        id="recoverable-{index}-name"
                        type="text"
                        class="input w-36"
                        bind:value={recoverable.name}
                    />
                    <span slot="showing">{recoverable.name}</span>
                </Editable>

                <span class="text-xs text-secondary">
                    {t(`recoverable.${recoverable.recoveredBy}`)}
                </span>
            </div>

            <div class="grow basis-0 flex text-6xl justify-between">
                <button class:invisible={!$canEdit} class="text-red-500" on:click={() => dec(index)}> - </button>

                <Editable>
                    <div slot="editing" class="flex items-center">
                        <input
                            id="recoverable-{index}-current"
                            type="number"
                            class="input w-12 mr-1 text-center"
                            bind:value={recoverable.current}
                        />
                        <input
                            id="recoverable-{index}-total"
                            type="text"
                            class="input w-12 text-center"
                            bind:value={recoverable.total}
                        />
                    </div>

                    <span slot="showing" class="text-4xl">{recoverable.current}/{recoverable.total}</span>
                </Editable>

                <button class:invisible={!$canEdit} class="text-green-500" on:click={() => inc(index)}> + </button>
            </div>
        </div>

        <div slot="body">
            <Editable>
                <div class="flex justify-between items-center">
                    <div class="py-4 text-secondary">
                        <label for="short">{t('recoverable.short')}</label>
                        <input class="input" type="radio" id="short" bind:group={recoverable.recoveredBy} value="short" />
                        <label for="long">{t('recoverable.long')}</label>
                        <input class="input" type="radio" id="long" bind:group={recoverable.recoveredBy} value="long" />
                    </div>

                    <BtnAction kind=destroy class="w-16" handler={(_e) => destroy(index)}>r</BtnAction>
                </div>

                <Separator />
            </Editable>

            <div class="py-4">
                <Editable>
                    <input
                        slot="editing"
                        id="recoverable-{index}-source"
                        type="text"
                        class="input w-full"
                        bind:value={recoverable.source}
                        placeholder={t('display.missingSource')}
                    />

                    <div slot="showing">
                        {#if recoverable.source}
                            <a
                                class="underline text-sky-500"
                                href={recoverable.source}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {recoverable.source}
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
                    <span slot="showing">{recoverable.notes || t('display.missingNotes')}</span>
                    <textarea
                        slot="editing"
                        id="recoverable-{index}-notes"
                        class="input w-full"
                        bind:value={recoverable.notes}
                        placeholder={t('display.missingNotes')}
                    />
                </Editable>
            </div>
        </div>
    </Collapsible>
{/each}
