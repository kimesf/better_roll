<script lang='ts'>
    import { i18n } from '../../stores/i18n'
    import { character } from '../../stores/currentCharacter'
    import { type Spell } from '../../types'

    const SPACE = '\u0020'

    const presentComponents = (components: Spell['components']) => {
        const maybeAspect = (aspect: 'verbal' | 'somatic' | 'material') =>
            components[aspect] ? i18n.t(`spells.components.${aspect}`).at(0).toUpperCase() : ''

        const abbr = ['verbal', 'somatic', 'material'].map(maybeAspect).join('')
        const notes = components.material ? `${SPACE}(${components.notes})` : ''

        return abbr + notes
    }
</script>

<div class='overflow-x-scroll'>
    <table class='table-auto'>
        <thead>
            <tr>
                <th>{i18n.t('spells.available')}</th>
                <th>{i18n.t('spells.name')}</th>
                <th>{i18n.t('spells.school')}</th>
                <th>{i18n.t('spells.conjurationTime')}</th>
                <th>{i18n.t('spells.range')}</th>
                <th>{i18n.t('spells.target')}</th>
                <th>{i18n.t('spells.components')}</th>
                <th>{i18n.t('spells.duration')}</th>
                <th>{i18n.t('spells.concentration')}</th>
                <th>{i18n.t('spells.ritual')}</th>
                <th>{i18n.t('spells.notes')}</th>
            </tr>
        </thead>
        <tbody>
            {#each $character.spells as spell}
                <tr>
                    <td>{spell.alwaysAvailable || spell.available ? 'x' : ''}</td>
                    <td>{spell.name}</td>
                    <td>{i18n.t(`spells.school.${spell.school}`)}</td>
                    <td>{spell.conjurationTime}</td>
                    <td>{spell.range}</td>
                    <td>{spell.target}</td>
                    <td>{presentComponents(spell.components)}</td>
                    <td>{spell.duration}</td>
                    <td>{spell.concentration ? 'y' : 'n'}</td>
                    <td>{spell.ritual ? 'y' : 'n'}</td>
                    <td>{spell.notes}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
