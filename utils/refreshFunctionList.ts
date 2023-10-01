import { useFunctionsStore } from "~/store/fission";

export const refreshFunctionList = async () => {
  const payload = await $fetch("/api/functions");

  const store = useFunctionsStore();

  if (!payload.functions) {
    return;
  }

  store.setFunctionsList(payload.functions);
};
