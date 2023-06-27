<script lang="ts">
    import { fly } from 'svelte/transition'
    import i18n from '../stores/i18n'
    import OtherMechanics from './character/OtherMechanics.svelte'
    import Magic from './displaySections/Magic.svelte'
    import Resources from './displaySections/Resources.svelte'
    import Features from './character/Features.svelte'
    import Main from './displaySections/Main.svelte'
    import Combat from './displaySections/Combat.svelte'
    import canEdit from '../stores/canEdit'
    import Draggable from './shared/Draggable.svelte'

    const sections = {
        mechanics: OtherMechanics,
        features: Features,
        magic: Magic,
        combat: Combat,
        resources: Resources,
    } as const

    type Section = keyof typeof sections

    const sectionKeys = Object.keys(sections) as Section[]

    let visible: Section | null = null

    const openSection = (key: Section | null): void => {
        menuVisible = false
        visible = key
    }

    const closeSection = (): void => {
        window.scrollTo(0, 0)
        visible = null
    }

    let menuVisible = false
</script>

<div>
    {#if menuVisible}
        <div class="z-40 bottom-0 fixed h-screen w-screen flex flex-col justify-between">
            <button class="grow bg-secondary bg-opacity-50" on:click={() => (menuVisible = false)} />

            <div class="bg-secondary">
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
            <!-- TODO: dup transition -->
            <div
                in:fly={{ x: -400, opacity: 1, duration: 500 }}
                out:fly={{ x: -400, opacity: 1, duration: 300 }}
                class="z-10 bg-primary absolute h-screen w-screen overflow-y-scroll justify-between p-2 pb-20"
            >
                <svelte:component this={sections[key]} />
            </div>

            <button
                in:fly={{ x: -400, opacity: 1, duration: 500 }}
                out:fly={{ x: -400, opacity: 1, duration: 300 }}
                on:click={() => closeSection()}
                class="z-20 fixed bottom-0 w-screen p-4 text-2xl text-center uppercase bg-black shadow-[0_-10px_50px_0_rgba(23,23,23,1)]"
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

    <Draggable class="z-30" top={12}>
        <button
            class="p-6 rounded-full"
            class:bg-blue-500={!$canEdit}
            class:bg-green-500={$canEdit}
            on:click={() => canEdit.toggle()}
        />
    </Draggable>
</div>
