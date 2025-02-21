<template>
  <main>
    <div class="render" ref="container"></div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { setupMouseEvents } from '../index/events.js'
import * as THREE from 'three'

const container = ref()

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 10, 10)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  const gridHelper = new THREE.GridHelper(10, 10)
  scene.add(gridHelper)

  setupMouseEvents(renderer, camera, scene)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})
</script>

<style scoped>
.render {
  width: 100vw;
  height: 100vh;
}
</style>
