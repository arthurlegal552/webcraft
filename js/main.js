import * as THREE from "three";
import { setupUI } from "./ui.js";
import { initControls, updateControls } from "./controls.js";
import { initTerrain, updateChunks } from "./terrain.js";
import { initInteraction, handleInteraction } from "./interaction.js";
import { initDayCycle, updateDayCycle } from "./daycycle.js";

export let scene, camera, renderer, clock;

export function start() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);
  camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  camera.position.set(0,50,100);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  setupUI(startGame);
}

function startGame() {
  setupUI();  // Hide menu, toolbar appears
  initControls(camera, renderer.domElement);
  initTerrain(scene);
  initInteraction(camera, scene);
  initDayCycle(scene);

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  updateControls(dt);
  updateChunks(camera);
  handleInteraction();
  updateDayCycle(dt);
  renderer.render(scene, camera);
}
