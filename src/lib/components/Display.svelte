<script lang="ts">
    import { fly } from 'svelte/transition'
    import i18n from '../stores/i18n'
    import OtherMechanics from './character/OtherMechanics.svelte'
    import Magic from './displaySections/Magic.svelte'
    import Resources from './displaySections/Resources.svelte'
    import Features from './character/Features.svelte'
    import Main from './displaySections/Main.svelte'
    import Combat from './displaySections/Combat.svelte'

    const sections = {
        mechanics: OtherMechanics,
        features: Features,
        resources: Resources,
        magic: Magic,
        combat: Combat,
    } as const

    type Section = keyof typeof sections

    const sectionKeys = Object.keys(sections) as Section[]

    let visible: Section | null = null

    const openSection = (key: Section | null): void => {
        menuVisible = false
        visible = key
    }

    const closeSection = (): void => {
        visible = null
    }

    let menuVisible = false
</script>

<div>
    {#if menuVisible}
        <div class="z-10 absolute h-screen w-screen flex flex-col justify-between">
            <button class="grow bg-neutral-950 bg-opacity-50" on:click={() => (menuVisible = false)} />

            <div class="bg-neutral-950">
                {#each sectionKeys as key}
                    <button on:click={() => openSection(key)} class="p-4 text-2xl w-full">
                        {i18n.t(`display.${key}`)}
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    {#each sectionKeys as key}
        {#if visible == key}
            <div
                transition:fly={{ x: -400, opacity: 1, duration: 500 }}
                class="z-20 bg-neutral-900 absolute min-h-screen w-screen justify-between p-2 mb-20"
            >
                <svelte:component this={sections[key]} />
            </div>

            <button
                on:click={() => closeSection()}
                class="z-30 fixed bottom-0 w-screen p-4 text-2xl text-center uppercase bg-black shadow-[0_-10px_50px_0_rgba(23,23,23,1)]"
            >
                {i18n.t('display.goBack')}
            </button>
        {/if}
    {/each}

    <Main />

    <button
        class="fixed bottom-0 w-screen p-4 text-2xl text-center uppercase bg-black"
        on:click={() => (menuVisible = true)}
    >
        menu
    </button>
</div>
