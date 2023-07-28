<script lang="ts">
    import Button from '../Button.svelte'
    import Icon from '../../shared/Icon.svelte'

    export let id: string
    export let checked: boolean

    const toggle = (): void => {
        checked = !checked
    }
</script>


{#if checked}
    <Button {id} shape="square" action="update" on:click={toggle}>
        <Icon name="check"/>
    </Button>
{:else}
    <Button {id} shape="square" action="empty" on:click={toggle} />
{/if}
