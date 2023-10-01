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
const hasContent = ref(false);
const iframeUrl = ref("")

store.$subscribe(({ events }) => {
  if (events.key !== "current") {
    return
  }

  if (currentFunction.value?.name) {
    url.value = `${SERVER_URL}/${currentFunction.value.name}`
    iframeUrl.value = "";
    hasContent.value = false;
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
  if (iframeUrl.value !== "") {
    hasContent.value = true;
  }
}
</script>

<template>
  <div v-if="currentFunction?.name">
    <div class="FunctionPreview">
      <input v-model="url" disabled />
      <button @click="refresh">GET</button>
    </div>
    <div class="FunctionPreview__iframe-wrapper" :class="{ hasContent }">
      <iframe :src="iframeUrl" :key="iframeUrl" ref="$iframe" :onload="finishedLoading" class="FunctionPreview__iframe" />
    </div>
  </div>
</template>


<style scoped>
.FunctionPreview {
  height: 40px;
  display: flex;
  align-content: center;
  align-items: center;
}

.FunctionPreview input {
  flex: 1;
  height: 32px;
  max-height: 32px;
  border-radius: 0;
  background-color: #2b2b2b;
  border: 0;
  border-radius: 8px;
  margin: 0 6px;
  padding: 0 6px;
}

.FunctionPreview button {
  margin: 0;
}

.FunctionPreview__iframe {
  height: calc(100vh - 80px);
  margin: 0;
  border: 0;
}

.FunctionPreview__iframe-wrapper {
  background-color: #000;
}

.FunctionPreview__iframe-wrapper.hasContent {
  filter: invert(1);
  background-color: #fff;
}
</style>