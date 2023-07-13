<script lang="ts">
    import { t } from '../../stores/i18n'
    import Container from '../shared/Container.svelte'
    import Icon from '../shared/Icon.svelte'
    import characterRepository from '../../stores/characterRepository'
    import canEdit from '../../stores/canEdit'

    ;(function _migrate() {
        if ($characterRepository.current.mechanics.deathSaves) {
            return
        }

        $characterRepository.current.mechanics.deathSaves = {
            successes: 0,
            failures: 0,
        }
    })()

    enum DeathSave {
        Successes = 'successes',
        Failures = 'failures',
    }

    $: deathSaves = $characterRepository.current.mechanics.deathSaves

    const check = (deathSave: DeathSave): void => {
        if (deathSaves[deathSave] > 2) {
            return
        }

        deathSaves[deathSave]++
        trigger()
    }

    const uncheck = (deathSave: DeathSave): void => {
        if (deathSaves[deathSave] < 1) {
            return
        }

        deathSaves[deathSave]--
        trigger()
    }

    const trigger = (): void => {
        $characterRepository = $characterRepository
    }

    // Return of any is expected here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checked = (deathSave: DeathSave): any[] => {
        return Array(deathSaves[deathSave])
    }

    // Return of any is expected here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unchecked = (deathSave: DeathSave): any[] => {
        return Array(3 - deathSaves[deathSave])
    }

    const options = [
        ['successes', 'green'],
        ['failures', 'red'],
    ] as [DeathSave, string][]
</script>

<Container>
    {#each options as [deathSave, color]}
        <Container row class="justify-between items-center">
            <div>
                {t(`character.deathSaves.${deathSave}`)}
            </div>

            <div class="text-4xl flex gap-2">
                {#each checked(deathSave) as _}
                    <button disabled={!$canEdit} on:click={() => uncheck(deathSave)}>
                        <Icon kind="solid" name="circle" class="text-{color}-500" />
                    </button>
                {/each}

                {#each unchecked(deathSave) as _}
                    <button disabled={!$canEdit} on:click={() => check(deathSave)}>
                        <Icon kind="regular" name="circle" />
                    </button>
                {/each}
            </div>
        </Container>
    {/each}
</Container>
