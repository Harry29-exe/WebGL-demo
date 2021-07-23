import {vertexShaderSrc, fragmentShaderSrc, boxIndices, boxVertices} from "./data";
import {createBuffer, createProgram, createShader, setTransforms, updateTransform} from "./helpers";
import {glMatrix, mat4, vec3} from 'gl-matrix';


export function init() {
    document.getElementById('body').innerHTML = '<canvas id=\'canvas\'></canvas>';

    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = 900;
    canvas.height = 700;
    let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

    if(!gl) {
        console.log('wtf?')
    }

    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
    let program = createProgram(gl, vertexShader, fragmentShader);

    let buffer = createBuffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array(boxVertices));
    let triangleBuffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW, new Uint8Array(boxIndices));

    let vertexPosition = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        vertexPosition,
        3,
        gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(vertexPosition);
    let colorPosition = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        colorPosition,
        3,
        gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(colorPosition);

    gl.useProgram(program);

    let screenLocation = gl.getUniformLocation(program, 'screen');
    gl.uniform2f(screenLocation, canvas.width, canvas.height);


    let projectionMatrix = new Float32Array(16);
    let worldMatrix = new Float32Array(16);
    let viewMatrix = new Float32Array(16);
    mat4.perspective(projectionMatrix, glMatrix.toRadian(90), canvas.width/canvas.height, 0.1, 1000);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, -5, 0], [0, 0, 0], [0, 0, 1]);

    setTransforms(gl, program, worldMatrix, viewMatrix, projectionMatrix);

    let playerPos = [0, -5, 0];
    let lookAt;
    let deg = [15, 15];

    setUpCanvas(canvas, deg);
    setUpMove(canvas, playerPos);


    let identity = new Float32Array(16);
    let xLookAt = new Float32Array(3);
    let tLookAt = new Float32Array(3);
    mat4.identity(identity);
    const loop = () => {
        lookAt = [playerPos[0], playerPos[1], playerPos[2]+1];
        mat4.lookAt(viewMatrix, new Float32Array(playerPos),new Float32Array(lookAt), [0,0,1]);
        vec3.rotateX(xLookAt, new Float32Array(lookAt), new Float32Array(playerPos), glMatrix.toRadian(deg[0]));
        vec3.rotateZ(tLookAt, new Float32Array(xLookAt), new Float32Array(playerPos), glMatrix.toRadian(deg[1]));

        let view = new Float32Array(16);
        mat4.lookAt(view, new Float32Array(playerPos), new Float32Array(tLookAt), [0,0,1]);

        updateTransform(gl, program, view, 'mView');
        render(gl);

        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}



function render(gl: WebGL2RenderingContext) {
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_BYTE, 0);
}

function setUpCanvas(canvas: HTMLCanvasElement, deg: number[]) {
    canvas.onmousedown = (event: MouseEvent) => {
        let startX = event.screenX;
        let startY = event.screenY;

        const updateRotation = (x: number, y: number) => {
            deg[0] = deg[0] - 100 * (startY - y) / canvas.height;
            deg[1] = deg[1] - 100 * (startX - x) / canvas.width;
            startX = x;
            startY = y;
        }
        document.body.onmousemove = (event: MouseEvent) => {
            updateRotation(event.screenX, event.screenY);
        }
        canvas.onmouseup = (event: MouseEvent) => {
            document.body.onmousemove = null;
            updateRotation(event.screenX, event.screenY);
        }
    };
}

function setUpMove(canvas: HTMLCanvasElement, pos: number[]) {
    let pressedKeys: string[] = [];
    const offset = 0.1;
    const time = 10;

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        console.log(event.key);
        if(!(event.key in pressedKeys)) {
            pressedKeys.push(event.key);
        }
        switch (event.key) {
            case 'w':
                moveWhilePressed(1, offset, 'w');
                break;
            case 's':
                moveWhilePressed(1, -offset, 's');
                break;
            case 'a':
                moveWhilePressed(0, -offset, 'a');
                break;
            case 'd':
                moveWhilePressed(0, offset, 'd');
                break;
            case 'e':
                moveWhilePressed(2, offset, 'e');
                break;
            case 'q':
                moveWhilePressed(2, -offset, 'q');
                break;
        }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        let index = pressedKeys.indexOf(event.key);
        delete pressedKeys[index];
    })

    function moveWhilePressed(directionIndex: number, offset: number, keyPressed: string) {
        pos[directionIndex] += offset;
        console.log(pos);
        if(keyPressed in pressedKeys) {
            setTimeout(() => moveWhilePressed(directionIndex, offset, keyPressed), time);
        }
    }
}

