<script setup lang="ts">
import { useFunctionsStore } from '~/store/fission'

useHead({
  title: 'Fission UI',
})

let errorRef = ref()
let calledApiRef = ref(false);

const getFunctions = async () => {
  const payload = await $fetch('/api/functions');

  calledApiRef.value = true

  const store = useFunctionsStore()

  if (payload.functions) {
    store.setFunctionsList(payload.functions)
    return;
  }

  errorRef.value = payload.error;
}

getFunctions()
</script>

<template>
  <NuxtLayout>
    <div v-if="!calledApiRef">
      Loading
    </div>
    <div v-if="calledApiRef && !errorRef">
      <App />
    </div>
    <div v-if="calledApiRef && errorRef">
      <div>{{ errorRef }}</div>
    </div>
  </NuxtLayout>
</template>