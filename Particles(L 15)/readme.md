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

# Concepts
Particles can be used to create stars, smoke, rain, dust, fire, etc. You can have thousands of them with a resonable frame rate. Each particle is composed of a plane (two triangles) always facing the camera

Creating particles is like creating Mesh
- A geometry(any)
- A material(PointsMaterial)
- A points instance(instead of a mesh)

Points Material :-
- size : size of particles
- sizeAttenuation : to specify if distant particles should be smaller than close particles

Buffer Geometry - 
created random structure with a lot of particles, the material remains the same, we can also add colors

Textures - 
We used different textures, but they were pictures and the front particles covered the back particles (simple mapping)

To improve this, we use alpha map and set transparent to true
But, we can still see the edges of particles. Because, particles are drawn in the same order they are created and WebGL doesn't really know which one is in front of the other.
Ways to fix this - 

1. Alpha Test - alphaTest is a value between 0 and 1 that enables webGL to know when not to render the pixel according to that pixel's transparency 
By default, the value is 0 means that pixel will be rendered anyway

2. Depth Test - When drawing, WebGL tests if what's being drawn is closer to what's already drawn. This is called depth testing and can be deactivated with alphaTest
Deactivating depthTest is not good bcz if we have another geometry of another color, we will be able to see all the particles behind that geometry too, which we shouldn't. It can be a cool effect

3. Depth Write - The depth of what's being drawn is saved in depth buffer and it is avoided to write in depth buffer

Blending 
WebGL currently draws pixels one on top of the other. With the Blending property, we can tell the WebGL to add the color of the pixel to the one which is already drawn
This will effect the performances
Can be used for sparkles