# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
## Concepts

Core shadow - dark shadow at the back of an object
When we do one render, Three.js renders for each light supporting shadows. 
These renders will simulate what the light sees as if it is camera. 
During these light renders, a MeshDepthMaterial replaces all mesh materials.
The light renders are then stored as textures and we call them shadow maps.
They are often used on every materials supposed to receive shadows and projected on the geometry.

Go through each object and decide if it can cast a shadow with CastShadow and if it can receive the shadow with ReceiveShadow

Note : Only pointLight, DirectionalLight and SpotLight can support shadows

Now, we need to optimize the shadows. 
We can do it by changing the height and width of the shadowMaps
directionalLight.shadows - we can access the shadowMaps
By default the shadow map size is 512x512. We can improve it but keep a power of 2 for mipmapping
Lesser the width and height, blurrier the shadow will be 

Near and Far
To help us debug, we can use a Camera Helper with the camera used for the shadow map located in the 
directionalLight.shadow.camera
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6

- Orthographic camera is used for directionalLight
- Perspective camera is used for spotlight and point light
In point light, the perspective camera creates a cube through the renders on all the 6 sides

Amplitude
we can change the left, right, top and bottom of orthographic camera

Note: The smaller the values, more precise will be the shadows. But if it's too small, the shadows will be cropped

Blur
We can control the blur of the shadow through its radius property
More the radius, more blurrier the shadow is
directionalLight.shadow.radius = 10

this technique doesn't use the proximity of camera with the object its a general and cheap blur

Shadow Map Algorithm
1. THREE.BasicShadowMap - very performant but lousy quality
2. THREE.PCFShadowMap - Less performant but smoother edges (default)
3. THREE.PCFSoftShadowMap - Less performant but even softer edge
4. THREE.VSMShadowMap - Less performant, more constraints, can have unexpected results

we need to update the renderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap

The radius doesn't work with softshadowmap

Baking Shadows
We integrate shadows in textures that we apply on materials, but it is not dynamic
So, we find an alternative