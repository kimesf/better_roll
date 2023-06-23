<script lang="ts">
    import { t } from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Editable from '../shared/Editable.svelte'
    import characterRepository from '../../stores/characterRepository'
    import type { Attribute } from '../../types'
    import { attributesModifiers } from '../../stores/currentCharacter'

    export let attr: Attribute
</script>

<div class="grow flex items-center justify-between">
    <span class="grow basis-0 text-2xl uppercase">
        {t(`attributes.${attr}`)}
    </span>

    <span class="grow basis-0 text-4xl">
        <SignedNumber number={$attributesModifiers[attr]} />
    </span>

    <span class="grow basis-0 text-2xl text-secondary">
        <Editable>
            <input
                slot="editing"
                id={`attributes-${attr}`}
                type="number"
                class="input w-12 text-primary text-center"
                bind:value={$characterRepository.current.attributes[attr]}
            />
            <span slot="showing">({$characterRepository.current.attributes[attr]})</span>
        </Editable>
    </span>
</div>
