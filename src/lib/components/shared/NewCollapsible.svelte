<script lang="ts">
    import Separator from './Separator.svelte'
    import Container from './Container.svelte'
    import Card from './Card.svelte'
    import { slide } from 'svelte/transition'
    import { linear } from 'svelte/easing'
    import Btn from './Btn.svelte'

    let visible = false
    const toggle = (): void => {
        visible = !visible
    }

    const animation = {
        duration: 300,
        easing: linear,
    }
</script>

<Card>
    <Container>
        <Container gap="small">
            <Container row class="justify-between items-center">
                <Container row class="items-center">
                    <slot name="title" />
                </Container>

                <div class="transition" class:rotate-180={visible}>
                    <Btn shape="round" icon="chevron-down" handler={() => toggle()} />
                </div>
            </Container>

            <slot name="subtitle" />
        </Container>

        {#if visible}
            <div transition:slide={animation}>
                <Container>
                    <Separator />

                    <Container gap="small">
                        <slot name="body" />
                    </Container>
                </Container>
            </div>
        {/if}
    </Container>
</Card>
