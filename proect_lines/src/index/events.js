import { RaycasterHelper } from "../index/raycaster";
import { RectangleLines } from "../index/rectangle";
import { CircleLines } from "../index/cricle";
import { Line } from "../index/line";
import store from "../stores/index";

let isDrawingCube = false;
let isDrawingCircle = false;
let isDrawingLine = false;
let intersection = null;
let SelectMode = false;

export function drawingCube() {
  isDrawingCube = !isDrawingCube;
  isDrawingLine = false;
  isDrawingCircle = false;
}

export function drawingCircle() {
  isDrawingCircle = !isDrawingCircle;
  isDrawingLine = false;
  isDrawingCube = false;
}

export function drawingLine() {
  isDrawingLine = !isDrawingLine;
  isDrawingCube = false;
  isDrawingCircle = false;
}

export function Selectmode() {
  isDrawingCube = false;
  isDrawingCircle = false;
  isDrawingLine = false;
  SelectMode = !SelectMode;
}

export function setupMouseEvents(renderer, camera, scene) {
  const raycasterHelper = new RaycasterHelper(renderer.domElement, camera);
  const rectangle = new RectangleLines(scene);
  const circle = new CircleLines(scene);
  const line = new Line(scene);

  let isDrawing = false;
  let currentlyHoveredObject = null;

  window.addEventListener("click", (event) => {
    intersection = raycasterHelper.UpdateRaycasterDirection(event);
    if (!intersection) return;

    if (isDrawingCube) {
      isDrawing = !isDrawing;
      if (isDrawing) {
        rectangle.createLines(intersection);
      } else {
        rectangle.startPoint = null;
      }
    } else if (isDrawingCircle) {
      isDrawing = !isDrawing;
      if (isDrawing) {
        circle.createCircle(intersection);
      } else {
        circle.centerPoint = null;
      }
    } else if (isDrawingLine) {
      isDrawing = !isDrawing;
      if (isDrawing) {
        line.createLine(intersection);
      } else {
        line.startPoint = null;
      }
    } else if (SelectMode) {
      const isMultiSelect = event.ctrlKey || event.metaKey; // Ստուգում ենք Ctrl/Cmd ստեղնը
      const intersects = raycasterHelper.raycaster.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const firstIntersected = intersects[0].object;

        if (firstIntersected.material && firstIntersected.material.color) {
          store.commit("toggleSelectObject", {
            object: firstIntersected,
            isMultiSelect,
          });
        }
      } else if (!isMultiSelect) {
        store.commit("clearSelectObjects");
      }
    }

    console.log(store.state.select.selectObjects);
  });

  window.addEventListener("mousemove", (event) => {
    intersection = raycasterHelper.UpdateRaycasterDirection(event);
    if (!intersection) return;

    if (isDrawingCube) {
      rectangle.updateLines(intersection);
    } else if (isDrawingCircle) {
      circle.updateCircle(intersection);
    } else if (isDrawingLine) {
      line.updateLine(intersection);
    } else {
      const intersects = raycasterHelper.raycaster.intersectObjects(
        scene.children,
        true
      );

      scene.children.forEach((obj) => {
        if (obj.material && obj.material.color) {
          if (!store.state.select.selectObjects.includes(obj)) {
            obj.material.color.set(0xffffff);
          } else {
            obj.material.color.set("red");
          }
        }
      });

      if (intersects.length > 0) {
        const firstIntersected = intersects[0].object;
        if (firstIntersected.material && firstIntersected.material.color) {
          firstIntersected.material.color.set(0x0000ff);
          currentlyHoveredObject = firstIntersected;
        }
      }
    }
  });

  // Reset hover color when the mouse moves out of the object
  window.addEventListener("mouseout", () => {
    if (
      currentlyHoveredObject &&
      !store.state.select.selectObjects.includes(currentlyHoveredObject)
    ) {
      currentlyHoveredObject.material.color.set(0xffffff); // Reset color to white
      currentlyHoveredObject = null;
    }
  });
}
