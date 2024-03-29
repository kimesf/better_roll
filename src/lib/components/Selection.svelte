<script lang="ts">
    import characterRepository from '../stores/characterRepository'
    import { t } from '../stores/i18n'
    import Title from './shared/Title.svelte'
    import Separator from './shared/Separator.svelte'
    import Basics from './character/Basics.svelte'
    import Collapsible from './shared/Collapsible.svelte'
    import type { Character } from '../types'
    import Container from './shared/Container.svelte'
    import Input from './shared/Input.svelte'
    import BtnUpdate from './shared/BtnUpdate.svelte'
    import BtnCreate from './shared/BtnCreate.svelte'
    import BtnDestroy from './shared/BtnDestroy.svelte'
    import Card from './shared/Card.svelte'

    const { select, create, destroy } = characterRepository

    let files: FileList | null

    const save = (): void => {
        const blob = new Blob([JSON.stringify($characterRepository.all)], { type: 'text/json' })
        const link = document.createElement('a')

        const now = new Date()
        link.download = `better_roll_${now.toLocaleDateString()}_${now.getTime()}.json`
        link.href = window.URL.createObjectURL(blob)
        link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')

        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })

        link.dispatchEvent(event)
        link.remove()
    }

    const readFile = (file: File): Promise<FileReader> => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.onloadend = () => resolve(fr)
            fr.onerror = (err) => reject(err)
            fr.readAsText(file)
        })
    }

    const restore = (): void => {
        if (!files) {
            alert(t('selection.alert'))
            return
        }

        if (!confirm(t('selection.restore.confirm'))) {
            return
        }

        readFile(files.item(0))
            .then(({ result }) => {
                const content = JSON.parse(result as string) as Character[]

                characterRepository.set({ current: null, all: content || [] })
            })
            .catch((error: ProgressEvent<FileReader>) => {
                const {
                    target: {
                        error: { name, message },
                    },
                } = error

                alert(`${name}: ${message}`)
            })
            .finally(() => {
                files = null
            })
    }
</script>

<Container class="p-2">
    <Title title={t('display.characters')} />

    <Collapsible>
        <div slot="title" class="capitalize text-lg">{t('selection.restore')}</div>

        <div slot="body">
            <Input id="restore" type="file" accept="application/json" class="mb-1 basis-2/3" bind:files />

            <BtnUpdate class="w-full basis-1/3" handler={(_) => restore()}>
                {t('selection.restore')}
            </BtnUpdate>

            <Separator />
        </div>
    </Collapsible>

    <BtnCreate class="w-full" handler={(_) => save()}>
        {t('selection.save')}
    </BtnCreate>

    <BtnCreate class="w-full" handler={(_) => create()} />

    {#each $characterRepository.all as availableCharacter, index}
        <div class="flex flex-col justify-center border border-neutral-500 rounded-md p-2">
            <Basics character={availableCharacter} />

            <div class="flex gap-1">
                <BtnDestroy class="w-16" handler={(_) => destroy(index)} />
                <BtnUpdate class="w-full" handler={(_) => select(availableCharacter)}>{t('selection.select')}</BtnUpdate>
            </div>
        </div>
    {/each}
</Container>
