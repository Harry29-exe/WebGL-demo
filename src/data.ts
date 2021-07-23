export const vertexShaderSrc = `#version 300 es
precision mediump float;

in vec3 vertPosition;
in vec3 vertColor;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

out vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
`

export const fragmentShaderSrc = `#version 300 es
precision mediump float;

in vec3 fragColor;
out vec4 color;
uniform vec2 screen;

void main() {
    
    
    color = vec4(fragColor[0], fragColor[1], fragColor[2], 1.0); 
}
`

// export const bufferData = [
//     -1.0,  0.0, -1.0,  1.0, 1.0, 1.0,
//      1.0,  0.0, -1.0,  1.0, 1.0, 1.0,
//     -1.0,  0.0,  1.0,  1.0, 1.0, 1.0,
//
//     -1.0,  0.0,  1.0, 1.0, 1.0, 1.0,
//      1.0,  0.0, -1.0,  1.0, 1.0, 1.0,
//      1.0,  0.0,  1.0,  1.0, 1.0, 1.0
// ]

export const boxVertices =
    [ // X, Y, Z           R, G, B
        // Top
        -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
        -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
        1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
        1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

        // Left
        -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
        -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
        -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
        -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

        // Right
        1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
        1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
        1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
        1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

        // Front
        1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
        1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
        -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
        -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

        // Back
        1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
        1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
        -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
        -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

        // Bottom
        -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
        -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
        1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
        1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
    ];

export const boxIndices =
    [
        // Top
        0, 1, 2,
        0, 2, 3,

        // Left
        5, 4, 6,
        6, 4, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Front
        13, 12, 14,
        15, 14, 12,

        // Back
        16, 17, 18,
        16, 18, 19,

        // Bottom
        21, 20, 22,
        22, 20, 23
    ];