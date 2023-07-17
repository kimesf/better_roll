<script lang="ts">
    import Container from '../shared/Container.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
    import { t } from '../../stores/i18n'
    import Input from '../shared/Input.svelte'
    import type { EquippedItem } from '../../types'
    import Separator from '../shared/Separator.svelte'
    import InputSource from '../shared/InputSource.svelte'
    import BtnLink from '../shared/BtnLink.svelte'
    import InputNotes from '../shared/InputNotes.svelte'
    import Text from '../shared/Text.svelte'
    import BtnCreate from '../shared/BtnCreate.svelte'
    import BtnDestroy from '../shared/BtnDestroy.svelte'

    type StringBoolean = 'true' | 'false'

    ;(function _migrate() {
        if ($characterRepository.current.resources.equippedItems) {
            return
        }

        $characterRepository.current.resources.equippedItems = []
    })()

    const DEFAULT: EquippedItem = {
        name: 'new item',
        attunement: false,
        notes: '',
        source: '',
    }

    const newItem = (): EquippedItem => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    const create = (): void => {
        $characterRepository.current.resources.equippedItems.push(newItem())
        trigger()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.resources.equippedItems.splice(index, 1)
        trigger()
    }

    const attunement = ({ attunement }: EquippedItem): StringBoolean => {
        return String(attunement) as StringBoolean
    }
</script>

<Editable>
    <BtnCreate handler={create} />
</Editable>

{#each $characterRepository.current.resources.equippedItems as item, i}
    <Container>
        <Collapsible>
            <span slot="title">{item.name}</span>

            <Container slot="body">
                <Editable>
                    <Input type="text" id="equippedItem-{i}-name" bind:value={item.name} />
                    <Separator />
                </Editable>

                <Editable row>
                    <Container row slot="showing" class="justify-between items-center">
                        <div>
                            {t('character.resources.equippedItems.attunement')}?
                            {t(attunement(item))}
                        </div>

                        {#if item.source}
                            <BtnLink class="w-16" to={item.source} />
                        {/if}
                    </Container>

                    <Container row slot="editing" class="justify-between">
                        <BtnDestroy class="w-16" handler={() => destroy(i)} />

                        <Input
                            id="equippedItems-{i}-attunement"
                            type="checkbox"
                            bind:checked={item.attunement}
                            label={t('character.resources.equippedItems.attunement')}
                        />
                    </Container>
                </Editable>

                <Separator />

                <Editable>
                    <Text slot="showing">{item.notes}</Text>
                    <InputNotes slot="editing" name="equippedItem-{i}" bind:item />
                </Editable>

                <Editable>
                    <Separator />
                    <InputSource name="equippedItem-{i}" bind:item />
                </Editable>
            </Container>
        </Collapsible>
    </Container>
{/each}
