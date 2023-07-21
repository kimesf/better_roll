<script lang="ts">
    import characterRepository from '../../stores/characterRepository'
    import Editable from '../shared/Editable.svelte'
    import type { Mechanic } from '../../types'
    import Container from '../shared/Container.svelte'
    import Input from '../shared/Input.svelte'
    import BtnDestroy from '../shared/BtnDestroy.svelte'
    import BtnCreate from '../shared/BtnCreate.svelte'

    const { createRelation, destroyRelation } = characterRepository

    const DEFAULT: Mechanic = {
        name: '',
        value: '',
    }
</script>

<Container>
    <Editable>
        <BtnCreate class="w-full" handler={(_) => createRelation('mechanics.other', DEFAULT)} />
    </Editable>

    {#each $characterRepository.current.mechanics.other as mechanic, index}
        <Editable>
            <Container row slot="editing">
                <BtnDestroy class="w-16" handler={(_) => destroyRelation('mechanics.other', index)} />
                <Input type="text" id="mechanic-{index}-name" bind:value={mechanic.name} />
                <Input type="text" id="mechanic-{index}-value" bind:value={mechanic.value} />
            </Container>

            <Container row slot="showing" class="justify-between items-center">
                <span>{mechanic.name}</span>
                <span class="text-2xl">{mechanic.value}</span>
            </Container>
        </Editable>
    {/each}
</Container>
