import * as THREE from "three";
import { PointerLockControls } from "PointerLockControls";
export let controls;

let velocity = new THREE.Vector3();
let move = { f:0,b:0,l:0,r:0 };
let canJump = false;

export function initControls(camera, dom) {
  controls = new PointerLockControls(camera, dom);
  document.addEventListener('keydown', onKey(true));
  document.addEventListener('keyup', onKey(false));
  document.addEventListener('click', ()=>controls.lock());
}

function onKey(down){
  return e => {
    switch(e.code){
      case 'KeyW': move.f = down; break;
      case 'KeyS': move.b = down; break;
      case 'KeyA': move.l = down; break;
      case 'KeyD': move.r = down; break;
      case 'Space':
        if(down && canJump){
          velocity.y = 15; canJump = false;
        }
        break;
    }
  };
}

export function updateControls(dt) {
  velocity.x -= velocity.x * 10 * dt;
  velocity.z -= velocity.z * 10 * dt;
  velocity.y -= 30 * dt;

  const speed = 20;
  if(move.f) velocity.z -= speed * dt;
  if(move.b) velocity.z += speed * dt;
  if(move.l) velocity.x -= speed * dt;
  if(move.r) velocity.x += speed * dt;

  controls.moveRight(-velocity.x*dt);
  controls.moveForward(-velocity.z*dt);

  const pos = controls.getObject().position;
  if(pos.y < 2){
    velocity.y = 0;
    pos.y = 2;
    canJump = true;
  } else {
    pos.y += velocity.y * dt;
  }
}
