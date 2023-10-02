<script setup>
import { useFunctionsStore } from '~/store/fission'
import { storeToRefs } from 'pinia'

const store = useFunctionsStore()
const { clearCurrentFunction } = store
const { currentFunction } = storeToRefs(store)
const isLoading = ref(false)

const functionName = ref("")

const $modal = ref(null)

const closeModal = () => {
  $modal.value.close()
}
const openModal = () => {
  $modal.value.showModal()
}

store.$subscribe(() => {
  functionName.value = ""
})

const deleteFunction = async () => {
  const currentName = currentFunction.value?.name
  const typedName = functionName.value

  if (!typedName || currentName !== typedName) {
    return;
  }

  isLoading.value = true;

  const url = '/api/function?name=' + typedName

  await $fetch(url, {
    method: 'DELETE',
  });

  await refreshFunctionList()

  clearCurrentFunction()

  isLoading.value = false;
}

</script>

<template>
  <dialog ref="$modal">
    <form class="FunctionDeleter__dialog" method="dialog">
      <button class="isIcon" @click="closeModal">
        <IconClose />
      </button>
      <h2>Danger Zone</h2>
      <section class="DangerSection">
        <b>Delete function</b>
        <div class="FunctionDeleter__message">
          Please type the function name <code>{{ currentFunction?.name }}</code> to confirm
        </div>
        <div class="FunctionDeleter__field">
          <input v-model="functionName" />
          <button class="isDanger" @click="deleteFunction"
            :disabled="isLoading || (functionName !== currentFunction?.name)">
            {{ isLoading ? "Deleting" : "Delete" }}
          </button>
        </div>
      </section>
    </form>
  </dialog>
  <div class="FunctionDeleter__icon">
    <svg @click="openModal" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path
        d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
    </svg>
  </div>
</template>

<style scoped>
.FunctionDeleter__icon {
  display: flex;
}

.FunctionDeleter__field {
  display: flex;
}

.FunctionDeleter__field input {
  flex: 1;
}

.FunctionDeleter__icon svg {
  fill: #fff;
  margin: 0 12px;
  cursor: pointer;
}

.FunctionDeleter__message {
  font-size: 14px;
  margin: 0 0 12px 0;
}

.FunctionDeleter__dialog {
  color: #fff;
}

.FunctionDeleter__dialog h2 {
  font-size: 1rem;
}

.DangerSection {
  border: 2px solid var(--color-danger-line);
  border-radius: 8px;
  padding: 24px;
}

.DangerSection code {
  user-select: none;
}
</style>