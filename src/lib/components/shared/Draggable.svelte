<script lang="ts">
    import postcss from 'postcss'
    import { onMount } from 'svelte'

    export let left = 100
    export let top = 100

    let isMoving = false

    let element: HTMLDivElement
    let offsetLeft: number
    let offsetTop: number

    let maxLeft: number
    let minLeft: number
    let maxTop: number
    let minTop: number

    onMount(() => {
        offsetLeft = element.clientWidth / 2
        offsetTop = element.clientHeight / 2

        minLeft = 0 + offsetLeft
        maxLeft = window.innerWidth - offsetLeft

        minTop = 0 + offsetTop
        maxTop = window.innerHeight - offsetTop
    })

    const unlock = (): void => {
        isMoving = true
    }

    const lock = (): void => {
        isMoving = false
    }

    const onTouchMove = (e: TouchEvent): void => {
        const { pageX, pageY } = e.touches.item(0)

        moveTo(pageX, pageY)
    }

    const onMouseMove = (e: MouseEvent): void => {
        moveTo(e.pageX, e.pageY)
    }

    const moveTo = (x: number, y: number): void => {
        if (!isMoving) {
            return
        }

        if (x > maxLeft) x = maxLeft
        if (x < minLeft) x = minLeft
        if (y > maxTop) y = maxTop
        if (y < minTop) y = minTop

        left = x - offsetLeft
        top = y - offsetTop
    }
</script>

<svelte:window on:touchend={lock} on:touchmove={onTouchMove} on:mouseup={lock} on:mousemove={onMouseMove} />

<svelte:head>
    {#if isMoving}
        <style>
            body {
                overscroll-behavior: none;
            }
        </style>
    {/if}
</svelte:head>

{#if isMoving}
    <div class="z-99 bg-primary bg-opacity-50 absolute top-0 left-0 w-screen h-screen" />
{/if}

<div
    bind:this={element}
    on:touchstart={unlock}
    on:mousedown={unlock}
    class="{$$props.class || ''} cursor-move select-none fixed"
    class:z-100={isMoving}
    class:highlight={isMoving}
    style="left: {left}px; top: {top}px;"
>
    <slot />
</div>

<style lang="postcss">
    .z-100 {
        z-index: 100;
    }

    .z-99 {
        z-index: 99;
    }

    .highlight {
        @apply outline outline-4 outline-blue-500 outline-offset-[20px] rounded-full;
    }
</style>
