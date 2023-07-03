import { fireEvent, render } from '@testing-library/svelte'
import { addCharacter, clean, getCurrent } from '../../../tests/utils/characterRepositoryHelper'
import Selection from './Selection.svelte'
import { t } from '../stores/i18n'

afterEach(() => clean())

describe('character selection', () => {
    it('lists all characters', () => {
        addCharacter({ name: 'Joe' })
        addCharacter({ name: 'Joana' })

        const { getByText } = render(Selection)

        expect(() => getByText(/Joe/)).not.toThrowError()
        expect(() => getByText(/Joana/)).not.toThrowError()
    })

    it('clicking the select button updates current character', async () => {
        addCharacter({ name: 'Joe' })
        const { getByText } = render(Selection)
        const joeBtn = getByText(t('selection.select'))

        expect(getCurrent()).toBe(null)

        fireEvent.click(joeBtn)

        expect(getCurrent()).toEqual({ name: 'Joe' })
    })
})
