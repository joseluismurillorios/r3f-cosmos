uniform vec3 p_color;

varying vec3 vertexNormal;

void main() {
  float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  gl_FragColor = vec4(p_color, 1.0) * intensity;
}