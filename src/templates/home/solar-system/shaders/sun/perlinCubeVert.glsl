attribute vec3 aPos;
attribute vec2 aUV0;

varying vec3 vWorld;

uniform mat4 uViewProjection;

void main(void) {
	vec4 world = vec4(aPos, 1.);

	vWorld = world.xyz;

	gl_Position = uViewProjection * world;
}