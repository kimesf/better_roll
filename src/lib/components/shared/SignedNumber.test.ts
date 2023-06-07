import { getDefaultNormalizer, render } from '@testing-library/svelte'
import SignedNumber from './SignedNumber.svelte'

describe.concurrent('SignedNumber', () => {
    it('renders positive number signed', async () => {
        const { getByText } = render(SignedNumber, { props: { number: 2 } })

        expect(() => getByText('+2')).not.toThrow()
    })

    it('renders negative number signed', async () => {
        const { getByText } = render(SignedNumber, { props: { number: -10 } })

        expect(() => getByText('-10')).not.toThrow()
    })

    it('renders zero padded', async () => {
        const { getByText } = render(SignedNumber, { props: { number: 0 } })

        expect(() => {
            getByText(/\s0/, { normalizer: getDefaultNormalizer({ trim: false }) })
        }).not.toThrow()
    })
})
