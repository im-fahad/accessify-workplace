<script setup lang="ts">
import { AccessifyWidget, useAccessify } from '@glitchlab/accessify/vue'

const { open, close, toggle, reset, state, isOpen } = useAccessify({
  position: 'bottom-right',
  size: 'M',
})
</script>

<template>
  <div style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto">
    <h1>Accessify — Vue Playground</h1>

    <div style="display: flex; gap: 0.5rem; margin: 1rem 0">
      <button @click="open">Open</button>
      <button @click="close">Close</button>
      <button @click="toggle">Toggle</button>
      <button @click="reset">Reset</button>
    </div>

    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0">
      <h3>Debug Panel</h3>
      <pre>{{ JSON.stringify({ isOpen, state }, null, 2) }}</pre>
    </div>

    <hr />

    <h2>Sample Content</h2>
    <p>This is a demo paragraph to test accessibility features.</p>
    <h3>Links</h3>
    <ul>
      <li><a href="#">Example Link 1</a></li>
      <li><a href="#">Example Link 2</a></li>
      <li><a href="#">Example Link 3</a></li>
    </ul>
    <h3>More Text</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

    <AccessifyWidget position="bottom-right" size="M" />
  </div>
</template>
