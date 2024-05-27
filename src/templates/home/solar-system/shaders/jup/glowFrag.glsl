varying vec3 vertexNormal;

uniform float uTint; // {"min":0,"max":2,"value":0.9,"step":0.0001}
uniform float uBrightness; // {"min":0,"max":2,"value":0.1,"step":0.0001}

// float PI = 3.141592653589793238;

vec3 brightnessToColor(float b) {
	b *= uTint;
	return (vec3(b, b * b, b * b * b * b) / uTint) * uBrightness;
}

// vec3 brightnessToColor(float b) {
// 	b *= 0.25;
// 	return (vec3(b, b * b, b * b * b * b) / 0.25) * 0.6;
// }

// // float Fresnel(vec3 ev, vec3 wn) {
// // 	return pow(1.0 + dot(ev, wn), 3.0);
// // }

void main() {
	float radial = 1.0 - vertexNormal.z;
	radial *= radial;
	float brightness = 1.0 + radial * 0.4;
	vec3 p_color = brightnessToColor(brightness) * radial;
  float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  gl_FragColor = vec4(p_color, intensity) * intensity;
	// vec3 p_color = vec3(1.0, 1.0, 0.0);
  // float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  // gl_FragColor = vec4(radial);
}