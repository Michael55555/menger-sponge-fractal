import * as THREE from "three";
import Cube from "./cube.js";

const { Vector3, Scene, PerspectiveCamera } = THREE;

let scene, camera, renderer, light, ambientLight, pivot;
let cubes = [new Cube(new Vector3(0, 0, 0))];
let frame = 0;

function init() {
  scene = new Scene();
  camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10);
  renderer = new THREE.WebGLRenderer();
  light = new THREE.DirectionalLight(0xaaaaaa, 1.75);
  ambientLight = new THREE.AmbientLight(0x888888);
  pivot = new THREE.Object3D();

  renderer.shadowMap.enabled = true;
  camera.position.z = 0.5;
  light.castShadow = true;
  light.position.set(-0.1, 1, 2);
  light.shadow.camera.right = 1;
  light.shadow.camera.left = -1;
  light.shadow.camera.top = 1;
  light.shadow.camera.bottom = -1;

  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(ambientLight);

  for (let cube of cubes) {
    cube.parent = pivot;
    pivot.add(cube.mesh);
  }

  scene.add(light);
  scene.add(pivot);
  animate();
}

function move() {
  pivot.rotation.x += Math.PI / 100;

  if (frame % 80 == 0 && frame <= 240) {
    let arr = [];
    for (let i in cubes) {
      const cube = cubes[i];
      cube.parent.remove(cube.mesh);
      let newCubes = cube.divide();
      cube.parent.add(cube.mesh);

      for (let newCube of newCubes) {
        cube.mesh.add(newCube.mesh);
      }

    console.log({newCubes})
      arr = arr.concat(newCubes);
    }
    console.log(arr)
    cubes = arr;
  }
}

function animate() {
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / 20);
  frame++;
  move();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;

  camera.updateProjectionMatrix();
});

onload = () => init();
