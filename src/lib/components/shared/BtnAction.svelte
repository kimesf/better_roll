<script lang=ts>
    type Action = 'create' | 'destroy'

    export let kind: Action
    export let handler: (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void
</script>

<button
    class="{$$props.class || ''} text-xl rounded-md"
    class:bg-green-500={kind == 'create'}
    class:bg-red-500={kind == 'destroy'}
    on:click={(e) => handler(e)}
>
    <slot />
</button>
