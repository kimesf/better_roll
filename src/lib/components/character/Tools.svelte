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

    const toolModifier = ({ attribute, expertise, otherBonus }: Tool): number => {
        const attributeBonus = attribute ? $attributesModifiers[attribute] : 0

        return $proficiencyBonus * (expertise ? 2 : 1) + attributeBonus  + otherBonus
    }

    const DEFAULT: Tool = {
        name: '',
        attribute: null,
        expertise: false,
        otherBonus: 0
    }

    const newTool = (): Tool => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    const create =  (): void => {
        $characterRepository.current.tools.push(newTool())
        trigger()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.tools.splice(index, 1)
        trigger()
    }
</script>

<Editable>
    <BtnAction kind=create class="w-full my-2" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

{#each $characterRepository.current.tools as tool, index}
    <div class="py-2 flex">
        <div class="mr-1" class:text-proficient={!tool.expertise} class:text-expert={tool.expertise}>
            <SignedNumber number={toolModifier(tool)} />
        </div>

        <Editable>
            <input
                slot="editing"
                id="tool-{index}-name"
                type="text"
                class="input w-full"
                bind:value={tool.name}
            />

            <span slot=showing>{tool.name}</span>
        </Editable>
    </div>

    <Editable>
        <div>
            <div class="flex justify-between">
                <select id="tool-{index}-attribute" class="input" bind:value={tool.attribute}>
                    {#each ATTRIBUTES as attribute}
                        <option value={attribute}>{attribute}</option>
                    {/each}
                    <option value={null}>{t('none')}</option>
                </select>

                <BtnAction kind=destroy class="w-16" handler={(_e) => destroy(index)}>r</BtnAction>
            </div>

            <div class=pt-2>
                <input id="tool-{index}-expertise" type="checkbox" bind:checked={tool.expertise} />
                <label for={`skill-${index}-expertise`}>{t('display.skills.expertise')}</label>
            </div>

            <div class="flex items-center justify-start">
                <label for={`tool-${index}-otherBonus`}>{t('bonus')}:</label>
                <Incrementor id="tool-{index}-otherBonus" signClasses={'text-4xl'} bind:value={tool.otherBonus} />
            </div>
        </div>

        <Separator />
    </Editable>
{/each}
