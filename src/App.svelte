<script lang="ts">
    // import { slide } from "svelte/transition"

    import Display from './lib/components/Display.svelte'
    import Selection from './lib/components/Selection.svelte'
    import characterRepository from './lib/stores/characterRepository'

    // let visible: string | null = null

    // const toggle = (key: string): void => {
    //     if(key == visible) {
    //         visible = null
    //         return
    //     }

    //     visible = key
    // }
</script>

<main class="min-h-screen bg-primary text-primary font-mono">
    {#if !!$characterRepository.current}
        <Display />
    {:else}
        <Selection />
    {/if}
</main>

<!--
<main class="min-h-screen  bg-primary text-primary font-mono py-3">
    <div class="w-full flex flex-col gap-3 px-2 ">
        {#each ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as content }
            <div class="w-full bg-secondary p-2 rounded-sm shadow-lg">
                <button class="w-full text-left" on:click={() => toggle(content)}>
                    {content}
                </button>

                {#if visible == content}
                    <div transition:slide>
                        <hr class="border-neutral-700 my-2">

                        <div >
                            <p>a bunche of text is here</p>
                            <p>multiple lines inclusive</p>
                            <p>multiple lines inclusive</p>
                            <p>multiple lines inclusive</p>
                            <p>multiple lines inclusive</p>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</main> -->
