
uniform float time;

varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 vNormal;

uniform float uFresnelPower; // {"min":0,"max":5,"value":2.5,"step":0.0001}
uniform float uFresnelInfluence; // {"min":0,"max":5,"value":4,"step":0.0001}
uniform float uTint; // {"min":0,"max":2,"value":0.25,"step":0.0001}
uniform float uBase; // {"min":0,"max":10,"value":6,"step":0.0001}
uniform float uBrightnessOffset; // {"min":0,"max":2,"value":0.6,"step":0.0001}
uniform float uBrightness; // {"min":0,"max":2,"value":0.8,"step":0.0001}
uniform samplerCube tCube;

float PI = 3.141592653589793238;

vec3 brightnessToColor(float b) {
	b *= uTint;
	return (vec3(b, b * b, b * b * b * b) / (uTint)) * uBrightness;
}

// vec3 brightnessTocolor(float b) {
// 	b *= 0.25;
// 	return (vec3(b, b * b, b * b * b * b) / 0.25) * 0.6;
// }

float supersun() {
	float sum = 0.0;
	sum += textureCube(tCube, vLayer0).r;
	sum += textureCube(tCube, vLayer1).r;
	sum += textureCube(tCube, vLayer2).r;
	sum *= 0.33;
	return sum;
}

void main()	{
	// vec3 rd = normalize(vWorld - uCamPos);
	// // vec3 ro = uCamPos;
	// vec3 n = normalize(vNormal);
	float nDotV = dot(vNormal, vec3(0.0, 0.0, 1.0));

	float brightness = supersun();
	// float fresnel = pow(1. - nDotV, uFresnelPower) * uFresnelInfluence;

	float fresnel = pow(1.0 - nDotV, uFresnelPower) * uFresnelInfluence;
	// float fresnel = Fresnel(eyeVector, vNormal);
	brightness = brightness * uBase + uBrightnessOffset;
	brightness += fresnel;

	vec3 color = brightnessToColor(brightness);
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	// gl_FragColor = textureCube(tCube, vPosition);
	gl_FragColor = vec4(color, 1.0);
}