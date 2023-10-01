<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { currentFunction } = storeToRefs(store)


const isLoading = ref(false)
const error = ref(null)
const code = ref("")


store.$subscribe(({ events }) => {
  if (events.key !== "current") {
    return
  }

  loadFunctionCode();
})

const loadFunctionCode = async () => {
  if (!currentFunction.value.name) {
    return
  }
  isLoading.value = true;


  const payload = await $fetch('/api/function?name=' + currentFunction.value.name);

  if (payload.error) {
    error.value = payload.error

    return;
  }

  code.value = payload.code;
  error.value = "";
  isLoading.value = false;
}


</script>

<template>
  <div v-if="!currentFunction">
    Select a function
  </div>
  <div v-if="currentFunction && isLoading">
    Loading
  </div>
  <div v-if="!isLoading && !error">
    <textarea v-model="code"></textarea>
  </div>
  <div v-if="error">
    {{ error }}
  </div>
</template>

<style scoped>
div,
textarea {
  width: 100%;
  height: 100%;
}
</style>