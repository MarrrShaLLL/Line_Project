import { Color } from "three";
import { createStore } from "vuex";

const select = {
  state: {
    selectObjects: [],
    color: {
      originalColor: new Color("black"),
      hoverColor: new Color("red"),
      clickColor: new Color("blue"),
    },
  },
  mutations: {
    selectObject(state, object) {
      if (!state.selectObjects.includes(object)) {
        state.selectObjects.push(object);
        object.material.color.set(state.color.clickColor);
      }
    },
    deselectObject(state, object) {
      state.selectObjects = state.selectObjects.filter((obj) => obj !== object);
      object.material.color.set(state.color.originalColor);
    },
    clearSelectObjects(state) {
      state.selectObjects.forEach((obj) => {
        obj.material.color.set(state.color.originalColor);
      });
      state.selectObjects = [];
    },
    toggleSelectObject(state, { object, isMultiSelect }) {
      const index = state.selectObjects.indexOf(object);

      if (isMultiSelect) {
        if (index === -1) {
          state.selectObjects.push(object);
          object.material.color.set(state.color.clickColor);
        } else {
          state.selectObjects.splice(index, 1);
          object.material.color.set(state.color.originalColor);
        }
      } else {
        state.selectObjects.forEach((obj) => {
          obj.material.color.set(state.color.originalColor);
        });
        state.selectObjects = [object];
        object.material.color.set(state.color.clickColor);
      }
    },
  },

  getters: {
    getColor(state) {
      return state.color;
    },
    selectedObject(state) {
      return state.selectObjects;
    },
  },
};

export default createStore({
  modules: {
    select,
  },
});
