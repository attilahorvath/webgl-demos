attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying mediump vec4 color;

void main() {
  gl_Position = vec4(vertexPosition, 1.0);
  color = vertexColor;
}
