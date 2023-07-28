<script context="module" lang="ts">
    export type StepContext = {
        current: () => Readable<number>,
        setMinMax: () => void,
    };
</script>

<script lang="ts">
    import { setContext } from 'svelte'
    import { writable, type Readable } from 'svelte/store'
    import Stack from './Stack.svelte'
    import Button from './Button.svelte'
    import Icon from '../shared/Icon.svelte'
    import Step from './Steps/Step.svelte'

    export let onDone: () => void

    const current = writable(0)

    const first = writable<number | undefined>(undefined)
    const last = writable<number | undefined>(undefined)

    setContext('step', {
        current,
        setMinMax: (step: number) => {
            if ($first == undefined || step < $first) {
                $first = step
            }

            if ($last == undefined || step > $last) {
                $last = step
            }
        }
    })

    $: isShowingFirst = $current == $first
    $: isShowingLast = $current == $last

    const goPrev = (): void => {
        if (isShowingFirst) {
            return
        }

        $current--
    }

    const goNext = (): void => {
        if (isShowingLast) {
            return
        }

        $current++
    }
</script>

<Stack direction="col" justify="between" class="h-full">
    <slot {Step} />

    <Stack justify="between">
        <Button disabled={isShowingFirst} shape="round" on:click={goPrev}>
            <Icon name="left-long" />
        </Button>

        {#if isShowingLast}
            <Button shape="round" action="update" on:click={onDone}>
                <Icon name="check" />
            </Button>
        {:else}
            <Button shape="round" on:click={goNext}>
                <Icon name="right-long" />
            </Button>
        {/if}
    </Stack>
</Stack>
