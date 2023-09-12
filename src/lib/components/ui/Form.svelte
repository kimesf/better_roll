<script lang="ts">
    import Input from './Form/Input.svelte'
    import Label from './Form/Label.svelte'
    import Select from './Form/Select.svelte'
    import Checkbox from './Form/Checkbox.svelte'
    import Textarea from './Form/Textarea.svelte'
    import InputOptions from './Form/InputOptions.svelte'

    const F = {
        Input,
        Label,
        Select,
        Checkbox,
        Textarea,
        InputOptions,
    }
</script>

<slot {F} />
