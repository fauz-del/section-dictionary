import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { vertexShader, fragmentShader } from './shaders.js';

const container = document.getElementById('heroVisual');

if (!container) {
  throw new Error('Shader mount #heroVisual was not found.');
}

const hero = container.closest('.hero') || document.body;

const config = {
  lerpFactor: 0.035,
  parallaxStrength: 0.1,
  distortionMultiplier: 10,
  glassStrength: 2.0,
  glassSmoothness: 0.0001,
  stripesFrequency: 35,
  edgePadding: 0.1
};

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.prepend(renderer.domElement);

const uniforms = {
  uTexture: { value: null },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uTextureSize: { value: new THREE.Vector2(1, 1) },
  uHeroSize: { value: new THREE.Vector2(1, 1) },
  uPanelOffset: { value: new THREE.Vector2(0, 0) },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uParallaxStrength: { value: config.parallaxStrength },
  uDistortionMultiplier: { value: config.distortionMultiplier },
  uGlassStrength: { value: config.glassStrength },
  ustripesFrequency: { value: config.stripesFrequency },
  uglassSmoothness: { value: config.glassSmoothness },
  uEdgePadding: { value: config.edgePadding }
};

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms
});
scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

const resize = () => {
  const rect = container.getBoundingClientRect();
  const heroRect = hero.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  renderer.setSize(rect.width, rect.height, false);
  uniforms.uResolution.value.set(rect.width, rect.height);
  uniforms.uHeroSize.value.set(heroRect.width, heroRect.height);
  uniforms.uPanelOffset.value.set(
    rect.left - heroRect.left,
    rect.top - heroRect.top
  );
};

new ResizeObserver(resize).observe(container);
new ResizeObserver(resize).observe(hero);
window.addEventListener('resize', resize);
resize();

new THREE.TextureLoader().load(
  './assets/sky.jpg',
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    uniforms.uTexture.value = texture;
    uniforms.uTextureSize.value.set(texture.image.width, texture.image.height);
  },
  undefined,
  (error) => {
    console.error('Could not load the hero sky texture:', error);
  }
);

const mouse = new THREE.Vector2(0.5, 0.5);
const targetMouse = new THREE.Vector2(0.5, 0.5);

container.addEventListener('pointermove', (event) => {
  const rect = container.getBoundingClientRect();
  targetMouse.set(
    (event.clientX - rect.left) / rect.width,
    1 - (event.clientY - rect.top) / rect.height
  );
});
container.addEventListener('pointerleave', () => targetMouse.set(0.5, 0.5));

renderer.setAnimationLoop(() => {
  mouse.lerp(targetMouse, config.lerpFactor);
  uniforms.uMouse.value.copy(mouse);
  renderer.render(scene, camera);
});