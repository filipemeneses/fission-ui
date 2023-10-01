<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { functionsList, currentFunction } = storeToRefs(store)

const assignCurrentFunction = (fn) => {
  store.setCurrentFunction(fn)
}
</script>

<template>
  <div class="FunctionsList">
    <div class="FunctionsList__item" :class="{ active: currentFunction?.name === fn.name }" v-for="fn in functionsList"
      @click="() => assignCurrentFunction(fn)">
      {{ fn.name }}
    </div>
  </div>
</template>

<style>
.FunctionsList {
  width: 200px;
}

.FunctionsList__item {
  display: flex;
  align-items: center;
  padding: 6px 0 6px 12px;
  height: 24px;
  line-height: 24px;
  text-align: start;
  cursor: pointer;

  transition: background-color .12s ease;

  user-select: none;
}

.FunctionsList__item:hover,
.FunctionsList__item.active {
  background-color: var(--color-line);
}
</style>