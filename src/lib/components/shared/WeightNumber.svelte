<script lang="ts">
    export let weightInPounds: number

    const POUND_TO_KG_RATIO = 0.45

    const weightInKilograms = weightInPounds * POUND_TO_KG_RATIO
</script>

<span>
    {weightInKilograms}kg
</span>
