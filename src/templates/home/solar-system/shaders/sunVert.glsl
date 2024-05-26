
uniform float time;

varying vec3 vNormal;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

float PI = 3.141592653589793238;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2( c, -s, s, c);
}

void setLayers(vec3 p) {
  float t = time * 0.015;
	mat2 m = rotate(-t);

	vec3 p1 = p;
	p1.yz = m * p1.yz;
	vLayer0 = p1;

	p1 = p;
	m = rotate(t + 2.094);
	p1.zx = m * p1.zx;
	vLayer1 = p1;

	p1 = p;
	m = rotate(t + 4.188);
	p1.xy = m * p1.xy;
	vLayer2 = p1;
}

void main() {
  vNormal = normalize(normalMatrix * normal);

	setLayers(position);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}