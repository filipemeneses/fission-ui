<script setup>
import { kebabCase } from "lodash"

const isLoading = ref(false)
const functionName = ref("")

const createFunction = async () => {
  if (!functionName) {
    return;
  }

  isLoading.value = true;

  const code = `module.exports = async function(context) {
    return {
        status: 200,
        body: "default function"
    };
}
`
  const url = '/api/function?name=' + kebabCase(functionName.value)

  await $fetch(url, {
    method: 'POST',
    body: {
      code
    }
  });

  await refreshFunctionList();

  isLoading.value = false;
}

</script>

<template>
  {{ kebabCase(functionName) }}
  <input v-model="functionName" />
  <button @click="createFunction" :disabled="isLoading">
    {{ isLoading ? "Creating" : "Create" }}
  </button>
</template>