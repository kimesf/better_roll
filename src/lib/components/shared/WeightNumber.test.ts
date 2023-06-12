import { render } from '@testing-library/svelte'
import WeightNumber from './WeightNumber.svelte'

describe('WeightNumber', () => {
    it('renders distance in kg', () => {
        const { getByText } = render(WeightNumber, { props: { weightInPounds: 100 } })

        expect(() => getByText('45kg')).not.toThrow()
    })
})
