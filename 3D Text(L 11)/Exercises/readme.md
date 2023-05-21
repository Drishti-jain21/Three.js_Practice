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

## What we'll learn in this lesson

1. TextBufferGeometry - we need a specific font format called typeface

1. How to center the text - 
    1. Bounding - It is an information associated with the geometry that tells what space is taken by that geometry. It can be box or sphere, means sphere or box can bound the geometry.
                  By default, three.js uses box bounding
                  It helps three.js calculate if object is on the screen (frustum culling), its about rendering or not as it can be behind the camera, where it won't be rendered