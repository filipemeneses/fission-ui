<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { setCurrentFunctionCode } = store
const { currentFunction } = storeToRefs(store)

const isLoading = ref(false)
const error = ref(null)
const code = ref("")
const $monaco = ref(null)

store.$subscribe(({ events }) => {
  if (events.key !== "current") {
    return
  }

  loadFunctionCode();
})

const loadFunctionCode = async () => {
  if (!currentFunction.value?.name) {
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

const updateFunctionCode = () => {
  setCurrentFunctionCode(code.value)
}

</script>

<template>
  <div v-if="!error && code">
    <MonacoEditor :options="{
      theme: 'vs-dark',
    }" v-model="code" :lang="currentFunction.env === 'nodejs' ? 'javascript' : 'go'" @input="updateFunctionCode" />
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