<template>
  <main>
    <div>
      <button @click="scene && drawingCube(scene)">Start drawing cube</button>
      <button @click="scene && drawingCircle(scene)">
        Start drawing circle
      </button>
      <button @click="scene && drawingLine(scene)">Start drawing line</button>
      <button @click="scene && Selectmode(scene)">
        Start selecting objects
      </button>
    </div>
    <div class="render" ref="container"></div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useStore } from "vuex";
import * as THREE from "three";
import { RaycasterHelper } from "../index/raycaster";
import { setupMouseEvents } from "../index/events";
import {
  drawingCube,
  drawingCircle,
  drawingLine,
  Selectmode,
} from "../index/events";

const store = useStore();
const container = ref(null);
const selectedObject = computed(() => store.getters.selectedObject || []);
const getColor = computed(
  () => store.getters.getColor || { clickColor: "red", originalColor: "white" }
);
console.log(selectedObject);
console.log(getColor);

let renderer = null;
let camera = null;
let scene = null;
let raycasterHelper = null;

watch(
  () => selectedObject,
  (newValue, oldValue) => {
    if (newValue && newValue.length > 0) {
      const lastNewObject = newValue[newValue.length - 1];
      if (lastNewObject.material) {
        lastNewObject.material.color.set(store.getters.getColor.clickColor);
        lastNewObject.userData.isSelected = true;
      }
    }

    if (oldValue && oldValue.length > 0) {
      const lastOldObject = oldValue[oldValue.length - 1];
      if (lastOldObject.material) {
        lastOldObject.material.color.set(store.getters.getColor.originalColor);
        lastOldObject.userData.isSelected = false;
      }
    }
  }
);

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  raycasterHelper = new RaycasterHelper(container.value, camera);

  animate();
  setupMouseEvents(renderer, camera, scene);
});

onUnmounted(() => {
  raycasterHelper?.dispose();
  renderer?.dispose();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
</script>
