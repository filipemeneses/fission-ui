<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { currentFunction } = storeToRefs(store)
const isLoading = ref(false)


const updateFunction = async () => {
  const functionName = currentFunction.value?.name

  if (!functionName) {
    return;
  }

  isLoading.value = true;

  const code = currentFunction.value.code
  const url = '/api/function?name=' + functionName

  await $fetch(url, {
    method: 'PUT',
    body: {
      code
    }
  });

  isLoading.value = false;
}

</script>

<template>
  <button @click="updateFunction" :disabled="isLoading">
    {{ isLoading ? "Deploying" : "Deploy" }}
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-primary);
  transition: background-color .2s ease, filter .2s ease;
}

button:hover {
  filter: brightness(1.2);
}
</style>