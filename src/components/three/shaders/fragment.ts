export const fragment = /* glsl */ `  
uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vPos;
    varying float vNoise;  
    varying vec3 vNormal;    
 

    void main() {
    // partial derivatives
    vec3 p_dX = dFdx( vPos );
    vec3 p_dY = dFdy( vPos );
    vec3 faceNormal = normalize( cross( p_dX, p_dY ) );
    vec3 light = normalize(vec3(0.5, .5, 0.1));
    vec3 nPos = normalize(vPos);
    float diffuse = max(dot(nPos, light), 0.);
    vec3 render = uColor;
    render += ( vNoise ) * faceNormal * .5;
    // render *= diffuse;
    // vec3 color = mix(uColor,vec3(1.), vNoise * faceNormal)
    gl_FragColor = vec4(render ,1.);

    }
`;
