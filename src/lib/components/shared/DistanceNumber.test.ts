import { render } from '@testing-library/svelte'
import DistanceNumber from './DistanceNumber.svelte'

describe('DistanceNumber', () => {
    it('renders distance in feet, meters and squares', () => {
        const { getByText } = render(DistanceNumber, { props: { distanceInFeet: 30 } })

        expect(() => getByText('9m 30f 6q')).not.toThrow()
    })
})
