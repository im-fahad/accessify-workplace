<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { accessifyStore } from '@glitchlab/accessify/svelte'

  onMount(() => {
    accessifyStore.mount()
  })

  onDestroy(() => {
    accessifyStore.destroy()
  })
</script>

<slot />
