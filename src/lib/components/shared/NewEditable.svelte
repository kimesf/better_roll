<script lang="ts">
    import { fade, slide } from 'svelte/transition'
    import canEdit from '../../stores/canEdit'
    import { linear } from 'svelte/easing'

    export let forceShow = false

    $: isShowing = !!$$slots.showing && (forceShow || !$canEdit)
    $: isEditing = !!$$slots.editing && (!forceShow && $canEdit)

    const animation = {
        duration: 200,
        easing: linear,
    }

    const animationDelayed = {
        ...animation,
        delay: animation.duration,
    }
</script>

{#if isShowing || isEditing}
    <div class="w-full" transition:slide={animation}>
        <div in:fade={animationDelayed} out:fade={animation}>
            {#if isShowing}
                <slot name="showing" />
            {:else if isEditing}
                <slot name="editing" />
            {/if}
        </div>
    </div>
{/if}
