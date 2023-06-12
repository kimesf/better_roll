<script lang='ts'>
    export let distanceInFeet: number;

    const FEET_TO_METER_RATIO = 0.3
    const FEET_TO_SQUARES_RATIO = 0.2

    const distanceInMeters =  distanceInFeet * FEET_TO_METER_RATIO
    const distanceInSquares = distanceInFeet * FEET_TO_SQUARES_RATIO
</script>

<span>
    {`${distanceInFeet}f`}
    {`${distanceInMeters}m`}
    {`${distanceInSquares}q`}
</span>
