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


# What you'll learn in this lesson

1. Normal - It is information that contains the direction outside of the face.
            They can be used for lightning, reflection, refraction, etc.
            If direction of normal is opposite to that of light, we won't be able to see anything, as it will be in shadow. Otherwise, we will be able to see it.

            It has some basic properties like - 
            1. WireFrame - seeing the triangles which make the geometery
            1. Transparent 
            1. Opacity
            1. Side - shows which side will face the user (frontside, backside, doubleside)
            1. FlatShading - it will flatten the faces, meaning that the normals won't be interpolated between the  vertices

1. Mesh Matcap Material - It will display a color by using the normals as a reference to pick the right color on a  texture that looks like a sphere
    Matcap - We get a illusion that the objects are being illuminated without using light

1. Mesh Depth Material - It will simply color the geometry in white if it close to the near and black if it close to the far value of camera

1. Mesh Lambert Material - it reacts to light, it is performant but strange lines are seen

1. Mesh Phong Material - it also reacts to light, it is less performant but strange lines aren't seen and reflection of light can be seen easily
    Few operations - 
    1. Shininess  
    1. Specular - we assign a color which is shown at the reflection, instead of usual white spot

1. Mesh Toon Material - gives a cartoonish tone to geometries
    we use gradientMap to put a new gradient
    We loose the cartoonish effect and instead of a clear separation because the gradient is small and the magFilter tries to fix it with the mipmapping
    We need to set the minFilter and magFilter to THREE.NearestFilter

1. Mesh Standard Material - It uses physically based rendering principles(PBR).
    It supports light but with more realistic algorithm and better roughness and metalness

    PBR - it mimics the real life conditions to know how light and color needs to merge to get realistic results

    aoMap (ambient occlusion map) - it will add shadows where the texture is dark. But we have to provide a second set of UV coordinated

    displacementMap - gives flow to textures, used with height texture (goes up with white and stays same with grey and moves down with black surface)

    metalnessMap and roughnessMap - used with metal texture and roughness texture
    while using these don't use roughness and metalness property of material. Otherwise it will take into consideration those value along with the textures and the roughness and metalness will be overpowered

    normalMap - it will fake the normals orientation and add details on the surface regardless of the subdivision

    alphaMap - it will play with the transparency, we will not be able to see the extra sides of door. It is important to set the transparent as true

    Environment Map - It is an image of what's surrounding the scene. It can be used for reflection or refraction but also for general lighting.

1. Mesh Physical Material - It is same as standard material but with clear coat effect, it is more calculation for gpu

 

## LIGHTS

