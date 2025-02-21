import * as THREE from 'three'

export class RaycasterHelper {
    constructor(renderer, camera) {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.renderer = renderer
        this.camera = camera
    }

    UpdatercasterDirection(event) {
        const rect = this.renderer.domElement.getBoundingClientRect()
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersection = new THREE.Vector3()
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

        if (this.raycaster.ray.intersectPlane(plane, intersection)) {
            return intersection
        }
        return null
    }
}
