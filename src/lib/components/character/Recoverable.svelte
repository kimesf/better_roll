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
    import Input from '../shared/Input.svelte'
    import Link from '../shared/Link.svelte'
    import Text from '../shared/Text.svelte'

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
    <BtnAction kind="create" class="w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

{#each $characterRepository.current.resources.recoverable as recoverable, index}
    <Collapsible>
        <div slot="title" class="flex w-full items-center">
            <div class="grow basis-0 flex flex-col">
                <Editable>
                    <Input
                        slot="editing"
                        type="text"
                        id="recoverable-{index}-name"
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
                <Input
                    slot="extra"
                    type="number"
                    id="recoverable-{index}-total"
                    bind:value={recoverable.total}
                />

                <span class="text-4xl">{recoverable.current}/{recoverable.total}</span>
            </Incrementor>
        </div>

        <Container slot="body">
            <Editable row class="justify-between items-center">
                <BtnAction kind="destroy" class="w-16" handler={(_e) => destroy(index)} />

                <div class="text-secondary">
                    <Input
                        type="radio"
                        id="short"
                        value="short"
                        label={t('recoverable.short')}
                        bind:group={recoverable.recoveredBy}
                    />

                    <Input
                        type="radio"
                        id="long"
                        value="long"
                        label={t('recoverable.long')}
                        bind:group={recoverable.recoveredBy}
                    />
                </div>
            </Editable>

            <Editable>
                <Separator />
            </Editable>

            <Editable>
                <Input
                    slot="editing"
                    type="text"
                    id="recoverable-{index}-source"
                    bind:value={recoverable.source}
                    placeholder={t('display.missingSource')}
                />

                <div slot="showing">
                    {#if recoverable.source}
                        <Link to={recoverable.source} />
                    {:else}
                        <span>{t('display.missingSource')}</span>
                    {/if}
                </div>
            </Editable>

            <Separator />

            <Editable>
                <Text slot="showing">
                    {recoverable.notes || t('display.missingNotes')}
                </Text>

                <Input
                    slot="editing"
                    type="textarea"
                    id="recoverable-{index}-notes"
                    bind:value={recoverable.notes}
                    placeholder={t('display.missingNotes')}
                />
            </Editable>
        </Container>
    </Collapsible>
{/each}
