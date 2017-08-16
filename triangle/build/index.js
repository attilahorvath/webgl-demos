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

var vertexShaderSource = "attribute vec3 position;void main(void){gl_Position=vec4(position,1.0);}";

var fragmentShaderSource = "void main(void){gl_FragColor=vec4(1.0,1.0,1.0,1.0);}";

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

    this.position = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(this.position);
    gl.vertexAttribPointer(this.position, 3, gl.FLOAT, false, 0, 0);
  }
}

class Triangle {
  constructor(gl) {
    const vertices = new Float32Array([
      0.0, 0.75, 0.0,
      -0.75, -0.75, 0.0,
      0.75, -0.75, 0.0
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
