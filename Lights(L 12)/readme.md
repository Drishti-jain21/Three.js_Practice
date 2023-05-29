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

All lights have various components - color, intensity

1. Ambient Light - it globally illuminates all objects in scene equally. This light cannot be used to cast shadows as it does not have direction

It is used for bouncing light. Through ambient light, we have a dim light, which is actually the light which has bounced towards the portion of object away from the light.

2. Directional Light - it is used to illuminate just the portion of object where the light falls.
we can change the position of this light using - 
directionalLight.position.set(1,0.25,0)
(x,y,z)

3. Hemisphere Light - It works just like ambient light but we can use 2 colors for the lights. 
One color is there for light that comes from top to the object and the other comes from bottom to the object. In the middle it is a mixture of both lights.

4. Point Light - it is almost like a lighter
The light starts at an infinitely small point and spreads uniformly in every direction
By default, the light intensity doesn't fade. We can control the fade distance and how fast it fades with distance and decay

5. Rect Area Light - it works like the big rectangle lights you can see on the photoshoot set. It's a mix between directional light and a diffuse light 
It is just used with mesh standard and mesh physical materials
we can use position.set() and lookAt() to change the position of light and make it look at a particular position or the center of the scene.

6. Spot Light - it is like flashlight. It is a cone of light starting at a point and oriented in a direction
it has various components - color, intensity, distance - at what distance the light fades, angle - width of the light, penumbra - it is used for fading at the edges,if it is 0, the light is sharp, decay
To rotate the spot light, we can't directly use spotlight.lookAt(), it is not possible
So, we use spotLight.target , target is just like an object and its movement, moves the spotlight. we also need to add target to scene, spotLight.target

## Things to note :
1. Lights can cost a lot when it comes to performances, try to add as few lights as possible and try to use lights which cost less

Lights which cost less - ambient light and hemisphere light
Lights with moderate cost - directional light and point light
Lights with high cost - spotlight and rect area light

To assist with positioning of lights, we can use helpers

## Baking
If we want a lot of lights, lights which look perfect, we can use baking.
Idea is to bake the light into texture, which can be done on 3D software
But we cannot move the light and we have to load huge textures