<script lang="ts">
    import { t } from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
    import Separator from '../shared/Separator.svelte'
    import type { Feature } from '../../types'
    import BtnAction from '../shared/BtnAction.svelte'
    import Container from '../shared/Container.svelte'

    const DEFAULT: Feature = {
        name: '',
        notes: '',
        source: '',
    }

    const newFeature = (): Feature => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository.current.features = $characterRepository.current.features
    }

    const create = (): void => {
        $characterRepository.current.features.push(newFeature())
        trigger()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.features.splice(index, 1)
        trigger()
    }
</script>

<Container>
    <Editable>
        <BtnAction kind="create" class="w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
    </Editable>

    {#each $characterRepository.current.features as feature, index}
        <Collapsible>
            <Editable slot="title" class="text-xl">
                <span slot="showing">
                    {feature.name}
                </span>

                <div slot="editing" class="flex justify-between">
                    <input
                        id="feature-{index}-name"
                        type="text"
                        class="input w-full"
                        bind:value={feature.name}
                        placeholder={t('display.missingName')}
                    />

                    <BtnAction kind="destroy" class="w-16 ml-4" handler={(_e) => destroy(index)} />
                </div>
            </Editable>

            <Container slot="body">
                <Editable>
                    <div slot="showing">
                        {#if feature.source}
                            <a
                                class="underline text-sky-500"
                                href={feature.source}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {feature.source}
                            </a>
                        {:else}
                            <span>
                                {t('display.missingSource')}
                            </span>
                        {/if}
                    </div>

                    <input
                        slot="editing"
                        id="feature-{index}-source"
                        type="text"
                        class="input w-full"
                        bind:value={feature.source}
                        placeholder={t('display.missingSource')}
                    />
                </Editable>

                <Separator />

                <Editable>
                    <span slot="showing">{feature.notes || t('display.missingNotes')}</span>

                    <textarea
                        slot="editing"
                        id="feature-{index}-notes"
                        class="input w-full"
                        bind:value={feature.notes}
                        placeholder={t('display.missingNotes')}
                    />
                </Editable>
            </Container>
        </Collapsible>
    {/each}
</Container>
