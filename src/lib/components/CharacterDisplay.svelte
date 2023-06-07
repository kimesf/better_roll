<script lang='ts'>
    import { character } from '../stores/currentCharacter'
    import i18n from '../stores/i18n'
    import Actions from './characterDisplay/Actions.svelte'
    import Magic from './characterDisplay/Magic.svelte'
    import OtherMechanics from './characterDisplay/OtherMechanics.svelte'
    import Resources from './characterDisplay/Resources.svelte'
    import Skills from './characterDisplay/Skills.svelte'
    import Features from './characterDisplay/Features.svelte'
    import CoreMechanics from './characterDisplay/CoreMechanics.svelte'

    const menu = {
        mechanics: OtherMechanics,
        features: Features,
        resources: Resources,
        magic: Magic,
        actions: Actions,
    } as const

    type Menu = keyof typeof menu

    const menuKeys = Object.keys(menu) as Menu[]

    let menuOpened: Menu | null = null

    const openMenu = (key: Menu | null): void => {
        menuOpened = key
    }

    const closeMenu = (): void => {
        menuOpened = null
    }
</script>

<div>
    {#each menuKeys as key}
        <!-- TODO: alternative is to use DIALOG tag -->
        {#if menuOpened == key}
            <div class='bg-neutral-900 absolute min-h-screen w-screen flex flex-col justify-between'>
                <div class='flex justify-between'>
                    <span class='uppercase'>
                        >
                        {i18n.t(`display.${key}`)}
                    </span>
                    <button class='text-2xl' on:click={() => closeMenu()}>CLOSE</button>
                </div>

                <div class='grow mb-20'>
                    <svelte:component this={menu[key]} />
                </div>

                <button
                    on:click={() => closeMenu()}
                    class='fixed bottom-0 w-screen bg-neutral-800 p-4 text-2xl text-center'
                >
                    GO BACK
                </button>
            </div>
        {/if}
    {/each}

    <div class='flex'>
        <div class='flex flex-col justify-between grow-0 h-screen'>
            <CoreMechanics />

            <div>
                <nav>
                    <ul>
                        {#each menuKeys as key}
                            <li class='flex'>
                                <button on:click={() => openMenu(key)} class='p-1 text-2xl w-full'>
                                    {i18n.t(`display.${key}`)}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </nav>
            </div>
        </div>

        <div class='grow bg-black'>
            <div class='text-center p-1'>
                <p>
                    {$character.name} | {$character.lineages} | {$character.level}
                </p>
                <p>{$character.classes}</p>
            </div>

            <Skills />
        </div>
    </div>
</div>
