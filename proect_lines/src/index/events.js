import { RaycasterHelper } from './recaster.js'
import { RectangleLines } from './createline.js'

export function setupMouseEvents(renderer, camera, scene) {
    const raycasterHelper = new RaycasterHelper(renderer, camera)
    const rectangle = new RectangleLines(scene)
    let isDrawing = false

    window.addEventListener('click', (event) => {
        isDrawing = !isDrawing
        const intersection = raycasterHelper.UpdatercasterDirection(event)


            if (isDrawing) {
                rectangle.createLines(intersection)
            } else {
                rectangle.startPoint = null
            }

    })

    window.addEventListener('mousemove', (event) => {
        if (isDrawing ) {
            const intersection = raycasterHelper.UpdatercasterDirection(event)
            if (intersection) {
                rectangle.updateLines(intersection)
            }
        }
    })
}
