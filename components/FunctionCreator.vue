<script setup>
import { kebabCase } from "lodash"

const { label } = defineProps(['label'])

const isLoading = ref(false)
const functionName = ref("")
const $modal = ref(null)

const closeModal = () => {
  $modal.value.close()
}
const openModal = () => {
  $modal.value.showModal()
}

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

  closeModal();

  isLoading.value = false;
}

</script>

<template>
  <dialog class="FunctionCreator__dialog" ref="$modal">
    <form method="dialog">
      <button class="isIcon" @click="closeModal">
        <IconClose />
      </button>

      <p class="FunctionCreator__info">
        Your function will be created as:
      <pre>{{ kebabCase(functionName) || "&nbsp;" }}</pre>
      </p>

      <div>
        <input v-model="functionName" />
        <button @click="createFunction" :disabled="isLoading || !functionName">
          {{ isLoading ? "Creating" : "Create" }}
        </button>
      </div>

    </form>
  </dialog>

  <div class="FunctionCreator">
    <button @click="openModal">{{ label || "New function" }}</button>
  </div>
</template>

<style scoped>
.FunctionCreator {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.FunctionCreator__dialog[open] {
  animation: show 1s ease normal;
}

.FunctionCreator__dialog p {
  color: #fff;
}

.FunctionCreator button {
  padding: 0 24px;
  line-height: 48px;
}

.FunctionCreator__info {
  box-shadow: inset 0 0 0 2px var(--color-line);
  padding: 12px;
}

.FunctionCreator__info.isHidden {
  opacity: 0;
}

@-webkit-keyframes show {
  from {
    transform: translateY(-110%);
  }

  to {
    transform: translateY(0%);
  }
}

@-webkit-keyframes hide {
  to {
    transform: translateY(-110%);
  }
}
</style>