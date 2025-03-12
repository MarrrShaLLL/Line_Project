import * as THREE from "three";

export class RaycasterHelper {
  constructor(container, camera) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.container = container;
    this.camera = camera;

    this.raycaster.params.Line.threshold = 0.01;
    this.raycaster.params.Points.threshold = 0.1;

    this.container.addEventListener(
      "mousemove",
      this.UpdateRaycasterDirection.bind(this)
    );
  }

  UpdateRaycasterDirection(event) {
    if (!this.container.contains(event.target)) return;

    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersection = new THREE.Vector3();

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    if (this.raycaster.ray.intersectPlane(plane, intersection)) {
      return intersection;
    }
    return null;
  }

  raycasterr(scene) {
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    const lines = intersects.filter(
      (intersect) => intersect.object instanceof THREE.Line
    );
    const points = intersects.filter(
      (intersect) => intersect.object instanceof THREE.Points
    );

    return { lines, points };
  }

  dispose() {
    this.container.removeEventListener(
      "mousemove",
      this.UpdateRaycasterDirection.bind(this)
    );
  }
}
