export const fragmentWire = /* glsl */ `  
uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vPos;
    varying float vNoise;  
    varying vec3 vNormal;    
    #define PI 3.141592653589793

    void main() {
     // partial derivatives
    vec3 p_dX = dFdx( vPos );
    vec3 p_dY = dFdy( vPos );
    vec3 faceNormal = normalize( cross( p_dX, p_dY ) );

    gl_FragColor = vec4( vec3(0.), vNoise);
        // gl_FragColor = vec4(uColor + ((1.- vNoise )* faceNormal * .1) ,1.0);

    }
`;


    // float dist = length(vPos - vec3(0.5));
    // float angle = atan(vPos.x, vPos.y);
    // float alpha = sin(vNoise ) * dist;
    // float alpha =  clamp(dist , 0.,1.);
    // if(alpha > 0.75) discard
        // vec3 n = vec3((vNormal * 2.) -1.)
        // vec3 color = vec3(.5) + 0.1 * n * vNoise;