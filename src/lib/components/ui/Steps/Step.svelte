<script lang="ts">
    import type { StepContext } from '../Steps.svelte'
    import { getContext, onMount } from 'svelte'

    const { current, setMinMax } = getContext<StepContext>('step') as StepContext

    // TODO: is there a way of not requiring a step number?
    export let step: number

    onMount(() => {
        setMinMax(step)
    })

    $: isShowing = $current == step
</script>



{#if isShowing}
    <slot />
{/if}
