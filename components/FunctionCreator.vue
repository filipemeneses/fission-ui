<script setup>
import { kebabCase } from "lodash"

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
      <button @click="closeModal">
        Close
      </button>
      <p>{{ kebabCase(functionName) }}</p>

      <input v-model="functionName" />
      <button @click="createFunction" :disabled="isLoading">
        {{ isLoading ? "Creating" : "Create" }}
      </button>
    </form>
  </dialog>

  <div class="FunctionCreator">
    <button @click="openModal">New function</button>

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