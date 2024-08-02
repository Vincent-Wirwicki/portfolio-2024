export const vertex = /* glsl */ `       




float random(in vec3 pos) {
    return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }


// float gnoise(vec3 p) {
//     vec3 i = floor(p);
//     vec3 f = fract(p);
//     vec3 u = quintic(f);
//     return -1.0 + 2.0 * mix( mix( mix( random(i + vec3(0.0,0.0,0.0)), 
//                                         random(i + vec3(1.0,0.0,0.0)), u.x),
//                                 mix( random(i + vec3(0.0,1.0,0.0)), 
//                                         random(i + vec3(1.0,1.0,0.0)), u.x), u.y),
//                             mix( mix( random(i + vec3(0.0,0.0,1.0)), 
//                                         random(i + vec3(1.0,0.0,1.0)), u.x),
//                                 mix( random(i + vec3(0.0,1.0,1.0)), 
//                                         random(i + vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
// }
float random(in vec2 st) {

    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);

}
vec2  cubic(const in vec2 v)  { return v*v*(3.0-2.0*v); }

float gnoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = cubic(f);
    return mix( a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
}
    uniform float uTime;
    uniform float uFrame;
    varying vec2 vUv;
    varying vec3 vPos;
    varying float vNoise; 
    varying vec3 vNormal;    
    #define PI 3.141592653589793

    float smoothMod(float axis, float amp, float rad) {
        float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
        float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
        float at = atan(top / bottom);
        return amp * (1.0 / 2.0) - (1.0 / PI) * at;
    }

    void main() {
        vUv = uv;
        vec3 p = position;
        float mX = smoothMod(p.x*2. + uTime *2.,1.75,1.8)* .5;
        float mY = smoothMod(p.y*2. + uTime *2.,1.75,1.8)* .5;
        float noise = gnoise(position.xy * .5 + sin(mY * 2. * PI) * cos(mX * 2. * PI)  );
        
        vNoise = noise ;
        vPos = position;
        vNormal= normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position + noise * normal *0.25  , 1.0);
    }
`;

/*
    from : https://github.com/patriciogonzalezvivo/lygia/blob/main/generative/snoise.glsl
    contributors: [Stefan Gustavson, Ian McEwan]
    description: Simplex Noise https://github.com/stegu/webgl-noise
    use: snoise(<vec2|vec3|vec4> pos)
    license: |
        Copyright 2021-2023 by Stefan Gustavson and Ian McEwan.
        Published under the terms of the MIT license:
        https://opensource.org/license/mit/
    examples:
        - /shaders/generative_snoise.frag
    */
//   vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
//   vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
//   vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

//   vec4 permute(const in vec4 v) { return mod289(((v * 34.0) + 1.0) * v); }

//   float snoise(vec3 v){
//     const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//     const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

//   // First corner
//     vec3 i  = floor(v + dot(v, C.yyy) );
//     vec3 x0 =   v - i + dot(i, C.xxx) ;

//   // Other corners
//     vec3 g = step(x0.yzx, x0.xyz);
//     vec3 l = 1.0 - g;
//     vec3 i1 = min( g.xyz, l.zxy );
//     vec3 i2 = max( g.xyz, l.zxy );

//     //   x0 = x0 - 0.0 + 0.0 * C.xxx;
//     //   x1 = x0 - i1  + 1.0 * C.xxx;
//     //   x2 = x0 - i2  + 2.0 * C.xxx;
//     //   x3 = x0 - 1.0 + 3.0 * C.xxx;
//     vec3 x1 = x0 - i1 + C.xxx;
//     vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//     vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

//     // Permutations
//     i = mod289(i);
//     vec4 p = permute( permute( permute(
//                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

//     // Gradients: 7x7 points over a square, mapped onto an octahedron.
//     // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//     float n_ = 0.142857142857; // 1.0/7.0
//     vec3  ns = n_ * D.wyz - D.xzx;

//     vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

//     vec4 x_ = floor(j * ns.z);
//     vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//     vec4 x = x_ *ns.x + ns.yyyy;
//     vec4 y = y_ *ns.x + ns.yyyy;
//     vec4 h = 1.0 - abs(x) - abs(y);

//     vec4 b0 = vec4( x.xy, y.xy );
//     vec4 b1 = vec4( x.zw, y.zw );

