import * as THREE from "three";

export class RectangleLines {
  constructor(scene) {
    this.scene = scene;
    this.startPoint = null;
    this.lines = [];
    this.points = [];

    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.pointMaterial = new THREE.PointsMaterial({ color: "cyan", size: 0.1 });
  }

  createLines(p0) {
    this.lines = [
      new THREE.Line(new THREE.BufferGeometry(), this.lineMaterial),
      new THREE.Line(new THREE.BufferGeometry(), this.lineMaterial),
      new THREE.Line(new THREE.BufferGeometry(), this.lineMaterial),
      new THREE.Line(new THREE.BufferGeometry(), this.lineMaterial),
    ];

    this.points = [
      new THREE.Points(new THREE.BufferGeometry(), this.pointMaterial),
      new THREE.Points(new THREE.BufferGeometry(), this.pointMaterial),
      new THREE.Points(new THREE.BufferGeometry(), this.pointMaterial),
      new THREE.Points(new THREE.BufferGeometry(), this.pointMaterial),
    ];

    this.scene.add(...this.lines);

    this.lines.forEach((line, i) => {
      line.add(this.points[i]);
    });

    this.startPoint = p0.clone();
    console.log(this.startPoint);
  }

  updateLines(p1) {
    if (!this.lines.length || !this.startPoint) return;

    const points_position = [
      this.startPoint.clone(),
      new THREE.Vector3(p1.x, this.startPoint.y, this.startPoint.z),
      new THREE.Vector3(p1.x, p1.y, this.startPoint.z),
      new THREE.Vector3(this.startPoint.x, p1.y, this.startPoint.z),
    ];

    this.lines.forEach((line, i) => {
      line.geometry.setFromPoints([
        points_position[i],
        points_position[(i + 1) % 4],
      ]);
      line.geometry.attributes.position.needsUpdate = true;

      const point = line.children[0];
      if (point) {
        point.geometry.setFromPoints([points_position[i]]);
        point.geometry.attributes.position.needsUpdate = true;
      }
    });
  }
}
