attribute vec3 aPos;
attribute vec2 aUV0;

varying vec3 vWorld;
varying vec3 vNormal;

varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

uniform mat4 uModel;
uniform mat4 uViewProjection;
uniform float uTime;

mat2 getMatrix(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, -s, s, c);
}

void setLayers(vec3 p) {
	float t = uTime * 0.015;
	mat2 m = getMatrix(t);
	float sum = 0.;

	vec3 p1 = p;
	p1.yz = m * p1.yz;
	vLayer0 = p1;

	p1 = p;
	m = getMatrix(t + 2.094);
	p1.zx = m * p1.zx;
	vLayer1 = p1;

	p1 = p;
	m = getMatrix(t + 4.188);
	p1.xy = m * p1.xy;
	vLayer2 = p1;
}

void main(void) {
	vec4 world = uModel * vec4(aPos, 1.);

	vWorld = world.xyz;
	vNormal = mat3(uModel) * aPos;
	setLayers(aPos);

	gl_Position = uViewProjection * world;
}