// console.log(THREE);

//scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh  = new THREE.Mesh(geometry,material);
scene.add(mesh);

//Sizes
const sizes = {
    width : 800,
    height : 500
};

// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z = 3
scene.add(camera);

// Renderer
//Canvas
const canvas = document.querySelector('.webgl');
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
    // canvas  // if property name is same as variable name, we can remove the variable
    canvas : canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera);