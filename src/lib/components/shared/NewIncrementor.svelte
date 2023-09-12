<script lang="ts">
    import Btn from './Btn.svelte'
    import Container from './Container.svelte'
    import Input from './Input.svelte'
    import NewEditable from './NewEditable.svelte'

    export let id
    export let value
</script>

<NewEditable>
    <Container row slot="editing" class="justify-between">
        <Btn shape="round" size="small" kind="destroy" icon="minus" handler={() => value--} />

        <Input type="number" {id} bind:value />

        <Btn shape="round" size="small" kind="create" handler={() => value++} />
    </Container>
</NewEditable>
