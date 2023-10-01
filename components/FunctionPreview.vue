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
const iframeUrl = ref("")

store.$subscribe(({ events }) => {
  if (events.key !== "current") {
    return
  }

  if (currentFunction.value?.name) {
    url.value = `${SERVER_URL}/${currentFunction.value.name}`
  }
})


const refresh = () => {
  const hasIframe = !!$iframe.value
  if (!hasIframe) {
    return
  }

  isLoading.value = true;

  iframeUrl.value = ""
  setTimeout(() => {
    iframeUrl.value = url.value;
  })
}

const finishedLoading = () => {
  isLoading.value = false;
}
</script>

<template>
  <div v-if="currentFunction?.name">
    <div class="App__bar">
      <input v-model="url" disabled />
      <button @click="refresh">GET</button>
    </div>
    <div v-if="isLoading === true"> loading ... </div>
    <iframe :src="iframeUrl" :key="iframeUrl" ref="$iframe" :onload="finishedLoading" class="App__ide-contents" />
  </div>
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