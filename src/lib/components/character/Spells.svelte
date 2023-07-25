<script lang="ts">
    import { t } from '../../stores/i18n'
    import { type Spell } from '../../types'
    import Separator from '../shared/Separator.svelte'
    import characterRepository from '../../stores/characterRepository'
    import Container from '../shared/Container.svelte'
    import Text from '../shared/Text.svelte'
    import Btn from '../shared/Btn.svelte'
    import Icon from '../shared/Icon.svelte'
    import Chip from '../shared/Chip.svelte'
    import NewCollapsible from '../shared/NewCollapsible.svelte'
    import NewEditable from '../shared/NewEditable.svelte'
    import NewTitle from '../shared/NewTitle.svelte'
    import spellEditor from '../../stores/spellEditor'

    export let forceShow = false
    export let filter: (spell: Spell) => boolean | null = null

    const { createRelation, destroyRelation } = characterRepository

    const DEFAULT: Spell = {
        name: 'new',
        circle: 1,
        alwaysAvailable: false,
        available: false,
        school: 'abjuration',
        conjurationTime: '',
        range: '',
        target: '',
        components: {
            verbal: false,
            somatic: false,
            material: false,
            notes: '',
        },
        duration: '',
        concentration: false,
        ritual: false,
        notes: '',
        source: '',
    }

    $: spellList = filter ? $characterRepository.current.spells.filter(filter) : $characterRepository.current.spells

    const sortSpells = (): void => {
        $characterRepository.current.spells.sort((a, b) => {
            if (a.circle < b.circle) return -1
            if (a.circle > b.circle) return 1

            if (a.alwaysAvailable && !b.alwaysAvailable) return -1
            if (!a.alwaysAvailable && b.alwaysAvailable) return 1

            if (a.name < b.name) return -1
            if (a.name > b.name) return 1

            return 0
        })

        $characterRepository = $characterRepository
    }
</script>

<NewEditable {forceShow}>
    <Container row slot="editing">
        <Btn shape="round" kind="create" handler={(_) => createRelation('spells', DEFAULT)} />
        <Btn shape="round" icon="arrow-down-a-z" kind="update" askConfirmation handler={(_) => sortSpells()} />
        <NewTitle title={t('character.spells')} />
    </Container>
</NewEditable>

{#each spellList as spell, index}
    <NewCollapsible>
        <svelte:fragment slot="title">
            <div
                class="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] shadow-xl rounded-full flex items-center justify-center font-extrabold text-xl"
                class:bg-neutral-500={!spell.available && !spell.alwaysAvailable}
                class:bg-green-500={spell.available}
                class:bg-pink-500={spell.alwaysAvailable}
            >
                {spell.circle}
            </div>

            <div class="text-lg font-bold text-secondary" class:text-white={spell.available || spell.alwaysAvailable}>
                {spell.name}
            </div>
        </svelte:fragment>

        <svelte:fragment slot="subtitle">
            <div
                class="flex justify-between text-secondary items-center"
                class:text-white={spell.available || spell.alwaysAvailable}
            >
                <div class="flex gap-2">
                    <Chip>
                        {spell.conjurationTime}
                    </Chip>

                    <Chip>
                        {spell.range}
                    </Chip>
                </div>

                <div class="flex">
                    <!-- TODO: add this -->
                    {#if true}<Icon name="coins" class="bg-red-500" />{/if}
                    {#if spell.concentration}<Icon name="brain" />{/if}
                    {#if spell.ritual}<Icon name="menorah" />{/if}
                </div>
            </div>

            <NewEditable>
                <Container row class="justify-start" slot="editing">
                    {#if !forceShow}
                        <Btn
                            askConfirmation
                            shape="round"
                            handler={(_) => destroyRelation('spells', index)}
                            icon="trash-can"
                            kind="destroy"
                        />

                        <Btn shape="round" handler={() => spellEditor.set(index)} icon="pen" kind="update" />

                        {#if !spell.alwaysAvailable}
                            {#if spell.available}
                                <Btn
                                    shape="round"
                                    handler={() => (spell.available = false)}
                                    icon="bookmark"
                                    kind="update"
                                />
                            {:else}
                                <Btn
                                    shape="round"
                                    handler={() => (spell.available = true)}
                                    icon="bookmark"
                                    kind="update"
                                    iconKind="regular"
                                />
                            {/if}
                        {/if}
                    {/if}

                    <Btn
                        shape="round"
                        handler={() => alert('used')}
                        askConfirmation
                        icon="hand-sparkles"
                        kind="update"
                    />
                </Container>
            </NewEditable>
        </svelte:fragment>

        <svelte:fragment slot="body">
            <Chip>
                {t(`spells.school.${spell.school}`)}
            </Chip>

            <Chip>
                {spell.duration}
            </Chip>

            <Chip>
                {spell.target}
            </Chip>

            <Separator />

            <Container row gap="small">
                {#if spell.components.verbal}<Chip>{t('spells.components.verbal')}</Chip>{/if}
                {#if spell.components.somatic}<Chip>{t('spells.components.somatic')}</Chip>{/if}
                {#if spell.components.material}<Chip>{t('spells.components.material')}</Chip>{/if}
            </Container>

            {#if spell.components.notes}
                <div>
                    {spell.components.notes}
                </div>
            {/if}

            {#if spell.source}
                <Btn shape="round" kind="link" to={spell.source} />
            {:else}
                <Separator />
            {/if}

            {#if spell.notes}
                <Text>{spell.notes}</Text>
            {/if}
        </svelte:fragment>
    </NewCollapsible>
{/each}
