<script setup lang="ts">
let functionsRef = ref([])
let errorRef = ref()
let calledApiRef = ref(false);

const getFunctions = async () => {
  const payload = await $fetch('/api/functions');

  calledApiRef.value = true;
  functionsRef.value = payload.functions;
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
      <App :functions="functionsRef" />
    </div>
    <div v-if="calledApiRef && errorRef">
      <div>{{ errorRef }}</div>
    </div>
  </NuxtLayout>
</template>