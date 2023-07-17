<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import Btn from './Btn.svelte'
    import type { ComponentProps } from 'svelte'

    export let handler: ComponentProps<Btn>['handler']

    let klass = ($$props.class as string | undefined) || ''
</script>

<Btn {handler} class={twMerge('bg-blue-500', klass)}>
    <slot />
</Btn>
