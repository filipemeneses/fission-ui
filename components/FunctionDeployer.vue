<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { currentFunction } = storeToRefs(store)

const updateFunction = async () => {
  const functionName = currentFunction.value?.name

  if (!functionName) {
    return;
  }

  const code = currentFunction.value.code
  const url = '/api/function?name=' + functionName

  await $fetch(url, {
    method: 'PUT',
    body: {
      code
    }
  });
}

</script>
<template>
  <button @click="updateFunction">Deploy</button>
</template>