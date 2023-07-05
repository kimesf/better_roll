<script lang="ts">
    import { t } from '../../stores/i18n'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import type { Tool } from '../../types'
    import { attributesModifiers, proficiencyBonus } from '../../stores/currentCharacter'
    import characterRepository from '../../stores/characterRepository'
    import Incrementor from '../shared/Incrementor.svelte'
    import Separator from '../shared/Separator.svelte'
    import Editable from '../shared/Editable.svelte'
    import { ATTRIBUTES } from '../../constants'
    import BtnAction from '../shared/BtnAction.svelte'
    import Input from '../shared/Input.svelte'

    const toolModifier = ({ attribute, expertise, otherBonus }: Tool): number => {
        const attributeBonus = attribute ? $attributesModifiers[attribute] : 0

        return $proficiencyBonus * (expertise ? 2 : 1) + attributeBonus + otherBonus
    }

    const DEFAULT: Tool = {
        name: '',
        attribute: null,
        expertise: false,
        otherBonus: 0,
    }

    const newTool = (): Tool => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    const create = (): void => {
        $characterRepository.current.tools.push(newTool())
        trigger()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.tools.splice(index, 1)
        trigger()
    }
</script>

<Editable>
    <BtnAction kind="create" class="w-full" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

{#each $characterRepository.current.tools as tool, index}
    <div class="flex">
        <div class="mr-1" class:text-proficient={!tool.expertise} class:text-expert={tool.expertise}>
            <SignedNumber number={toolModifier(tool)} />
        </div>

        <Editable>
            <Input slot="editing" type="text" id="tool-{index}-name" bind:value={tool.name} />

            <span slot="showing">{tool.name}</span>
        </Editable>
    </div>

    <Editable>
        <div class="flex justify-between">
            <!-- TODO: move there options somewhere else, constants? -->
            <Input
                type="select"
                id="tool-{index}-attribute"
                options={[...ATTRIBUTES.map(attr => [attr, t(`attributes.${attr}`)]), [null, t('none')]]}
                bind:value={tool.attribute}
            />

            <BtnAction kind="destroy" class="w-16" handler={(_e) => destroy(index)} />
        </div>

        <Input
            type="checkbox"
            id="tool-{index}-expertise"
            label={t('display.skills.expertise')}
            bind:checked={tool.expertise}
        />

        <!-- TODO: incrementor with label -->
        <div class="flex items-center justify-start">
            <label for={`tool-${index}-otherBonus`}>{t('bonus')}:</label>
            <Incrementor id="tool-{index}-otherBonus" bind:value={tool.otherBonus} />
        </div>

        <Separator />
    </Editable>
{/each}
