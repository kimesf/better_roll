import { fireEvent, render } from '@testing-library/svelte'
import { charactersMock, addCharacter } from '../../../tests/utils/mockCharacters'
import Selection from './Selection.svelte'

vi.mock('../stores/characterRepository', () => charactersMock)

describe('character selection', () => {
    beforeAll(() => {
        addCharacter({ name: 'Joe' })
        addCharacter({ name: 'Joana' })
    })

    it('lists all characters', () => {
        const { getByText } = render(Selection)

        expect(() => getByText('Joe')).not.toThrowError()
        expect(() => getByText('Joana')).not.toThrowError()
    })

    it('clicking a characters updates current character', () => {
        const spy = vi.spyOn(charactersMock.default, 'select')
        const { getByText } = render(Selection)
        const joeBtn = getByText('Joe')

        fireEvent.click(joeBtn)

        expect(spy).toBeCalledWith({ name: 'Joe' })
    })
})
