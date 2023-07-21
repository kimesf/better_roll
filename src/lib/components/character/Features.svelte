<script lang="ts">
    import { t } from '../../stores/i18n'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
    import Separator from '../shared/Separator.svelte'
    import type { Feature } from '../../types'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'
    import Link from '../shared/Link.svelte'
    import BtnCreate from '../shared/BtnCreate.svelte'
    import BtnDestroy from '../shared/BtnDestroy.svelte'

    const { createRelation, destroyRelation } = characterRepository

    const DEFAULT: Feature = {
        name: '',
        notes: '',
        source: '',
    }
</script>

<Container>
    <Editable>
        <BtnCreate class="w-full" handler={(_) => createRelation('features', DEFAULT)} />
    </Editable>

    {#each $characterRepository.current.features as feature, index}
        <Collapsible>
            <Editable slot="title" class="text-xl">
                <span slot="showing">
                    {feature.name}
                </span>

                <div slot="editing" class="flex justify-between">
                    <Input
                        type="text"
                        id="feature-{index}-name"
                        bind:value={feature.name}
                        placeholder={t('display.missingName')}
                    />

                    <BtnDestroy class="w-16 ml-4" handler={(_) => destroyRelation('features', index)} />
                </div>
            </Editable>

            <Container slot="body">
                <Editable>
                    <div slot="showing">
                        {#if feature.source}
                            <Link to={feature.source} />
                        {:else}
                            <span>{t('display.missingSource')}</span>
                        {/if}
                    </div>

                    <Input
                        slot="editing"
                        type="text"
                        id="feature-{index}-source"
                        bind:value={feature.source}
                        placeholder={t('display.missingSource')}
                    />
                </Editable>

                <Separator />

                <Editable>
                    <span slot="showing">{feature.notes || t('display.missingNotes')}</span>

                    <Input
                        slot="editing"
                        type="textarea"
                        id="feature-{index}-notes"
                        bind:value={feature.notes}
                        placeholder={t('display.missingNotes')}
                    />
                </Editable>
            </Container>
        </Collapsible>
    {/each}
</Container>
