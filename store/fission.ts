import { defineStore } from "pinia";

export const useFunctionsStore = defineStore({
  id: "functions-store",
  state: () => {
    return {
      current: null,
      list: [],
    };
  },
  actions: {
    clearCurrentFunction() {
      this.current = null;
    },
    setCurrentFunction(value: any) {
      this.current = value;
    },
    setCurrentFunctionCode(code: string) {
      if (!this.current) {
        return;
      }

      this.current.code = code;
    },
    setFunctionsList(value: any[]) {
      this.list.length = 0;
      this.list = this.list.concat(value);
    },
  },
  getters: {
    functionsList: (state) => state.list,
    currentFunction: (state) => state.current,
  },
});
