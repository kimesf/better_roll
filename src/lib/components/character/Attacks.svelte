<script lang="ts">
    import { ATTRIBUTES } from '../../constants'
    import characterRepository from '../../stores/characterRepository'
    import { attributesModifiers, proficiencyBonus } from '../../stores/currentCharacter'
    import { t } from '../../stores/i18n'
    import { type Attack } from '../../types'
    import BtnCreate from '../shared/BtnCreate.svelte'
    import BtnDestroy from '../shared/BtnDestroy.svelte'
    import Collapsible from '../shared/Collapsible.svelte'
    import Container from '../shared/Container.svelte'
    import Editable from '../shared/Editable.svelte'
    import Incrementor from '../shared/Incrementor.svelte'
    import Input from '../shared/Input.svelte'
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

<Container>
    <Editable>
        <BtnCreate class="w-full" handler={(_) => create()} />
    </Editable>

    {#each $characterRepository.current.attacks as attack, index}
        <Collapsible>
            <Container slot="title">
                <Editable>
                    <Container row slot="editing">
                        <Input type="text" id="attack-{index}-name" bind:value={attack.name} />

                        <BtnDestroy kind="destroy" class="w-16" handler={(_) => destroy(index)} />
                    </Container>

                    <span slot="showing">{attack.name}</span>
                </Editable>

                <span class="text-xl">
                    {#if attackHitBonus(attack) != 0}
                        <SignedNumber number={attackHitBonus(attack)} />
                    {/if}

                    {attack.damage}{#if attackDamageBonus(attack) != 0}
                        <SignedNumber number={attackDamageBonus(attack)} />
                    {/if}

                    <span class="text-sm text-secondary">{attack.damageType}</span>
                </span>
            </Container>

            <Editable slot="body">
                <span slot="showing">{attack.notes}</span>

                <Container slot="editing">
                    <Container>
                        <Title title={t('display.attacks.damage')} />

                        <Container row class="items-center">
                            <Input
                                type="text"
                                id="attack-{index}-damage"
                                bind:value={attack.damage}
                                placeholder={t('display.attacks.damage.placeholder')}
                            />

                            <Incrementor id="attack-{index}-damageBonus" bind:value={attack.damageBonus} />
                        </Container>
                    </Container>

                    <Container>
                        <Title title={t('display.attacks.damageType')} />

                        <Input
                            type="text"
                            id="attack-{index}-damageType"
                            bind:value={attack.damageType}
                            placeholder={t('display.attacks.damageType.placeholder')}
                        />
                    </Container>

                    <Container>
                        <Title title={t('display.attacks.hitBonus')} />

                        <div class="flex justify-between items-center">
                            <div>
                                <div>
                                    {$proficiencyBonus}
                                    <Input
                                        type="checkbox"
                                        id="attack-{index}-addProficiency"
                                        bind:checked={attack.addProficiency}
                                    />
                                    <span class="text-secondary text-sm">{t('display.attacks.addProficiency')}</span>
                                </div>

                                <div class="text-4xl">+</div>

                                <div>
                                    <Input
                                        type="select"
                                        id="attack-{index}-attribute"
                                        options={[...ATTRIBUTES.map(attr => [attr, t(`attributes.${attr}`)]), [null, t('none')]]}
                                        bind:value={attack.attribute}
                                    />

                                    <span class="text-secondary">{t('attribute')}</span>
                                </div>

                                <div class="text-4xl">+</div>

                                <div>
                                    <Input
                                        id="attack-{index}-hitBonus"
                                        type="number"
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
                    </Container>

                    <Separator />

                    <Input
                        type="textarea"
                        id="attack-{index}-notes"
                        bind:value={attack.notes}
                        placeholder={t('display.missingNotes')}
                    />
                </Container>
            </Editable>
        </Collapsible>
    {/each}
</Container>
