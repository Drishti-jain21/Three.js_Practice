import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'

/*
Debug UI
*/
const gui = new dat.GUI({closed:true})
const parameters = {
    spin : () =>{
        gsap.to(torus.rotation,{ duration: 3.5 , y: torus.rotation.y + Math.PI*2*2 })
        gsap.to(torus1.rotation,{ duration: 3.5 , y: -(torus.rotation.y + Math.PI*2*2)})
    },
    shoot : () =>{
        torus.rotation.y = Math.PI*0.5
        torus1.rotation.y = Math.PI*0.5
        gsap.to(sphere.position,{ duration: 3.5 , x: sphere.position.x+Math.PI})
    },
    restore : () =>{
        gsap.to(sphere.position,{duration: 3.5 , x: 0})
        torus1.rotation.y = Math.PI
        torus.rotation.y = Math.PI
        material3.color.set(0xffa3fd)
        material.color.set(0xe384ff)
        material2.color.set(0x865dff)
    }
}
const Innertorus = {
    color: 0xe384ff
}
const Outertorus = {
    color: 0x865dff
}
const Sphere = {
    color: 0xffa3fd
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.TorusGeometry( 0.6, 0.33, 12, 48 );
const material = new THREE.MeshBasicMaterial( { color: Innertorus.color } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const geometry2 = new THREE.TorusGeometry( 1.3, 0.3, 12, 48 );
const material2 = new THREE.MeshBasicMaterial( { color: Outertorus.color } );
const torus1 = new THREE.Mesh( geometry2, material2 );
scene.add( torus1 );

const geometry3 = new THREE.SphereGeometry( 0.25, 32, 16 );
const material3 = new THREE.MeshBasicMaterial( { color: Sphere.color } );
const sphere = new THREE.Mesh( geometry3, material3 );
scene.add( sphere );

gui.
    add(parameters,'spin')

gui.
    add(parameters,'shoot')

gui.
    add(parameters,'restore')
   
gui.
    addColor(Outertorus,'color')
    .onChange(() =>
    {
        material2.color.set(Outertorus.color)
    })
    .name('OuterTorus')
gui.
    addColor(Innertorus,'color')
    .onChange(() =>
    {
        material.color.set(Innertorus.color)
    })
    .name('InnerTorus')
gui.
    addColor(Sphere,'color')
    .onChange(() =>
    {
        material3.color.set(Sphere.color)
    })
    .name('Sphere')


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()