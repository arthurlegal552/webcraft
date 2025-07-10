import * as THREE from "three";
import { camera } from "./main.js";
import { CHUNK_SIZE } from "./terrain.js";

const ray = new THREE.Raycaster();

export function initInteraction(cam, scene){
  window.selectedBlock = "grass";
  document.addEventListener('mousedown', onClick);
}

function onClick(e){
  if(e.target.tagName==='CANVAS'){
    ray.setFromCamera({x:0,y:0}, camera);
    const intersects = ray.intersectObjects(scene.children);
    if(!intersects.length) return;
    const hit = intersects[0];
    const p = hit.point.add(hit.face.normal.multiplyScalar(1));
    const bx = Math.floor(p.x/2), by = Math.floor(p.y/2), bz = Math.floor(p.z/2);
    console.log(`${e.button===0?'Remove':'Place'} block at ${bx},${by},${bz}`);
  }
}

export function handleInteraction(){}
