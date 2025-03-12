import * as THREE from "three";

export class CircleLines {
  constructor(scene) {
    this.scene = scene;
    this.centerPoint = null;
    this.circle = null;
    this.point = null;

    this.lineMaterial = new THREE.LineBasicMaterial({ color: "white" });
    this.pointMaterial = new THREE.PointsMaterial({
      color: "white",
      size: 0.05,
    });
    this.segmentCount = 64;
  }

  createCircle(center) {
    this.centerPoint = center.clone();

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array((this.segmentCount + 1) * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    this.circle = new THREE.Line(geometry, this.lineMaterial);
    this.circle.userData.isCircle = true;

    const pointGeometry = new THREE.BufferGeometry().setFromPoints([
      this.centerPoint,
    ]);
    this.point = new THREE.Points(pointGeometry, this.pointMaterial);
    this.point.userData.isPoint = true;

    this.scene.add(this.circle);
    this.scene.add(this.point);
  }

  updateCircle(p1) {
    if (!this.circle || !this.centerPoint) return;

    const radius = this.centerPoint.distanceTo(p1);
    const geometry = this.circle.geometry;
    const vertices = geometry.attributes.position.array;
    geometry.computeBoundingSphere();

    for (let i = 0; i <= this.segmentCount; i++) {
      const theta = (i / this.segmentCount) * Math.PI * 2;
      vertices[i * 3] = this.centerPoint.x + Math.cos(theta) * radius;
      vertices[i * 3 + 1] = this.centerPoint.y + Math.sin(theta) * radius;
      vertices[i * 3 + 2] = this.centerPoint.z;
    }

    geometry.attributes.position.needsUpdate = true;

    this.point.geometry.setFromPoints([this.centerPoint]);
  }
}
