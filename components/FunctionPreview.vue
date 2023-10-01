<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

// #TODO: find a way to get the loadbalancer endpoint
// kubectl --namespace fission port-forward $(kubectl --namespace fission get pod -l svc=router -o name) 9000:8888
const SERVER_URL = 'http://127.0.0.1:9000'

const url = ref(SERVER_URL)
const store = useFunctionsStore()
const { currentFunction } = storeToRefs(store)
const $iframe = ref(null); // template ref
const isLoading = ref(false);


store.$subscribe(({ events }) => {
  if (events.key !== "current") {
    return
  }

  if (currentFunction.value?.name) {
    url.value = `${SERVER_URL}/${currentFunction.value.name}`
    isLoading.value = true;
  }
})


const refresh = () => {
  const hasIframe = !!$iframe.value
  if (!hasIframe) {
    return
  }

  const tmpUrl = url.value;
  url.value = ""
  setTimeout(() => {
    url.value = tmpUrl;
  })
}

const finishedLoading = () => {
  isLoading.value = false;
}
</script>

<template>
  <div class="App__bar">
    <input v-model="url" disabled />
    <button @click="refresh">Refresh</button>
  </div>
  <div v-if="isLoading"> loading ...</div>
  <iframe :src="url" :key="url" ref="$iframe" :onload="finishedLoading" class="App__ide-contents" />
</template>


<style scoped>
.App__bar {
  height: 32px;
}

.App__ide-contents {
  height: calc(100vh - 80px);
  margin: 0;
  border: 0;
}
</style>