//     //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
//     //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
//     vec4 s0 = floor(b0)*2.0 + 1.0;
//     vec4 s1 = floor(b1)*2.0 + 1.0;
//     vec4 sh = -step(h, vec4(0.0));

//     vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//     vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//     vec3 p0 = vec3(a0.xy,h.x);
//     vec3 p1 = vec3(a0.zw,h.y);
//     vec3 p2 = vec3(a1.xy,h.z);
//     vec3 p3 = vec3(a1.zw,h.w);

//     //Normalise gradients
//     vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//     p0 *= norm.x;
//     p1 *= norm.y;
//     p2 *= norm.z;
//     p3 *= norm.w;

//     // Mix final noise value
//     vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//     m = m * m;
//     return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
//                                   dot(p2,x2), dot(p3,x3) ) );
//     }

// vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

// float snoise(vec2 v){
//   const vec4 C = vec4(0.211324865405187, 0.366025403784439,
//            -0.577350269189626, 0.024390243902439);
//   vec2 i  = floor(v + dot(v, C.yy) );
//   vec2 x0 = v -   i + dot(i, C.xx);
//   vec2 i1;
//   i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//   vec4 x12 = x0.xyxy + C.xxzz;
//   x12.xy -= i1;
//   i = mod(i, 289.0);
//   vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
//   + i.x + vec3(0.0, i1.x, 1.0 ));
//   vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
//     dot(x12.zw,x12.zw)), 0.0);
//   m = m*m ;
//   m = m*m ;
//   vec3 x = 2.0 * fract(p * C.www) - 1.0;
//   vec3 h = abs(x) - 0.5;
//   vec3 ox = floor(x + 0.5);
//   vec3 a0 = x - ox;
//   m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
//   vec3 g;
//   g.x  = a0.x  * x0.x  + h.x  * x0.y;
//   g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//   return 130.0 * dot(m, g);
// }
//   vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
//   vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
//   vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

//   vec4 permute(const in vec4 v) { return mod289(((v * 34.0) + 1.0) * v); }

//   float snoise(vec3 v){
//     const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//     const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

//   // First corner
//     vec3 i  = floor(v + dot(v, C.yyy) );
//     vec3 x0 =   v - i + dot(i, C.xxx) ;

//   // Other corners
//     vec3 g = step(x0.yzx, x0.xyz);
//     vec3 l = 1.0 - g;
//     vec3 i1 = min( g.xyz, l.zxy );
//     vec3 i2 = max( g.xyz, l.zxy );

//     //   x0 = x0 - 0.0 + 0.0 * C.xxx;
//     //   x1 = x0 - i1  + 1.0 * C.xxx;
//     //   x2 = x0 - i2  + 2.0 * C.xxx;
//     //   x3 = x0 - 1.0 + 3.0 * C.xxx;
//     vec3 x1 = x0 - i1 + C.xxx;
//     vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//     vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

//     // Permutations
//     i = mod289(i);
//     vec4 p = permute( permute( permute(
//                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

//     // Gradients: 7x7 points over a square, mapped onto an octahedron.
//     // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//     float n_ = 0.142857142857; // 1.0/7.0
//     vec3  ns = n_ * D.wyz - D.xzx;

//     vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

//     vec4 x_ = floor(j * ns.z);
//     vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//     vec4 x = x_ *ns.x + ns.yyyy;
//     vec4 y = y_ *ns.x + ns.yyyy;
//     vec4 h = 1.0 - abs(x) - abs(y);

//     vec4 b0 = vec4( x.xy, y.xy );
//     vec4 b1 = vec4( x.zw, y.zw );

//     //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
//     //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
//     vec4 s0 = floor(b0)*2.0 + 1.0;
//     vec4 s1 = floor(b1)*2.0 + 1.0;
//     vec4 sh = -step(h, vec4(0.0));

//     vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//     vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//     vec3 p0 = vec3(a0.xy,h.x);
//     vec3 p1 = vec3(a0.zw,h.y);
//     vec3 p2 = vec3(a1.xy,h.z);
//     vec3 p3 = vec3(a1.zw,h.w);

//     //Normalise gradients
//     vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//     p0 *= norm.x;
//     p1 *= norm.y;
//     p2 *= norm.z;
//     p3 *= norm.w;

//     // Mix final noise value
//     vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//     m = m * m;
//     return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
//                                   dot(p2,x2), dot(p3,x3) ) );
//     }
