<script lang="ts">
    import { ATTRIBUTES } from '../../constants'
    import characterRepository from '../../stores/characterRepository'
    import { attributesModifiers, proficiencyBonus } from '../../stores/currentCharacter'
    import { t } from '../../stores/i18n'
    import { type Attack } from '../../types'
    import BtnAction from '../shared/BtnAction.svelte'
    import Collapsible from '../shared/Collapsible.svelte'
    import Editable from '../shared/Editable.svelte'
    import Incrementor from '../shared/Incrementor.svelte'
    import Separator from '../shared/Separator.svelte'
    import SignedNumber from '../shared/SignedNumber.svelte'
    import Title from '../shared/Title.svelte'

    const DEFAULT: Attack = {
        name: '',
        addProficiency: false,
        attribute: null,
        hitBonus: 0,
        damageBonus: 0,
        damage: '',
        damageType: '',
        notes: '',
        source: '',
    }

    const newAttack = (): Attack => {
        return structuredClone(DEFAULT)
    }

    const trigger = (): void => {
        $characterRepository.current.attacks = $characterRepository.current.attacks
    }

    const create = (): void => {
        $characterRepository.current.attacks.push(newAttack())
        trigger()
    }

    const destroy = (index: number): void => {
        $characterRepository.current.attacks.splice(index, 1)
        trigger()
    }

    const attackHitBonus = ({ attribute, hitBonus, addProficiency }: Attack): number => {
        const proficiency = addProficiency ? $proficiencyBonus : 0
        const attributeBonus = $attributesModifiers?.[attribute] || 0

        return proficiency + attributeBonus + hitBonus
    }

    const attackDamageBonus = ({ attribute, damageBonus }: Attack): number => {
        const attributeBonus = attribute ? $attributesModifiers[attribute] : 0

        return attributeBonus + damageBonus
    }
</script>

<Editable>

    <BtnAction kind=create class="w-full mt-2" handler={(_e) => create()}>{t('actions.create')}</BtnAction>
</Editable>

{#each $characterRepository.current.attacks as attack, index}
    <Collapsible>
        <div slot="title" class="flex flex-col text-left my-2 w-full">
            <Editable>
                <div slot="editing" class="flex">
                    <input
                        id="attack-{index}-name"
                        type="text"
                        class="input w-full"
                        bind:value={attack.name}
                    />

                    <BtnAction kind=destroy class="w-16 ml-2" handler={(_e) => destroy(index)}>r</BtnAction>
                </div>

                <span slot="showing">{attack.name}</span>
            </Editable>

            <span class="text-xl">
                {#if attackHitBonus(attack) > 0}
                    <SignedNumber number={attackHitBonus(attack)} />
                    {attack.damage}{#if attackDamageBonus(attack) > 0}<SignedNumber
                            number={attackDamageBonus(attack)}
                        />{/if}
                {:else}
                    {attack.damage}
                {/if}

                <span class="text-sm text-secondary">{attack.damageType}</span>
            </span>
        </div>

        <div slot="body">
            <Editable>
                <div class="py-4">
                    <Title title={t('display.attacks.damage')} />

                    <input
                        type="text"
                        id="attack-{index}-damage"
                        class="input w-full"
                        bind:value={attack.damage}
                        placeholder={t('display.attacks.damage.placeholder')}
                    />

                    <div class="flex items-center">
                        <label for="attack-{index}-damageBonus">{t('bonus')}:</label>
                        <Incrementor id="attack-{index}-damageBonus" signClasses="text-4xl" bind:value={attack.damageBonus} />
                    </div>
                </div>

                <Separator />

                <div class="py-4">
                    <Title title={t('display.attacks.damageType')} />
                    <input
                        type="text"
                        id="attack-{index}-damageType"
                        class="input w-full"
                        bind:value={attack.damageType}
                        placeholder={t('display.attacks.damageType.placeholder')}
                    />
                </div>

                <Separator />

                <div class="py-4">
                    <Title title={t('display.attacks.hitBonus')} />

                    <div class="flex justify-between items-center">
                        <div>
                            <div>
                                {$proficiencyBonus}
                                <input type="checkbox" bind:checked={attack.addProficiency} />
                                <span class="text-secondary text-sm">{t('display.attacks.addProficiency')}</span>
                            </div>

                            <div class="text-4xl">+</div>

                            <div>
                                <select id="attack-{index}-attribute" class="input" bind:value={attack.attribute}>
                                    {#each ATTRIBUTES as attribute}
                                        <option value={attribute}>{attribute}</option>
                                    {/each}
                                    <option value={null}>{t('none')}</option>
                                </select>
                                <span class="text-secondary">{t('attribute')}</span>
                            </div>

                            <div class="text-4xl">+</div>

                            <div>
                                <input
                                    id="attack-{index}-hitBonus"
                                    type="number"
                                    class="input w-12 text-center"
                                    bind:value={attack.hitBonus}
                                />
                                <span class="text-secondary">{t('bonus')}</span>
                            </div>
                        </div>

                        <div class="mr-8">
                            <span class="text-4xl">=</span>
                            <span class="text-8xl">{attackHitBonus(attack)}</span>
                        </div>
                    </div>
                </div>
            </Editable>

            <Separator />

            <div class="py-4">
                <Editable>
                    <span slot="showing">{attack.notes}</span>
                    <textarea
                        slot="editing"
                        id="attack-{index}-notes"
                        class="input w-full"
                        bind:value={attack.notes}
                        placeholder={t('display.missingNotes')}
                    />
                </Editable>
            </div>
        </div>
    </Collapsible>
{/each}

<!-- name: string
    addProficiency: boolean
    attribute: Attribute | null
    hitBonus: number
    damage: string
    damageType: string
    notes: string
    source: string -->
