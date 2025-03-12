import * as THREE from "three";

export class RectangleLines {
  constructor(scene) {
    this.scene = scene;
    this.startPoint = null;
    this.lines = [];
    this.points = [];

    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.pointMaterial = new THREE.PointsMaterial({
      color: "white",
      size: 0.05,
    });
  }

  createLines(p0) {
    this.lines = [
      new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      ),
      new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      ),
      new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      ),
      new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      ),
    ];

    this.points = [
      new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ color: "white", size: 0.08 })
      ),
      new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ color: "white", size: 0.08 })
      ),
      new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ color: "white", size: 0.08 })
      ),
      new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ color: "white", size: 0.08 })
      ),
    ];

    this.scene.add(...this.lines);

    this.lines.forEach((line, i) => {
      line.add(this.points[i], this.points[(i + 1) % 4]);
    });

    this.startPoint = p0.clone();
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
      const line_points = [points_position[i], points_position[(i + 1) % 4]];
      line.geometry.setFromPoints(line_points);
      line.geometry.computeBoundingSphere();

      line.children.forEach((point, i) => {
        point.geometry.setFromPoints([line_points[i]]);
        point.geometry.computeBoundingSphere();
      });
    });
  }
}
