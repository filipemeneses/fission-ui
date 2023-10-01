<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { clearCurrentFunction } = store
const { currentFunction } = storeToRefs(store)
const isLoading = ref(false)

const deleteFunction = async () => {
  const functionName = currentFunction.value?.name

  if (!functionName) {
    return;
  }

  isLoading.value = true;

  const url = '/api/function?name=' + functionName

  await $fetch(url, {
    method: 'DELETE',
  });

  await refreshFunctionList()

  clearCurrentFunction()

  isLoading.value = false;
}

</script>
<template>
  <button @click="deleteFunction" :disabled="isLoading">
    {{ isLoading ? "Deleting" : "Delete" }}
  </button>
</template>