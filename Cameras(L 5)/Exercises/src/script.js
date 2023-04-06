import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const cursor = {
    x:0,
    y:0
}

// Cursor
window.addEventListener('mousemove',(event) => 
{
    cursor.x = event.clientX/sizes.width - 0.5 // it will go from -ve 0.5 to +ve 0.5
    cursor.y = -(event.clientY/sizes.height - 0.5)

    // console.log(cursor.x) // tells the x coordinate of mouse movement 
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
} 

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,1,1000)

// const aspectRatio = sizes.width/sizes.height
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
// controls.target.y = 2
// controls.update()


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = Math.sin(cursor.x*Math.PI*2) * 2 // it gives 1 full rotation
    // camera.position.z = Math.cos(cursor.x*Math.PI*2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(new THREE.Vector3()) // the camera is at a plane
    // camera.lookAt(mesh.position)

    //Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()