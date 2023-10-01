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
    setCurrentFunction(value: any) {
      this.current = value;
    },
    setFunctionsList(value: any[]) {
      console.log(value);
      this.list.length = 0;
      this.list = this.list.concat(value);
    },
  },
  getters: {
    functionsList: (state) => state.list,
    currentFunction: (state) => state.current,
  },
});
