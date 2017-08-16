(function () {
'use strict';

class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;

    document.body.appendChild(this.canvas);

    this.gl = this.canvas.getContext('webgl');
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
}

var vertexShaderSource = "attribute vec3 vertexPosition;attribute vec4 vertexColor;varying mediump vec4 color;void main(){gl_Position=vec4(vertexPosition,1.0);color=vertexColor;}";

var fragmentShaderSource = "varying mediump vec4 color;void main(){gl_FragColor=color;}";

class Shader {
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

class Triangle {
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

const renderer = new Renderer;
const triangle = new Triangle(renderer.gl);
const shader = new Shader(renderer.gl);

const update = timestamp => {
  requestAnimationFrame(update);

  renderer.clear();
  triangle.draw(renderer.gl);
};

requestAnimationFrame(update);

}());
