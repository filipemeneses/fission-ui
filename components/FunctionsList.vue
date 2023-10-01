<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { functionsList } = storeToRefs(store)

const assignCurrentFunction = (fn) => {
  store.setCurrentFunction(fn)
}
</script>

<template>
  <div class="FunctionsList">
    <div v-for="fn in functionsList" @click="() => assignCurrentFunction(fn)">
      {{ fn.name }}
    </div>
  </div>
</template>

<style>
.FunctionsList {
  width: 200px;
}
</style>