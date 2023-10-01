<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const { currentFunction } = storeToRefs(useFunctionsStore())
</script>

<template>
  <div class="App">
    <div class="App__list">
      <FunctionCreator />
      <FunctionsList />
    </div>
    <div class="App__function-context">
      <div class="App__header">
        <h1>{{ currentFunction?.name }}</h1>
        <div class="App__actions">
          <FunctionDeployer />
          <FunctionDeleter />
        </div>
      </div>
      <div class="App__ide">
        <div class="App__ide-editor">
          <FunctionEditor />
        </div>
        <div class="App__ide-preview">
          <FunctionPreview />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.App {
  display: flex;
  width: 100vw;
}


.App__function-context {
  flex: 1;
}

.App__header {
  display: flex;
}

.App__header {
  display: flex;
  height: 48px;
}

.App__header h1 {
  flex: 1;
  font-size: 1rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
}

.App__ide {
  display: flex;
  height: calc(100vh - 48px);
}

.App__ide-editor {
  flex: 2;
}

.App__ide-preview {
  flex: 1;
}
</style>