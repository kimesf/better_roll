<script lang="ts">
    export let name
    export let kind: 'solid' | 'regular' = 'solid'
</script>

<i class="{$$props.class || ''} fa-{kind} fa-{name} p-1" />
