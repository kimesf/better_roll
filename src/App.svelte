<script lang="ts">
    import CharacterDisplay from './lib/components/CharacterDisplay.svelte'
    import CharacterSelection from './lib/components/CharacterSelection.svelte'
    import { character } from './lib/stores/currentCharacter'
</script>

<!-- // TODO:
// Armas simples e marciais.
// Armadura leve, média e escudos.
// Linguagem comum, leonina, dialeto militar e dialeto ladino.
// Veiculos aquáticos.

// Salto
// Distância	3.9m
// Altura	1.2m+0.55m

// Atletismo
// Empurrar e puxar	195kg
// Carga máxima	97.5kg -->

<main class="min-h-screen bg-neutral-900 text-white font-mono">
    {#if $character}
        <CharacterDisplay />
    {:else}
        <CharacterSelection />
    {/if}
</main>
