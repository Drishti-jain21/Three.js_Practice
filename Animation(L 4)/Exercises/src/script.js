import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Animations
// let time = Date.now()
// const tick = () =>
// {
//     // console.log('tick')

//     //time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime

//     // console.log(time) // to see the current time in console 

//     // Update objects
//     // mesh.position.x +=0.01
//     // mesh.position.y +=0.01
//     mesh.rotation.y +=0.001 * deltaTime
//     mesh.rotation.z +=0.001 * deltaTime

//     //Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()

// using CLOCK

const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //rotation
    // mesh.rotation.y  = elapsedTime
    // mesh.rotation.z  = elapsedTime

    // for full rotation in 1 sec
    // mesh.rotation.y  = elapsedTime * 2 * Math.PI

    // mesh.position.y = elapsedTime

    // to make a cube rotate in circle
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)

    // to move camera and not cube
    camera.position.x = Math.cos(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()


// using gsap

// gsap.to(mesh.position,{duration:2,delay:2,x:2})
// gsap.to(mesh.position,{duration:2,delay:2,x:0})
// const tick = () =>
// {
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()