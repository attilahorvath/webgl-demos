export default class Triangle {
  constructor(gl) {
    const vertices = new Float32Array([
      0.0, 0.75, 0.0, 1.0, 0.0, 0.0, 1.0,
      -0.75, -0.75, 0.0, 0.0, 1.0, 0.0, 1.0,
      0.75, -0.75, 0.0, 0.0, 0.0, 1.0, 1.0
    ]);

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  }

  draw(gl) {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
