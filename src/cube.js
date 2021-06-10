import * as THREE from "three";

const { Vector3 } = THREE;

const material = new THREE.MeshLambertMaterial({ color: 0x5555aa });

class Cube {
  constructor(position, size, parent = null) {
    this.size = size || 1 / 3;
    this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.position = position;
    this.mesh.position.set(...this.position.toArray());
    this.parent = parent;
  }

  divide() {
    let cubes = [];
    let variations = [this.size / 3, -this.size / 3, 0];

    this.mesh = new THREE.Object3D();
    this.mesh.position.set(...this.position.toArray());

    for (let i of variations) {
      for (let j of variations) {
        if (i == 0 && j == 0) continue;
        for (let k of variations) {
          if (i == 0 && k == 0) continue;
          if (j == 0 && k == 0) continue;
          cubes.push(new Cube(new Vector3(i, j, k), this.size / 3, this.mesh));
        }
      }
    }

    return cubes;
  }
}

export default Cube;
