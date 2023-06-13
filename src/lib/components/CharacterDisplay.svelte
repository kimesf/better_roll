<script lang="ts">
    import { character } from '../stores/currentCharacter'
    import i18n from '../stores/i18n'
    import Actions from './characterDisplay/Actions.svelte'
    import Magic from './characterDisplay/Magic.svelte'
    import OtherMechanics from './characterDisplay/OtherMechanics.svelte'
    import Resources from './characterDisplay/Resources.svelte'
    import Skills from './characterDisplay/Skills.svelte'
    import Features from './characterDisplay/Features.svelte'
    import CoreMechanics from './characterDisplay/CoreMechanics.svelte'

    const sections = {
        mechanics: OtherMechanics,
        features: Features,
        resources: Resources,
        magic: Magic,
        actions: Actions,
    } as const

    type Section = keyof typeof sections

    const sectionKeys = Object.keys(sections) as Section[]

    let visible: Section | null = null

    const openSection = (key: Section | null): void => {
        visible = key
    }

    const closeSection = (): void => {
        visible = null
    }
</script>

<div>
    {#each sectionKeys as key}
        {#if visible == key}
            <div class="z-10 bg-neutral-900 absolute min-h-screen w-screen justify-between p-2 mb-20">
                <svelte:component this={sections[key]} />
            </div>

            <button
                on:click={() => closeSection()}
                class="z-20 fixed bottom-0 w-screen p-4 text-2xl text-center uppercase bg-neutral-800 shadow-[0_-10px_50px_0_rgba(23,23,23,1)]"
            >
                {i18n.t('display.goBack')}
            </button>
        {/if}
    {/each}

    <div class="flex">
        <div class=" basis-2/5 flex flex-col justify-between h-screen">
            <CoreMechanics />

            <nav>
                <ul>
                    {#each sectionKeys as key}
                        <li class="flex">
                            <button on:click={() => openSection(key)} class="p-1 text-2xl w-full">
                                {i18n.t(`display.${key}`)}
                            </button>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>

        <div class="basis-3/5 bg-black h-screen overflow-y-scroll">
            <div class="text-center p-1">
                <p>
                    {$character.name} | {$character.lineages} | {$character.level}
                </p>
                <p>{$character.classes}</p>
            </div>

            <div class='p-1'>
                <Skills />
            </div>
        </div>
    </div>
</div>
