<script lang="ts">
    export let distanceInFeet: number

    const FEET_TO_METER_RATIO = 0.3
    const FEET_TO_SQUARES_RATIO = 0.2

    const fixToOne = (number) => Math.round(number * 10) / 10

    const distanceInMeters = fixToOne(distanceInFeet * FEET_TO_METER_RATIO)
    const distanceInSquares = fixToOne(distanceInFeet * FEET_TO_SQUARES_RATIO)
</script>

<span>
    {`${distanceInMeters}m`}
    {`${distanceInFeet}f`}
    {`${distanceInSquares}q`}
</span>
