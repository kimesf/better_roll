<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import Btn from "./Btn.svelte"
    import Link from "./Link.svelte";
    import Icon from "./Icon.svelte"

    export let to

    let klass = ($$props.class as string | undefined) || ''
</script>

<!-- TODO: worth coupling? -->
<Btn class={twMerge('bg-amber-500', klass)}>
    <Link {to}>
        <Icon name="up-right-from-square"/>
    </Link>
</Btn>
