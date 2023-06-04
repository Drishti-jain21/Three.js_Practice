import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/2.png')

const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)

/**
 * Particles
 */

// Sphere particle

// const particlesGeometry = new THREE.SphereGeometry(1,32,32)
// const particlesMaterial = new THREE.PointsMaterial({
//     size : 0.02,
//     sizeAttenuation : true
// })
// const particles = new THREE.Points(particlesGeometry,particlesMaterial)
// scene.add(particles)

// Custom Particle Geometry

const particlesGeometry = new THREE.BufferGeometry()
const particlesMaterial = new THREE.PointsMaterial({
    size : 0.1,
    sizeAttenuation: true,
    // color : '#ff88cc',
    // map : particlesTexture
    transparent : true,
    alphaMap : particlesTexture,
    // alphaTest : 0.001
    // depthTest : false
    depthWrite : false,
    blending : THREE.AdditiveBlending,
    vertexColors : true
})
const size = 2000
const positions = new Float32Array(size*3)
const colors = new Float32Array(size*3)
for(let i=0;i<size*3;i++){
    positions[i] = (Math.random()-0.5)*10
    colors[i] = (Math.random())
}
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors,3))

const particles = new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particles)

// sphere
const sphereGeometry = new THREE.SphereGeometry(0.5,32,32)
const sphereMaterial = new THREE.MeshToonMaterial({color:'red'})
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)

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

    // Update particles
    // particles.rotation.y = elapsedTime * 0.2 // rotates 
    // particles.position.y = -elapsedTime*0.1 // falling
    for(let i=0;i<size;i++){
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        sphere.position.y = Math.sin(elapsedTime) + 0.5
        particlesGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime+x)
    }
    
    particlesGeometry.attributes.position.needsUpdate = true

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()