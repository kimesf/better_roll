<script lang="ts">
    import { t } from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Editable from '../shared/Editable.svelte'
    import characterRepository from '../../stores/characterRepository'
    import type { Attribute } from '../../types'
    import { attributesModifiers } from '../../stores/currentCharacter'
    import Input from '../shared/Input.svelte'

    export let attr: Attribute
</script>

<div class="w-full flex items-center justify-between text-2xl">
    <span class="grow basis-0 uppercase">
        {t(`attributes.${attr}`)}
    </span>

    <span class="grow basis-0 text-4xl">
        <SignedNumber number={$attributesModifiers[attr]} />
    </span>

    <Editable class="grow basis-0">
        <span slot="showing" class="text-secondary">({$characterRepository.current.attributes[attr]})</span>

        <Input
            slot="editing"
            type="number"
            id="attributes-{attr}"
            bind:value={$characterRepository.current.attributes[attr]}
        />
    </Editable>
</div>
