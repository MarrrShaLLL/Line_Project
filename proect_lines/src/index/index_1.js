import * as THREE from "three";

export function createScene(container) {
  const scene = new THREE.Scene();
  camera.position.set(0, 10, 10);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}
