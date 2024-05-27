uniform float time;
// uniform vec3 color;
varying vec2 vUv;

float iteration = 10.;
float timeScale = 1.;
vec2 zoom = vec2(25.,5.5);
vec2 offset = vec2(0.,2.);
float PI = 3.141592653589793238;

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

vec3 makeJupiter(vec2 uv)
{
	float time = time;
    vec2 point = uv * zoom + offset;
    float p_x = float(point.x); 
    float p_y = float(point.y);
    
    float a_x = .2;
    float a_y = .3;
    
    for(int i=1; i<int(iteration); i++){
        float float_i = float(i); 
        point.x+=a_x*sin(float_i*point.y+time*timeScale);
        point.y+=a_y*cos(float_i*point.x);
    }
    
    float r = sin(point.y)*.5+.4;
    float g = cos(point.y)*.5+.7;
    float b = cos(point.y)*.5+.8;
    
    r+=.3;
    
    r = cos(point.x+point.y+1.3)*.5+.5;
    g = sin(point.x+point.y+2.)*.5+.5;
    b = (sin(point.x+point.y+1.)+cos(point.x+point.y+1.))*.25+.5;
      
     
    r = pow(r,.8);
    g = pow(g,.8);
    b = pow(b,1.);
    
    vec3 col = vec3(r,g,b);
    col += vec3(.1);
    
    return col;
}

vec2 rotate(vec2 v, float a)
{
    float s = sin(a);
    float c = cos(a);
    mat2 m  = mat2(c, -s, s, c);

    return m * v;
}

void main() {
	// vec3 color = vec3(1., 0., 0.);
	// gl_FragColor = vec4(0.5 + 0.2 * sin(vUv.y + time) + color, 1.0);
  
	vec2 uv = rotate(vUv, 0.);
	vec3 sphereColor = vec3(0, 0, 0);
	// sphereColor = vec3(makeCheker(vUv));
	sphereColor = vec3(makeJupiter(uv));
	gl_FragColor = vec4(sphereColor, 1);
}