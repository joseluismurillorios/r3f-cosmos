// reference from https://youtu.be/vM8M4QloVL0?si=CKD5ELVrRm3GjDnN
varying vec3 vNormal;
varying vec3 eyeVector;
uniform vec3 col; // {"value":{"r":0,"g":255,"b":217}}
uniform float atmOpacity; // {"value":0.4,"min":0,"max":2,"step":0.001}
uniform float atmPowFactor; // { "value": 3.5,"min":0,"max":10,"step":0.001 }
uniform float atmMultiplier; // { "value": 7.0,"min":0,"max":20,"step":0.001 }

void main() {
    // Starting from the rim to the center at the back, dotP would increase from 0 to 1
    float dotP = dot( vNormal, eyeVector );
		float r = col.r / 255.;
		float g = col.g / 255.;
		float b = col.b / 255.;
    // This factor is to create the effect of a realistic thickening of the atmosphere coloring
    float factor = pow(dotP, atmPowFactor) * atmMultiplier;
    // Adding in a bit of dotP to the color to make it whiter while the color intensifies
    vec3 atmColor = vec3(r + dotP/4.5, g + dotP/4.5, b + dotP/4.5);
		float opacity = (atmColor.r * atmColor.g * atmColor.b);
    // use atmOpacity to control the overall intensity of the atmospheric color
    gl_FragColor = vec4(atmColor, atmOpacity * opacity) * factor;
}