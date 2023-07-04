<script lang="ts">
    import type { Character } from '../../types'

    export let character: Character

    const { name, lineages, level, classes } = character
</script>

<div class="flex flex-col">
    <span>
        {name} | {lineages}
    </span>

    <span>
        {level}
    </span>

    <span>
        {classes}
    </span>
</div>
