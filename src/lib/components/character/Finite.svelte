<script lang="ts">
    import { t } from '../../stores/i18n'
    import Collapsible from '../shared/Collapsible.svelte'
    import Separator from '../shared/Separator.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Editable from '../shared/Editable.svelte'
    import type { Finite } from '../../types'
    import Incrementor from '../shared/Incrementor.svelte'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'
    import Link from '../shared/Link.svelte'
    import Text from '../shared/Text.svelte'
    import BtnCreate from '../shared/BtnCreate.svelte'
    import BtnDestroy from '../shared/BtnDestroy.svelte'

    const { createRelation, destroyRelation } = characterRepository

    const DEFAULT: Finite = {
        name: '',
        amount: 1,
        unity: '',
        notes: '',
        source: '',
    }
</script>

<Container>
    <Editable>
        <BtnCreate class="w-full" handler={(_) => createRelation('resources.finite', DEFAULT)} />
    </Editable>

    {#each $characterRepository.current.resources.finite as finite, index}
        <Collapsible>
            <div slot="title" class="flex w-full justify-between">
                <Editable class="grow basis-0 flex items-center text-left">
                    <Input
                        slot="editing"
                        type="text"
                        id="finite-{index}-name"
                        bind:value={finite.name}
                    />

                    <span slot="showing">{finite.name}</span>
                </Editable>

                <Incrementor
                    id="finite-{index}-amount"
                    class="grow basis-0 flex text-4xl justify-between"
                    bind:value={finite.amount}
                >
                    <Input
                        slot="extra"
                        type="text"
                        id="finite-{index}-unity"
                        class="w-8 text-center"
                        bind:value={finite.unity}
                        placeholder={t('display.resources.finite.unity.placeholder')}
                    />

                    <span>{finite.amount}{finite.unity}</span>
                </Incrementor>
            </div>

            <Container slot="body">
                <Editable>
                    <BtnDestroy class="w-20" handler={(_) => destroyRelation('resources.finite', index)} />

                    <Separator />
                </Editable>

                <Editable>
                    <Input
                        slot="editing"
                        type="text"
                        id="finite-{index}-source"
                        bind:value={finite.source}
                        placeholder={t('display.missingSource')}
                    />

                    <div slot="showing">
                        {#if finite.source}
                            <Link to={finite.source} />
                        {:else}
                            <span>{t('display.missingSource')}</span>
                        {/if}
                    </div>
                </Editable>

                <Separator />

                <Editable>
                    <Input
                        slot="editing"
                        type="textarea"
                        id="finite-{index}-notes"
                        bind:value={finite.notes}
                        placeholder={t('display.missingNotes')}
                    />

                    <Text slot="showing" >
                        {finite.notes || t('display.missingNotes')}
                    </Text>
                </Editable>
            </Container>
        </Collapsible>
    {/each}
</Container>
