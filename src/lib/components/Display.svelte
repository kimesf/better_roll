<script lang="ts">
    import { fly } from 'svelte/transition'
    import { t } from '../stores/i18n'
    import Magic from './pages/Magic.svelte'
    import Resources from './pages/Resources.svelte'
    import Features from './pages/Features.svelte'
    import Main from './pages/Main.svelte'
    import Combat from './pages/Combat.svelte'
    import characterRepository from '../stores/characterRepository'
    import Mechanics from './pages/Mechanics.svelte'
    import EditToggler from './EditToggler.svelte'

    // TODO: maybe page handling can be a store and they this can be clean up
    const pages = {
        mechanics: Mechanics,
        features: Features,
        magic: Magic,
        combat: Combat,
        resources: Resources,
    } as const

    type Page = keyof typeof pages

    // TODO: svelte 4 iterates maps in html
    const pageKeys = Object.keys(pages) as Page[]

    let visible: Page | null = null

    const openPage = (key: Page | null): void => {
        menuVisible = false
        visible = key
    }

    const closePage = (): void => {
        window.scrollTo(0, 0)
        visible = null
    }

    let menuVisible = false
</script>

<Main />

<EditToggler />

<button
    class="fixed bottom-0 w-screen p-4 text-2xl text-center uppercase bg-black"
    on:click={() => (menuVisible = true)}
>
    menu
</button>

{#each pageKeys as key}
    {#if visible == key}
        <!-- TODO: dup transition -->
        <div
            in:fly={{ x: -400, opacity: 1, duration: 500 }}
            out:fly={{ x: -400, opacity: 1, duration: 300 }}
            class="z-10 bg-primary absolute h-screen w-screen overflow-y-scroll justify-between p-2 pb-20"
        >
            <svelte:component this={pages[key]} />
        </div>

        <button
            in:fly={{ x: -400, opacity: 1, duration: 500 }}
            out:fly={{ x: -400, opacity: 1, duration: 300 }}
            on:click={() => closePage()}
            class="z-20 fixed bottom-0 w-screen p-4 text-2xl text-center uppercase bg-black shadow-[0_-10px_50px_0_rgba(23,23,23,1)]"
        >
            {t('display.goBack')}
        </button>
    {/if}
{/each}

{#if menuVisible}
    <div class="z-40 bottom-0 fixed h-screen w-screen flex flex-col justify-between">
        <button class="fixed top-0 p-4 text-2xl w-full bg-secondary" on:click={() => characterRepository.select(null)}>
            {t('display.characters')}
        </button>

        <button class="grow bg-secondary bg-opacity-50" on:click={() => (menuVisible = false)} />

        <div class="bg-secondary">
            {#each pageKeys as key}
                <button class="p-4 text-2xl w-full" on:click={() => openPage(key)}>
                    {t(`display.${key}`)}
                </button>
            {/each}
        </div>
    </div>
{/if}
