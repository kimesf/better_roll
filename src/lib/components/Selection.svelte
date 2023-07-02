<script lang="ts">
    import characterRepository from '../stores/characterRepository'
    import { t } from '../stores/i18n'
    import BtnAction from './shared/BtnAction.svelte'
    import Title from './shared/Title.svelte'
    import Separator from './shared/Separator.svelte'
    import Basics from './character/Basics.svelte'
    import Collapsible from './shared/Collapsible.svelte'
    import type { Character } from '../types'

    const { select, create, destroy } = characterRepository

    let files: FileList | null

    const save = (): void => {
        const blob = new Blob([JSON.stringify($characterRepository.all)], { type: 'text/json' })
        const link = document.createElement('a')

        const now = new Date()
        link.download = `better_roll_${now.toLocaleDateString()}_${now.getTime()}.json`
        link.href = window.URL.createObjectURL(blob)
        link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

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
            fr.onerror  = (err) => reject(err)
            fr.readAsText(file)
        })
    }

    const restore = (): void => {
        if(!files) {
            alert(t('selection.alert'))
            return
        }

        if(!confirm(t('selection.restore.confirm'))) {
            return
        }

        readFile(files.item(0))
            .then(({ result }) => {
                const content = JSON.parse(result as string) as Character[]

                characterRepository.set({ current: null, all: content || []})
            })
            .catch((error: ProgressEvent<FileReader>) => {
                const { target: { error: { name, message } } } = error

                alert(`${name}: ${message}`)
            })
            .finally(() => {
                files = null
            })
    }

</script>

<div class='p-2'>
    <Title title={t('display.characters')} />

    <Separator />

    <Collapsible>
        <div slot=title class="capitalize text-lg">{t('selection.restore')}</div>

        <div slot=body>
            <input type="file" accept="application/json" class="input w-full mb-1 basis-2/3" bind:files>

            <BtnAction kind=update class="w-full basis-1/3" handler={() => { restore() }}>{t('selection.restore')}</BtnAction>

            <Separator />
        </div>
    </Collapsible>

    <BtnAction kind=create class="w-full mt-2" handler={() => { save() }}>{t('selection.save')}</BtnAction>

    <BtnAction kind=create class="w-full mt-2" handler={() => { create() }}>{t('actions.create')}</BtnAction>

    {#each $characterRepository.all as availableCharacter, index}
        <div class="flex flex-col mt-4 border border-neutral-500 rounded-md p-2">
            <button on:click={() => select(availableCharacter)}>
                <Basics character={availableCharacter} />
            </button>

            <BtnAction kind=destroy handler={() => { destroy(index)} }>r</BtnAction>
        </div>
    {/each}
</div>

