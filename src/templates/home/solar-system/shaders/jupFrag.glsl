uniform float time;
// uniform vec3 color;
varying vec2 vUv;

float makeCheker(vec2 p)
{
    vec2 checker = p*10.;
    vec2 cells = floor(checker);
    float chekerColor = 0.;
    if(mod(cells.x+cells.y, 2.)== 0.)
    {
        chekerColor = 1.;
    }
    else
    {
     	chekerColor = 0.;   
    }
    return chekerColor;
}

void main() {
	// vec3 color = vec3(1., 0., 0.);
	// gl_FragColor = vec4(0.5 + 0.2 * sin(vUv.y + time) + color, 1.0);
    
	vec3 sphereColor = vec3(0, 0, 0);
	sphereColor = vec3(makeCheker(vUv));
	gl_FragColor = vec4(sphereColor, 1);
}