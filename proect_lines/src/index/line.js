import * as THREE from "three";

export class Line {
  constructor(scene) {
    this.scene = scene;
    this.startPoint = null;
    this.line = null;
    this.points = [];

    this.lineMaterial = new THREE.LineBasicMaterial({ color: "white" });
    this.pointMaterial = new THREE.PointsMaterial({
      color: "white",
      size: 0.08,
    });
  }

  createLine(p0) {
    this.line = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: "white" }));

    this.points = [
      new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({
        color: "white",
        size: 0.08,
      }) ),
      new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({
        color: "white",
        size: 0.08,
      })),
    ];

    this.scene.add(this.line);
    this.scene.add(this.points[0]);
    this.scene.add(this.points[1]);

    this.startPoint = p0.clone();

    this.updatePoints(p0, p0);
  }

  updateLine(p1) {
    if (!this.line || !this.startPoint) return;
    this.line.geometry.computeBoundingSphere();

    this.updatePoints(this.startPoint, p1);

    const points_position = [this.startPoint, p1];
    this.line.geometry.setFromPoints(points_position);
    this.line.geometry.attributes.position.needsUpdate = true;
  }

  updatePoints(startPoint, endPoint) {
    const points_position = [startPoint, endPoint];

    

    this.points.forEach((point, i) => {
      point.geometry.computeBoundingSphere();
      point.geometry.setFromPoints([points_position[i]]);
      point.geometry.attributes.position.needsUpdate = true;
    });
  }
}
