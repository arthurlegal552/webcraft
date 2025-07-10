import * as THREE from "three";
import { scene } from "./main.js";

let sun;

export function initDayCycle(sceneRef){
  sun = new THREE.DirectionalLight(0xffffff,1);
  sun.position.set(100,200,50);
  sun.castShadow = true;
  sceneRef.add(sun);
}

export function updateDayCycle(dt){
  sun.position.x = sun.position.x * Math.cos(dt*0.05) - sun.position.z * Math.sin(dt*0.05);
  sun.position.z = sun.position.z * Math.cos(dt*0.05) + sun.position.x * Math.sin(dt*0.05);
}
