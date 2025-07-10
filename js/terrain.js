import * as THREE from "three";
import SimplexNoise from "SimplexNoise";
import { scene } from "./main.js";

export const CHUNK_SIZE = 16, VIEW = 2;
const chunks = {};

export function initTerrain(sceneRef){
  updateChunks();
}

export function updateChunks(camera) {
  const px = Math.floor(camera.position.x/(CHUNK_SIZE*2));
  const pz = Math.floor(camera.position.z/(CHUNK_SIZE*2));
  for(let dz=-VIEW; dz<=VIEW; dz++){
    for(let dx=-VIEW; dx<=VIEW; dx++){
      const key = `${px+dx},${pz+dz}`;
      if(!(key in chunks)){
        const chunk = buildChunk(px+dx, pz+dz);
        chunks[key] = chunk;
        scene.add(chunk.mesh);
      }
    }
  }
}

function buildChunk(cx, cz){
  const size = CHUNK_SIZE, s=2;
  const simplex = new SimplexNoise(cx*100+cz*10);
  const geo = new THREE.BoxGeometry(s,s,s);
  const mat = new THREE.MeshStandardMaterial({vertexColors:true});
  const inst = new THREE.InstancedMesh(geo, mat, size*size*5);
  inst.castShadow=inst.receiveShadow=true;

  const tmp = new THREE.Object3D();
  let count = 0;
  for(let x=0;x<size;x++){
    for(let z=0;z<size;z++){
      const n = simplex.noise2D((cx*size+x)/10,(cz*size+z)/10);
      const h = Math.floor((n+1)*3+4);
      for(let y=0;y<h;y++){
        tmp.position.set((cx*size+x)*s, y*s, (cz*size+z)*s);
        const c = new THREE.Color(y<h-1?0x8B4513:0x228B22);
        inst.setColorAt(count, c);
        tmp.updateMatrix();
        inst.setMatrixAt(count++, tmp.matrix);
      }
    }
  }
  inst.count = count;
  inst.instanceMatrix.needsUpdate = true;
  inst.instanceColor.needsUpdate = true;
  return { mesh: inst, cx, cz };
}
