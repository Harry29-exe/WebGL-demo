//vertex transforms
#version 300 es
precision mediump float;

in vec3 vertPosition;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main() {
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}

//fragment grid
#version 300 es
precision mediump float;

in vec3 fragColor;
out vec4 color;
uniform vec2 screen;

void main() {
    if (int(gl_FragCoord[0]) == 0 || int(gl_FragCoord[1]) == 0
    || int(gl_FragCoord[0]) == (int(screen[0]) - 1)
    || int(gl_FragCoord[1]) == (int(screen[1]) - 1 )
    ) {
        color = vec4(0.2, 0.2, 1.0, 1.0);
    } else {
        int t = int(gl_FragCoord[0] + gl_FragCoord[1]);
        float temp = t % 4 == 0? 1.0: 0.0;
        color = vec4(temp, temp, temp, 1.0);
    }
}