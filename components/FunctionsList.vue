<script setup>
const props = defineProps(['functions'])
const functions = ref(props.functions)

</script>

<template>
  <div class="FunctionsList">
    <div v-for="fn in functions">
      {{ fn.name }}
    </div>
  </div>
</template>

<style>
.FunctionsList {
  width: 200px;
}
</style>