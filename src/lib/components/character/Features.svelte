<script lang="ts">
    import { t } from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
    import Title from '../shared/Title.svelte'
    import Separator from '../shared/Separator.svelte'
    import type { Feature } from '../../types'
    import BtnAction from '../shared/BtnAction.svelte'

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

<Title title={t('display.features')} />

<Separator />

<Editable>
    <BtnAction kind=create class="mt-2 w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

{#each $characterRepository.current.features as feature, index}
    <Collapsible>
        <div slot="title" class="text-xl my-2 w-full">
            <Editable>
                <div slot="editing" class="flex justify-between">
                    <input
                        id={`feature-${index}-name`}
                        type="text"
                        class="input w-full"
                        bind:value={feature.name}
                        placeholder={t('display.missingName')}
                    />

                    <BtnAction kind=destroy class="w-16 ml-4" handler={(_e) => destroy(index)}>r</BtnAction>
                </div>

                <span slot="showing">{feature.name}</span>
            </Editable>
        </div>

        <div slot="body">
            <div class="p-4">
                <Editable>
                    <input
                        slot="editing"
                        id={`feature-${index}-source`}
                        type="text"
                        class="input w-full"
                        bind:value={feature.source}
                        placeholder={t('display.missingSource')}
                    />

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
                </Editable>
            </div>

            <Separator />

            <div class="p-4">
                <Editable>
                    <textarea
                        slot="editing"
                        id={`feature-${index}-notes`}
                        class="input w-full"
                        bind:value={feature.notes}
                        placeholder={t('display.missingNotes')}
                    />

                    <span slot="showing">{feature.notes || t('display.missingNotes')}</span>
                </Editable>
            </div>
        </div>
    </Collapsible>
{/each}
