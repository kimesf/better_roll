<script lang="ts">
    import type { Spell } from '../../types'
    import i18n from '../../stores/i18n'
    import Title from '../shared/Title.svelte'
    import Attacks from '../character/Attacks.svelte'
    import Container from '../shared/Container.svelte'
    import Spells from '../character/Spells.svelte'

    const filter = (spell: Spell): boolean => {
        return spell.available || spell.alwaysAvailable
    }
</script>

<Container>
    <Title title={i18n.t('display.actions.attacks')} />
    <Attacks />

    <Spells onlyShow {filter}/>
</Container>
