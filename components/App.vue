<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const { currentFunction } = storeToRefs(useFunctionsStore())
</script>

<template>
  <div class="App">
    <div class="App__list">
      <FunctionCreator />
      <hr>
      <FunctionsList />
    </div>
    <div v-if="!currentFunction?.name" class="App__message">
      <div>
        Select a function or
      </div>
      <FunctionCreator label="create function" />
    </div>
    <div v-if="currentFunction?.name" class="App__function-context">
      <div class="App__header">
        <div class="App__header__title">
          <h1>{{ currentFunction?.name }}</h1>
        </div>
        <div class="App__actions" v-if="currentFunction?.name">
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

.App__actions {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.App__list {
  box-shadow: 1px 0 0 0 var(--color-line);
  padding: 12px 0 0 0;
  height: calc(100vh);
}

.App__message {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding-top: 96px;
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
  font-size: 1rem;
  font-weight: normal;
  padding: 0;
  margin: 0;

  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0 0 12px;
  font-weight: bold;
}

.App__header__title {
  flex: 1;
  display: flex;
  align-content: center;
  flex-direction: row;
  align-items: center;
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