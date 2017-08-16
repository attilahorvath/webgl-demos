import vertexShaderSource from '../shaders/simple.vert.glsl';
import fragmentShaderSource from '../shaders/simple.frag.glsl';

export default class Shader {
  constructor(gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    gl.useProgram(this.program);

    this.position = gl.getAttribLocation(this.program, 'vertexPosition');
    gl.enableVertexAttribArray(this.position);
    gl.vertexAttribPointer(this.position, 3, gl.FLOAT, false,
                           7 * Float32Array.BYTES_PER_ELEMENT, 0);

    this.color = gl.getAttribLocation(this.program, 'vertexColor');
    gl.enableVertexAttribArray(this.color);
    gl.vertexAttribPointer(this.color, 4, gl.FLOAT, false,
                           7 * Float32Array.BYTES_PER_ELEMENT,
                           3 * Float32Array.BYTES_PER_ELEMENT);
  }
}
