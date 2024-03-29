import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Debug UI
 */
const gui = new dat.GUI()


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')

const matCapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false


const environmentMapTexture = cubeTextureLoader.load([ // these are photos of all 6 directions
    '/textures/environmentMaps/0/px.jpg',   // +ve x
    '/textures/environmentMaps/0/nx.jpg',   // -ve x
    '/textures/environmentMaps/0/py.jpg',   // +ve y
    '/textures/environmentMaps/0/ny.jpg',   // -ve y
    '/textures/environmentMaps/0/pz.jpg',   // +ve z
    '/textures/environmentMaps/0/nz.jpg',   // -ve z
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

/**
 * Mesh basic 
 * const material = new THREE.MeshBasicMaterial()
 * material.wireframe = true
 * material.map = doorColorTexture
 * material.color = new THREE.Color('pink')
 * material.color.set('red') // don't just do this, add color to material too
 * material.transparent = true
 * material.opacity = 0.5
 * material.alphaMap = doorAlphaTexture
 * material.side = THREE.DoubleSide
 */


// const material = new THREE.MeshNormalMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture

// const material = new THREE.MeshDepthMaterial() 

// const material = new THREE.MeshLambertMaterial() // light effect

// const material = new THREE.MeshPhongMaterial() // light effect
// material.shininess = 100
// material.specular = new THREE.Color('red')

const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.envMap = environmentMapTexture


gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)
gui.add(material,'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material,'displacementScale').min(0).max(1).step(0.0001)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
)

sphere.position.x = -1.5
sphere.geometry.setAttribute('uv2',new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material
)

plane.geometry.setAttribute('uv2',new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)) // first two values will be for the first vertex and so on


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,64,128),
    material
)

torus.position.x = 1.5
torus.geometry.setAttribute('uv2',new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2))



scene.add(sphere,plane,torus)


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    //rotate objects
    sphere.rotation.y = 0.1*elapsedTime
    torus.rotation.y = 0.1*elapsedTime
    plane.rotation.y = 0.1*elapsedTime

    sphere.rotation.x = 0.15*elapsedTime
    torus.rotation.x  = 0.15*elapsedTime
    plane.rotation.x  = 0.15*elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()