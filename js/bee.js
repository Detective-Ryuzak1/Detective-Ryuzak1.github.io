import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Configuración de cámara
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

// Escena
const scene = new THREE.Scene();
let bee;
let mixer;

// Cargar modelo de abeja
const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.scale.set(0.2, 0.2, 0.2);
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Render loop
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.02);
};
reRender3D();

// Posiciones de la abeja según tus secciones
let arrPositionModel = [
    {
        selector: '.banner', // Primer bloque
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 }
    },
    {
        selector: '.grid-1', // Sección 1
                position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0, y: 1.5, z: 0 }

    },
    {
        selector: '.grid-2', // Sección 2
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 }
    },
    {
        selector: '.grid-22', // Sección 2
        position: { x: 0, y: 0, z: -2 },
        rotation: { x: 0, y: 0.5, z: 0 }
    },
    {
        selector: '.grid-3', // Sección final
        position: { x: -2, y: 0, z: 0 },
        rotation: { x: -1, y: -0.5, z: 0 }
    },
        {
        selector: '.grid-5', // Sección final
        position: { x: -1, y: -1, z: 0 },
        rotation: { x: 0, y: 1, z: 0 }
    }
];

// Función de movimiento
const modelMove = () => {
    let currentSectionIndex = -1;
    arrPositionModel.forEach((section, index) => {
        const el = document.querySelector(section.selector);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSectionIndex = index;
        }
    });

    if (currentSectionIndex >= 0 && bee) {
        let new_coordinates = arrPositionModel[currentSectionIndex];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }
};

// Eventos
window.addEventListener('scroll', () => {
    if (bee) modelMove();
});
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});