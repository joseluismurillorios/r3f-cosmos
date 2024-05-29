varying vec2 vUv;
// varying vec3 vVertexWorldPosition;
// varying vec3 vVertexNormal;

void main() {
  vUv = uv;
  // vVertexNormal = normalize(normalMatrix * normal);
  // vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}