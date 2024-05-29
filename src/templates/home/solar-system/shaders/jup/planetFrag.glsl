uniform vec3 glowColor; // { "value":{ "r":0, "g":255, "b":217 } }
uniform float coeficient; // { "value": 1, "min":0, "max":2, "step":0.001 }
uniform float power; // { "value": 4, "min":0, "max":20, "step":0.001 }
varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;
void main() {
  float r = glowColor.r / 255.;
  float g = glowColor.g / 255.;
  float b = glowColor.b / 255.;
  vec3 col = vec3(r, g, b);
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  float intensity = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);
  gl_FragColor = vec4(col, intensity > 1.0 ? 1.0 : intensity);
}