<script lang="ts">
    import { t } from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import Editable from '../shared/Editable.svelte'
    import BtnAction from '../shared/BtnAction.svelte'
    import type { Recoverable } from '../../types'
    import Incrementor from '../shared/Incrementor.svelte'
    import Container from '../shared/Container.svelte'

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
    <BtnAction kind=create class='w-full' handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

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

            <Incrementor
                id="recoverable-{index}-current"
                class="grow basis-0 flex text-4xl justify-between"
                bind:value={recoverable.current}
                >
                <input
                    slot=extra
                    id="recoverable-{index}-total"
                    type="text"
                    class="input w-12 text-center"
                    bind:value={recoverable.total}
                />

                <span class="text-4xl">{recoverable.current}/{recoverable.total}</span>
            </Incrementor>
        </div>

        <Container slot="body">
            <Editable row class="justify-between items-center">
                <BtnAction kind=destroy class="w-16" handler={(_e) => destroy(index)} />

                <div class="text-secondary">
                    <label for="short">{t('recoverable.short')}</label>
                    <input class="input" type="radio" id="short" bind:group={recoverable.recoveredBy} value="short" />
                    <label for="long">{t('recoverable.long')}</label>
                    <input class="input" type="radio" id="long" bind:group={recoverable.recoveredBy} value="long" />
                </div>
            </Editable>

            <Editable>
                <Separator />
            </Editable>

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

            <Separator />

            <Editable>
                <span slot="showing" class="whitespace-pre-wrap">{recoverable.notes || t('display.missingNotes')}</span>

                <textarea
                    slot="editing"
                    id="recoverable-{index}-notes"
                    class="input w-full"
                    bind:value={recoverable.notes}
                    placeholder={t('display.missingNotes')}
                />
            </Editable>
        </Container>
    </Collapsible>
{/each}
