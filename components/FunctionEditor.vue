<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { setCurrentFunctionCode } = store
const { currentFunction } = storeToRefs(store)

const isLoading = ref(false)
const error = ref(null)
const code = ref("")
const lang = ref("javascript")

const langByEnv = {
  python: 'python',
  go: 'go',
  nodejs: 'javascript',
}


watch(currentFunction, (newFn) => {
  code.value = "";
  error.value = "";
  lang.value = langByEnv[newFn.env]
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

watch(code, setCurrentFunctionCode)
loadFunctionCode()




</script>

<template>
  <div v-if="!error && !isLoading && code">
    <MonacoEditor :options="{
      theme: 'vs-dark',
    }" v-model="code" :lang="lang" />
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