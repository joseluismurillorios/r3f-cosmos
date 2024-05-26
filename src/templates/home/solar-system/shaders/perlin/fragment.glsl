uniform float time;
uniform float progress;
uniform samplerCube tCube;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

#include './noisePartial.glsl';

float fbm(vec4 p) {
	float sum = 0.0;
	float amp = 1.0;
	float scale = 1.0;
	for(int i = 0; i < 6; i++) {
		sum += snoise(p * scale) * amp;
		p.w += 100.;
		amp *= 0.99;
		scale *= 2.8;
	}
	return sum;
}

void main()	{
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	// gl_FragColor = vec4(vUv,0.0,1.);
	// gl_FragColor = vec4(vPosition, 1.);

	vec4 p = vec4(vPosition * 4.0, time * 0.02);
	float noisy = fbm(p);
	vec4 p1 = vec4(vPosition * 3.0, time * 0.05);
	float spots = max(snoise(p1), 0.0);
	gl_FragColor = vec4(noisy);
	gl_FragColor *= mix(1.0, spots, 0.5);
}