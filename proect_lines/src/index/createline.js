import * as THREE from "three";

export class RectangleLines {
  constructor(scene) {
    this.scene = scene;
    this.startPoint = null;
    this.lines = [];
    this.points = [];
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
  }

  createLines(p0) {
    this.lines = [
      new THREE.Line(new THREE.BufferGeometry(), this.material),
      new THREE.Line(new THREE.BufferGeometry(), this.material),
      new THREE.Line(new THREE.BufferGeometry(), this.material),
      new THREE.Line(new THREE.BufferGeometry(), this.material),
    ];
    this.points = [
      new THREE.Points(new THREE.BufferGeometry(), this.material),
      new THREE.Points(new THREE.BufferGeometry(), this.material),
      new THREE.Points(new THREE.BufferGeometry(), this.material),
      new THREE.Points(new THREE.BufferGeometry(), this.material),
    ];

    this.scene.add(...this.lines);
    this.scene.add(...this.points);
    console.log(p0);

    this.startPoint = p0.clone();
    console.log(this.startPoint);
  }

  updateLines(p1) {
    if (!this.lines.length || !this.startPoint) return;
    const vertices = [
      this.startPoint.clone(),
      new THREE.Vector3(p1.x, this.startPoint.y, this.startPoint.z),
      new THREE.Vector3(p1.x, p1.y, this.startPoint.z),
      new THREE.Vector3(this.startPoint.x, p1.y, this.startPoint.z),
    ];

    this.lines.forEach((line, i) => {
      line.geometry.setFromPoints([vertices[i], vertices[(i + 1) % 4]]);
      line.geometry.attributes.position.needsUpdate = true;
    });

    this.points.forEach((point, i) => {
      point.geometry.setFromPoints([vertices[i]]);
      point.geometry.attributes.position.needsUpdate = true;
    });
  }
}
