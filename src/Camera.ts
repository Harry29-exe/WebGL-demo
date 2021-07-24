import {glMatrix, mat4, vec3} from "gl-matrix";

export class Camera {
    private playerPos: vec3;
    private playerLookAt: vec3;
    private cameraRotation: vec3;
    private temp1Vec3 = new Float32Array(3);
    private temp2Vec3 = new Float32Array(3);
    private zeroVec3 = new Float32Array(3);

    constructor(playerPos: vec3, cameraRotation: vec3) {
        this.playerPos = playerPos;
        this.cameraRotation = cameraRotation;
        this.playerLookAt = new Float32Array([playerPos[0], playerPos[1] + 1, playerPos[2]]);
    }

    move(moveVector: vec3) {
        vec3.rotateX(this.temp1Vec3, moveVector, this.zeroVec3, glMatrix.toRadian(this.cameraRotation[0]));
        vec3.rotateY(this.temp2Vec3, this.temp1Vec3, this.zeroVec3, glMatrix.toRadian(this.cameraRotation[0]));

        let temp = new Float32Array(3);
        vec3.add(temp, this.temp2Vec3, this.playerPos);
        this.playerPos = temp;
    }

    rotate(deg: vec3) {

    }
    
    getViewMatrix(): mat4 {
        return new Float32Array(16);
    }

    private generateLookAt() {
        this.playerLookAt[0] = this.playerPos[0];
        this.playerLookAt[1] = this.playerPos[1] + 1;
        this.playerLookAt[2] = this.playerPos[2];
    }
}