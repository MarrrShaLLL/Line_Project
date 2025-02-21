import * as THREE from 'three'

export class RectangleLines {
  constructor(scene) {
    this.scene = scene
    this.startPoint = null

    this.line_1 = null
    this.line_2 = null
    this.line_3 = null
    this.line_4 = null

    this.material = new THREE.LineBasicMaterial({ color: 0xffffff })
  }

  createLines(p0) {
    const geometry_1 = new THREE.BufferGeometry()
    const geometry_2 = new THREE.BufferGeometry()
    const geometry_3 = new THREE.BufferGeometry()
    const geometry_4 = new THREE.BufferGeometry()

    this.line_1 = new THREE.Line(geometry_1, this.material)
    this.line_2 = new THREE.Line(geometry_2, this.material)
    this.line_3 = new THREE.Line(geometry_3, this.material)
    this.line_4 = new THREE.Line(geometry_4, this.material)

    this.scene.add(this.line_1, this.line_2, this.line_3, this.line_4)

    this.startPoint = p0.clone()
  }

  updateLines(p1) {
    if (!this.line_1 || !this.startPoint) return

    const points_1 = [this.startPoint.clone(), new THREE.Vector3(p1.x, 0, this.startPoint.z)]
    const points_2 = [points_1[1].clone(), new THREE.Vector3(p1.x, 0, p1.z)]
    const points_3 = [points_2[1].clone(), new THREE.Vector3(this.startPoint.x, 0, p1.z)]
    const points_4 = [points_3[1].clone(), this.startPoint.clone()]

    this.line_1.geometry.setFromPoints(points_1)
    this.line_2.geometry.setFromPoints(points_2)
    this.line_3.geometry.setFromPoints(points_3)
    this.line_4.geometry.setFromPoints(points_4)

    this.line_1.geometry.attributes.position.needsUpdate = true
    this.line_2.geometry.attributes.position.needsUpdate = true
    this.line_3.geometry.attributes.position.needsUpdate = true
    this.line_4.geometry.attributes.position.needsUpdate = true
  }
}
