export const vertexShaderSrc = `#version 300 es
precision mediump float;

in vec3 vertPosition;
in vec2 vertUV;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

out vec2 fragUV;

void main() {
    fragUV = vertUV;
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
`

export const fragmentShaderSrc = `#version 300 es
precision mediump float;

in vec2 fragUV;
out vec4 color;

uniform sampler2D sampler;
uniform vec2 screen;

void main() {
    color = texture(sampler, fragUV); 
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
    [ // X, Y, Z              U,V
        // Top
            -1.0,  1.0, -1.0,   0, 0,
            -1.0,  1.0,  1.0,   0, 1,
             1.0,  1.0,  1.0,   1, 1,
             1.0,  1.0, -1.0,   1, 0,

            // Left
            -1.0,  1.0,  1.0,   0, 0,
            -1.0, -1.0,  1.0,   1, 0,
            -1.0, -1.0, -1.0,   1, 1,
            -1.0,  1.0, -1.0,   0, 1,

            // Right
             1.0,  1.0,  1.0,   1, 1,
             1.0, -1.0,  1.0,   0, 1,
             1.0, -1.0, -1.0,   0, 0,
             1.0,  1.0, -1.0,   1, 0,

            // Front
             1.0,  1.0,  1.0,   1, 1,
             1.0, -1.0,  1.0,   1, 0,
            -1.0, -1.0,  1.0,   0, 0,
            -1.0,  1.0,  1.0,   0, 1,

            // Back
             1.0,  1.0, -1.0,   0, 0,
             1.0, -1.0, -1.0,   0, 1,
            -1.0, -1.0, -1.0,   1, 1,
            -1.0,  1.0, -1.0,   1, 0,

            // Bottom
            -1.0, -1.0, -1.0,   1, 1,
            -1.0, -1.0,  1.0,   1, 0,
             1.0, -1.0,  1.0,   0, 0,
             1.0, -1.0, -1.0,   0, 1,
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