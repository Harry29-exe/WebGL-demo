export function createShader(gl: WebGL2RenderingContext, shaderType: number, shaderSrc: string): WebGLShader {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(`The Shader below did not compiled properly:\n ${shaderSrc}
        \n ${gl.getShaderInfoLog(shader)}
        `);
    }

    return shader;
}

export function createProgram(gl: WebGL2RenderingContext, ...shaders: WebGLShader[]): WebGLProgram {
    let program = gl.createProgram();
    shaders.forEach(
        s => gl.attachShader(program, s)
    );

    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Linking problem:\n", gl.getProgramInfoLog(program));
    }

    return program;
}

export function validateProgram(gl: WebGL2RenderingContext, program: WebGLProgram) {
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    }
}

export function createBuffer(gl: WebGL2RenderingContext, target: number,
                            usage: number, data: BufferSource): WebGLBuffer {

    let buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);

    return buffer
}

export function setTransforms(
                    gl: WebGL2RenderingContext,
                    program: WebGLProgram,
                    worldMatrix: Float32Array,
                    viewMatrix: Float32Array,
                    projectionMatrix: Float32Array
    ) {
    let mWorld = gl.getUniformLocation(program, 'mWorld');
    gl.uniformMatrix4fv(mWorld, false, worldMatrix);
    let mView = gl.getUniformLocation(program, 'mView');
    gl.uniformMatrix4fv(mView, false, viewMatrix);
    let mProj = gl.getUniformLocation(program, 'mProj');
    gl.uniformMatrix4fv(mProj, false, projectionMatrix);
}

export function updateTransform
                    (gl: WebGL2RenderingContext,
                     program: WebGLProgram,
                     data: Float32Array,
                     name: string) {
    let pointer = gl.getUniformLocation(program, name);
    gl.uniformMatrix4fv(pointer, false, data,0,16);
}