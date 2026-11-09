import{$n as e,An as t,Bn as n,Bt as r,C as i,Cn as a,Ct as o,D as s,Dt as c,E as l,Et as u,Ft as d,H as f,Hn as p,I as m,In as h,Jn as g,Kn as _,L as v,M as y,Mt as b,N as x,O as S,On as C,Ot as w,P as T,Qn as E,R as D,Rn as O,S as ee,Sn as te,T as ne,Tt as k,Un as re,Vn as ie,Wn as ae,X as oe,Xn as A,Y as se,Yn as ce,Z as le,Zn as ue,_ as de,_n as fe,_t as pe,ar as j,b as me,bn as he,bt as ge,c as _e,cr as ve,d as ye,dr as be,dt as M,er as xe,et as Se,f as Ce,fr as we,ft as Te,g as Ee,gn as De,gt as Oe,h as ke,hr as Ae,ht as je,ir as Me,it as Ne,j as Pe,jn as Fe,k as Ie,kn as Le,lr as Re,lt as N,m as ze,mr as Be,mt as Ve,nr as He,nt as P,o as Ue,or as We,p as Ge,pr as Ke,pt as qe,r as Je,rr as Ye,rt as F,s as Xe,sr as I,tt as Ze,u as Qe,ur as $e,ut as et,v as tt,vn as nt,vt as rt,w as it,wt as at,x as ot,xn as st,xt as ct,y as lt,yt as ut,z as dt,zt as ft}from"./three.core-CjvmJJh3.js";var pt=Object.defineProperty,mt=(e,t)=>{let n={};for(var r in e)pt(n,r,{get:e[r],enumerable:!0});return t||pt(n,Symbol.toStringTag,{value:`Module`}),n};function ht(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function gt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var L={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},R={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new N},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new N}},envmap:{envMap:{value:null},envMapRotation:{value:new N},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new N}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new N}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new N},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new N},normalScale:{value:new E(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new N},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new N}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new N}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new N}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new e},probesMax:{value:new e},probesResolution:{value:new e}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0},uvTransform:{value:new N}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new E(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new N},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0}}},_t={basic:{uniforms:we([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.fog]),vertexShader:L.meshbasic_vert,fragmentShader:L.meshbasic_frag},lambert:{uniforms:we([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.fog,R.lights,{emissive:{value:new Ge(0)},envMapIntensity:{value:1}}]),vertexShader:L.meshlambert_vert,fragmentShader:L.meshlambert_frag},phong:{uniforms:we([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.fog,R.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:L.meshphong_vert,fragmentShader:L.meshphong_frag},standard:{uniforms:we([R.common,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.roughnessmap,R.metalnessmap,R.fog,R.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:L.meshphysical_vert,fragmentShader:L.meshphysical_frag},toon:{uniforms:we([R.common,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.gradientmap,R.fog,R.lights,{emissive:{value:new Ge(0)}}]),vertexShader:L.meshtoon_vert,fragmentShader:L.meshtoon_frag},matcap:{uniforms:we([R.common,R.bumpmap,R.normalmap,R.displacementmap,R.fog,{matcap:{value:null}}]),vertexShader:L.meshmatcap_vert,fragmentShader:L.meshmatcap_frag},points:{uniforms:we([R.points,R.fog]),vertexShader:L.points_vert,fragmentShader:L.points_frag},dashed:{uniforms:we([R.common,R.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:L.linedashed_vert,fragmentShader:L.linedashed_frag},depth:{uniforms:we([R.common,R.displacementmap]),vertexShader:L.depth_vert,fragmentShader:L.depth_frag},normal:{uniforms:we([R.common,R.bumpmap,R.normalmap,R.displacementmap,{opacity:{value:1}}]),vertexShader:L.meshnormal_vert,fragmentShader:L.meshnormal_frag},sprite:{uniforms:we([R.sprite,R.fog]),vertexShader:L.sprite_vert,fragmentShader:L.sprite_frag},background:{uniforms:{uvTransform:{value:new N},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:L.background_vert,fragmentShader:L.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new N}},vertexShader:L.backgroundCube_vert,fragmentShader:L.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:L.cube_vert,fragmentShader:L.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:L.equirect_vert,fragmentShader:L.equirect_frag},distance:{uniforms:we([R.common,R.displacementmap,{referencePosition:{value:new e},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:L.distance_vert,fragmentShader:L.distance_frag},shadow:{uniforms:we([R.lights,R.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:L.shadow_vert,fragmentShader:L.shadow_frag}};_t.physical={uniforms:we([_t.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new N},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new N},clearcoatNormalScale:{value:new E(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new N},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new N},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new N},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new N},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new N},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new N},transmissionSamplerSize:{value:new E},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new N},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new N},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new N},anisotropyVector:{value:new E},anisotropyMap:{value:null},anisotropyMapTransform:{value:new N}}]),vertexShader:L.meshphysical_vert,fragmentShader:L.meshphysical_frag};var vt={r:0,b:0,g:0},yt=new et,bt=new N;bt.set(-1,0,0,0,1,0,0,0,1);function xt(e,t,n,r,i,a){let o=new Ge(0),s=i===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(o,s):i&&i.isColor&&(_(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&(i.isCubeTexture||i.mapping===306)?(u===void 0&&(u=new M(new Ue(1,1,1),new Fe({name:`BackgroundCubeMaterial`,uniforms:j(_t.backgroundCube.uniforms),vertexShader:_t.backgroundCube.vertexShader,fragmentShader:_t.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(bt),u.material.toneMapped=ze.getTransfer(i.colorSpace)!==Le,(d!==i||f!==i.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new M(new c(2,2),new Fe({name:`BackgroundMaterial`,uniforms:j(_t.background.uniforms),vertexShader:_t.background.vertexShader,fragmentShader:_t.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=ze.getTransfer(i.colorSpace)!==Le,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(vt,$e(e)),n.buffers.color.setClear(vt.r,vt.g,vt.b,r,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,_(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,_(o,s)},render:h,addToRenderList:g,dispose:v}}function St(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ct(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function wt(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(Be(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&Be(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Tt(e){let t=this,n=null,r=0,i=!1,a=!1,o=new u,s=new N,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=d(e,t,0)},this.setState=function(t,o,s){let u=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||u===null||u.length===0||a&&!p)a?d(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=d(u,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function d(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Et=4,Dt=6,Ot=20,kt=256,At=new at,jt=new Ge,Mt=null,Nt=0,Pt=0,Ft=!1,It=new e,Lt=new e,Rt=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=It}=i;Mt=this._renderer.getRenderTarget(),Nt=this._renderer.getActiveCubeFace(),Pt=this._renderer.getActiveMipmapLevel(),Ft=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gt(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wt(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Mt,Nt,Pt),this._renderer.xr.enabled=Ft,e.scissorTest=!1,Vt(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mt=this._renderer.getRenderTarget(),Nt=this._renderer.getActiveCubeFace(),Pt=this._renderer.getActiveMipmapLevel(),Ft=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Se,minFilter:Se,generateMipmaps:!1,type:v,format:ft,colorSpace:F,depthBuffer:!1},r=Bt(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bt(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=zt(r)),this._blurMaterial=Ut(r,e,t),this._ggxMaterial=Ht(r,e,t)}return r}_compileMaterial(e){let t=new M(new _e,e);this._renderer.compile(t,At)}_sceneToCubeUV(e,t,n,r,i){let a=new k(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(jt),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new M(new Ue,new Te({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(jt),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Vt(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gt()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wt());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Vt(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,At)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Et?n-d+Et:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Vt(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,At),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Vt(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,At)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Vt(t,3*l*(r>this._lodMax-Et?r-this._lodMax+Et:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,At)}};function zt(e){let t=[],n=[],r=e,i=e-Et+1+Dt;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Lt.set(1,r,n):e===1?Lt.set(-n,1,-r):e===2?Lt.set(-n,r,1):e===3?Lt.set(-1,r,-n):e===4?Lt.set(-n,-1,r):Lt.set(n,r,-1),Lt.toArray(l,(e*6+t)*3)}}let u=new _e;u.setAttribute(`position`,new Xe(c,3)),u.setAttribute(`outputDirection`,new Xe(l,3)),n.push(new M(u,null)),r>Et&&r--}return{lodMeshes:n,sizeLods:t}}function Bt(e,t,n){let r=new Ye(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Vt(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ht(e,t,n){return new Fe({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:kt,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Kt(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ut(e,t,n){return new Fe({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ot,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Kt(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wt(){return new Fe({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Kt(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Gt(){return new Fe({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kt(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Kt(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var qt=class extends Ye{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new tt(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ue(5,5,5),i=new Fe({name:`CubemapFromEquirect`,uniforms:j(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new M(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Se),new Ee(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Jt(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new qt(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Rt(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Rt(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Yt(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ae(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Xt(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?p:ie)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Zt(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Qt(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:ve(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function $t(e,t,n){let r=new WeakMap,i=new xe;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new ot(h,p,m,u);g.type=y,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new E(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function en(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var tn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function nn(e,t,n,r,i,a){let o=new Ye(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new _e;l.setAttribute(`position`,new Pe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Pe([0,2,0,0,2,0],2));let u=new nt({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new M(l,u),f=new at(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Ye(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}),c=new Ye(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},ze.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=tn[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var rn=new O,an=new ne(1,1),on=new ot,sn=new me,cn=new tt,ln=[],un=[],dn=new Float32Array(16),fn=new Float32Array(9),pn=new Float32Array(4);function mn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ln[i];if(a===void 0&&(a=new Float32Array(i),ln[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function hn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function gn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function _n(e,t){let n=un[t];n===void 0&&(n=new Int32Array(t),un[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function vn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function yn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hn(n,t))return;e.uniform2fv(this.addr,t),gn(n,t)}}function bn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(hn(n,t))return;e.uniform3fv(this.addr,t),gn(n,t)}}function xn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hn(n,t))return;e.uniform4fv(this.addr,t),gn(n,t)}}function Sn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),gn(n,t)}else{if(hn(n,r))return;pn.set(r),e.uniformMatrix2fv(this.addr,!1,pn),gn(n,r)}}function Cn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),gn(n,t)}else{if(hn(n,r))return;fn.set(r),e.uniformMatrix3fv(this.addr,!1,fn),gn(n,r)}}function wn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),gn(n,t)}else{if(hn(n,r))return;dn.set(r),e.uniformMatrix4fv(this.addr,!1,dn),gn(n,r)}}function Tn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function En(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hn(n,t))return;e.uniform2iv(this.addr,t),gn(n,t)}}function Dn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hn(n,t))return;e.uniform3iv(this.addr,t),gn(n,t)}}function On(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hn(n,t))return;e.uniform4iv(this.addr,t),gn(n,t)}}function kn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function An(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hn(n,t))return;e.uniform2uiv(this.addr,t),gn(n,t)}}function jn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hn(n,t))return;e.uniform3uiv(this.addr,t),gn(n,t)}}function Mn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hn(n,t))return;e.uniform4uiv(this.addr,t),gn(n,t)}}function Nn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(an.compareFunction=n.isReversedDepthBuffer()?518:515,a=an):a=rn,n.setTexture2D(t||a,i)}function Pn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||sn,i)}function Fn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||cn,i)}function In(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||on,i)}function Ln(e){switch(e){case 5126:return vn;case 35664:return yn;case 35665:return bn;case 35666:return xn;case 35674:return Sn;case 35675:return Cn;case 35676:return wn;case 5124:case 35670:return Tn;case 35667:case 35671:return En;case 35668:case 35672:return Dn;case 35669:case 35673:return On;case 5125:return kn;case 36294:return An;case 36295:return jn;case 36296:return Mn;case 35678:case 36198:case 36298:case 36306:case 35682:return Nn;case 35679:case 36299:case 36307:return Pn;case 35680:case 36300:case 36308:case 36293:return Fn;case 36289:case 36303:case 36311:case 36292:return In}}function Rn(e,t){e.uniform1fv(this.addr,t)}function zn(e,t){let n=mn(t,this.size,2);e.uniform2fv(this.addr,n)}function Bn(e,t){let n=mn(t,this.size,3);e.uniform3fv(this.addr,n)}function Vn(e,t){let n=mn(t,this.size,4);e.uniform4fv(this.addr,n)}function Hn(e,t){let n=mn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Un(e,t){let n=mn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Wn(e,t){let n=mn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Gn(e,t){e.uniform1iv(this.addr,t)}function Kn(e,t){e.uniform2iv(this.addr,t)}function qn(e,t){e.uniform3iv(this.addr,t)}function Jn(e,t){e.uniform4iv(this.addr,t)}function Yn(e,t){e.uniform1uiv(this.addr,t)}function Xn(e,t){e.uniform2uiv(this.addr,t)}function Zn(e,t){e.uniform3uiv(this.addr,t)}function Qn(e,t){e.uniform4uiv(this.addr,t)}function $n(e,t,n){let r=this.cache,i=t.length,a=_n(n,i);hn(r,a)||(e.uniform1iv(this.addr,a),gn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?an:rn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function er(e,t,n){let r=this.cache,i=t.length,a=_n(n,i);hn(r,a)||(e.uniform1iv(this.addr,a),gn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||sn,a[e])}function tr(e,t,n){let r=this.cache,i=t.length,a=_n(n,i);hn(r,a)||(e.uniform1iv(this.addr,a),gn(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||cn,a[e])}function nr(e,t,n){let r=this.cache,i=t.length,a=_n(n,i);hn(r,a)||(e.uniform1iv(this.addr,a),gn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||on,a[e])}function rr(e){switch(e){case 5126:return Rn;case 35664:return zn;case 35665:return Bn;case 35666:return Vn;case 35674:return Hn;case 35675:return Un;case 35676:return Wn;case 5124:case 35670:return Gn;case 35667:case 35671:return Kn;case 35668:case 35672:return qn;case 35669:case 35673:return Jn;case 5125:return Yn;case 36294:return Xn;case 36295:return Zn;case 36296:return Qn;case 35678:case 36198:case 36298:case 36306:case 35682:return $n;case 35679:case 36299:case 36307:return er;case 35680:case 36300:case 36308:case 36293:return tr;case 36289:case 36303:case 36311:case 36292:return nr}}var ir=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ln(t.type)}},ar=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rr(t.type)}},or=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},sr=/(\w+)(\])?(\[|\.)?/g;function cr(e,t){e.seq.push(t),e.map[t.id]=t}function lr(e,t,n){let r=e.name,i=r.length;for(sr.lastIndex=0;;){let a=sr.exec(r),o=sr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){cr(n,l===void 0?new ir(s,e,t):new ar(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new or(s),cr(n,e)),n=e}}}var ur=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);lr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function dr(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var fr=37297,pr=0;function mr(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var hr=new N;function gr(e){ze._getMatrix(hr,ze.workingColorSpace,e);let t=`mat3( ${hr.elements.map(e=>e.toFixed(4))} )`;switch(ze.getTransfer(e)){case Ne:return[t,`LinearTransferOETF`];case Le:return[t,`sRGBTransferOETF`];default:return Be(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function _r(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+mr(e.getShaderSource(t),r)}return i}function vr(e,t){let n=gr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var yr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function br(e,t){let n=yr[t];return n===void 0?(Be(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var xr=new e;function Sr(){return ze.getLuminanceCoefficients(xr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${xr.x.toFixed(4)}, ${xr.y.toFixed(4)}, ${xr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Cr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Er).join(`
`)}function wr(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Tr(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Er(e){return e!==``}function Dr(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Or(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kr=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ar(e){return e.replace(kr,Mr)}var jr=new Map;function Mr(e,t){let n=L[t];if(n===void 0){let e=jr.get(t);if(e!==void 0)n=L[e],Be(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ar(n)}var Nr=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pr(e){return e.replace(Nr,Fr)}function Fr(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Ir(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Lr={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Rr(e){return Lr[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var zr={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Br(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:zr[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Vr={302:`ENVMAP_MODE_REFRACTION`};function Hr(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Vr[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ur={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Wr(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ur[e.combine]||`ENVMAP_BLENDING_NONE`}function Gr(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Kr(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Rr(n),l=Br(n),u=Hr(n),d=Wr(n),f=Gr(n),p=Cr(n),m=wr(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Er).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Er).join(`
`),_.length>0&&(_+=`
`)):(g=[Ir(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Er).join(`
`),_=[Ir(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:L.tonemapping_pars_fragment,n.toneMapping===0?``:br(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,L.colorspace_pars_fragment,vr(`linearToOutputTexel`,n.outputColorSpace),Sr(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Er).join(`
`)),o=Ar(o),o=Dr(o,n),o=Or(o,n),s=Ar(s),s=Dr(s,n),s=Or(s,n),o=Pr(o),s=Pr(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=dr(i,i.VERTEX_SHADER,y),S=dr(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=_r(i,x,`vertex`),n=_r(i,S,`fragment`);ve(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):Be(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new ur(i,h),T=Tr(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,fr)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pr++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var qr=0,Jr=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Yr(e),t.set(e,n)),n}},Yr=class{constructor(e){this.id=qr++,this.code=e,this.usedTimes=0}};function Xr(e){return e===1030||e===37490||e===36285}function Zr(e,t,n,r,i,a){let o=new se,s=new Jr,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&Be(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,te;if(C){let e=_t[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,te=t.id}let ne=e.getRenderTarget(),k=e.state.buffers.depth.getReversed(),re=h.isInstancedMesh===!0,ie=h.isBatchedMesh===!0,ae=!!i.map,oe=!!i.matcap,A=!!x,se=!!i.aoMap,ce=!!i.lightMap,le=!!i.bumpMap&&i.wireframe===!1,ue=!!i.normalMap,de=!!i.displacementMap,fe=!!i.emissiveMap,pe=!!i.metalnessMap,j=!!i.roughnessMap,me=i.anisotropy>0,he=i.clearcoat>0,ge=i.dispersion>0,_e=i.retroreflectivity>0,ve=i.iridescence>0,ye=i.sheen>0,be=i.transmission>0,M=me&&!!i.anisotropyMap,xe=he&&!!i.clearcoatMap,Se=he&&!!i.clearcoatNormalMap,Ce=he&&!!i.clearcoatRoughnessMap,we=ve&&!!i.iridescenceMap,Te=ve&&!!i.iridescenceThicknessMap,Ee=ye&&!!i.sheenColorMap,De=ye&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,ke=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=be&&!!i.transmissionMap,Me=be&&!!i.thicknessMap,Ne=!!i.gradientMap,Pe=!!i.alphaMap,Fe=i.alphaTest>0,Ie=!!i.alphaHash,Le=!!i.extensions,Re=0;i.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Re=e.toneMapping);let N={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:te,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ie,batchingColor:ie&&h._colorsTexture!==null,instancing:re,instancingColor:re&&h.instanceColor!==null,instancingMorph:re&&h.morphTexture!==null,outputColorSpace:ne===null?e.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ae,matcap:oe,envMap:A,envMapMode:A&&x.mapping,envMapCubeUVHeight:S,aoMap:se,lightMap:ce,bumpMap:le,normalMap:ue,displacementMap:de,emissiveMap:fe,normalMapObjectSpace:ue&&i.normalMapType===1,normalMapTangentSpace:ue&&i.normalMapType===0,packedNormalMap:ue&&i.normalMapType===0&&Xr(i.normalMap.format),metalnessMap:pe,roughnessMap:j,anisotropy:me,anisotropyMap:M,clearcoat:he,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,dispersion:ge,retroreflection:_e,iridescence:ve,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:ye,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:be,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Pe,alphaTest:Fe,alphaHash:Ie,combine:i.combine,mapUv:ae&&m(i.map.channel),aoMapUv:se&&m(i.aoMap.channel),lightMapUv:ce&&m(i.lightMap.channel),bumpMapUv:le&&m(i.bumpMap.channel),normalMapUv:ue&&m(i.normalMap.channel),displacementMapUv:de&&m(i.displacementMap.channel),emissiveMapUv:fe&&m(i.emissiveMap.channel),metalnessMapUv:pe&&m(i.metalnessMap.channel),roughnessMapUv:j&&m(i.roughnessMap.channel),anisotropyMapUv:M&&m(i.anisotropyMap.channel),clearcoatMapUv:xe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&m(i.sheenRoughnessMap.channel),specularMapUv:Oe&&m(i.specularMap.channel),specularColorMapUv:ke&&m(i.specularColorMap.channel),specularIntensityMapUv:Ae&&m(i.specularIntensityMap.channel),transmissionMapUv:je&&m(i.transmissionMap.channel),thicknessMapUv:Me&&m(i.thicknessMap.channel),alphaMapUv:Pe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ue||me),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ae||Pe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ue===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:k,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Re,decodeVideoTexture:ae&&i.map.isVideoTexture===!0&&ze.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:fe&&i.emissiveMap.isVideoTexture===!0&&ze.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Le&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Le&&i.extensions.multiDraw===!0||ie)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return N.vertexUv1s=c.has(1),N.vertexUv2s=c.has(2),N.vertexUv3s=c.has(3),c.clear(),N}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=_t[t];n=re.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Kr(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Qr(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function $r(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ei(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ti(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||$r),r.length>1&&r.sort(t||ei),i.length>1&&i.sort(t||ei)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ni(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new ti,e.set(t,[i])):n>=r.length?(i=new ti,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ri(){let t={};return{get:function(n){if(t[n.id]!==void 0)return t[n.id];let r;switch(n.type){case`SunLight`:case`DirectionalLight`:r={direction:new e,color:new Ge};break;case`SpotLight`:r={position:new e,direction:new e,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:r={position:new e,color:new Ge,distance:0,decay:0};break;case`HemisphereLight`:r={direction:new e,skyColor:new Ge,groundColor:new Ge};break;case`RectAreaLight`:r={color:new Ge,position:new e,halfWidth:new e,halfHeight:new e}}return t[n.id]=r,r}}}function ii(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new E};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new E};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new E,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ai=0;function oi(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function si(t){let n=new ri,r=ii(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let t=0;t<9;t++)i.probe.push(new e);let a=new e,o=new et,s=new et;function c(e){let a=0,o=0,s=0;for(let e=0;e<9;e++)i.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;e.sort(oi);for(let t=0,S=e.length;t<S;t++){let S=e[t],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)i.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=n.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=r.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),i.sunShadow[l]=t,i.sunShadowMap[l]=E;let n=e.getViewportCount();for(let t=0;t<n;t++)i.sunShadowMatrix[u+t]=e.getMatrix(t),i.sunShadowCascade[u+t]=e._cascadeData[t];u+=n,l++}i.sun[c]=e,c++}else if(S.isDirectionalLight){let e=n.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=r.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,i.directionalShadow[d]=t,i.directionalShadowMap[d]=E,i.directionalShadowMatrix[d]=S.shadow.matrix,g++}i.directional[d]=e,d++}else if(S.isSpotLight){let e=n.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,i.spot[p]=e;let t=S.shadow;if(S.map&&(i.spotLightMap[y]=S.map,y++,t.updateMatrices(S),S.castShadow&&b++),i.spotLightMatrix[p]=t.matrix,S.castShadow){let e=r.get(S);e.shadowIntensity=t.intensity,e.shadowBias=t.bias,e.shadowNormalBias=t.normalBias,e.shadowRadius=t.radius,e.shadowMapSize=t.mapSize,i.spotShadow[p]=e,i.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=n.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),i.rectArea[m]=e,m++}else if(S.isPointLight){let e=n.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=r.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,i.pointShadow[f]=t,i.pointShadowMap[f]=E,i.pointShadowMatrix[f]=S.shadow.matrix,_++}i.point[f]=e,f++}else if(S.isHemisphereLight){let e=n.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),i.hemi[h]=e,h++}}m>0&&(t.has(`OES_texture_float_linear`)===!0?(i.rectAreaLTC1=R.LTC_FLOAT_1,i.rectAreaLTC2=R.LTC_FLOAT_2):(i.rectAreaLTC1=R.LTC_HALF_1,i.rectAreaLTC2=R.LTC_HALF_2)),i.ambient[0]=a,i.ambient[1]=o,i.ambient[2]=s;let S=i.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(i.sun.length=c,i.directional.length=d,i.spot.length=p,i.rectArea.length=m,i.point.length=f,i.hemi.length=h,i.sunShadow.length=l,i.sunShadowMap.length=l,i.sunShadowMatrix.length=u,i.sunShadowCascade.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.directionalShadowMatrix.length=g,i.pointShadow.length=_,i.pointShadowMap.length=_,i.pointShadowMatrix.length=_,i.spotShadow.length=v,i.spotShadowMap.length=v,i.spotLightMatrix.length=v+y-b,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,i.version=ai++)}function l(e,t){let n=0,r=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=i.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=i.directional[r];e.direction.setFromMatrixPosition(p.matrixWorld),a.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(f),r++}else if(p.isSpotLight){let e=i.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),a.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(a),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=i.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),s.identity(),o.copy(p.matrixWorld),o.premultiply(f),s.extractRotation(o),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(s),e.halfHeight.applyMatrix4(s),u++}else if(p.isPointLight){let e=i.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=i.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:c,setupView:l,state:i}}function ci(e){let t=new si(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function li(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ci(e),t.set(n,[a])):r>=i.length?(a=new ci(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ui=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,di=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fi=[new e(1,0,0),new e(-1,0,0),new e(0,1,0),new e(0,-1,0),new e(0,0,1),new e(0,0,-1)],pi=[new e(0,-1,0),new e(0,-1,0),new e(0,0,1),new e(0,0,-1),new e(0,-1,0),new e(0,-1,0)],mi=new et,hi=new e,gi=new e;function _i(e,t,n){let r=new T,a=new E,o=new E,s=new xe,c=new qe,l=new Ve,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new Fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new E},radius:{value:4}},vertexShader:ui,fragmentShader:di}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new _e;h.setAttribute(`position`,new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new M(h,p),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let x=this.type;this.render=function(t,n,c){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||t.length===0)return;this.type===2&&(Be(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=x!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){Be(`WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;a.copy(f.mapSize);let h=f.getFrameExtents();a.multiply(h),o.copy(f.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(o.x=Math.floor(d/h.x),a.x=o.x*h.x,f.mapSize.x=o.x),a.y>d&&(o.y=Math.floor(d/h.y),a.y=o.y*h.y,f.mapSize.y=o.y));let _=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=_,f.map===null||m===!0){if(f.map!==null&&(f.map.depthTexture!==null&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),this.type===3){if(u.isPointLight){Be(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}f.map=new Ye(a.x,a.y,{format:De,type:v,minFilter:Se,magFilter:Se,generateMipmaps:!1}),f.map.texture.name=u.name+`.shadowMap`,f.map.depthTexture=new ne(a.x,a.y,y),f.map.depthTexture.name=u.name+`.shadowMapDepth`,f.map.depthTexture.format=i,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=ut,f.map.depthTexture.magFilter=ut}else u.isPointLight?(f.map=new qt(a.x),f.map.depthTexture=new de(a.x,g)):(f.map=new Ye(a.x,a.y),f.map.depthTexture=new ne(a.x,a.y,g)),f.map.depthTexture.name=u.name+`.shadowMap`,f.map.depthTexture.format=i,this.type===1?(f.map.depthTexture.compareFunction=_?518:515,f.map.depthTexture.minFilter=Se,f.map.depthTexture.magFilter=Se):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=ut,f.map.depthTexture.magFilter=ut);f.camera.updateProjectionMatrix()}f.map.isWebGLCubeRenderTarget!==!0&&(f.map.width!==a.x||f.map.height!==a.y)&&f.map.setSize(a.x,a.y);let b=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();u.isPointLight!==!0&&f.updateMatrices(u,c);for(let t=0;t<b;t++){let i=f.getCamera(t);if(u.isPointLight){let e=f.camera,n=f.matrix,r=u.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),hi.setFromMatrixPosition(u.matrixWorld),e.position.copy(hi),gi.copy(e.position),gi.add(fi[t]),e.up.copy(pi[t]),e.lookAt(gi),e.updateMatrixWorld(),n.makeTranslation(-hi.x,-hi.y,-hi.z),mi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(mi,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,t),e.clear();else{t===0&&(e.setRenderTarget(f.map),e.clear());let n=f.getViewport(t);s.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),p.viewport(s)}r=f.getFrustum(t),w(n,c,i,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&S(f,c),f.needsUpdate=!1}x=this.type,b.needsUpdate=!1,e.setRenderTarget(l,u,f)};function S(n,r){let i=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ye(a.x,a.y,{format:De,type:v}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,m,_,null)}function C(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function w(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=C(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=C(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)w(c[e],i,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function vi(e,t){function n(){let t=!1,n=new xe,r=null,i=new xe(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?j(e.DEPTH_TEST):me(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=te[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?j(e.STENCIL_TEST):me(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Ge(0,0,0),T=0,E=!1,D=null,O=null,ee=null,ne=null,k=null,re=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ie=!1,ae=0,oe=e.getParameter(e.VERSION);oe.indexOf(`WebGL`)===-1?oe.indexOf(`OpenGL ES`)!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),ie=ae>=2):(ae=parseFloat(/^WebGL (\d)/.exec(oe)[1]),ie=ae>=1);let A=null,se={},ce=e.getParameter(e.SCISSOR_BOX),le=e.getParameter(e.VIEWPORT),ue=new xe().fromArray(ce),de=new xe().fromArray(le);function fe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let pe={};pe[e.TEXTURE_2D]=fe(e.TEXTURE_2D,e.TEXTURE_2D,1),pe[e.TEXTURE_CUBE_MAP]=fe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[e.TEXTURE_2D_ARRAY]=fe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),pe[e.TEXTURE_3D]=fe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),j(e.DEPTH_TEST),o.setFunc(3),Ce(!1),we(1),j(e.CULL_FACE),M(0);function j(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function me(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function he(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ge(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function _e(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ye={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ye[103]=e.MIN,ye[104]=e.MAX;let be={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function M(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(me(e.BLEND),g=!1);else if(g===!1&&(j(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:ve(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:ve(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:ve(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:ve(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ye[n],ye[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(be[r],be[i],be[o],be[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function Se(t,n){t.side===2?me(e.CULL_FACE):j(e.CULL_FACE);let r=t.side===1;n&&(r=!r),Ce(r),t.blending===1&&t.transparent===!1?M(0):M(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ee(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?j(e.SAMPLE_ALPHA_TO_COVERAGE):me(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function we(t){t===0?me(e.CULL_FACE):(j(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Te(t){t!==ee&&(ie&&e.lineWidth(t),ee=t)}function Ee(t,n,r){t?(j(e.POLYGON_OFFSET_FILL),(ne!==n||k!==r)&&(ne=n,k=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):me(e.POLYGON_OFFSET_FILL)}function De(t){t?j(e.SCISSOR_TEST):me(e.SCISSOR_TEST)}function Oe(t){t===void 0&&(t=e.TEXTURE0+re-1),A!==t&&(e.activeTexture(t),A=t)}function ke(t,n,r){r===void 0&&(r=A===null?e.TEXTURE0+re-1:A);let i=se[r];i===void 0&&(i={type:void 0,texture:void 0},se[r]=i),(i.type!==t||i.texture!==n)&&(A!==r&&(e.activeTexture(r),A=r),e.bindTexture(t,n||pe[t]),i.type=t,i.texture=n)}function Ae(){let t=se[A];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function je(){try{e.compressedTexImage2D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Me(){try{e.compressedTexImage3D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Ne(){try{e.texSubImage2D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Pe(){try{e.texSubImage3D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Fe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Ie(){try{e.compressedTexSubImage3D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Le(){try{e.texStorage2D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Re(){try{e.texStorage3D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function N(){try{e.texImage2D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function ze(){try{e.texImage3D(...arguments)}catch(e){ve(`WebGLState:`,e)}}function Be(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ve(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function He(t){ue.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ue.copy(t))}function P(t){de.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),de.copy(t))}function Ue(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function We(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},A=null,se={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Ge(0,0,0),T=0,E=!1,D=null,O=null,ee=null,ne=null,k=null,ue.set(0,0,e.canvas.width,e.canvas.height),de.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:j,disable:me,bindFramebuffer:he,drawBuffers:ge,useProgram:_e,setBlending:M,setMaterial:Se,setFlipSided:Ce,setCullFace:we,setLineWidth:Te,setPolygonOffset:Ee,setScissorTest:De,activeTexture:Oe,bindTexture:ke,unbindTexture:Ae,compressedTexImage2D:je,compressedTexImage3D:Me,texImage2D:N,texImage3D:ze,pixelStorei:Ve,getParameter:Be,updateUBOMapping:Ue,uniformBlockBinding:We,texStorage2D:Le,texStorage3D:Re,texSubImage2D:Ne,texSubImage3D:Pe,compressedTexSubImage2D:Fe,compressedTexSubImage3D:Ie,scissor:He,viewport:P,reset:Ke}}function yi(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new E,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):I(`canvas`)}function g(e,t,n){let r=1,i=Pe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),Be(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&Be(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];Be(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||Be(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ne:ze.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,Be(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),O(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&D(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function D(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function O(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let ee=0;function te(){ee=0}function ne(){return ee}function k(e){ee=e}function re(){let e=ee;return e>=i.maxTextures&&Be(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ee+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ae(t,i){let a=r.get(t);if(t.isVideoTexture&&je(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)Be(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)Be(`WebGLRenderer: Texture marked for update but image is incomplete`);else{me(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?me(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function A(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?me(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?he(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ce={[st]:e.REPEAT,[Ce]:e.CLAMP_TO_EDGE,[rt]:e.MIRRORED_REPEAT},le={[ut]:e.NEAREST,[ct]:e.NEAREST_MIPMAP_NEAREST,[ge]:e.NEAREST_MIPMAP_LINEAR,[Se]:e.LINEAR,[P]:e.LINEAR_MIPMAP_NEAREST,[Ze]:e.LINEAR_MIPMAP_LINEAR},ue={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function de(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&Be(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,le[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,le[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ue[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function fe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ie(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&D(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function pe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function j(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=pe(n.start,r.width,4),c=pe(t.start,r.width,4);n.start<=i+1&&a===c&&pe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function me(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=fe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=ze.getPrimaries(ze.workingColorSpace),r=o.colorSpace===``?null:ze.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Me(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);de(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===it,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&j(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Re(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else Be(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?Be(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Re(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Pe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Pe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function he(t,o,s){if(o.image.length!==6)return;let c=fe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=ze.getPrimaries(ze.workingColorSpace),r=o.colorSpace===``?null:ze.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Me(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);de(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?Be(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Pe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ae(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,ke(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ae(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ke(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ke(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Ae(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ke(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ke(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function be(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),de(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ae(i.depthTexture,0);let u=l.__webglTexture,d=ke(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ae(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ae(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function M(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)be(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?be(i.__webglFramebuffer[0],t,0):be(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ye(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ye(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,i){let a=r.get(t);n!==void 0&&_e(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&M(t)}function we(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ae(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=ke(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ye(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),de(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)_e(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else _e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),de(c,a),_e(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),de(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)_e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else _e(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&M(t)}function Te(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Ee=[],De=[];function Oe(t){if(t.samples>0){if(Ae(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ee.length=0,De.length=0,Ee.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ee.push(l),De.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,De)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ee))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ke(e){return Math.min(i.maxSamples,e.samples)}function Ae(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function je(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(ze.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&Be(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):ve(`WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=re,this.resetTextureUnits=te,this.getTextureUnits=ne,this.setTextureUnits=k,this.setTexture2D=ae,this.setTexture2DArray=oe,this.setTexture3D=A,this.setTextureCube=se,this.rebindTextures=xe,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=M,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function bi(e,t){function n(n,r=``){let i,a=ze.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var xi=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Si=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ci=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ie(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Fe({vertexShader:xi,fragmentShader:Si,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new M(new c(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wi=class extends S{constructor(t,n){super();let r=this,a=null,o=1,s=null,c=`local-floor`,l=1,u=null,f=null,p=null,m=null,h=null,v=null,y=typeof XRWebGLBinding<`u`,b=new Ci,x={},S=n.getContextAttributes(),C=null,w=null,T=[],D=[],O=new E,ee=null,te=null,re=new k;re.viewport=new xe;let ie=new k;ie.viewport=new xe;let oe=[re,ie],A=new Je,se=null,ce=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=T[e];return t===void 0&&(t=new Me,T[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=T[e];return t===void 0&&(t=new Me,T[e]=t),t.getGripSpace()},this.getHand=function(e){let t=T[e];return t===void 0&&(t=new Me,T[e]=t),t.getHandSpace()};function le(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=T[t];n!==void 0&&(n.update(e.inputSource,e.frame,u||s),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ue(){a.removeEventListener(`select`,le),a.removeEventListener(`selectstart`,le),a.removeEventListener(`selectend`,le),a.removeEventListener(`squeeze`,le),a.removeEventListener(`squeezestart`,le),a.removeEventListener(`squeezeend`,le),a.removeEventListener(`end`,ue),a.removeEventListener(`inputsourceschange`,de);for(let e=0;e<T.length;e++){let t=D[e];t!==null&&(D[e]=null,T[e].disconnect(t))}se=null,ce=null,b.reset();for(let e in x)delete x[e];if(t.setRenderTarget(C),h=null,m=null,p=null,a=null,w=null,ve.stop(),r.isPresenting=!1,t.setPixelRatio(ee),t.setSize(O.width,O.height,!1),te!==null){let e=te.camera;e.fov=te.fov,e.zoom=te.zoom,e.updateProjectionMatrix(),te=null}r.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){o=e,r.isPresenting===!0&&Be(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){c=e,r.isPresenting===!0&&Be(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return u||s},this.setReferenceSpace=function(e){u=e},this.getBaseLayer=function(){return m===null?h:m},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(a,n)),p},this.getFrame=function(){return v},this.getSession=function(){return a},this.setSession=async function(e){if(a=e,a!==null){if(C=t.getRenderTarget(),a.addEventListener(`select`,le),a.addEventListener(`selectstart`,le),a.addEventListener(`selectend`,le),a.addEventListener(`squeeze`,le),a.addEventListener(`squeezestart`,le),a.addEventListener(`squeezeend`,le),a.addEventListener(`end`,ue),a.addEventListener(`inputsourceschange`,de),S.xrCompatible!==!0&&await n.makeXRCompatible(),ee=t.getPixelRatio(),t.getSize(O),y&&`createProjectionLayer`in XRWebGLBinding.prototype){let e=null,r=null,s=null;S.depth&&(s=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,e=S.stencil?it:i,r=S.stencil?_:g);let c={colorFormat:n.RGBA8,depthFormat:s,scaleFactor:o};p=this.getBinding(),m=p.createProjectionLayer(c),a.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),w=new Ye(m.textureWidth,m.textureHeight,{format:ft,type:ae,depthTexture:new ne(m.textureWidth,m.textureHeight,r,void 0,void 0,void 0,void 0,void 0,void 0,e),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}else{let e={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(a,n,e),a.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),w=new Ye(h.framebufferWidth,h.framebufferHeight,{format:ft,type:ae,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),u=null,s=await a.requestReferenceSpace(c),ve.setContext(a),ve.start(),r.isPresenting=!0,r.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function de(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,T[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<T.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=T[r];i&&i.connect(n)}}let fe=new e,pe=new e;function j(e,t,n){fe.setFromMatrixPosition(t.matrixWorld),pe.setFromMatrixPosition(n.matrixWorld);let r=fe.distanceTo(pe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function me(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(a===null)return;let t=e.near,n=e.far;b.texture!==null&&(b.depthNear>0&&(t=b.depthNear),b.depthFar>0&&(n=b.depthFar)),A.near=ie.near=re.near=t,A.far=ie.far=re.far=n,(se!==A.near||ce!==A.far)&&(a.updateRenderState({depthNear:A.near,depthFar:A.far}),se=A.near,ce=A.far),A.layers.mask=e.layers.mask|6,re.layers.mask=A.layers.mask&-5,ie.layers.mask=A.layers.mask&-3;let r=e.parent,i=A.cameras;me(A,r);for(let e=0;e<i.length;e++)me(i[e],r);i.length===2?j(A,re,ie):A.projectionMatrix.copy(re.projectionMatrix),te===null&&e.isPerspectiveCamera&&(te={camera:e,fov:e.fov,zoom:e.zoom}),he(e,A,r)};function he(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=d*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(m!==null||h!==null)return l},this.setFoveation=function(e){l=e,m!==null&&(m.fixedFoveation=e),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=e)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(A)},this.getCameraTexture=function(e){return x[e]};let ge=null;function _e(e,n){if(f=n.getViewerPose(u||s),v=n,f!==null){let e=f.views;h!==null&&(t.setRenderTargetFramebuffer(w,h.framebuffer),t.setRenderTarget(w));let n=!1;e.length!==A.cameras.length&&(A.cameras.length=0,n=!0);for(let r=0;r<e.length;r++){let i=e[r],a=null;if(h!==null)a=h.getViewport(i);else{let e=p.getViewSubImage(m,i);a=e.viewport,r===0&&(t.setRenderTargetTextures(w,e.colorTexture,e.depthStencilTexture),t.setRenderTarget(w))}let o=oe[r];o===void 0&&(o=new k,o.layers.enable(r),o.viewport=new xe,oe[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),n===!0&&A.cameras.push(o)}let i=a.enabledFeatures;if(i&&i.includes(`depth-sensing`)&&a.depthUsage==`gpu-optimized`&&y){p=r.getBinding();let t=p.getDepthInformation(e[0]);t&&t.isValid&&t.texture&&b.init(t,a.renderState)}if(i&&i.includes(`camera-access`)&&y){t.state.unbindTexture(),p=r.getBinding();for(let t=0;t<e.length;t++){let n=e[t].camera;if(n){let e=x[n];e||(e=new Ie,x[n]=e);let t=p.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<T.length;e++){let t=D[e],r=T[e];t!==null&&r!==void 0&&r.update(t,n,u||s)}ge&&ge(e,n),n.detectedPlanes&&r.dispatchEvent({type:`planesdetected`,data:n}),v=null}let ve=new ht;ve.setAnimationLoop(_e),this.setAnimationLoop=function(e){ge=e},this.dispose=function(){}}},Ti=new et,Ei=new N;Ei.set(-1,0,0,0,1,0,0,0,1);function Di(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,$e(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ti.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Ei),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Oi(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return ve(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?Be(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):Be(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ki=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ai=null;function ji(){return Ai===null&&(Ai=new ee(ki,16,16,De,v),Ai.name=`DFG_LUT`,Ai.minFilter=Se,Ai.magFilter=Se,Ai.wrapS=Ce,Ai.wrapT=Ce,Ai.generateMipmaps=!1,Ai.needsUpdate=!0),Ai}var Mi=class{constructor(t={}){let{canvas:n=We(),context:i=null,depth:a=!0,stencil:o=!1,alpha:s=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:m=ae}=t;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<`u`&&i instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);h=i.getContextAttributes().alpha}else h=s;let y=m,b=new Set([r,fe,he]),x=new Set([ae,g,ue,_,ce,A]),S=new Uint32Array(4),w=new Int32Array(4),E=new e,D=null,O=null,ee=[],te=[],ne=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,re=!1,ie=null,oe=null,se=null,le=null;this._outputColorSpace=C;let de=0,pe=0,j=null,me=-1,ge=null,_e=new xe,ye=new xe,M=null,Se=new Ge(0),Ce=0,we=n.width,Te=n.height,Ee=1,De=null,Oe=null,ke=new xe(0,0,we,Te),Ae=new xe(0,0,we,Te),je=!1,Me=new T,Ne=!1,Pe=!1,Fe=new et,Ie=new e,Le=new xe,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},N=!1;function Ve(){return j===null?Ee:1}let P=i;function Ue(e,t){return n.getContext(e,t)}let qe,Je,F,Xe,I,Qe,$e,tt,nt,rt,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,L,R;try{let e={alpha:!0,depth:a,stencil:o,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in n&&n.setAttribute(`data-engine`,`three.js r186`),n.addEventListener(`webglcontextlost`,yt,!1),n.addEventListener(`webglcontextrestored`,bt,!1),n.addEventListener(`webglcontextcreationerror`,Et,!1),P===null){let t=`webgl2`;if(P=Ue(t,e),P===null)throw Ue(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}_t()}catch(e){throw n.removeEventListener(`webglcontextlost`,yt,!1),n.removeEventListener(`webglcontextrestored`,bt,!1),n.removeEventListener(`webglcontextcreationerror`,Et,!1),ve(`WebGLRenderer: `+e.message),e}function _t(){qe=new Yt(P),qe.init(),mt=new bi(P,qe),Je=new wt(P,qe,t,mt),F=new vi(P,qe),Je.reversedDepthBuffer&&p&&F.buffers.depth.setReversed(!0),oe=P.createFramebuffer(),se=P.createFramebuffer(),le=P.createFramebuffer(),Xe=new Qt(P),I=new Qr,Qe=new yi(P,qe,F,I,Je,mt,Xe),$e=new Jt(k),tt=new gt(P),L=new St(P,tt),nt=new Xt(P,tt,Xe,L),rt=new en(P,nt,tt,L,Xe),dt=new $t(P,Je,Qe),ct=new Tt(I),it=new Zr(k,$e,qe,Je,L,ct),at=new Di(k,I),ot=new ni,st=new li(qe),ut=new xt(k,$e,F,rt,h,l),lt=new _i(k,rt,Je),R=new Oi(P,Xe,Je,F),ft=new Ct(P,qe,Xe),pt=new Zt(P,qe,Xe),Xe.programs=it.programs,k.capabilities=Je,k.extensions=qe,k.properties=I,k.renderLists=ot,k.shadowMap=lt,k.state=F,k.info=Xe}y!==1009&&(ne=new nn(y,n.width,n.height,c,a,o));let vt=new wi(k,P);this.xr=vt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=qe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=qe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return Ee},this.setPixelRatio=function(e){e!==void 0&&(Ee=e,this.setSize(we,Te,!1))},this.getSize=function(e){return e.set(we,Te)},this.setSize=function(e,t,r=!0){vt.isPresenting?Be(`WebGLRenderer: Can't change size while VR device is presenting.`):(we=e,Te=t,n.width=Math.floor(e*Ee),n.height=Math.floor(t*Ee),r===!0&&(n.style.width=e+`px`,n.style.height=t+`px`),ne!==null&&ne.setSize(n.width,n.height),this.setViewport(0,0,e,t))},this.getDrawingBufferSize=function(e){return e.set(we*Ee,Te*Ee).floor()},this.setDrawingBufferSize=function(e,t,r){we=e,Te=t,Ee=r,n.width=Math.floor(e*r),n.height=Math.floor(t*r),this.setViewport(0,0,e,t)},this.setEffects=function(e){if(y===1009)ve(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){Be(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ne.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(_e)},this.getViewport=function(e){return e.copy(ke)},this.setViewport=function(e,t,n,r){e.isVector4?ke.set(e.x,e.y,e.z,e.w):ke.set(e,t,n,r),F.viewport(_e.copy(ke).multiplyScalar(Ee).round())},this.getScissor=function(e){return e.copy(Ae)},this.setScissor=function(e,t,n,r){e.isVector4?Ae.set(e.x,e.y,e.z,e.w):Ae.set(e,t,n,r),F.scissor(ye.copy(Ae).multiplyScalar(Ee).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(e){F.setScissorTest(je=e)},this.setOpaqueSort=function(e){De=e},this.setTransparentSort=function(e){Oe=e},this.getClearColor=function(e){return e.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor(...arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=b.has(t)}if(e){let e=j.texture.type,t=x.has(e),n=ut.getClearColor(),r=ut.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(S[0]=i,S[1]=a,S[2]=o,S[3]=r,P.clearBufferuiv(P.COLOR,0,S)):(w[0]=i,w[1]=a,w[2]=o,w[3]=r,P.clearBufferiv(P.COLOR,0,w))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ie=e},this.dispose=function(){n.removeEventListener(`webglcontextlost`,yt,!1),n.removeEventListener(`webglcontextrestored`,bt,!1),n.removeEventListener(`webglcontextcreationerror`,Et,!1),ut.dispose(),ot.dispose(),st.dispose(),I.dispose(),$e.dispose(),rt.dispose(),L.dispose(),R.dispose(),it.dispose(),vt.dispose(),vt.removeEventListener(`sessionstart`,Nt),vt.removeEventListener(`sessionend`,Pt),Ft.stop()};function yt(e){e.preventDefault(),be(`WebGLRenderer: Context Lost.`),re=!0}function bt(){be(`WebGLRenderer: Context Restored.`),re=!1;let e=Xe.autoReset,t=lt.enabled,n=lt.autoUpdate,r=lt.needsUpdate,i=lt.type;_t(),Xe.autoReset=e,lt.enabled=t,lt.autoUpdate=n,lt.needsUpdate=r,lt.type=i}function Et(e){ve(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Dt(e){let t=e.target;t.removeEventListener(`dispose`,Dt),Ot(t)}function Ot(e){kt(e),I.remove(e)}function kt(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){it.releaseProgram(e)}),e.isShaderMaterial&&it.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Re);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Gt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=nt.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;L.setup(i,r,s,n,c);let h,g=ft;if(c!==null&&(h=tt.get(c),g=pt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Ve()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Ve()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(qe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?tt.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function At(e,t,n,r){ie!==null&&e.isNodeMaterial&&ie.setObject(r,e),Ne===!0&&ct.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Vt(e,t,r),e.side=0,e.needsUpdate=!0,Vt(e,t,r),e.side=2):Vt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ie!==null&&ie.renderStart(e,t,n),O=st.get(n),O.init(t),te.push(O),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(O.pushLight(e),e.castShadow&&O.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(O.pushLight(e),e.castShadow&&O.pushShadow(e))}),O.setupLights(),ie!==null&&ie.updateLights(O.state.lightsArray),Pe=this.localClippingEnabled,Ne=ct.init(this.clippingPlanes,Pe),Ne===!0&&ct.setGlobalState(this.clippingPlanes,t),ie!==null&&lt.render(O.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];At(o,n,t,e),r.add(o)}else At(i,n,t,e),r.add(i)}}),O=te.pop(),ie!==null&&ie.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}qe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let jt=null;function Mt(e){jt&&jt(e)}function Nt(){Ft.stop()}function Pt(){Ft.start()}let Ft=new ht;Ft.setAnimationLoop(Mt),typeof self<`u`&&Ft.setContext(self),this.setAnimationLoop=function(e){jt=e,vt.setAnimationLoop(e),e===null?Ft.stop():Ft.start()},vt.addEventListener(`sessionstart`,Nt),vt.addEventListener(`sessionend`,Pt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){ve(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;ie!==null&&ie.renderStart(e,t);let n=vt.enabled===!0&&vt.isPresenting===!0,r=ne!==null&&(j===null||n)&&ne.begin(k,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(ne===null||ne.isCompositing()===!1)&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(t),t=vt.getCamera()),e.isScene===!0&&e.onBeforeRender(k,e,t,j),O=st.get(e,te.length),O.init(t),O.state.textureUnits=Qe.getTextureUnits(),te.push(O),Fe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Me.setFromProjectionMatrix(Fe,He,t.reversedDepth),Pe=this.localClippingEnabled,Ne=ct.init(this.clippingPlanes,Pe),D=ot.get(e,ee.length),D.init(),ee.push(D),vt.enabled===!0&&vt.isPresenting===!0){let e=k.xr.getDepthSensingMesh();e!==null&&It(e,t,-1/0,k.sortObjects)}It(e,t,0,k.sortObjects),D.finish(),ie!==null&&ie.updateLights(O.state.lightsArray),k.sortObjects===!0&&D.sort(De,Oe),N=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,N&&ut.addToRenderList(D,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ne===!0&&ct.beginShadows();let i=O.state.shadowsArray;if(lt.render(i,e,t),Ne===!0&&ct.endShadows(),(r&&ne.hasRenderPass())===!1){let n=D.opaque,r=D.transmissive;if(O.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Rt(n,r,e,a)}N&&ut.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Lt(D,e,n,n.viewport)}}else r.length>0&&Rt(n,r,e,t),N&&ut.render(e),Lt(D,e,t)}j!==null&&pe===0&&(Qe.updateMultisampleRenderTarget(j),Qe.updateRenderTargetMipmap(j)),r&&ne.end(k),e.isScene===!0&&e.onAfterRender(k,e,t),L.resetDefaultState(),me=-1,ge=null,te.pop(),te.length>0?(O=te[te.length-1],Qe.setTextureUnits(O.state.textureUnits),Ne===!0&&ct.setGlobalState(k.clippingPlanes,O.state.camera)):O=null,ee.pop(),D=ee.length>0?ee[ee.length-1]:null,ie!==null&&ie.renderEnd()};function It(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)O.pushLightProbeGrid(e);else if(e.isLight)O.pushLight(e),e.castShadow&&O.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Me)){r&&Le.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Fe);let i=rt.update(e),a=e.material;a.visible&&D.push(e,i,a,n,Le.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Me))){let i=rt.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Le.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Le.copy(e.boundingSphere.center)),Le.applyMatrix4(e.matrixWorld).applyMatrix4(Fe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&D.push(e,i,c,n,Le.z,s,t)}}else a.visible&&D.push(e,i,a,n,Le.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)It(i[e],t,n,r)}function Lt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;O.setupLightsView(n),Ne===!0&&ct.setGlobalState(k.clippingPlanes,n),r&&F.viewport(_e.copy(r)),i.length>0&&zt(i,t,n),a.length>0&&zt(a,t,n),o.length>0&&zt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Rt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[r.id]===void 0){let e=qe.has(`EXT_color_buffer_half_float`)||qe.has(`EXT_color_buffer_float`);O.state.transmissionRenderTarget[r.id]=new Ye(1,1,{generateMipmaps:!0,type:e?v:ae,minFilter:Ze,samples:Math.max(4,Je.samples),stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ze.workingColorSpace})}let i=O.state.transmissionRenderTarget[r.id],a=r.viewport||_e;i.setSize(a.z*k.transmissionResolutionScale,a.w*k.transmissionResolutionScale);let s=k.getRenderTarget(),c=k.getActiveCubeFace(),l=k.getActiveMipmapLevel();k.setRenderTarget(i),k.getClearColor(Se),Ce=k.getClearAlpha(),Ce<1&&k.setClearColor(16777215,.5),k.clear(),N&&ut.render(n);let u=k.toneMapping;k.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),O.setupLightsView(r),Ne===!0&&ct.setGlobalState(k.clippingPlanes,r),zt(e,n,r),Qe.updateMultisampleRenderTarget(i),Qe.updateRenderTargetMipmap(i),qe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Qe.updateMultisampleRenderTarget(i),Qe.updateRenderTargetMipmap(i))}k.setRenderTarget(s,c,l),k.setClearColor(Se,Ce),d!==void 0&&(r.viewport=d),k.toneMapping=u}function zt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Bt(o,t,n,s,l,c)}}function Bt(e,t,n,r,i,a){ie!==null&&i.isNodeMaterial&&ie.setObject(e,i),e.onBeforeRender(k,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(k,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,k.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,k.renderBufferDirect(n,t,r,i,e,a),i.side=2):k.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(k,t,n,r,i,a)}function Vt(e,t,n){t.isScene!==!0&&(t=Re);let r=I.get(e),i=O.state.lights,a=O.state.shadowsArray,o=i.state.version,s=it.getParameters(e,i.state,a,t,n,O.state.lightProbeGridArray),c=it.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=$e.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Dt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ut(e,s),d}else s.uniforms=it.getUniforms(e),ie!==null&&e.isNodeMaterial&&ie.build(e,n,s),e.onBeforeCompile(s,k),d=it.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=ct.uniform),Ut(e,s),r.needsLights=qt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=O.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ht(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=ur.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ut(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];E.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(E))return n}return null}function Gt(e,t,n,r,i){t.isScene!==!0&&(t=Re),Qe.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?k.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ze.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=$e.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=k.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=O.state.lights;if(Ne===!0&&(Pe===!0||e!==ge)){let t=e===ge&&r.id===me;ct.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==ct.numPlanes||v.numIntersection!==ct.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=O.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Vt(r,t,i),ie&&r.isNodeMaterial&&ie.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(F.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==me&&(me=r.id,C=!0),v.needsLights){let e=Wt(O.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ge!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(P,`projectionMatrix`,e.projectionMatrix),T.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(P,Ie.setFromMatrixPosition(e.matrixWorld)),Je.logarithmicDepthBuffer&&T.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),ge!==e&&(ge=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(P,`sunShadowMap`,y.state.sunShadowMap,Qe),y.state.directionalShadowMap.length>0&&T.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,Qe),y.state.spotShadowMap.length>0&&T.setValue(P,`spotShadowMap`,y.state.spotShadowMap,Qe),y.state.pointShadowMap.length>0&&T.setValue(P,`pointShadowMap`,y.state.pointShadowMap,Qe)),i.isSkinnedMesh){T.setOptional(P,i,`bindMatrix`),T.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(P,`boneTexture`,e.boneTexture,Qe))}i.isBatchedMesh&&(T.setOptional(P,i,`batchingTexture`),T.setValue(P,`batchingTexture`,i._matricesTexture,Qe),T.setOptional(P,i,`batchingIdTexture`),T.setValue(P,`batchingIdTexture`,i._indirectTexture,Qe),T.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(P,`batchingColorTexture`,i._colorsTexture,Qe));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&dt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=ji()),C){if(T.setValue(P,`toneMappingExposure`,k.toneMappingExposure),v.needsLights&&Kt(E,w),a&&r.fog===!0&&at.refreshFogUniforms(E,a),at.refreshMaterialUniforms(E,r,Ee,Te,O.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}ur.upload(P,Ht(v),E,Qe)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(ur.upload(P,Ht(v),E,Qe),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(P,`center`,i.center),T.setValue(P,`modelViewMatrix`,i.modelViewMatrix),T.setValue(P,`normalMatrix`,i.normalMatrix),T.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];R.update(n,x),R.bind(n,x)}}return x}function Kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function qt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return de},this.getActiveMipmapLevel=function(){return pe},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,de=t,pe=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),_e.copy(e.viewport),ye.copy(e.scissor),M=e.scissorTest,F.viewport(_e),F.scissor(ye),F.setScissorTest(M),me=-1;return}if(o.__webglFramebuffer===void 0)Qe.setupRenderTarget(e);else if(o.__hasExternalTextures)Qe.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Qe.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Qe.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,_e.copy(e.viewport),ye.copy(e.scissor),M=e.scissorTest}else _e.copy(ke).multiplyScalar(Ee).floor(),ye.copy(Ae).multiplyScalar(Ee).floor(),M=je;if(n!==0&&(r=oe),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(_e),F.scissor(ye),F.setScissorTest(M),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}me=-1};function tn(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Je.textureFormatReadable(e.format),t.__typeReadable=Je.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){ve(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=tn(o);if(u.__formatReadable===!1){ve(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){ve(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,mt.convert(c),mt.convert(l),a)}finally{let e=j===null?null:I.get(j).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=tn(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,mt.convert(l),mt.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=j===null?null:I.get(j).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Ke(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Qe.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=mt.convert(t.format),_=mt.convert(t.type),v;t.isData3DTexture?(Qe.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Qe.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(Qe.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,se),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,le);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&Qe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Qe.setTextureCube(e,0):e.isData3DTexture?Qe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Qe.setTexture2DArray(e,0):Qe.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){de=0,pe=0,j=null,F.reset(),L.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}},Ni=class extends t{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new Ue;e.deleteAttribute(`uv`);let t=new pe({side:1}),n=new pe,r=new w(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new M(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new f(e,n,6),s=new o;s.position.set(-10.906,2.009,1.846),s.rotation.set(0,-.195,0),s.scale.set(2.328,7.905,4.651),s.updateMatrix(),a.setMatrixAt(0,s.matrix),s.position.set(-5.607,-.754,-.758),s.rotation.set(0,.994,0),s.scale.set(1.97,1.534,3.955),s.updateMatrix(),a.setMatrixAt(1,s.matrix),s.position.set(6.167,.857,7.803),s.rotation.set(0,.561,0),s.scale.set(3.927,6.285,3.687),s.updateMatrix(),a.setMatrixAt(2,s.matrix),s.position.set(-2.017,.018,6.124),s.rotation.set(0,.333,0),s.scale.set(2.002,4.566,2.064),s.updateMatrix(),a.setMatrixAt(3,s.matrix),s.position.set(2.291,-.756,-2.621),s.rotation.set(0,-.286,0),s.scale.set(1.546,1.552,1.496),s.updateMatrix(),a.setMatrixAt(4,s.matrix),s.position.set(-2.193,-.369,-5.547),s.rotation.set(0,.516,0),s.scale.set(3.875,3.487,2.986),s.updateMatrix(),a.setMatrixAt(5,s.matrix),this.add(a);let c=new M(e,Pi(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new M(e,Pi(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new M(e,Pi(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new M(e,Pi(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let p=new M(e,Pi(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);let m=new M(e,Pi(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Pi(e){return new je({color:0,emissive:16777215,emissiveIntensity:e})}var Fi=1/60,Ii=-9.81,Li=.55,z={centerZ:.65,halfX:.72,halfZ:1,topY:1.76},Ri={front:-1.327,rear:1.328},zi=.31,Bi=.6,Vi=4.5,Hi={x:.9,z:1.15},Ui=new Map;function Wi(e,t,n,r){let i=Ui.get(e);if(i)return i;let a=document.createElement(`canvas`);a.width=t,a.height=n,r(a.getContext(`2d`),t,n);let o=new Qe(a);return o.colorSpace=C,o.anisotropy=4,Ui.set(e,o),o}function Gi(e,t,n,r,i){for(let a=0;a<r;a++){let r=Math.random()<.5?0:255;e.fillStyle=`rgba(${r},${r},${r},${i*Math.random()})`,e.fillRect(Math.random()*t,Math.random()*n,1+Math.random()*2,1+Math.random()*2)}}function Ki(e,t,n,r,i,a,o=800){e.fillStyle=a,e.font=`${o} ${i}px "Lilita One", system-ui, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,n,r)}var qi=1.63,Ji=class{root=new m;body=new m;wheels=[];constructor(e){let t=e.clone(!0),n=t.getObjectByName(`Body`);if(n){let e=new m;e.position.y=-Li,e.add(n),this.body.add(e),n.traverse(e=>{e instanceof M&&e.material instanceof pe&&/paint/i.test(e.material.name)&&(e.material=e.material.clone(),e.material.color.set(`#e8e6e1`),e.material.metalness=.5,e.material.roughness=.3)})}for(let e of[`WheelFrontL`,`WheelFrontR`,`WheelRearL`,`WheelRearR`]){let n=t.getObjectByName(e);n&&this.wheels.push(n)}this.root.add(this.body,...this.wheels),this.addPlate(),this.addRack()}addPlate(){let e=Wi(`plat`,256,72,(e,t,n)=>{e.fillStyle=`#f4f4f0`,e.fillRect(0,0,t,n),e.strokeStyle=`#111`,e.lineWidth=6,e.strokeRect(3,3,t-6,n-6),Ki(e,`B 1446 MDK`,t/2,n/2+2,44,`#111`)}),t=new M(new c(.44,.12),new pe({map:e,roughness:.5}));t.position.set(0,.56-Li,2.19),this.body.add(t)}addRack(){let e=e=>e-Li,t=new pe({color:`#17191c`,roughness:.5,metalness:.5}),n=Wi(`rak`,256,256,(e,t,n)=>{e.clearRect(0,0,t,n),e.strokeStyle=`#1b1d20`,e.lineWidth=9;for(let r=0;r<=t;r+=32)e.beginPath(),e.moveTo(r,0),e.lineTo(r,n),e.stroke(),e.beginPath(),e.moveTo(0,r),e.lineTo(t,r),e.stroke()}),r=(t,n,r,i,a)=>{let o=new M(t,n);o.position.set(r,e(i),a),o.castShadow=!0,o.receiveShadow=!0,this.body.add(o)};r(new Ue(z.halfX*2,.02,z.halfZ*2),new pe({map:n,transparent:!0,alphaTest:.4,roughness:.6,metalness:.4}),0,z.topY-.01,z.centerZ);for(let e of[-1,1]){r(new Ue(.04,.07,z.halfZ*2),t,e*(z.halfX-.02),z.topY+.035,z.centerZ),r(new Ue(z.halfX*2,.07,.04),t,0,z.topY+.035,z.centerZ+e*(z.halfZ-.02));for(let n of[-.75,.75]){let i=z.topY-qi;r(new Ue(.05,i,.05),t,e*.5,qi+i/2,z.centerZ+n)}}for(let e of[-.5,0,.5])r(new Ue(z.halfX*2,.03,.03),t,0,z.topY-.015,z.centerZ+e)}update(e,t,n,r){this.body.position.set(0,Li+e.heave.pos,0),this.body.rotation.set(e.pitch.pos,0,e.roll.pos,`XYZ`);let i=t/n*r;for(let e of this.wheels)e.rotation.x-=i}},Yi=new URL(`rapier_wasm3d_bg-C6GCbKVJ.wasm`,import.meta.url).href,Xi=async(e={},t)=>{let n;if(t.startsWith(`data:`)){let r=t.replace(/^data:.*?base64,/,``),i;if(typeof Buffer==`function`&&typeof Buffer.from==`function`)i=Buffer.from(r,`base64`);else if(typeof atob==`function`){let e=atob(r);i=new Uint8Array(e.length);for(let t=0;t<e.length;t++)i[t]=e.charCodeAt(t)}else throw Error(`Cannot decode base64-encoded data URL`);n=await WebAssembly.instantiate(i,e)}else{let r=await fetch(t),i=r.headers.get(`Content-Type`)||``;if(`instantiateStreaming`in WebAssembly&&i.startsWith(`application/wasm`))n=await WebAssembly.instantiateStreaming(r,e);else{let t=await r.arrayBuffer();n=await WebAssembly.instantiate(t,e)}}return n.instance.exports},Zi=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,mo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,mo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawbroadphase_free(e,0)}castRayAndGetNormal(e,t,n,r,i,a,o,s,c,l,u,d){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,H);let f=X.rawbroadphase_castRayAndGetNormal(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a,o,s,q(c)?2**53-1:c>>>0,!q(l),q(l)?0:l,!q(u),q(u)?0:u,W(d));return f===0?void 0:wa.__wrap(f)}finally{K[J++]=void 0}}castRay(e,t,n,r,i,a,o,s,c,l,u,d){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,H);let f=X.rawbroadphase_castRay(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a,o,s,q(c)?2**53-1:c>>>0,!q(l),q(l)?0:l,!q(u),q(u)?0:u,W(d));return f===0?void 0:Ca.__wrap(f)}finally{K[J++]=void 0}}castShape(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,B),U(a,H),U(o,ka);let h=X.rawbroadphase_castShape(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,s,c,l,u,q(d)?2**53-1:d>>>0,!q(f),q(f)?0:f,!q(p),q(p)?0:p,W(m));return h===0?void 0:ta.__wrap(h)}finally{K[J++]=void 0}}collidersWithAabbIntersectingAabb(e,t,n,r,i,a){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,H),X.rawbroadphase_collidersWithAabbIntersectingAabb(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,W(a))}finally{K[J++]=void 0}}intersectionWithShape(e,t,n,r,i,a,o,s,c,l,u){try{let p=X.__wbindgen_add_to_stack_pointer(-16);U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,B),U(a,ka),X.rawbroadphase_intersectionWithShape(p,this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o,q(s)?2**53-1:s>>>0,!q(c),q(c)?0:c,!q(l),q(l)?0:l,W(u));var d=G().getInt32(p+0,!0),f=G().getFloat64(p+8,!0);return d===0?void 0:f}finally{X.__wbindgen_add_to_stack_pointer(16),K[J++]=void 0}}intersectionsWithPoint(e,t,n,r,i,a,o,s,c,l){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),X.rawbroadphase_intersectionsWithPoint(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,W(i),a,q(o)?2**53-1:o>>>0,!q(s),q(s)?0:s,!q(c),q(c)?0:c,W(l))}finally{K[J++]=void 0,K[J++]=void 0}}intersectionsWithRay(e,t,n,r,i,a,o,s,c,l,u,d,f){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,H),X.rawbroadphase_intersectionsWithRay(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a,o,W(s),c,q(l)?2**53-1:l>>>0,!q(u),q(u)?0:u,!q(d),q(d)?0:d,W(f))}finally{K[J++]=void 0,K[J++]=void 0}}intersectionsWithShape(e,t,n,r,i,a,o,s,c,l,u,d){try{U(e,va),U(t,Ea),U(n,ea),U(r,H),U(i,B),U(a,ka),X.rawbroadphase_intersectionsWithShape(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,W(o),s,q(c)?2**53-1:c>>>0,!q(l),q(l)?0:l,!q(u),q(u)?0:u,W(d))}finally{K[J++]=void 0,K[J++]=void 0}}constructor(){let e=X.rawbroadphase_new();return this.__wbg_ptr=e,mo.register(this,this.__wbg_ptr,this),this}projectPointAndGetFeature(e,t,n,r,i,a,o,s,c){try{U(e,va),U(t,Ea),U(n,ea),U(r,H);let l=X.rawbroadphase_projectPointAndGetFeature(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,q(a)?2**53-1:a>>>0,!q(o),q(o)?0:o,!q(s),q(s)?0:s,W(c));return l===0?void 0:xa.__wrap(l)}finally{K[J++]=void 0}}projectPoint(e,t,n,r,i,a,o,s,c,l){try{U(e,va),U(t,Ea),U(n,ea),U(r,H);let u=X.rawbroadphase_projectPoint(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a,q(o)?2**53-1:o>>>0,!q(s),q(s)?0:s,!q(c),q(c)?0:c,W(l));return u===0?void 0:xa.__wrap(u)}finally{K[J++]=void 0}}};Symbol.dispose&&(Zi.prototype[Symbol.dispose]=Zi.prototype.free);var Qi=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,ho.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawccdsolver_free(e,0)}constructor(){let e=X.rawccdsolver_new();return this.__wbg_ptr=e,ho.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(Qi.prototype[Symbol.dispose]=Qi.prototype.free);var $i=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,go.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawcharactercollision_free(e,0)}handle(){return X.rawcharactercollision_handle(this.__wbg_ptr)}constructor(){let e=X.rawcharactercollision_new();return this.__wbg_ptr=e,go.register(this,this.__wbg_ptr,this),this}toi(){return X.rawcharactercollision_toi(this.__wbg_ptr)}translationDeltaApplied(e){try{X.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}translationDeltaRemaining(e){try{X.rawcharactercollision_translationDeltaRemaining(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}worldNormal1(e){try{X.rawcharactercollision_worldNormal1(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}worldNormal2(e){try{X.rawcharactercollision_worldNormal2(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}worldWitness1(e){try{X.rawcharactercollision_worldWitness1(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}worldWitness2(e){try{X.rawcharactercollision_worldWitness2(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}};Symbol.dispose&&($i.prototype[Symbol.dispose]=$i.prototype.free);var ea=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,_o.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,_o.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawcolliderset_free(e,0)}coActiveCollisionTypes(e){return X.rawcolliderset_coActiveCollisionTypes(this.__wbg_ptr,e)}coActiveEvents(e){return X.rawcolliderset_coActiveEvents(this.__wbg_ptr,e)>>>0}coActiveHooks(e){return X.rawcolliderset_coActiveHooks(this.__wbg_ptr,e)>>>0}coCastCollider(e,t,n,r,i,a,o){U(t,H),U(r,H);let s=X.rawcolliderset_coCastCollider(this.__wbg_ptr,e,t.__wbg_ptr,n,r.__wbg_ptr,i,a,o);return s===0?void 0:ta.__wrap(s)}coCastRayAndGetNormal(e,t,n,r,i){U(t,H),U(n,H);let a=X.rawcolliderset_coCastRayAndGetNormal(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r,i);return a===0?void 0:Ta.__wrap(a)}coCastRay(e,t,n,r,i){return U(t,H),U(n,H),X.rawcolliderset_coCastRay(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r,i)}coCastShape(e,t,n,r,i,a,o,s,c){U(t,H),U(n,ka),U(r,H),U(i,B),U(a,H);let l=X.rawcolliderset_coCastShape(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o,s,c);return l===0?void 0:Aa.__wrap(l)}coCollisionGroups(e){return X.rawcolliderset_coCollisionGroups(this.__wbg_ptr,e)>>>0}coCombineVoxelStates(e,t,n,r,i){X.rawcolliderset_coCombineVoxelStates(this.__wbg_ptr,e,t,n,r,i)}coCompoundFlags(e){let t=X.rawcolliderset_coCompoundFlags(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coContactCollider(e,t,n){let r=X.rawcolliderset_coContactCollider(this.__wbg_ptr,e,t,n);return r===0?void 0:ja.__wrap(r)}coContactForceEventThreshold(e){return X.rawcolliderset_coContactForceEventThreshold(this.__wbg_ptr,e)}coContactShape(e,t,n,r,i){U(t,ka),U(n,H),U(r,B);let a=X.rawcolliderset_coContactShape(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i);return a===0?void 0:ja.__wrap(a)}coContactSkin(e){return X.rawcolliderset_coContactSkin(this.__wbg_ptr,e)}coContainsPoint(e,t){return U(t,H),X.rawcolliderset_coContainsPoint(this.__wbg_ptr,e,t.__wbg_ptr)!==0}coDensity(e){return X.rawcolliderset_coDensity(this.__wbg_ptr,e)}coFrictionCombineRule(e){return X.rawcolliderset_coFrictionCombineRule(this.__wbg_ptr,e)>>>0}coFriction(e){return X.rawcolliderset_coFriction(this.__wbg_ptr,e)}coHalfExtents(e,t){try{return X.rawcolliderset_coHalfExtents(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}coHalfHeight(e){let t=X.rawcolliderset_coHalfHeight(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coHalfspaceNormal(e,t){try{return X.rawcolliderset_coHalfspaceNormal(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}coHeightFieldFlags(e){let t=X.rawcolliderset_coHeightFieldFlags(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coHeightfieldHeights(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawcolliderset_coHeightfieldHeights(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getInt32(r+4,!0);let i;return t!==0&&(i=rs(t,n).slice(),X.__wbindgen_export2(t,n*4,4)),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}coHeightfieldNCols(e){let t=X.rawcolliderset_coHeightfieldNCols(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coHeightfieldNRows(e){let t=X.rawcolliderset_coHeightfieldNRows(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coHeightfieldScale(e,t){try{return X.rawcolliderset_coHeightfieldScale(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}coIndices(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawcolliderset_coIndices(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getInt32(r+4,!0);let i;return t!==0&&(i=os(t,n).slice(),X.__wbindgen_export2(t,n*4,4)),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}coIntersectsRay(e,t,n,r){return U(t,H),U(n,H),X.rawcolliderset_coIntersectsRay(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r)!==0}coIntersectsShape(e,t,n,r){return U(t,ka),U(n,H),U(r,B),X.rawcolliderset_coIntersectsShape(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr)!==0}coIsDeformable(e){return X.rawcolliderset_coIsDeformable(this.__wbg_ptr,e)!==0}coIsEnabled(e){return X.rawcolliderset_coIsEnabled(this.__wbg_ptr,e)!==0}coIsSensor(e){return X.rawcolliderset_coIsSensor(this.__wbg_ptr,e)!==0}coMass(e){return X.rawcolliderset_coMass(this.__wbg_ptr,e)}coParent(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawcolliderset_coParent(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getFloat64(r+8,!0);return t===0?void 0:n}finally{X.__wbindgen_add_to_stack_pointer(16)}}coPolylineFlags(e){let t=X.rawcolliderset_coPolylineFlags(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coProjectPoint(e,t,n){U(t,H);let r=X.rawcolliderset_coProjectPoint(this.__wbg_ptr,e,t.__wbg_ptr,n);return Sa.__wrap(r)}coPropagateVoxelChange(e,t,n,r,i,a,o,s){X.rawcolliderset_coPropagateVoxelChange(this.__wbg_ptr,e,t,n,r,i,a,o,s)}coRadius(e){let t=X.rawcolliderset_coRadius(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coRestitutionCombineRule(e){return X.rawcolliderset_coRestitutionCombineRule(this.__wbg_ptr,e)>>>0}coRestitution(e){return X.rawcolliderset_coRestitution(this.__wbg_ptr,e)}coRotationWrtParent(e,t){try{return X.rawcolliderset_coRotationWrtParent(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}coRotation(e,t){try{X.rawcolliderset_coRotation(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}coRoundRadius(e){let t=X.rawcolliderset_coRoundRadius(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coSetActiveCollisionTypes(e,t){X.rawcolliderset_coSetActiveCollisionTypes(this.__wbg_ptr,e,t)}coSetActiveEvents(e,t){X.rawcolliderset_coSetActiveEvents(this.__wbg_ptr,e,t)}coSetActiveHooks(e,t){X.rawcolliderset_coSetActiveHooks(this.__wbg_ptr,e,t)}coSetCollisionGroups(e,t){X.rawcolliderset_coSetCollisionGroups(this.__wbg_ptr,e,t)}coSetContactForceEventThreshold(e,t){X.rawcolliderset_coSetContactForceEventThreshold(this.__wbg_ptr,e,t)}coSetContactSkin(e,t){X.rawcolliderset_coSetContactSkin(this.__wbg_ptr,e,t)}coSetDensity(e,t){X.rawcolliderset_coSetDensity(this.__wbg_ptr,e,t)}coSetEnabled(e,t){X.rawcolliderset_coSetEnabled(this.__wbg_ptr,e,t)}coSetFrictionCombineRule(e,t){X.rawcolliderset_coSetFrictionCombineRule(this.__wbg_ptr,e,t)}coSetFriction(e,t){X.rawcolliderset_coSetFriction(this.__wbg_ptr,e,t)}coSetHalfExtents(e,t){U(t,H),X.rawcolliderset_coSetHalfExtents(this.__wbg_ptr,e,t.__wbg_ptr)}coSetHalfHeight(e,t){X.rawcolliderset_coSetHalfHeight(this.__wbg_ptr,e,t)}coSetMassProperties(e,t,n,r,i){U(n,H),U(r,H),U(i,B),X.rawcolliderset_coSetMassProperties(this.__wbg_ptr,e,t,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr)}coSetMass(e,t){X.rawcolliderset_coSetMass(this.__wbg_ptr,e,t)}coSetRadius(e,t){X.rawcolliderset_coSetRadius(this.__wbg_ptr,e,t)}coSetRestitutionCombineRule(e,t){X.rawcolliderset_coSetRestitutionCombineRule(this.__wbg_ptr,e,t)}coSetRestitution(e,t){X.rawcolliderset_coSetRestitution(this.__wbg_ptr,e,t)}coSetRotationWrtParent(e,t,n,r,i){X.rawcolliderset_coSetRotationWrtParent(this.__wbg_ptr,e,t,n,r,i)}coSetRotation(e,t,n,r,i){X.rawcolliderset_coSetRotation(this.__wbg_ptr,e,t,n,r,i)}coSetRoundRadius(e,t){X.rawcolliderset_coSetRoundRadius(this.__wbg_ptr,e,t)}coSetSensor(e,t){X.rawcolliderset_coSetSensor(this.__wbg_ptr,e,t)}coSetShape(e,t){U(t,ka),X.rawcolliderset_coSetShape(this.__wbg_ptr,e,t.__wbg_ptr)}coSetSolverGroups(e,t){X.rawcolliderset_coSetSolverGroups(this.__wbg_ptr,e,t)}coSetTranslationWrtParent(e,t,n,r){X.rawcolliderset_coSetTranslationWrtParent(this.__wbg_ptr,e,t,n,r)}coSetTranslation(e,t,n,r){X.rawcolliderset_coSetTranslation(this.__wbg_ptr,e,t,n,r)}coSetVoxel(e,t,n,r,i){X.rawcolliderset_coSetVoxel(this.__wbg_ptr,e,t,n,r,i)}coShapeType(e){return X.rawcolliderset_coShapeType(this.__wbg_ptr,e)}coShape(e){let t=X.rawcolliderset_coShape(this.__wbg_ptr,e);return ka.__wrap(t)}coSoftBody(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawcolliderset_coSoftBody(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getFloat64(r+8,!0);return t===0?void 0:n}finally{X.__wbindgen_add_to_stack_pointer(16)}}coSolverGroups(e){return X.rawcolliderset_coSolverGroups(this.__wbg_ptr,e)>>>0}coTranslationWrtParent(e,t){try{return X.rawcolliderset_coTranslationWrtParent(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}coTranslation(e,t){try{X.rawcolliderset_coTranslation(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}coTriMeshFlags(e){let t=X.rawcolliderset_coTriMeshFlags(this.__wbg_ptr,e);return t===2**53-1?void 0:t}coVertices(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawcolliderset_coVertices(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getInt32(r+4,!0);let i;return t!==0&&(i=rs(t,n).slice(),X.__wbindgen_export2(t,n*4,4)),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}coVolume(e){return X.rawcolliderset_coVolume(this.__wbg_ptr,e)}coVoxelData(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawcolliderset_coVoxelData(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getInt32(r+4,!0);let i;return t!==0&&(i=as(t,n).slice(),X.__wbindgen_export2(t,n*4,4)),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}coVoxelSize(e){let t=X.rawcolliderset_coVoxelSize(this.__wbg_ptr,e);return t===0?void 0:H.__wrap(t)}contains(e){return X.rawcolliderset_contains(this.__wbg_ptr,e)!==0}createCollider(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w){try{let D=X.__wbindgen_add_to_stack_pointer(-16);U(t,ka),U(n,H),U(r,B),U(o,H),U(s,H),U(c,B),U(w,Ea),X.rawcolliderset_createCollider(D,this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a,o.__wbg_ptr,s.__wbg_ptr,c.__wbg_ptr,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w.__wbg_ptr);var T=G().getInt32(D+0,!0),E=G().getFloat64(D+8,!0);return T===0?void 0:E}finally{X.__wbindgen_add_to_stack_pointer(16)}}createDeformableCollider(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O){try{let ne=X.__wbindgen_add_to_stack_pointer(-16);U(t,ka),U(n,H),U(r,B),U(o,H),U(s,H),U(c,B);let k=Cs(C,X.__wbindgen_export3),re=Y;U(D,Ea),U(O,Pa),X.rawcolliderset_createDeformableCollider(ne,this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a,o.__wbg_ptr,s.__wbg_ptr,c.__wbg_ptr,l,u,d,f,p,m,h,g,_,v,y,b,x,S,k,re,w,T,E,D.__wbg_ptr,O.__wbg_ptr);var ee=G().getInt32(ne+0,!0),te=G().getFloat64(ne+8,!0);return ee===0?void 0:te}finally{X.__wbindgen_add_to_stack_pointer(16)}}forEachColliderHandle(e){try{X.rawcolliderset_forEachColliderHandle(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}isHandleValid(e){return X.rawcolliderset_isHandleValid(this.__wbg_ptr,e)!==0}len(){return X.rawcolliderset_len(this.__wbg_ptr)>>>0}constructor(){let e=X.rawcolliderset_new();return this.__wbg_ptr=e,_o.register(this,this.__wbg_ptr,this),this}remove(e,t,n,r,i){U(t,pa),U(n,Ea),U(r,Pa),X.rawcolliderset_remove(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i)}};Symbol.dispose&&(ea.prototype[Symbol.dispose]=ea.prototype.free);var ta=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,vo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,vo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawcollidershapecasthit_free(e,0)}colliderHandle(){return X.rawcollidershapecasthit_colliderHandle(this.__wbg_ptr)}getComponents(e){try{X.rawcollidershapecasthit_getComponents(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}};Symbol.dispose&&(ta.prototype[Symbol.dispose]=ta.prototype.free);var na=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,yo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,yo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawcontactforceevent_free(e,0)}collider1(){return X.rawcontactforceevent_collider1(this.__wbg_ptr)}collider2(){return X.rawcontactforceevent_collider2(this.__wbg_ptr)}max_force_direction(e){try{X.rawcontactforceevent_max_force_direction(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}max_force_magnitude(){return X.rawcontactforceevent_max_force_magnitude(this.__wbg_ptr)}total_force(e){try{X.rawcontactforceevent_total_force(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}total_force_magnitude(){return X.rawcontactforceevent_total_force_magnitude(this.__wbg_ptr)}};Symbol.dispose&&(na.prototype[Symbol.dispose]=na.prototype.free);var ra=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,bo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,bo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawcontactmanifold_free(e,0)}contact_dist(e){return X.rawcontactmanifold_contact_dist(this.__wbg_ptr,e)}contact_fid1(e){return X.rawcontactmanifold_contact_fid1(this.__wbg_ptr,e)>>>0}contact_fid2(e){return X.rawcontactmanifold_contact_fid2(this.__wbg_ptr,e)>>>0}contact_impulse(e){return X.rawcontactmanifold_contact_impulse(this.__wbg_ptr,e)}contact_local_p1(e,t){try{return X.rawcontactmanifold_contact_local_p1(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}contact_local_p2(e,t){try{return X.rawcontactmanifold_contact_local_p2(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}contact_tangent_impulse_x(e){return X.rawcontactmanifold_contact_tangent_impulse_x(this.__wbg_ptr,e)}contact_tangent_impulse_y(e){return X.rawcontactmanifold_contact_tangent_impulse_y(this.__wbg_ptr,e)}friction(){return X.rawcontactmanifold_friction(this.__wbg_ptr)}local_n1(e){try{X.rawcontactmanifold_local_n1(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}local_n2(e){try{X.rawcontactmanifold_local_n2(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}normal(e){try{X.rawcontactmanifold_normal(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}num_contacts(){return X.rawcontactmanifold_num_contacts(this.__wbg_ptr)>>>0}num_solver_contacts(){return X.rawcontactmanifold_num_solver_contacts(this.__wbg_ptr)>>>0}restitution(){return X.rawcontactmanifold_restitution(this.__wbg_ptr)}solver_contact_dist(e){return X.rawcontactmanifold_solver_contact_dist(this.__wbg_ptr,e)}solver_contact_point(e,t,n){try{return U(e,Ea),X.rawcontactmanifold_solver_contact_point(this.__wbg_ptr,e.__wbg_ptr,t,W(n))!==0}finally{K[J++]=void 0}}solver_contact_tangent_velocity(e,t){try{X.rawcontactmanifold_solver_contact_tangent_velocity(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}subshape1(){return X.rawcontactmanifold_subshape1(this.__wbg_ptr)>>>0}subshape2(){return X.rawcontactmanifold_subshape2(this.__wbg_ptr)>>>0}};Symbol.dispose&&(ra.prototype[Symbol.dispose]=ra.prototype.free);var ia=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,xo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,xo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawcontactpair_free(e,0)}collider1(){return X.rawcontactpair_collider1(this.__wbg_ptr)}collider2(){return X.rawcontactpair_collider2(this.__wbg_ptr)}contactManifold(e){let t=X.rawcontactpair_contactManifold(this.__wbg_ptr,e);return t===0?void 0:ra.__wrap(t)}numContactManifolds(){return X.rawcontactpair_numContactManifolds(this.__wbg_ptr)>>>0}};Symbol.dispose&&(ia.prototype[Symbol.dispose]=ia.prototype.free);var aa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,So.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,So.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawconvexmeshdata_free(e,0)}get indices(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.__wbg_get_rawconvexmeshdata_indices(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}get vertices(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.__wbg_get_rawconvexmeshdata_vertices(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=rs(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}set indices(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.__wbg_set_rawconvexmeshdata_indices(this.__wbg_ptr,t,n)}set vertices(e){let t=ws(e,X.__wbindgen_export3),n=Y;X.__wbg_set_rawconvexmeshdata_vertices(this.__wbg_ptr,t,n)}};Symbol.dispose&&(aa.prototype[Symbol.dispose]=aa.prototype.free);var oa=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Co.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawdebugrenderpipeline_free(e,0)}colors(){return Es(X.rawdebugrenderpipeline_colors(this.__wbg_ptr))}constructor(){let e=X.rawdebugrenderpipeline_new();return this.__wbg_ptr=e,Co.register(this,this.__wbg_ptr,this),this}render(e,t,n,r,i,a,o,s){try{U(e,Ea),U(t,ea),U(n,Pa),U(r,da),U(i,_a),U(a,va),X.rawdebugrenderpipeline_render(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o,W(s))}finally{K[J++]=void 0}}vertices(){return Es(X.rawdebugrenderpipeline_vertices(this.__wbg_ptr))}};Symbol.dispose&&(oa.prototype[Symbol.dispose]=oa.prototype.free);var sa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,wo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,wo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawdeserializedworld_free(e,0)}takeBodies(){let e=X.rawdeserializedworld_takeBodies(this.__wbg_ptr);return e===0?void 0:Ea.__wrap(e)}takeBroadPhase(){let e=X.rawdeserializedworld_takeBroadPhase(this.__wbg_ptr);return e===0?void 0:Zi.__wrap(e)}takeColliders(){let e=X.rawdeserializedworld_takeColliders(this.__wbg_ptr);return e===0?void 0:ea.__wrap(e)}takeGravity(){let e=X.rawdeserializedworld_takeGravity(this.__wbg_ptr);return e===0?void 0:H.__wrap(e)}takeImpulseJoints(){let e=X.rawdeserializedworld_takeImpulseJoints(this.__wbg_ptr);return e===0?void 0:da.__wrap(e)}takeIntegrationParameters(){let e=X.rawdeserializedworld_takeIntegrationParameters(this.__wbg_ptr);return e===0?void 0:fa.__wrap(e)}takeIslandManager(){let e=X.rawdeserializedworld_takeIslandManager(this.__wbg_ptr);return e===0?void 0:pa.__wrap(e)}takeMultibodyJoints(){let e=X.rawdeserializedworld_takeMultibodyJoints(this.__wbg_ptr);return e===0?void 0:_a.__wrap(e)}takeNarrowPhase(){let e=X.rawdeserializedworld_takeNarrowPhase(this.__wbg_ptr);return e===0?void 0:va.__wrap(e)}takeSoftBodies(){let e=X.rawdeserializedworld_takeSoftBodies(this.__wbg_ptr);return e===0?void 0:Pa.__wrap(e)}};Symbol.dispose&&(sa.prototype[Symbol.dispose]=sa.prototype.free);var ca=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,To.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawdynamicraycastvehiclecontroller_free(e,0)}add_wheel(e,t,n,r,i){U(e,H),U(t,H),U(n,H),X.rawdynamicraycastvehiclecontroller_add_wheel(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r,i)}chassis(){return X.rawdynamicraycastvehiclecontroller_chassis(this.__wbg_ptr)}current_vehicle_speed(){return X.rawdynamicraycastvehiclecontroller_current_vehicle_speed(this.__wbg_ptr)}index_forward_axis(){return X.rawdynamicraycastvehiclecontroller_index_forward_axis(this.__wbg_ptr)>>>0}index_up_axis(){return X.rawdynamicraycastvehiclecontroller_index_up_axis(this.__wbg_ptr)>>>0}constructor(e){let t=X.rawdynamicraycastvehiclecontroller_new(e);return this.__wbg_ptr=t,To.register(this,this.__wbg_ptr,this),this}num_wheels(){return X.rawdynamicraycastvehiclecontroller_num_wheels(this.__wbg_ptr)>>>0}set_index_forward_axis(e){X.rawdynamicraycastvehiclecontroller_set_index_forward_axis(this.__wbg_ptr,e)}set_index_up_axis(e){X.rawdynamicraycastvehiclecontroller_set_index_up_axis(this.__wbg_ptr,e)}set_wheel_axle_cs(e,t){U(t,H),X.rawdynamicraycastvehiclecontroller_set_wheel_axle_cs(this.__wbg_ptr,e,t.__wbg_ptr)}set_wheel_brake(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_brake(this.__wbg_ptr,e,t)}set_wheel_chassis_connection_point_cs(e,t){U(t,H),X.rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs(this.__wbg_ptr,e,t.__wbg_ptr)}set_wheel_direction_cs(e,t){U(t,H),X.rawdynamicraycastvehiclecontroller_set_wheel_direction_cs(this.__wbg_ptr,e,t.__wbg_ptr)}set_wheel_engine_force(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_engine_force(this.__wbg_ptr,e,t)}set_wheel_friction_slip(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_friction_slip(this.__wbg_ptr,e,t)}set_wheel_max_suspension_force(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force(this.__wbg_ptr,e,t)}set_wheel_max_suspension_travel(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel(this.__wbg_ptr,e,t)}set_wheel_radius(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_radius(this.__wbg_ptr,e,t)}set_wheel_side_friction_stiffness(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness(this.__wbg_ptr,e,t)}set_wheel_steering(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_steering(this.__wbg_ptr,e,t)}set_wheel_suspension_compression(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression(this.__wbg_ptr,e,t)}set_wheel_suspension_relaxation(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation(this.__wbg_ptr,e,t)}set_wheel_suspension_rest_length(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length(this.__wbg_ptr,e,t)}set_wheel_suspension_stiffness(e,t){X.rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness(this.__wbg_ptr,e,t)}update_vehicle(e,t,n,r,i,a,o,s){try{U(t,Zi),U(n,va),U(r,Ea),U(i,ea),X.rawdynamicraycastvehiclecontroller_update_vehicle(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a,q(o)?2**53-1:o>>>0,W(s))}finally{K[J++]=void 0}}wheel_axle_cs(e,t){try{return X.rawdynamicraycastvehiclecontroller_wheel_axle_cs(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}wheel_brake(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_brake(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_chassis_connection_point_cs(e,t){try{return X.rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}wheel_contact_normal_ws(e,t){try{return X.rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}wheel_contact_point_ws(e,t){try{return X.rawdynamicraycastvehiclecontroller_wheel_contact_point_ws(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}wheel_direction_cs(e,t){try{return X.rawdynamicraycastvehiclecontroller_wheel_direction_cs(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}wheel_engine_force(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_engine_force(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_forward_impulse(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_forward_impulse(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_friction_slip(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_friction_slip(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_ground_object(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawdynamicraycastvehiclecontroller_wheel_ground_object(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getFloat64(r+8,!0);return t===0?void 0:n}finally{X.__wbindgen_add_to_stack_pointer(16)}}wheel_hard_point_ws(e,t){try{return X.rawdynamicraycastvehiclecontroller_wheel_hard_point_ws(this.__wbg_ptr,e,W(t))!==0}finally{K[J++]=void 0}}wheel_is_in_contact(e){return X.rawdynamicraycastvehiclecontroller_wheel_is_in_contact(this.__wbg_ptr,e)!==0}wheel_max_suspension_force(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_max_suspension_force(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_max_suspension_travel(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_radius(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_radius(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_rotation(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_rotation(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_side_friction_stiffness(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_side_impulse(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_side_impulse(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_steering(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_steering(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_suspension_compression(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_suspension_compression(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_suspension_force(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_suspension_force(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_suspension_length(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_suspension_length(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_suspension_relaxation(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_suspension_rest_length(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length(this.__wbg_ptr,e);return t===2**53-1?void 0:t}wheel_suspension_stiffness(e){let t=X.rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness(this.__wbg_ptr,e);return t===2**53-1?void 0:t}};Symbol.dispose&&(ca.prototype[Symbol.dispose]=ca.prototype.free);var la=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Eo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_raweventqueue_free(e,0)}clear(){X.raweventqueue_clear(this.__wbg_ptr)}drainCollisionEvents(e){try{X.raweventqueue_drainCollisionEvents(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}drainContactForceEvents(e){try{X.raweventqueue_drainContactForceEvents(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}drainSoftBodyTearEvents(e){try{X.raweventqueue_drainSoftBodyTearEvents(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}constructor(e){let t=X.raweventqueue_new(e);return this.__wbg_ptr=t,Eo.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(la.prototype[Symbol.dispose]=la.prototype.free),Object.freeze({Vertex:0,0:`Vertex`,Edge:1,1:`Edge`,Face:2,2:`Face`,Unknown:3,3:`Unknown`});var ua=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Do.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Do.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawgenericjoint_free(e,0)}static fixed(t,n,r,i){U(t,H),U(n,B),U(r,H),U(i,B);let a=X.rawgenericjoint_fixed(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr);return e.__wrap(a)}static generic(t,n,r,i){U(t,H),U(n,H),U(r,H);let a=X.rawgenericjoint_generic(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i);return a===0?void 0:e.__wrap(a)}static prismatic(t,n,r,i,a,o){U(t,H),U(n,H),U(r,H);let s=X.rawgenericjoint_prismatic(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a,o);return s===0?void 0:e.__wrap(s)}static revoluteWithAxes(t,n,r,i){U(t,H),U(n,H),U(r,H),U(i,H);let a=X.rawgenericjoint_revoluteWithAxes(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr);return a===0?void 0:e.__wrap(a)}static revolute(t,n,r){U(t,H),U(n,H),U(r,H);let i=X.rawgenericjoint_revolute(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr);return i===0?void 0:e.__wrap(i)}static rope(t,n,r){U(n,H),U(r,H);let i=X.rawgenericjoint_rope(t,n.__wbg_ptr,r.__wbg_ptr);return e.__wrap(i)}static spherical(t,n){U(t,H),U(n,H);let r=X.rawgenericjoint_spherical(t.__wbg_ptr,n.__wbg_ptr);return e.__wrap(r)}static spring(t,n,r,i,a){U(i,H),U(a,H);let o=X.rawgenericjoint_spring(t,n,r,i.__wbg_ptr,a.__wbg_ptr);return e.__wrap(o)}};Symbol.dispose&&(ua.prototype[Symbol.dispose]=ua.prototype.free);var da=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Oo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Oo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawimpulsejointset_free(e,0)}contains(e){return X.rawimpulsejointset_contains(this.__wbg_ptr,e)!==0}createJoint(e,t,n,r){return U(e,ua),X.rawimpulsejointset_createJoint(this.__wbg_ptr,e.__wbg_ptr,t,n,r)}forEachJointAttachedToRigidBody(e,t){try{X.rawimpulsejointset_forEachJointAttachedToRigidBody(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}forEachJointHandle(e){try{X.rawimpulsejointset_forEachJointHandle(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}jointAnchor1(e,t){try{X.rawimpulsejointset_jointAnchor1(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}jointAnchor2(e,t){try{X.rawimpulsejointset_jointAnchor2(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}jointBodyHandle1(e){return X.rawimpulsejointset_jointBodyHandle1(this.__wbg_ptr,e)}jointBodyHandle2(e){return X.rawimpulsejointset_jointBodyHandle2(this.__wbg_ptr,e)}jointConfigureMotorModel(e,t,n){X.rawimpulsejointset_jointConfigureMotorModel(this.__wbg_ptr,e,t,n)}jointConfigureMotorPosition(e,t,n,r,i){X.rawimpulsejointset_jointConfigureMotorPosition(this.__wbg_ptr,e,t,n,r,i)}jointConfigureMotorVelocity(e,t,n,r){X.rawimpulsejointset_jointConfigureMotorVelocity(this.__wbg_ptr,e,t,n,r)}jointConfigureMotor(e,t,n,r,i,a){X.rawimpulsejointset_jointConfigureMotor(this.__wbg_ptr,e,t,n,r,i,a)}jointContactsEnabled(e){return X.rawimpulsejointset_jointContactsEnabled(this.__wbg_ptr,e)!==0}jointFrameX1(e,t){try{X.rawimpulsejointset_jointFrameX1(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}jointFrameX2(e,t){try{X.rawimpulsejointset_jointFrameX2(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}jointLimitsEnabled(e,t){return X.rawimpulsejointset_jointLimitsEnabled(this.__wbg_ptr,e,t)!==0}jointLimitsMax(e,t){return X.rawimpulsejointset_jointLimitsMax(this.__wbg_ptr,e,t)}jointLimitsMin(e,t){return X.rawimpulsejointset_jointLimitsMin(this.__wbg_ptr,e,t)}jointSetAnchor1(e,t){U(t,H),X.rawimpulsejointset_jointSetAnchor1(this.__wbg_ptr,e,t.__wbg_ptr)}jointSetAnchor2(e,t){U(t,H),X.rawimpulsejointset_jointSetAnchor2(this.__wbg_ptr,e,t.__wbg_ptr)}jointSetContactsEnabled(e,t){X.rawimpulsejointset_jointSetContactsEnabled(this.__wbg_ptr,e,t)}jointSetFrameX1(e,t){U(t,B),X.rawimpulsejointset_jointSetFrameX1(this.__wbg_ptr,e,t.__wbg_ptr)}jointSetFrameX2(e,t){U(t,B),X.rawimpulsejointset_jointSetFrameX2(this.__wbg_ptr,e,t.__wbg_ptr)}jointSetLimits(e,t,n,r){X.rawimpulsejointset_jointSetLimits(this.__wbg_ptr,e,t,n,r)}jointSetLocalFrame1(e,t,n){U(t,H),U(n,B),X.rawimpulsejointset_jointSetLocalFrame1(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr)}jointSetLocalFrame2(e,t,n){U(t,H),U(n,B),X.rawimpulsejointset_jointSetLocalFrame2(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr)}jointSetMotorMaxForce(e,t,n){X.rawimpulsejointset_jointSetMotorMaxForce(this.__wbg_ptr,e,t,n)}jointType(e){return X.rawimpulsejointset_jointType(this.__wbg_ptr,e)}len(){return X.rawimpulsejointset_len(this.__wbg_ptr)>>>0}constructor(){let e=X.rawimpulsejointset_new();return this.__wbg_ptr=e,Oo.register(this,this.__wbg_ptr,this),this}remove(e,t){X.rawimpulsejointset_remove(this.__wbg_ptr,e,t)}};Symbol.dispose&&(da.prototype[Symbol.dispose]=da.prototype.free);var fa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,ko.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,ko.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawintegrationparameters_free(e,0)}get contact_erp(){return X.rawintegrationparameters_contact_erp(this.__wbg_ptr)}get dt(){return X.rawintegrationparameters_dt(this.__wbg_ptr)}get lengthUnit(){return X.rawintegrationparameters_lengthUnit(this.__wbg_ptr)}get maxCcdSubsteps(){return X.rawintegrationparameters_maxCcdSubsteps(this.__wbg_ptr)>>>0}constructor(){let e=X.rawintegrationparameters_new();return this.__wbg_ptr=e,ko.register(this,this.__wbg_ptr,this),this}get normalizedAllowedLinearError(){return X.rawintegrationparameters_normalizedAllowedLinearError(this.__wbg_ptr)}get normalizedPredictionDistance(){return X.rawintegrationparameters_normalizedPredictionDistance(this.__wbg_ptr)}get numInternalPgsIterations(){return X.rawintegrationparameters_numInternalPgsIterations(this.__wbg_ptr)>>>0}get numSolverIterations(){return X.rawintegrationparameters_numSolverIterations(this.__wbg_ptr)>>>0}set contact_natural_frequency(e){X.rawintegrationparameters_set_contact_natural_frequency(this.__wbg_ptr,e)}set dt(e){X.rawintegrationparameters_set_dt(this.__wbg_ptr,e)}set lengthUnit(e){X.rawintegrationparameters_set_lengthUnit(this.__wbg_ptr,e)}set maxCcdSubsteps(e){X.rawintegrationparameters_set_maxCcdSubsteps(this.__wbg_ptr,e)}set normalizedAllowedLinearError(e){X.rawintegrationparameters_set_normalizedAllowedLinearError(this.__wbg_ptr,e)}set normalizedPredictionDistance(e){X.rawintegrationparameters_set_normalizedPredictionDistance(this.__wbg_ptr,e)}set numInternalPgsIterations(e){X.rawintegrationparameters_set_numInternalPgsIterations(this.__wbg_ptr,e)}set numSolverIterations(e){X.rawintegrationparameters_set_numSolverIterations(this.__wbg_ptr,e)}set softBodiesContactStiffening(e){X.rawintegrationparameters_set_softBodiesContactStiffening(this.__wbg_ptr,e)}set softBodiesFemLinearTolerance(e){X.rawintegrationparameters_set_softBodiesFemLinearTolerance(this.__wbg_ptr,e)}set softBodiesFemMaxDenseDofs(e){X.rawintegrationparameters_set_softBodiesFemMaxDenseDofs(this.__wbg_ptr,e)}set softBodiesFemMaxLinearIterations(e){X.rawintegrationparameters_set_softBodiesFemMaxLinearIterations(this.__wbg_ptr,e)}set softBodiesMaxExtraSubsteps(e){X.rawintegrationparameters_set_softBodiesMaxExtraSubsteps(this.__wbg_ptr,e)}set softBodiesRecovery(e){U(e,Ia),X.rawintegrationparameters_set_softBodiesRecovery(this.__wbg_ptr,e.__wbg_ptr)}set softBodiesResweepStrain(e){X.rawintegrationparameters_set_softBodiesResweepStrain(this.__wbg_ptr,e)}get softBodiesContactStiffening(){return X.rawintegrationparameters_softBodiesContactStiffening(this.__wbg_ptr)}get softBodiesFemLinearTolerance(){return X.rawintegrationparameters_softBodiesFemLinearTolerance(this.__wbg_ptr)}get softBodiesFemMaxDenseDofs(){return X.rawintegrationparameters_softBodiesFemMaxDenseDofs(this.__wbg_ptr)>>>0}get softBodiesFemMaxLinearIterations(){return X.rawintegrationparameters_softBodiesFemMaxLinearIterations(this.__wbg_ptr)>>>0}get softBodiesMaxExtraSubsteps(){return X.rawintegrationparameters_softBodiesMaxExtraSubsteps(this.__wbg_ptr)>>>0}get softBodiesRecovery(){let e=X.rawintegrationparameters_softBodiesRecovery(this.__wbg_ptr);return Ia.__wrap(e)}get softBodiesResweepStrain(){return X.rawintegrationparameters_softBodiesResweepStrain(this.__wbg_ptr)}};Symbol.dispose&&(fa.prototype[Symbol.dispose]=fa.prototype.free);var pa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Ao.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Ao.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawislandmanager_free(e,0)}forEachActiveRigidBodyHandle(e){try{X.rawislandmanager_forEachActiveRigidBodyHandle(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}constructor(){let e=X.rawislandmanager_new();return this.__wbg_ptr=e,Ao.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(pa.prototype[Symbol.dispose]=pa.prototype.free);var ma=Object.freeze({LinX:0,0:`LinX`,LinY:1,1:`LinY`,LinZ:2,2:`LinZ`,AngX:3,3:`AngX`,AngY:4,4:`AngY`,AngZ:5,5:`AngZ`}),ha=Object.freeze({Revolute:0,0:`Revolute`,Fixed:1,1:`Fixed`,Prismatic:2,2:`Prismatic`,Rope:3,3:`Rope`,Spring:4,4:`Spring`,Spherical:5,5:`Spherical`,Generic:6,6:`Generic`}),ga=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,jo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawkinematiccharactercontroller_free(e,0)}autostepEnabled(){return X.rawkinematiccharactercontroller_autostepEnabled(this.__wbg_ptr)!==0}autostepIncludesDynamicBodies(){let e=X.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.__wbg_ptr);return e===16777215?void 0:e!==0}autostepMaxHeight(){let e=X.rawkinematiccharactercontroller_autostepMaxHeight(this.__wbg_ptr);return e===2**53-1?void 0:e}autostepMinWidth(){let e=X.rawkinematiccharactercontroller_autostepMinWidth(this.__wbg_ptr);return e===2**53-1?void 0:e}computeColliderMovement(e,t,n,r,i,a,o,s,c,l,u,d){try{U(t,Zi),U(n,va),U(r,Ea),U(i,ea),U(o,H),X.rawkinematiccharactercontroller_computeColliderMovement(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a,o.__wbg_ptr,s,q(c)?2**53-1:Math.fround(c),l,q(u)?2**53-1:u>>>0,W(d))}finally{K[J++]=void 0}}computedCollision(e,t){return U(t,$i),X.rawkinematiccharactercontroller_computedCollision(this.__wbg_ptr,e,t.__wbg_ptr)!==0}computedGrounded(){return X.rawkinematiccharactercontroller_computedGrounded(this.__wbg_ptr)!==0}computedMovement(e){try{X.rawkinematiccharactercontroller_computedMovement(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}disableAutostep(){X.rawkinematiccharactercontroller_disableAutostep(this.__wbg_ptr)}disableSnapToGround(){X.rawkinematiccharactercontroller_disableSnapToGround(this.__wbg_ptr)}enableAutostep(e,t,n){X.rawkinematiccharactercontroller_enableAutostep(this.__wbg_ptr,e,t,n)}enableSnapToGround(e){X.rawkinematiccharactercontroller_enableSnapToGround(this.__wbg_ptr,e)}maxSlopeClimbAngle(){return X.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.__wbg_ptr)}minSlopeSlideAngle(){return X.rawkinematiccharactercontroller_minSlopeSlideAngle(this.__wbg_ptr)}constructor(e){let t=X.rawkinematiccharactercontroller_new(e);return this.__wbg_ptr=t,jo.register(this,this.__wbg_ptr,this),this}normalNudgeFactor(){return X.rawkinematiccharactercontroller_normalNudgeFactor(this.__wbg_ptr)}numComputedCollisions(){return X.rawkinematiccharactercontroller_numComputedCollisions(this.__wbg_ptr)>>>0}offset(){return X.rawkinematiccharactercontroller_offset(this.__wbg_ptr)}setMaxSlopeClimbAngle(e){X.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.__wbg_ptr,e)}setMinSlopeSlideAngle(e){X.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.__wbg_ptr,e)}setNormalNudgeFactor(e){X.rawkinematiccharactercontroller_setNormalNudgeFactor(this.__wbg_ptr,e)}setOffset(e){X.rawkinematiccharactercontroller_setOffset(this.__wbg_ptr,e)}setSlideEnabled(e){X.rawkinematiccharactercontroller_setSlideEnabled(this.__wbg_ptr,e)}setUp(e){U(e,H),X.rawkinematiccharactercontroller_setUp(this.__wbg_ptr,e.__wbg_ptr)}slideEnabled(){return X.rawkinematiccharactercontroller_slideEnabled(this.__wbg_ptr)!==0}snapToGroundDistance(){let e=X.rawkinematiccharactercontroller_snapToGroundDistance(this.__wbg_ptr);return e===2**53-1?void 0:e}snapToGroundEnabled(){return X.rawkinematiccharactercontroller_snapToGroundEnabled(this.__wbg_ptr)!==0}up(){let e=X.rawkinematiccharactercontroller_up(this.__wbg_ptr);return H.__wrap(e)}};Symbol.dispose&&(ga.prototype[Symbol.dispose]=ga.prototype.free),Object.freeze({AccelerationBased:0,0:`AccelerationBased`,ForceBased:1,1:`ForceBased`});var _a=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Mo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Mo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawmultibodyjointset_free(e,0)}contains(e){return X.rawmultibodyjointset_contains(this.__wbg_ptr,e)!==0}createJoint(e,t,n,r){return U(e,ua),X.rawmultibodyjointset_createJoint(this.__wbg_ptr,e.__wbg_ptr,t,n,r)}forEachJointAttachedToRigidBody(e,t){try{X.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}forEachJointHandle(e){try{X.rawmultibodyjointset_forEachJointHandle(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}jointAnchor1(e){let t=X.rawmultibodyjointset_jointAnchor1(this.__wbg_ptr,e);return H.__wrap(t)}jointAnchor2(e){let t=X.rawmultibodyjointset_jointAnchor2(this.__wbg_ptr,e);return H.__wrap(t)}jointContactsEnabled(e){return X.rawmultibodyjointset_jointContactsEnabled(this.__wbg_ptr,e)!==0}jointFrameX1(e){let t=X.rawmultibodyjointset_jointFrameX1(this.__wbg_ptr,e);return B.__wrap(t)}jointFrameX2(e){let t=X.rawmultibodyjointset_jointFrameX2(this.__wbg_ptr,e);return B.__wrap(t)}jointLimitsEnabled(e,t){return X.rawmultibodyjointset_jointLimitsEnabled(this.__wbg_ptr,e,t)!==0}jointLimitsMax(e,t){return X.rawmultibodyjointset_jointLimitsMax(this.__wbg_ptr,e,t)}jointLimitsMin(e,t){return X.rawmultibodyjointset_jointLimitsMin(this.__wbg_ptr,e,t)}jointSetContactsEnabled(e,t){X.rawmultibodyjointset_jointSetContactsEnabled(this.__wbg_ptr,e,t)}jointType(e){return X.rawmultibodyjointset_jointType(this.__wbg_ptr,e)}constructor(){let e=X.rawmultibodyjointset_new();return this.__wbg_ptr=e,Mo.register(this,this.__wbg_ptr,this),this}remove(e,t){X.rawmultibodyjointset_remove(this.__wbg_ptr,e,t)}};Symbol.dispose&&(_a.prototype[Symbol.dispose]=_a.prototype.free);var va=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,No.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,No.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawnarrowphase_free(e,0)}contact_pair(e,t){let n=X.rawnarrowphase_contact_pair(this.__wbg_ptr,e,t);return n===0?void 0:ia.__wrap(n)}contact_pairs_with(e,t){X.rawnarrowphase_contact_pairs_with(this.__wbg_ptr,e,ts(t))}intersection_pair(e,t){return X.rawnarrowphase_intersection_pair(this.__wbg_ptr,e,t)!==0}intersection_pairs_with(e,t){X.rawnarrowphase_intersection_pairs_with(this.__wbg_ptr,e,ts(t))}constructor(){let e=X.rawnarrowphase_new();return this.__wbg_ptr=e,No.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(va.prototype[Symbol.dispose]=va.prototype.free);var ya=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Po.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawphysicspipeline_free(e,0)}is_profiler_enabled(){return X.rawphysicspipeline_is_profiler_enabled(this.__wbg_ptr)!==0}constructor(){let e=X.rawphysicspipeline_new();return this.__wbg_ptr=e,Po.register(this,this.__wbg_ptr,this),this}set_profiler_enabled(e){X.rawphysicspipeline_set_profiler_enabled(this.__wbg_ptr,e)}stepWithEvents(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m){U(e,H),U(t,fa),U(n,pa),U(r,Zi),U(i,va),U(a,Ea),U(o,ea),U(s,Pa),U(c,da),U(l,_a),U(u,Qi),U(d,la),X.rawphysicspipeline_stepWithEvents(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,s.__wbg_ptr,c.__wbg_ptr,l.__wbg_ptr,u.__wbg_ptr,d.__wbg_ptr,ts(f),ts(p),ts(m))}step(e,t,n,r,i,a,o,s,c,l,u){U(e,H),U(t,fa),U(n,pa),U(r,Zi),U(i,va),U(a,Ea),U(o,ea),U(s,Pa),U(c,da),U(l,_a),U(u,Qi),X.rawphysicspipeline_step(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,s.__wbg_ptr,c.__wbg_ptr,l.__wbg_ptr,u.__wbg_ptr)}timing_broad_phase(){return X.rawphysicspipeline_timing_broad_phase(this.__wbg_ptr)}timing_ccd(){return X.rawphysicspipeline_timing_ccd(this.__wbg_ptr)}timing_ccd_broad_phase(){return X.rawphysicspipeline_timing_ccd_broad_phase(this.__wbg_ptr)}timing_ccd_narrow_phase(){return X.rawphysicspipeline_timing_ccd_narrow_phase(this.__wbg_ptr)}timing_ccd_solver(){return X.rawphysicspipeline_timing_ccd_solver(this.__wbg_ptr)}timing_ccd_toi_computation(){return X.rawphysicspipeline_timing_ccd_toi_computation(this.__wbg_ptr)}timing_collision_detection(){return X.rawphysicspipeline_timing_collision_detection(this.__wbg_ptr)}timing_island_construction(){return X.rawphysicspipeline_timing_island_construction(this.__wbg_ptr)}timing_narrow_phase(){return X.rawphysicspipeline_timing_narrow_phase(this.__wbg_ptr)}timing_solver(){return X.rawphysicspipeline_timing_solver(this.__wbg_ptr)}timing_step(){return X.rawphysicspipeline_timing_step(this.__wbg_ptr)}timing_user_changes(){return X.rawphysicspipeline_timing_user_changes(this.__wbg_ptr)}timing_velocity_assembly(){return X.rawphysicspipeline_timing_velocity_assembly(this.__wbg_ptr)}timing_velocity_resolution(){return X.rawphysicspipeline_timing_velocity_resolution(this.__wbg_ptr)}timing_velocity_update(){return X.rawphysicspipeline_timing_velocity_update(this.__wbg_ptr)}timing_velocity_writeback(){return X.rawphysicspipeline_timing_velocity_writeback(this.__wbg_ptr)}};Symbol.dispose&&(ya.prototype[Symbol.dispose]=ya.prototype.free);var ba=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Fo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawpidcontroller_free(e,0)}angular_correction(e,t,n,r,i,a){try{U(t,Ea),U(r,B),U(i,H),X.rawpidcontroller_angular_correction(this.__wbg_ptr,e,t.__wbg_ptr,n,r.__wbg_ptr,i.__wbg_ptr,W(a))}finally{K[J++]=void 0}}apply_angular_correction(e,t,n,r,i){U(t,Ea),U(r,B),U(i,H),X.rawpidcontroller_apply_angular_correction(this.__wbg_ptr,e,t.__wbg_ptr,n,r.__wbg_ptr,i.__wbg_ptr)}apply_linear_correction(e,t,n,r,i){U(t,Ea),U(r,H),U(i,H),X.rawpidcontroller_apply_linear_correction(this.__wbg_ptr,e,t.__wbg_ptr,n,r.__wbg_ptr,i.__wbg_ptr)}linear_correction(e,t,n,r,i,a){try{U(t,Ea),U(r,H),U(i,H),X.rawpidcontroller_linear_correction(this.__wbg_ptr,e,t.__wbg_ptr,n,r.__wbg_ptr,i.__wbg_ptr,W(a))}finally{K[J++]=void 0}}constructor(e,t,n,r){let i=X.rawpidcontroller_new(e,t,n,r);return this.__wbg_ptr=i,Fo.register(this,this.__wbg_ptr,this),this}reset_integrals(){X.rawpidcontroller_reset_integrals(this.__wbg_ptr)}set_axes_mask(e){X.rawpidcontroller_set_axes_mask(this.__wbg_ptr,e)}set_kd(e,t){X.rawpidcontroller_set_kd(this.__wbg_ptr,e,t)}set_ki(e,t){X.rawpidcontroller_set_ki(this.__wbg_ptr,e,t)}set_kp(e,t){X.rawpidcontroller_set_kp(this.__wbg_ptr,e,t)}};Symbol.dispose&&(ba.prototype[Symbol.dispose]=ba.prototype.free);var xa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Io.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Io.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawpointcolliderprojection_free(e,0)}colliderHandle(){return X.rawpointcolliderprojection_colliderHandle(this.__wbg_ptr)}featureId(){let e=X.rawpointcolliderprojection_featureId(this.__wbg_ptr);return e===2**53-1?void 0:e}featureType(){return X.rawpointcolliderprojection_featureType(this.__wbg_ptr)}isInside(){return X.rawpointcolliderprojection_isInside(this.__wbg_ptr)!==0}point(e){try{X.rawpointcolliderprojection_point(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}};Symbol.dispose&&(xa.prototype[Symbol.dispose]=xa.prototype.free);var Sa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Lo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Lo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawpointprojection_free(e,0)}isInside(){return X.rawpointprojection_isInside(this.__wbg_ptr)!==0}point(e){try{X.rawpointprojection_point(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}};Symbol.dispose&&(Sa.prototype[Symbol.dispose]=Sa.prototype.free);var Ca=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Ro.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Ro.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawraycolliderhit_free(e,0)}colliderHandle(){return X.rawraycolliderhit_colliderHandle(this.__wbg_ptr)}timeOfImpact(){return X.rawraycolliderhit_timeOfImpact(this.__wbg_ptr)}};Symbol.dispose&&(Ca.prototype[Symbol.dispose]=Ca.prototype.free);var wa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,zo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,zo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawraycolliderintersection_free(e,0)}colliderHandle(){return X.rawraycolliderintersection_colliderHandle(this.__wbg_ptr)}featureId(){let e=X.rawraycolliderintersection_featureId(this.__wbg_ptr);return e===2**53-1?void 0:e}featureType(){return X.rawraycolliderintersection_featureType(this.__wbg_ptr)}normal(e){try{X.rawraycolliderintersection_normal(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}time_of_impact(){return X.rawraycolliderintersection_time_of_impact(this.__wbg_ptr)}};Symbol.dispose&&(wa.prototype[Symbol.dispose]=wa.prototype.free);var Ta=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Bo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Bo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawrayintersection_free(e,0)}featureId(){let e=X.rawrayintersection_featureId(this.__wbg_ptr);return e===2**53-1?void 0:e}featureType(){return X.rawrayintersection_featureType(this.__wbg_ptr)}normal(e){try{X.rawrayintersection_normal(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}time_of_impact(){return X.rawrayintersection_time_of_impact(this.__wbg_ptr)}};Symbol.dispose&&(Ta.prototype[Symbol.dispose]=Ta.prototype.free);var Ea=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Vo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Vo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawrigidbodyset_free(e,0)}contains(e){return X.rawrigidbodyset_contains(this.__wbg_ptr,e)!==0}createRigidBody(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E){return U(t,H),U(n,B),U(o,H),U(s,H),U(c,H),U(l,H),U(u,B),X.rawrigidbodyset_createRigidBody(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r,i,a,o.__wbg_ptr,s.__wbg_ptr,c.__wbg_ptr,l.__wbg_ptr,u.__wbg_ptr,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E)}forEachRigidBodyHandle(e){try{X.rawrigidbodyset_forEachRigidBodyHandle(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}len(){return X.rawrigidbodyset_len(this.__wbg_ptr)>>>0}constructor(){let e=X.rawrigidbodyset_new();return this.__wbg_ptr=e,Vo.register(this,this.__wbg_ptr,this),this}propagateModifiedBodyPositionsToColliders(e){U(e,ea),X.rawrigidbodyset_propagateModifiedBodyPositionsToColliders(this.__wbg_ptr,e.__wbg_ptr)}rbAddForceAtPoint(e,t,n,r){U(t,H),U(n,H),X.rawrigidbodyset_rbAddForceAtPoint(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r)}rbAddForce(e,t,n){U(t,H),X.rawrigidbodyset_rbAddForce(this.__wbg_ptr,e,t.__wbg_ptr,n)}rbAddTorque(e,t,n){U(t,H),X.rawrigidbodyset_rbAddTorque(this.__wbg_ptr,e,t.__wbg_ptr,n)}rbAdditionalPgsIterations(e){return X.rawrigidbodyset_rbAdditionalPgsIterations(this.__wbg_ptr,e)>>>0}rbAdditionalSolverIterations(e){return X.rawrigidbodyset_rbAdditionalSolverIterations(this.__wbg_ptr,e)>>>0}rbAngularDamping(e){return X.rawrigidbodyset_rbAngularDamping(this.__wbg_ptr,e)}rbAngvel(e,t){try{X.rawrigidbodyset_rbAngvel(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbApplyImpulseAtPoint(e,t,n,r){U(t,H),U(n,H),X.rawrigidbodyset_rbApplyImpulseAtPoint(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r)}rbApplyImpulse(e,t,n){U(t,H),X.rawrigidbodyset_rbApplyImpulse(this.__wbg_ptr,e,t.__wbg_ptr,n)}rbApplyTorqueImpulse(e,t,n){U(t,H),X.rawrigidbodyset_rbApplyTorqueImpulse(this.__wbg_ptr,e,t.__wbg_ptr,n)}rbBodyType(e){return X.rawrigidbodyset_rbBodyType(this.__wbg_ptr,e)}rbCollider(e,t){return X.rawrigidbodyset_rbCollider(this.__wbg_ptr,e,t)}rbDominanceGroup(e){return X.rawrigidbodyset_rbDominanceGroup(this.__wbg_ptr,e)}rbEffectiveAngularInertia(e,t){try{X.rawrigidbodyset_rbEffectiveAngularInertia(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbEffectiveInvMass(e,t){try{X.rawrigidbodyset_rbEffectiveInvMass(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbEffectiveWorldInvInertia(e,t){try{X.rawrigidbodyset_rbEffectiveWorldInvInertia(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbEnableCcd(e,t){X.rawrigidbodyset_rbEnableCcd(this.__wbg_ptr,e,t)}rbGravityScale(e){return X.rawrigidbodyset_rbGravityScale(this.__wbg_ptr,e)}rbInvMass(e){return X.rawrigidbodyset_rbInvMass(this.__wbg_ptr,e)}rbInvPrincipalInertia(e,t){try{X.rawrigidbodyset_rbInvPrincipalInertia(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbIsCcdEnabled(e){return X.rawrigidbodyset_rbIsCcdEnabled(this.__wbg_ptr,e)!==0}rbIsDynamic(e){return X.rawrigidbodyset_rbIsDynamic(this.__wbg_ptr,e)!==0}rbIsEnabled(e){return X.rawrigidbodyset_rbIsEnabled(this.__wbg_ptr,e)!==0}rbIsFixed(e){return X.rawrigidbodyset_rbIsFixed(this.__wbg_ptr,e)!==0}rbIsKinematic(e){return X.rawrigidbodyset_rbIsKinematic(this.__wbg_ptr,e)!==0}rbIsMoving(e){return X.rawrigidbodyset_rbIsMoving(this.__wbg_ptr,e)!==0}rbIsSleeping(e){return X.rawrigidbodyset_rbIsSleeping(this.__wbg_ptr,e)!==0}rbIsSoftFrame(e){return X.rawrigidbodyset_rbIsSoftFrame(this.__wbg_ptr,e)!==0}rbLinearDamping(e){return X.rawrigidbodyset_rbLinearDamping(this.__wbg_ptr,e)}rbLinvel(e,t){try{X.rawrigidbodyset_rbLinvel(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbLocalCom(e,t){try{X.rawrigidbodyset_rbLocalCom(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbLockRotations(e,t,n){X.rawrigidbodyset_rbLockRotations(this.__wbg_ptr,e,t,n)}rbLockTranslations(e,t,n){X.rawrigidbodyset_rbLockTranslations(this.__wbg_ptr,e,t,n)}rbMass(e){return X.rawrigidbodyset_rbMass(this.__wbg_ptr,e)}rbNextRotation(e,t){try{X.rawrigidbodyset_rbNextRotation(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbNextTranslation(e,t){try{X.rawrigidbodyset_rbNextTranslation(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbNumColliders(e){return X.rawrigidbodyset_rbNumColliders(this.__wbg_ptr,e)>>>0}rbPrincipalInertiaLocalFrame(e,t){try{X.rawrigidbodyset_rbPrincipalInertiaLocalFrame(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbPrincipalInertia(e,t){try{X.rawrigidbodyset_rbPrincipalInertia(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbRecomputeMassPropertiesFromColliders(e,t){U(t,ea),X.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.__wbg_ptr,e,t.__wbg_ptr)}rbResetForces(e,t){X.rawrigidbodyset_rbResetForces(this.__wbg_ptr,e,t)}rbResetTorques(e,t){X.rawrigidbodyset_rbResetTorques(this.__wbg_ptr,e,t)}rbRotation(e,t){try{X.rawrigidbodyset_rbRotation(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbSetAdditionalMassProperties(e,t,n,r,i,a){U(n,H),U(r,H),U(i,B),X.rawrigidbodyset_rbSetAdditionalMassProperties(this.__wbg_ptr,e,t,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a)}rbSetAdditionalMass(e,t,n){X.rawrigidbodyset_rbSetAdditionalMass(this.__wbg_ptr,e,t,n)}rbSetAdditionalPgsIterations(e,t){X.rawrigidbodyset_rbSetAdditionalPgsIterations(this.__wbg_ptr,e,t)}rbSetAdditionalSolverIterations(e,t){X.rawrigidbodyset_rbSetAdditionalSolverIterations(this.__wbg_ptr,e,t)}rbSetAngularDamping(e,t){X.rawrigidbodyset_rbSetAngularDamping(this.__wbg_ptr,e,t)}rbSetAngvel(e,t,n){U(t,H),X.rawrigidbodyset_rbSetAngvel(this.__wbg_ptr,e,t.__wbg_ptr,n)}rbSetBodyType(e,t,n){X.rawrigidbodyset_rbSetBodyType(this.__wbg_ptr,e,t,n)}rbSetDominanceGroup(e,t){X.rawrigidbodyset_rbSetDominanceGroup(this.__wbg_ptr,e,t)}rbSetEnabledRotations(e,t,n,r,i){X.rawrigidbodyset_rbSetEnabledRotations(this.__wbg_ptr,e,t,n,r,i)}rbSetEnabledTranslations(e,t,n,r,i){X.rawrigidbodyset_rbSetEnabledTranslations(this.__wbg_ptr,e,t,n,r,i)}rbSetEnabled(e,t){X.rawrigidbodyset_rbSetEnabled(this.__wbg_ptr,e,t)}rbSetGravityScale(e,t,n){X.rawrigidbodyset_rbSetGravityScale(this.__wbg_ptr,e,t,n)}rbSetLinearDamping(e,t){X.rawrigidbodyset_rbSetLinearDamping(this.__wbg_ptr,e,t)}rbSetLinvel(e,t,n){U(t,H),X.rawrigidbodyset_rbSetLinvel(this.__wbg_ptr,e,t.__wbg_ptr,n)}rbSetNextKinematicRotation(e,t,n,r,i){X.rawrigidbodyset_rbSetNextKinematicRotation(this.__wbg_ptr,e,t,n,r,i)}rbSetNextKinematicTranslation(e,t,n,r){X.rawrigidbodyset_rbSetNextKinematicTranslation(this.__wbg_ptr,e,t,n,r)}rbSetRotation(e,t,n,r,i,a){X.rawrigidbodyset_rbSetRotation(this.__wbg_ptr,e,t,n,r,i,a)}rbSetSoftCcdPrediction(e,t){X.rawrigidbodyset_rbSetSoftCcdPrediction(this.__wbg_ptr,e,t)}rbSetTranslation(e,t,n,r,i){X.rawrigidbodyset_rbSetTranslation(this.__wbg_ptr,e,t,n,r,i)}rbSetUserData(e,t){X.rawrigidbodyset_rbSetUserData(this.__wbg_ptr,e,t)}rbSleep(e){X.rawrigidbodyset_rbSleep(this.__wbg_ptr,e)}rbSoftBody(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawrigidbodyset_rbSoftBody(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getFloat64(r+8,!0);return t===0?void 0:n}finally{X.__wbindgen_add_to_stack_pointer(16)}}rbSoftCcdPrediction(e){return X.rawrigidbodyset_rbSoftCcdPrediction(this.__wbg_ptr,e)}rbSoftCluster(e){let t=X.rawrigidbodyset_rbSoftCluster(this.__wbg_ptr,e);return t===2**53-1?void 0:t}rbTranslation(e,t){try{X.rawrigidbodyset_rbTranslation(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbUserData(e){return X.rawrigidbodyset_rbUserData(this.__wbg_ptr,e)>>>0}rbUserForce(e,t){try{X.rawrigidbodyset_rbUserForce(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbUserTorque(e,t){try{X.rawrigidbodyset_rbUserTorque(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}rbVelocityAtPoint(e,t,n){try{U(t,H),X.rawrigidbodyset_rbVelocityAtPoint(this.__wbg_ptr,e,t.__wbg_ptr,W(n))}finally{K[J++]=void 0}}rbWakeUp(e){X.rawrigidbodyset_rbWakeUp(this.__wbg_ptr,e)}rbWorldCom(e,t){try{X.rawrigidbodyset_rbWorldCom(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}remove(e,t,n,r,i,a){U(t,pa),U(n,ea),U(r,Pa),U(i,da),U(a,_a),X.rawrigidbodyset_remove(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr)}};Symbol.dispose&&(Ea.prototype[Symbol.dispose]=Ea.prototype.free),Object.freeze({Dynamic:0,0:`Dynamic`,Fixed:1,1:`Fixed`,KinematicPositionBased:2,2:`KinematicPositionBased`,KinematicVelocityBased:3,3:`KinematicVelocityBased`,SoftFrame:4,4:`SoftFrame`});var B=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Ho.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Ho.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawrotation_free(e,0)}static identity(){let t=X.rawrotation_identity();return e.__wrap(t)}constructor(e,t,n,r){let i=X.rawrotation_new(e,t,n,r);return this.__wbg_ptr=i,Ho.register(this,this.__wbg_ptr,this),this}get w(){return X.rawrotation_w(this.__wbg_ptr)}get x(){return X.rawrotation_x(this.__wbg_ptr)}get y(){return X.rawrotation_y(this.__wbg_ptr)}get z(){return X.rawrotation_z(this.__wbg_ptr)}};Symbol.dispose&&(B.prototype[Symbol.dispose]=B.prototype.free);var Da=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Uo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawsdpmatrix3_free(e,0)}elements(){return Es(X.rawsdpmatrix3_elements(this.__wbg_ptr))}};Symbol.dispose&&(Da.prototype[Symbol.dispose]=Da.prototype.free);var Oa=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Wo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawserializationpipeline_free(e,0)}deserializeAll(e){let t=X.rawserializationpipeline_deserializeAll(this.__wbg_ptr,ts(e));return t===0?void 0:sa.__wrap(t)}constructor(){let e=X.rawserializationpipeline_new();return this.__wbg_ptr=e,Wo.register(this,this.__wbg_ptr,this),this}serializeAll(e,t,n,r,i,a,o,s,c,l){return U(e,H),U(t,fa),U(n,pa),U(r,Zi),U(i,va),U(a,Ea),U(o,ea),U(s,Pa),U(c,da),U(l,_a),Es(X.rawserializationpipeline_serializeAll(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,s.__wbg_ptr,c.__wbg_ptr,l.__wbg_ptr))}};Symbol.dispose&&(Oa.prototype[Symbol.dispose]=Oa.prototype.free);var ka=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Go.register(n,n.__wbg_ptr,n),n}static __unwrap(t){return t instanceof e?t.__destroy_into_raw():0}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Go.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawshape_free(e,0)}static ball(t){let n=X.rawshape_ball(t);return e.__wrap(n)}static capsule(t,n){let r=X.rawshape_capsule(t,n);return e.__wrap(r)}castRayAndGetNormal(e,t,n,r,i,a){U(e,H),U(t,B),U(n,H),U(r,H);let o=X.rawshape_castRayAndGetNormal(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a);return o===0?void 0:Ta.__wrap(o)}castRay(e,t,n,r,i,a){return U(e,H),U(t,B),U(n,H),U(r,H),X.rawshape_castRay(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a)}castShape(t,n,r,i,a,o,s,c,l,u){U(t,H),U(n,B),U(r,H),U(i,e),U(a,H),U(o,B),U(s,H);let d=X.rawshape_castShape(this.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,s.__wbg_ptr,c,l,u);return d===0?void 0:Aa.__wrap(d)}compoundFlags(){let e=X.rawshape_compoundFlags(this.__wbg_ptr);return e===2**53-1?void 0:e}compoundLen(){let e=X.rawshape_compoundLen(this.__wbg_ptr);return e===2**53-1?void 0:e}compoundRotation(e){let t=X.rawshape_compoundRotation(this.__wbg_ptr,e);return t===0?void 0:B.__wrap(t)}compoundShape(t){let n=X.rawshape_compoundShape(this.__wbg_ptr,t);return n===0?void 0:e.__wrap(n)}compoundTranslation(e){let t=X.rawshape_compoundTranslation(this.__wbg_ptr,e);return t===0?void 0:H.__wrap(t)}static compound(t,n,r,i){let a=Ts(t,X.__wbindgen_export3),o=Y,s=ws(n,X.__wbindgen_export3),c=Y,l=ws(r,X.__wbindgen_export3),u=Y,d=X.rawshape_compound(a,o,s,c,l,u,i);return e.__wrap(d)}static cone(t,n){let r=X.rawshape_cone(t,n);return e.__wrap(r)}contactShape(t,n,r,i,a,o){U(t,H),U(n,B),U(r,e),U(i,H),U(a,B);let s=X.rawshape_contactShape(this.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o);return s===0?void 0:ja.__wrap(s)}containsPoint(e,t,n){return U(e,H),U(t,B),U(n,H),X.rawshape_containsPoint(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr)!==0}static convexDecompositionWithParams(t,n,r,i){let a=ws(t,X.__wbindgen_export3),o=Y,s=Cs(n,X.__wbindgen_export3),c=Y;U(r,La);let l=X.rawshape_convexDecompositionWithParams(a,o,s,c,r.__wbg_ptr,i);return l===0?void 0:e.__wrap(l)}static convexDecomposition(t,n,r){let i=ws(t,X.__wbindgen_export3),a=Y,o=Cs(n,X.__wbindgen_export3),s=Y,c=X.rawshape_convexDecomposition(i,a,o,s,r);return c===0?void 0:e.__wrap(c)}static convexHull(t){let n=ws(t,X.__wbindgen_export3),r=Y,i=X.rawshape_convexHull(n,r);return i===0?void 0:e.__wrap(i)}convexMeshData(){let e=X.rawshape_convexMeshData(this.__wbg_ptr);return e===0?void 0:aa.__wrap(e)}static convexMesh(t,n){let r=ws(t,X.__wbindgen_export3),i=Y,a=Cs(n,X.__wbindgen_export3),o=Y,s=X.rawshape_convexMesh(r,i,a,o);return s===0?void 0:e.__wrap(s)}static cuboid(t,n,r){let i=X.rawshape_cuboid(t,n,r);return e.__wrap(i)}static cylinder(t,n){let r=X.rawshape_cylinder(t,n);return e.__wrap(r)}halfExtents(){let e=X.rawshape_halfExtents(this.__wbg_ptr);return e===0?void 0:H.__wrap(e)}halfHeight(){let e=X.rawshape_halfHeight(this.__wbg_ptr);return e===2**53-1?void 0:e}halfspaceNormal(){let e=X.rawshape_halfspaceNormal(this.__wbg_ptr);return e===0?void 0:H.__wrap(e)}static halfspace(t){U(t,H);let n=X.rawshape_halfspace(t.__wbg_ptr);return e.__wrap(n)}heightFieldFlags(){let e=X.rawshape_heightFieldFlags(this.__wbg_ptr);return e===2**53-1?void 0:e}heightfieldHeights(){try{let n=X.__wbindgen_add_to_stack_pointer(-16);X.rawshape_heightfieldHeights(n,this.__wbg_ptr);var e=G().getInt32(n+0,!0),t=G().getInt32(n+4,!0);let r;return e!==0&&(r=rs(e,t).slice(),X.__wbindgen_export2(e,t*4,4)),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}heightfieldNCols(){let e=X.rawshape_heightfieldNCols(this.__wbg_ptr);return e===2**53-1?void 0:e}heightfieldNRows(){let e=X.rawshape_heightfieldNRows(this.__wbg_ptr);return e===2**53-1?void 0:e}heightfieldScale(){let e=X.rawshape_heightfieldScale(this.__wbg_ptr);return e===0?void 0:H.__wrap(e)}static heightfield(t,n,r,i,a){let o=ws(r,X.__wbindgen_export3),s=Y;U(i,H);let c=X.rawshape_heightfield(t,n,o,s,i.__wbg_ptr,a);return e.__wrap(c)}indices(){try{let n=X.__wbindgen_add_to_stack_pointer(-16);X.rawshape_indices(n,this.__wbg_ptr);var e=G().getInt32(n+0,!0),t=G().getInt32(n+4,!0);let r;return e!==0&&(r=os(e,t).slice(),X.__wbindgen_export2(e,t*4,4)),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}intersectsRay(e,t,n,r,i){return U(e,H),U(t,B),U(n,H),U(r,H),X.rawshape_intersectsRay(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i)!==0}intersectsShape(t,n,r,i,a){return U(t,H),U(n,B),U(r,e),U(i,H),U(a,B),X.rawshape_intersectsShape(this.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr)!==0}polylineFlags(){let e=X.rawshape_polylineFlags(this.__wbg_ptr);return e===2**53-1?void 0:e}static polyline(t,n,r){let i=ws(t,X.__wbindgen_export3),a=Y,o=Cs(n,X.__wbindgen_export3),s=Y,c=X.rawshape_polyline(i,a,o,s,r);return e.__wrap(c)}projectPoint(e,t,n,r){U(e,H),U(t,B),U(n,H);let i=X.rawshape_projectPoint(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr,r);return Sa.__wrap(i)}radius(){let e=X.rawshape_radius(this.__wbg_ptr);return e===2**53-1?void 0:e}static roundCone(t,n,r){let i=X.rawshape_roundCone(t,n,r);return e.__wrap(i)}static roundConvexHull(t,n){let r=ws(t,X.__wbindgen_export3),i=Y,a=X.rawshape_roundConvexHull(r,i,n);return a===0?void 0:e.__wrap(a)}static roundConvexMesh(t,n,r){let i=ws(t,X.__wbindgen_export3),a=Y,o=Cs(n,X.__wbindgen_export3),s=Y,c=X.rawshape_roundConvexMesh(i,a,o,s,r);return c===0?void 0:e.__wrap(c)}static roundCuboid(t,n,r,i){let a=X.rawshape_roundCuboid(t,n,r,i);return e.__wrap(a)}static roundCylinder(t,n,r){let i=X.rawshape_roundCylinder(t,n,r);return e.__wrap(i)}roundRadius(){let e=X.rawshape_roundRadius(this.__wbg_ptr);return e===2**53-1?void 0:e}static roundTriangle(t,n,r,i){U(t,H),U(n,H),U(r,H);let a=X.rawshape_roundTriangle(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i);return e.__wrap(a)}static segment(t,n){U(t,H),U(n,H);let r=X.rawshape_segment(t.__wbg_ptr,n.__wbg_ptr);return e.__wrap(r)}shapeType(){return X.rawshape_shapeType(this.__wbg_ptr)}triMeshFlags(){let e=X.rawshape_triMeshFlags(this.__wbg_ptr);return e===2**53-1?void 0:e}static triangle(t,n,r){U(t,H),U(n,H),U(r,H);let i=X.rawshape_triangle(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr);return e.__wrap(i)}static trimesh(t,n,r){let i=ws(t,X.__wbindgen_export3),a=Y,o=Cs(n,X.__wbindgen_export3),s=Y,c=X.rawshape_trimesh(i,a,o,s,r);return c===0?void 0:e.__wrap(c)}vertices(){try{let n=X.__wbindgen_add_to_stack_pointer(-16);X.rawshape_vertices(n,this.__wbg_ptr);var e=G().getInt32(n+0,!0),t=G().getInt32(n+4,!0);let r;return e!==0&&(r=rs(e,t).slice(),X.__wbindgen_export2(e,t*4,4)),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}voxelData(){try{let n=X.__wbindgen_add_to_stack_pointer(-16);X.rawshape_voxelData(n,this.__wbg_ptr);var e=G().getInt32(n+0,!0),t=G().getInt32(n+4,!0);let r;return e!==0&&(r=as(e,t).slice(),X.__wbindgen_export2(e,t*4,4)),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}voxelSize(){let e=X.rawshape_voxelSize(this.__wbg_ptr);return e===0?void 0:H.__wrap(e)}static voxelsFromPoints(t,n){U(t,H);let r=ws(n,X.__wbindgen_export3),i=Y,a=X.rawshape_voxelsFromPoints(t.__wbg_ptr,r,i);return e.__wrap(a)}static voxels(t,n){U(t,H);let r=Cs(n,X.__wbindgen_export3),i=Y,a=X.rawshape_voxels(t.__wbg_ptr,r,i);return e.__wrap(a)}};Symbol.dispose&&(ka.prototype[Symbol.dispose]=ka.prototype.free);var Aa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Ko.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Ko.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawshapecasthit_free(e,0)}getComponents(e){try{X.rawshapecasthit_getComponents(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}};Symbol.dispose&&(Aa.prototype[Symbol.dispose]=Aa.prototype.free);var ja=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,qo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,qo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawshapecontact_free(e,0)}getComponents(e){try{X.rawshapecontact_getComponents(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}};Symbol.dispose&&(ja.prototype[Symbol.dispose]=ja.prototype.free);var V=Object.freeze({Ball:0,0:`Ball`,Cuboid:1,1:`Cuboid`,Capsule:2,2:`Capsule`,Segment:3,3:`Segment`,Polyline:4,4:`Polyline`,Triangle:5,5:`Triangle`,TriMesh:6,6:`TriMesh`,HeightField:7,7:`HeightField`,Compound:8,8:`Compound`,ConvexPolyhedron:9,9:`ConvexPolyhedron`,Cylinder:10,10:`Cylinder`,Cone:11,11:`Cone`,RoundCuboid:12,12:`RoundCuboid`,RoundTriangle:13,13:`RoundTriangle`,RoundCylinder:14,14:`RoundCylinder`,RoundCone:15,15:`RoundCone`,RoundConvexPolyhedron:16,16:`RoundConvexPolyhedron`,HalfSpace:17,17:`HalfSpace`,Voxels:18,18:`Voxels`}),Ma=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Jo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Jo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawsoftbodybuilder_free(e,0)}addEdges(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_addEdges(this.__wbg_ptr,t,n)}append(t){U(t,e),X.rawsoftbodybuilder_append(this.__wbg_ptr,t.__wbg_ptr)}cellEdges(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodybuilder_cellEdges(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}static clothAnisotropic(t,n,r,i,a,o,s,c,l,u,d){U(t,H),U(n,H),U(r,H);let f=X.rawsoftbodybuilder_clothAnisotropic(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a,o,s,c,l,u,d);return e.__wrap(f)}static clothTube(t,n,r,i,a,o){U(t,H),U(n,H);let s=X.rawsoftbodybuilder_clothTube(t.__wbg_ptr,n.__wbg_ptr,r,i,a,o);return e.__wrap(s)}static cloth(t,n,r,i,a){U(t,H),U(n,H),U(r,H);let o=X.rawsoftbodybuilder_cloth(t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i,a);return e.__wrap(o)}static cuboid(t,n,r,i,a){U(t,H),U(n,H);let o=X.rawsoftbodybuilder_cuboid(t.__wbg_ptr,n.__wbg_ptr,r,i,a);return e.__wrap(o)}material(){let e=X.rawsoftbodybuilder_material(this.__wbg_ptr);return Na.__wrap(e)}constructor(e){let t=ws(e,X.__wbindgen_export3),n=Y,r=X.rawsoftbodybuilder_new(t,n);return this.__wbg_ptr=r,Jo.register(this,this.__wbg_ptr,this),this}numParticles(){return X.rawsoftbodybuilder_numParticles(this.__wbg_ptr)>>>0}particlePositions(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodybuilder_particlePositions(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=rs(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}static rope(t,n,r){U(t,H),U(n,H);let i=X.rawsoftbodybuilder_rope(t.__wbg_ptr,n.__wbg_ptr,r);return e.__wrap(i)}setAdditionalPgsIterations(e){X.rawsoftbodybuilder_setAdditionalPgsIterations(this.__wbg_ptr,e)}setAdditionalSolverIterations(e){X.rawsoftbodybuilder_setAdditionalSolverIterations(this.__wbg_ptr,e)}setBendEdges(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setBendEdges(this.__wbg_ptr,t,n)}setCanSleep(e){X.rawsoftbodybuilder_setCanSleep(this.__wbg_ptr,e)}setCellModel(e){X.rawsoftbodybuilder_setCellModel(this.__wbg_ptr,e)}setCells(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setCells(this.__wbg_ptr,t,n)}setDihedrals(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setDihedrals(this.__wbg_ptr,t,n)}setDominanceGroup(e){X.rawsoftbodybuilder_setDominanceGroup(this.__wbg_ptr,e)}setEdgeSoftness(e,t,n){let r=Cs(e,X.__wbindgen_export3),i=Y,a=ws(t,X.__wbindgen_export3),o=Y,s=ws(n,X.__wbindgen_export3),c=Y;X.rawsoftbodybuilder_setEdgeSoftness(this.__wbg_ptr,r,i,a,o,s,c)}setEdgeTearResistance(e,t){let n=Cs(e,X.__wbindgen_export3),r=Y,i=ws(t,X.__wbindgen_export3),a=Y;X.rawsoftbodybuilder_setEdgeTearResistance(this.__wbg_ptr,n,r,i,a)}setEdges(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setEdges(this.__wbg_ptr,t,n)}setGravityScale(e){X.rawsoftbodybuilder_setGravityScale(this.__wbg_ptr,e)}setLinearDamping(e){X.rawsoftbodybuilder_setLinearDamping(this.__wbg_ptr,e)}setMass(e){X.rawsoftbodybuilder_setMass(this.__wbg_ptr,e)}setMasses(e){let t=ws(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setMasses(this.__wbg_ptr,t,n)}setMaterial(e){U(e,Na),X.rawsoftbodybuilder_setMaterial(this.__wbg_ptr,e.__wbg_ptr)}setNoSurfaceCollider(){X.rawsoftbodybuilder_setNoSurfaceCollider(this.__wbg_ptr)}setOriented(e){X.rawsoftbodybuilder_setOriented(this.__wbg_ptr,e)}setParticleMass(e){X.rawsoftbodybuilder_setParticleMass(this.__wbg_ptr,e)}setParticleRadius(e){X.rawsoftbodybuilder_setParticleRadius(this.__wbg_ptr,e)}setPinnedParticles(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setPinnedParticles(this.__wbg_ptr,t,n)}setPositions(e){let t=ws(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setPositions(this.__wbg_ptr,t,n)}setSelfContacts(e){X.rawsoftbodybuilder_setSelfContacts(this.__wbg_ptr,e)}setShapeMatching(e){X.rawsoftbodybuilder_setShapeMatching(this.__wbg_ptr,e)}setSkinCollision(e){X.rawsoftbodybuilder_setSkinCollision(this.__wbg_ptr,e)}setSkin(e,t){let n=ws(e,X.__wbindgen_export3),r=Y,i=Cs(t,X.__wbindgen_export3),a=Y;X.rawsoftbodybuilder_setSkin(this.__wbg_ptr,n,r,i,a)}setSoftness(e,t){X.rawsoftbodybuilder_setSoftness(this.__wbg_ptr,e,t)}setSolver(e){X.rawsoftbodybuilder_setSolver(this.__wbg_ptr,e)}setSurfaceCollider(e,t,n,r,i,a,o,s,c,l,u,d){X.rawsoftbodybuilder_setSurfaceCollider(this.__wbg_ptr,e,t,n,r,i,a,o,s,c,l,u,d)}setSurface(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setSurface(this.__wbg_ptr,t,n)}setTensionOnly(){X.rawsoftbodybuilder_setTensionOnly(this.__wbg_ptr)}setVolumeFactor(e){X.rawsoftbodybuilder_setVolumeFactor(this.__wbg_ptr,e)}setVolumePreservation(e){X.rawsoftbodybuilder_setVolumePreservation(this.__wbg_ptr,e)}setWire(e){let t=Cs(e,X.__wbindgen_export3),n=Y;X.rawsoftbodybuilder_setWire(this.__wbg_ptr,t,n)}static sphere(t,n,r){U(t,H);let i=X.rawsoftbodybuilder_sphere(t.__wbg_ptr,n,r);return e.__wrap(i)}surfaceDihedrals(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodybuilder_surfaceDihedrals(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}surfaceEdges(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodybuilder_surfaceEdges(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}translated(e){U(e,H),X.rawsoftbodybuilder_translated(this.__wbg_ptr,e.__wbg_ptr)}static trimesh(t,n){let r=ws(t,X.__wbindgen_export3),i=Y,a=Cs(n,X.__wbindgen_export3),o=Y,s=X.rawsoftbodybuilder_trimesh(r,i,a,o);return s===0?void 0:e.__wrap(s)}static volumetric(t,n,r,i){let a=ws(t,X.__wbindgen_export3),o=Y,s=Cs(n,X.__wbindgen_export3),c=Y,l=X.rawsoftbodybuilder_volumetric(a,o,s,c,r,i);return l===0?void 0:e.__wrap(l)}};Symbol.dispose&&(Ma.prototype[Symbol.dispose]=Ma.prototype.free),Object.freeze({Volume:0,0:`Volume`,Corotational:1,1:`Corotational`,NeoHookean:2,2:`NeoHookean`});var Na=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Yo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Yo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawsoftbodymaterial_free(e,0)}get bendDampingRatio(){return X.rawsoftbodymaterial_bendDampingRatio(this.__wbg_ptr)}get bendFrequency(){return X.rawsoftbodymaterial_bendFrequency(this.__wbg_ptr)}get deformationDamping(){return X.rawsoftbodymaterial_deformationDamping(this.__wbg_ptr)}get edgeDampingRatio(){return X.rawsoftbodymaterial_edgeDampingRatio(this.__wbg_ptr)}get edgeFrequency(){return X.rawsoftbodymaterial_edgeFrequency(this.__wbg_ptr)}get edgePlasticCreep(){return X.rawsoftbodymaterial_edgePlasticCreep(this.__wbg_ptr)}get edgePlasticFlow(){return X.rawsoftbodymaterial_edgePlasticFlow(this.__wbg_ptr)}get edgePlasticMax(){return X.rawsoftbodymaterial_edgePlasticMax(this.__wbg_ptr)}get edgePlasticYield(){return X.rawsoftbodymaterial_edgePlasticYield(this.__wbg_ptr)}get elasticDampingRatio(){return X.rawsoftbodymaterial_elasticDampingRatio(this.__wbg_ptr)}get interiorStrength(){return X.rawsoftbodymaterial_interiorStrength(this.__wbg_ptr)}get maxTearsPerStep(){return X.rawsoftbodymaterial_maxTearsPerStep(this.__wbg_ptr)>>>0}get minPiece(){let e=X.rawsoftbodymaterial_minPiece(this.__wbg_ptr);return e===2**53-1?void 0:e}constructor(){let e=X.rawsoftbodymaterial_new();return this.__wbg_ptr=e,Yo.register(this,this.__wbg_ptr,this),this}get plasticCreep(){return X.rawsoftbodymaterial_plasticCreep(this.__wbg_ptr)}get plasticMax(){return X.rawsoftbodymaterial_plasticMax(this.__wbg_ptr)}get plasticYield(){return X.rawsoftbodymaterial_plasticYield(this.__wbg_ptr)}get poissonRatio(){return X.rawsoftbodymaterial_poissonRatio(this.__wbg_ptr)}set bendDampingRatio(e){X.rawsoftbodymaterial_set_bendDampingRatio(this.__wbg_ptr,e)}set bendFrequency(e){X.rawsoftbodymaterial_set_bendFrequency(this.__wbg_ptr,e)}set deformationDamping(e){X.rawsoftbodymaterial_set_deformationDamping(this.__wbg_ptr,e)}set edgeDampingRatio(e){X.rawsoftbodymaterial_set_edgeDampingRatio(this.__wbg_ptr,e)}set edgeFrequency(e){X.rawsoftbodymaterial_set_edgeFrequency(this.__wbg_ptr,e)}set edgePlasticCreep(e){X.rawsoftbodymaterial_set_edgePlasticCreep(this.__wbg_ptr,e)}set edgePlasticFlow(e){X.rawsoftbodymaterial_set_edgePlasticFlow(this.__wbg_ptr,e)}set edgePlasticMax(e){X.rawsoftbodymaterial_set_edgePlasticMax(this.__wbg_ptr,e)}set edgePlasticYield(e){X.rawsoftbodymaterial_set_edgePlasticYield(this.__wbg_ptr,e)}set elasticDampingRatio(e){X.rawsoftbodymaterial_set_elasticDampingRatio(this.__wbg_ptr,e)}set interiorStrength(e){X.rawsoftbodymaterial_set_interiorStrength(this.__wbg_ptr,e)}set maxTearsPerStep(e){X.rawsoftbodymaterial_set_maxTearsPerStep(this.__wbg_ptr,e)}set minPiece(e){X.rawsoftbodymaterial_set_minPiece(this.__wbg_ptr,q(e)?2**53-1:e>>>0)}set plasticCreep(e){X.rawsoftbodymaterial_set_plasticCreep(this.__wbg_ptr,e)}set plasticMax(e){X.rawsoftbodymaterial_set_plasticMax(this.__wbg_ptr,e)}set plasticYield(e){X.rawsoftbodymaterial_set_plasticYield(this.__wbg_ptr,e)}set poissonRatio(e){X.rawsoftbodymaterial_set_poissonRatio(this.__wbg_ptr,e)}set shapeMatchingDampingRatio(e){X.rawsoftbodymaterial_set_shapeMatchingDampingRatio(this.__wbg_ptr,e)}set shapeMatchingFrequency(e){X.rawsoftbodymaterial_set_shapeMatchingFrequency(this.__wbg_ptr,e)}set tearForce(e){X.rawsoftbodymaterial_set_tearForce(this.__wbg_ptr,q(e)?2**53-1:Math.fround(e))}set tearSmoothing(e){X.rawsoftbodymaterial_set_tearSmoothing(this.__wbg_ptr,e)}set tearStrain(e){X.rawsoftbodymaterial_set_tearStrain(this.__wbg_ptr,q(e)?2**53-1:Math.fround(e))}set volumeDampingRatio(e){X.rawsoftbodymaterial_set_volumeDampingRatio(this.__wbg_ptr,e)}set volumeFrequency(e){X.rawsoftbodymaterial_set_volumeFrequency(this.__wbg_ptr,e)}set youngModulus(e){X.rawsoftbodymaterial_set_youngModulus(this.__wbg_ptr,e)}get shapeMatchingDampingRatio(){return X.rawsoftbodymaterial_shapeMatchingDampingRatio(this.__wbg_ptr)}get shapeMatchingFrequency(){return X.rawsoftbodymaterial_shapeMatchingFrequency(this.__wbg_ptr)}get tearForce(){let e=X.rawsoftbodymaterial_tearForce(this.__wbg_ptr);return e===2**53-1?void 0:e}get tearSmoothing(){return X.rawsoftbodymaterial_tearSmoothing(this.__wbg_ptr)}get tearStrain(){let e=X.rawsoftbodymaterial_tearStrain(this.__wbg_ptr);return e===2**53-1?void 0:e}tears(){return X.rawsoftbodymaterial_tears(this.__wbg_ptr)!==0}static uniform(t,n){let r=X.rawsoftbodymaterial_uniform(t,n);return e.__wrap(r)}get volumeDampingRatio(){return X.rawsoftbodymaterial_volumeDampingRatio(this.__wbg_ptr)}get volumeFrequency(){return X.rawsoftbodymaterial_volumeFrequency(this.__wbg_ptr)}get youngModulus(){return X.rawsoftbodymaterial_youngModulus(this.__wbg_ptr)}};Symbol.dispose&&(Na.prototype[Symbol.dispose]=Na.prototype.free);var Pa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Xo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Xo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawsoftbodyset_free(e,0)}addCluster(e,t,n,r){let i=Cs(t,X.__wbindgen_export3),a=Y;U(n,Ea),U(r,ea);let o=X.rawsoftbodyset_addCluster(this.__wbg_ptr,e,i,a,n.__wbg_ptr,r.__wbg_ptr);return o===2**53-1?void 0:o}contains(e){return X.rawsoftbodyset_contains(this.__wbg_ptr,e)!==0}cut(e,t,n,r,i,a,o){let s=ws(t,X.__wbindgen_export3),c=Y;U(n,pa),U(r,Ea),U(i,ea),U(a,da),U(o,_a);let l=X.rawsoftbodyset_cut(this.__wbg_ptr,e,s,c,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr);return l===0?void 0:Fa.__wrap(l)}forEachSoftBodyHandle(e){try{X.rawsoftbodyset_forEachSoftBodyHandle(this.__wbg_ptr,W(e))}finally{K[J++]=void 0}}insert(e,t,n){return U(e,Ma),U(t,Ea),U(n,ea),X.rawsoftbodyset_insert(this.__wbg_ptr,e.__wbg_ptr,t.__wbg_ptr,n.__wbg_ptr)}len(){return X.rawsoftbodyset_len(this.__wbg_ptr)>>>0}constructor(){let e=X.rawsoftbodyset_new();return this.__wbg_ptr=e,Xo.register(this,this.__wbg_ptr,this),this}removeCluster(e,t,n,r,i,a,o){return U(n,pa),U(r,Ea),U(i,ea),U(a,da),U(o,_a),X.rawsoftbodyset_removeCluster(this.__wbg_ptr,e,t,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr)!==0}remove(e,t,n,r,i,a){U(t,pa),U(n,Ea),U(r,ea),U(i,da),U(a,_a),X.rawsoftbodyset_remove(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr)}sbAddForce(e,t,n){U(t,H),X.rawsoftbodyset_sbAddForce(this.__wbg_ptr,e,t.__wbg_ptr,n)}sbAddParticleForce(e,t,n,r){U(n,H),X.rawsoftbodyset_sbAddParticleForce(this.__wbg_ptr,e,t,n.__wbg_ptr,r)}sbApplyImpulseAtPoint(e,t,n,r,i){U(t,H),U(n,H),X.rawsoftbodyset_sbApplyImpulseAtPoint(this.__wbg_ptr,e,t.__wbg_ptr,n.__wbg_ptr,r,i)}sbApplyImpulse(e,t,n){U(t,H),X.rawsoftbodyset_sbApplyImpulse(this.__wbg_ptr,e,t.__wbg_ptr,n)}sbApplyParticleImpulse(e,t,n,r){U(n,H),X.rawsoftbodyset_sbApplyParticleImpulse(this.__wbg_ptr,e,t,n.__wbg_ptr,r)}sbApplyRadialImpulse(e,t,n,r,i){U(t,H),X.rawsoftbodyset_sbApplyRadialImpulse(this.__wbg_ptr,e,t.__wbg_ptr,n,r,i)}sbAttachParticle(e,t,n,r){U(r,Ea),X.rawsoftbodyset_sbAttachParticle(this.__wbg_ptr,e,t,n,r.__wbg_ptr)}sbAttachmentBody(e,t){return X.rawsoftbodyset_sbAttachmentBody(this.__wbg_ptr,e,t)}sbAttachmentParticle(e,t){return X.rawsoftbodyset_sbAttachmentParticle(this.__wbg_ptr,e,t)>>>0}sbBoundary(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbBoundary(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=os(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbCellModel(e){return X.rawsoftbodyset_sbCellModel(this.__wbg_ptr,e)}sbCellRestVolume(e,t){return X.rawsoftbodyset_sbCellRestVolume(this.__wbg_ptr,e,t)}sbCellStiffnessScale(e,t){return X.rawsoftbodyset_sbCellStiffnessScale(this.__wbg_ptr,e,t)}sbCellStress(e,t){return X.rawsoftbodyset_sbCellStress(this.__wbg_ptr,e,t)}sbCellTearResistance(e,t){return X.rawsoftbodyset_sbCellTearResistance(this.__wbg_ptr,e,t)}sbCells(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbCells(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=os(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbCenterOfMass(e,t){try{X.rawsoftbodyset_sbCenterOfMass(this.__wbg_ptr,e,W(t))}finally{K[J++]=void 0}}sbClusterParticles(e,t){try{let a=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbClusterParticles(a,this.__wbg_ptr,e,t);var n=G().getInt32(a+0,!0),r=G().getInt32(a+4,!0),i=os(n,r).slice();return X.__wbindgen_export2(n,r*4,4),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbClusterProxy(e,t){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbClusterProxy(i,this.__wbg_ptr,e,t);var n=G().getInt32(i+0,!0),r=G().getFloat64(i+8,!0);return n===0?void 0:r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbClusterShapeMatchingEnabled(e,t){return X.rawsoftbodyset_sbClusterShapeMatchingEnabled(this.__wbg_ptr,e,t)!==0}sbDetachParticle(e,t){return X.rawsoftbodyset_sbDetachParticle(this.__wbg_ptr,e,t)!==0}sbDihedralRestAngle(e,t){return X.rawsoftbodyset_sbDihedralRestAngle(this.__wbg_ptr,e,t)}sbDihedrals(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbDihedrals(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=os(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbEdgeImpulse(e,t){return X.rawsoftbodyset_sbEdgeImpulse(this.__wbg_ptr,e,t)}sbEdgeIsBend(e,t){return X.rawsoftbodyset_sbEdgeIsBend(this.__wbg_ptr,e,t)!==0}sbEdgePlasticStrain(e,t){return X.rawsoftbodyset_sbEdgePlasticStrain(this.__wbg_ptr,e,t)}sbEdgeRestLength(e,t){return X.rawsoftbodyset_sbEdgeRestLength(this.__wbg_ptr,e,t)}sbEdgeStress(e,t){return X.rawsoftbodyset_sbEdgeStress(this.__wbg_ptr,e,t)}sbEdgeTearResistance(e,t){return X.rawsoftbodyset_sbEdgeTearResistance(this.__wbg_ptr,e,t)}sbEdges(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbEdges(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=os(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbEnableClusterShapeMatching(e,t,n){X.rawsoftbodyset_sbEnableClusterShapeMatching(this.__wbg_ptr,e,t,n)}sbEnableVolumePreservation(e,t){X.rawsoftbodyset_sbEnableVolumePreservation(this.__wbg_ptr,e,t)}sbGravityScale(e){return X.rawsoftbodyset_sbGravityScale(this.__wbg_ptr,e)}sbHasPendingTears(e){return X.rawsoftbodyset_sbHasPendingTears(this.__wbg_ptr,e)!==0}sbIsClusterLive(e,t){return X.rawsoftbodyset_sbIsClusterLive(this.__wbg_ptr,e,t)!==0}sbIsEnabled(e){return X.rawsoftbodyset_sbIsEnabled(this.__wbg_ptr,e)!==0}sbIsParticleDamaged(e,t){return X.rawsoftbodyset_sbIsParticleDamaged(this.__wbg_ptr,e,t)!==0}sbIsParticleOnSurface(e,t){return X.rawsoftbodyset_sbIsParticleOnSurface(this.__wbg_ptr,e,t)!==0}sbIsParticlePinned(e,t){return X.rawsoftbodyset_sbIsParticlePinned(this.__wbg_ptr,e,t)!==0}sbIsSleeping(e){return X.rawsoftbodyset_sbIsSleeping(this.__wbg_ptr,e)!==0}sbLinearDamping(e){return X.rawsoftbodyset_sbLinearDamping(this.__wbg_ptr,e)}sbMass(e){return X.rawsoftbodyset_sbMass(this.__wbg_ptr,e)}sbMaterial(e){let t=X.rawsoftbodyset_sbMaterial(this.__wbg_ptr,e);return Na.__wrap(t)}sbMeshCluster(e,t){let n=X.rawsoftbodyset_sbMeshCluster(this.__wbg_ptr,e,t);return n===2**53-1?void 0:n}sbMeshCollider(e,t){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbMeshCollider(i,this.__wbg_ptr,e,t);var n=G().getInt32(i+0,!0),r=G().getFloat64(i+8,!0);return n===0?void 0:r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbMeshCollisionEnabled(e,t){return X.rawsoftbodyset_sbMeshCollisionEnabled(this.__wbg_ptr,e,t)!==0}sbMeshIndices(e,t){try{let a=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbMeshIndices(a,this.__wbg_ptr,e,t);var n=G().getInt32(a+0,!0),r=G().getInt32(a+4,!0),i=os(n,r).slice();return X.__wbindgen_export2(n,r*4,4),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbMeshIsOriented(e,t){return X.rawsoftbodyset_sbMeshIsOriented(this.__wbg_ptr,e,t)!==0}sbMeshIsSkinned(e,t){return X.rawsoftbodyset_sbMeshIsSkinned(this.__wbg_ptr,e,t)!==0}sbMeshOfCollider(e,t){let n=X.rawsoftbodyset_sbMeshOfCollider(this.__wbg_ptr,e,t);return n===2**53-1?void 0:n}sbMeshVertices(e,t){try{let a=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbMeshVertices(a,this.__wbg_ptr,e,t);var n=G().getInt32(a+0,!0),r=G().getInt32(a+4,!0),i=rs(n,r).slice();return X.__wbindgen_export2(n,r*4,4),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbNumAttachments(e){return X.rawsoftbodyset_sbNumAttachments(this.__wbg_ptr,e)>>>0}sbNumCells(e){return X.rawsoftbodyset_sbNumCells(this.__wbg_ptr,e)>>>0}sbNumClusters(e){return X.rawsoftbodyset_sbNumClusters(this.__wbg_ptr,e)>>>0}sbNumDihedrals(e){return X.rawsoftbodyset_sbNumDihedrals(this.__wbg_ptr,e)>>>0}sbNumEdges(e){return X.rawsoftbodyset_sbNumEdges(this.__wbg_ptr,e)>>>0}sbNumMeshes(e){return X.rawsoftbodyset_sbNumMeshes(this.__wbg_ptr,e)>>>0}sbNumParticles(e){return X.rawsoftbodyset_sbNumParticles(this.__wbg_ptr,e)>>>0}sbOrigin(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbOrigin(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getFloat64(r+8,!0);return t===0?void 0:n}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbParticleMass(e,t){return X.rawsoftbodyset_sbParticleMass(this.__wbg_ptr,e,t)}sbParticlePosition(e,t,n){try{X.rawsoftbodyset_sbParticlePosition(this.__wbg_ptr,e,t,W(n))}finally{K[J++]=void 0}}sbParticlePositions(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbParticlePositions(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=rs(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbParticleRadius(e){return X.rawsoftbodyset_sbParticleRadius(this.__wbg_ptr,e)}sbParticleRestPosition(e,t,n){try{X.rawsoftbodyset_sbParticleRestPosition(this.__wbg_ptr,e,t,W(n))}finally{K[J++]=void 0}}sbParticleVelocities(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbParticleVelocities(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=rs(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbParticleVelocity(e,t,n){try{X.rawsoftbodyset_sbParticleVelocity(this.__wbg_ptr,e,t,W(n))}finally{K[J++]=void 0}}sbPieces(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodyset_sbPieces(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=is(t,n).slice();return X.__wbindgen_export2(t,n*8,8),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}sbResetForces(e,t){X.rawsoftbodyset_sbResetForces(this.__wbg_ptr,e,t)}sbResetPlasticity(e){X.rawsoftbodyset_sbResetPlasticity(this.__wbg_ptr,e)}sbRestVolume(e){return X.rawsoftbodyset_sbRestVolume(this.__wbg_ptr,e)}sbRootBody(e){return X.rawsoftbodyset_sbRootBody(this.__wbg_ptr,e)}sbSetAdditionalPgsIterations(e,t){X.rawsoftbodyset_sbSetAdditionalPgsIterations(this.__wbg_ptr,e,t)}sbSetClusterEdgeSoftness(e,t,n,r){X.rawsoftbodyset_sbSetClusterEdgeSoftness(this.__wbg_ptr,e,t,q(n)?2**53-1:Math.fround(n),q(r)?2**53-1:Math.fround(r))}sbSetClusterKinematicTarget(e,t,n,r){U(n,H),U(r,B),X.rawsoftbodyset_sbSetClusterKinematicTarget(this.__wbg_ptr,e,t,n.__wbg_ptr,r.__wbg_ptr)}sbSetClusterPinned(e,t,n){X.rawsoftbodyset_sbSetClusterPinned(this.__wbg_ptr,e,t,n)}sbSetClusterStiffnessScale(e,t,n){X.rawsoftbodyset_sbSetClusterStiffnessScale(this.__wbg_ptr,e,t,n)}sbSetClusterTearResistance(e,t,n){X.rawsoftbodyset_sbSetClusterTearResistance(this.__wbg_ptr,e,t,n)}sbSetEnabled(e,t){X.rawsoftbodyset_sbSetEnabled(this.__wbg_ptr,e,t)}sbSetMaterial(e,t){U(t,Na),X.rawsoftbodyset_sbSetMaterial(this.__wbg_ptr,e,t.__wbg_ptr)}sbSetParticleKinematicTarget(e,t,n){U(n,H),X.rawsoftbodyset_sbSetParticleKinematicTarget(this.__wbg_ptr,e,t,n.__wbg_ptr)}sbSetParticlePinned(e,t,n){X.rawsoftbodyset_sbSetParticlePinned(this.__wbg_ptr,e,t,n)}sbSetParticlePosition(e,t,n){U(n,H),X.rawsoftbodyset_sbSetParticlePosition(this.__wbg_ptr,e,t,n.__wbg_ptr)}sbSetParticleVelocity(e,t,n){U(n,H),X.rawsoftbodyset_sbSetParticleVelocity(this.__wbg_ptr,e,t,n.__wbg_ptr)}sbSetSolver(e,t){X.rawsoftbodyset_sbSetSolver(this.__wbg_ptr,e,t)}sbSetUserData(e,t){X.rawsoftbodyset_sbSetUserData(this.__wbg_ptr,e,t)}sbSetVolumeFactor(e,t){X.rawsoftbodyset_sbSetVolumeFactor(this.__wbg_ptr,e,t)}sbSolver(e){return X.rawsoftbodyset_sbSolver(this.__wbg_ptr,e)}sbTearCell(e,t){X.rawsoftbodyset_sbTearCell(this.__wbg_ptr,e,t)}sbTearEdge(e,t){X.rawsoftbodyset_sbTearEdge(this.__wbg_ptr,e,t)}sbTopologyVersion(e){return X.rawsoftbodyset_sbTopologyVersion(this.__wbg_ptr,e)>>>0}sbUserData(e){return X.rawsoftbodyset_sbUserData(this.__wbg_ptr,e)}sbVolumeFactor(e){return X.rawsoftbodyset_sbVolumeFactor(this.__wbg_ptr,e)}sbVolumePreservationEnabled(e){return X.rawsoftbodyset_sbVolumePreservationEnabled(this.__wbg_ptr,e)!==0}sbVolume(e){return X.rawsoftbodyset_sbVolume(this.__wbg_ptr,e)}sbWakeUp(e){X.rawsoftbodyset_sbWakeUp(this.__wbg_ptr,e)}tear(e,t,n,r,i,a,o,s){let c=Cs(t,X.__wbindgen_export3),l=Y,u=Cs(n,X.__wbindgen_export3),d=Y;U(r,pa),U(i,Ea),U(a,ea),U(o,da),U(s,_a);let f=X.rawsoftbodyset_tear(this.__wbg_ptr,e,c,l,u,d,r.__wbg_ptr,i.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,s.__wbg_ptr);return f===0?void 0:Fa.__wrap(f)}wakeUp(e,t,n){U(t,Ea),X.rawsoftbodyset_wakeUp(this.__wbg_ptr,e,t.__wbg_ptr,n)}};Symbol.dispose&&(Pa.prototype[Symbol.dispose]=Pa.prototype.free),Object.freeze({Constraints:0,0:`Constraints`,Fem:1,1:`Fem`});var Fa=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Zo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Zo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawsoftbodytearevent_free(e,0)}clusterSplitCluster(e){return X.rawsoftbodytearevent_clusterSplitCluster(this.__wbg_ptr,e)>>>0}clusterSplitKeepsProxy(e){return X.rawsoftbodytearevent_clusterSplitKeepsProxy(this.__wbg_ptr,e)!==0}clusterSplitProxy(e){return X.rawsoftbodytearevent_clusterSplitProxy(this.__wbg_ptr,e)}clusterSplitSoftBody(e){return X.rawsoftbodytearevent_clusterSplitSoftBody(this.__wbg_ptr,e)}clusterSplitSource(e){return X.rawsoftbodytearevent_clusterSplitSource(this.__wbg_ptr,e)>>>0}insertedParticles(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_insertedParticles(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}movedJointFrom(e){return X.rawsoftbodytearevent_movedJointFrom(this.__wbg_ptr,e)}movedJointTo(e){return X.rawsoftbodytearevent_movedJointTo(this.__wbg_ptr,e)}movedJoint(e){return X.rawsoftbodytearevent_movedJoint(this.__wbg_ptr,e)}numClusterSplits(){return X.rawsoftbodytearevent_numClusterSplits(this.__wbg_ptr)>>>0}numMovedJoints(){return X.rawsoftbodytearevent_numMovedJoints(this.__wbg_ptr)>>>0}numPieces(){return X.rawsoftbodytearevent_numPieces(this.__wbg_ptr)>>>0}particleDestinationBody(e){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_particleDestinationBody(r,this.__wbg_ptr,e);var t=G().getInt32(r+0,!0),n=G().getFloat64(r+8,!0);return t===0?void 0:n}finally{X.__wbindgen_add_to_stack_pointer(16)}}particleDestinationIndex(e){let t=X.rawsoftbodytearevent_particleDestinationIndex(this.__wbg_ptr,e);return t===2**53-1?void 0:t}pieceClusters(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_pieceClusters(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=os(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}pieceParticles(e){try{let i=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_pieceParticles(i,this.__wbg_ptr,e);var t=G().getInt32(i+0,!0),n=G().getInt32(i+4,!0),r=os(t,n).slice();return X.__wbindgen_export2(t,n*4,4),r}finally{X.__wbindgen_add_to_stack_pointer(16)}}pieceSoftBody(e){return X.rawsoftbodytearevent_pieceSoftBody(this.__wbg_ptr,e)}removedEdges(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_removedEdges(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}seeds(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_seeds(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}softBody(){return X.rawsoftbodytearevent_softBody(this.__wbg_ptr)}splitParticles(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_splitParticles(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}tornCells(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_tornCells(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}tornEdges(){try{let r=X.__wbindgen_add_to_stack_pointer(-16);X.rawsoftbodytearevent_tornEdges(r,this.__wbg_ptr);var e=G().getInt32(r+0,!0),t=G().getInt32(r+4,!0),n=os(e,t).slice();return X.__wbindgen_export2(e,t*4,4),n}finally{X.__wbindgen_add_to_stack_pointer(16)}}};Symbol.dispose&&(Fa.prototype[Symbol.dispose]=Fa.prototype.free),Object.freeze({Both:0,0:`Both`,Compression:1,1:`Compression`,Tension:2,2:`Tension`}),Object.freeze({Direct:0,0:`Direct`,DirectByPosition:1,1:`DirectByPosition`,Skinned:2,2:`Skinned`}),Object.freeze({Keep:0,0:`Keep`,StandDown:1,1:`StandDown`,AlongNormal:2,2:`AlongNormal`});var Ia=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,Qo.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,Qo.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawsoftrecoverysettings_free(e,0)}get authoredVelocityMargin(){return X.rawsoftrecoverysettings_authoredVelocityMargin(this.__wbg_ptr)!==0}get crossBodyDetection(){return X.rawsoftrecoverysettings_crossBodyDetection(this.__wbg_ptr)!==0}get crossBodyExpelGate(){return X.rawsoftrecoverysettings_crossBodyExpelGate(this.__wbg_ptr)!==0}get crossingRepulsionGuide(){return X.rawsoftrecoverysettings_crossingRepulsionGuide(this.__wbg_ptr)!==0}get crossingRepulsionSelfGuide(){return X.rawsoftrecoverysettings_crossingRepulsionSelfGuide(this.__wbg_ptr)!==0}get crossingRepulsion(){return X.rawsoftrecoverysettings_crossingRepulsion(this.__wbg_ptr)!==0}get detectionMotionGating(){return X.rawsoftrecoverysettings_detectionMotionGating(this.__wbg_ptr)!==0}get edgeSpeculation(){return X.rawsoftrecoverysettings_edgeSpeculation(this.__wbg_ptr)!==0}get edgeStandDown(){return X.rawsoftrecoverysettings_edgeStandDown(this.__wbg_ptr)!==0}get invertedCellDetection(){return X.rawsoftrecoverysettings_invertedCellDetection(this.__wbg_ptr)!==0}constructor(){let e=X.rawsoftrecoverysettings_new();return this.__wbg_ptr=e,Qo.register(this,this.__wbg_ptr,this),this}get overlapConstraintPace(){return X.rawsoftrecoverysettings_overlapConstraintPace(this.__wbg_ptr)}get overlapConstraints(){return X.rawsoftrecoverysettings_overlapConstraints(this.__wbg_ptr)!==0}get overlapEdgeStandDown(){return X.rawsoftrecoverysettings_overlapEdgeStandDown(this.__wbg_ptr)!==0}get overlapKeptDepth(){return X.rawsoftrecoverysettings_overlapKeptDepth(this.__wbg_ptr)}get overlapMultiVolume(){return X.rawsoftrecoverysettings_overlapMultiVolume(this.__wbg_ptr)!==0}get overlapNormalPush(){return X.rawsoftrecoverysettings_overlapNormalPush(this.__wbg_ptr)!==0}get overlapPatchConstraints(){return X.rawsoftrecoverysettings_overlapPatchConstraints(this.__wbg_ptr)}get overlapPatience(){return X.rawsoftrecoverysettings_overlapPatience(this.__wbg_ptr)>>>0}get overlapProgressMargin(){return X.rawsoftrecoverysettings_overlapProgressMargin(this.__wbg_ptr)}get overlapRigid(){return X.rawsoftrecoverysettings_overlapRigid(this.__wbg_ptr)!==0}get overlapSelfRegions(){return X.rawsoftrecoverysettings_overlapSelfRegions(this.__wbg_ptr)!==0}get overlapSkinVolume(){return X.rawsoftrecoverysettings_overlapSkinVolume(this.__wbg_ptr)!==0}get overlapSkipSelfTangled(){return X.rawsoftrecoverysettings_overlapSkipSelfTangled(this.__wbg_ptr)!==0}get overlapSplit(){return X.rawsoftrecoverysettings_overlapSplit(this.__wbg_ptr)>>>0}get recoveryPace(){return X.rawsoftrecoverysettings_recoveryPace(this.__wbg_ptr)}get selfCrossingDetection(){return X.rawsoftrecoverysettings_selfCrossingDetection(this.__wbg_ptr)!==0}get selfStandDown(){return X.rawsoftrecoverysettings_selfStandDown(this.__wbg_ptr)!==0}set authoredVelocityMargin(e){X.rawsoftrecoverysettings_set_authoredVelocityMargin(this.__wbg_ptr,e)}set crossBodyDetection(e){X.rawsoftrecoverysettings_set_crossBodyDetection(this.__wbg_ptr,e)}set crossBodyExpelGate(e){X.rawsoftrecoverysettings_set_crossBodyExpelGate(this.__wbg_ptr,e)}set crossingRepulsionGuide(e){X.rawsoftrecoverysettings_set_crossingRepulsionGuide(this.__wbg_ptr,e)}set crossingRepulsionSelfGuide(e){X.rawsoftrecoverysettings_set_crossingRepulsionSelfGuide(this.__wbg_ptr,e)}set crossingRepulsion(e){X.rawsoftrecoverysettings_set_crossingRepulsion(this.__wbg_ptr,e)}set detectionMotionGating(e){X.rawsoftrecoverysettings_set_detectionMotionGating(this.__wbg_ptr,e)}set edgeSpeculation(e){X.rawsoftrecoverysettings_set_edgeSpeculation(this.__wbg_ptr,e)}set edgeStandDown(e){X.rawsoftrecoverysettings_set_edgeStandDown(this.__wbg_ptr,e)}set invertedCellDetection(e){X.rawsoftrecoverysettings_set_invertedCellDetection(this.__wbg_ptr,e)}set overlapConstraintPace(e){X.rawsoftrecoverysettings_set_overlapConstraintPace(this.__wbg_ptr,e)}set overlapConstraints(e){X.rawsoftrecoverysettings_set_overlapConstraints(this.__wbg_ptr,e)}set overlapEdgeStandDown(e){X.rawsoftrecoverysettings_set_overlapEdgeStandDown(this.__wbg_ptr,e)}set overlapKeptDepth(e){X.rawsoftrecoverysettings_set_overlapKeptDepth(this.__wbg_ptr,e)}set overlapMultiVolume(e){X.rawsoftrecoverysettings_set_overlapMultiVolume(this.__wbg_ptr,e)}set overlapNormalPush(e){X.rawsoftrecoverysettings_set_overlapNormalPush(this.__wbg_ptr,e)}set overlapPatchConstraints(e){X.rawsoftrecoverysettings_set_overlapPatchConstraints(this.__wbg_ptr,e)}set overlapPatience(e){X.rawsoftrecoverysettings_set_overlapPatience(this.__wbg_ptr,e)}set overlapProgressMargin(e){X.rawsoftrecoverysettings_set_overlapProgressMargin(this.__wbg_ptr,e)}set overlapRigid(e){X.rawsoftrecoverysettings_set_overlapRigid(this.__wbg_ptr,e)}set overlapSelfRegions(e){X.rawsoftrecoverysettings_set_overlapSelfRegions(this.__wbg_ptr,e)}set overlapSkinVolume(e){X.rawsoftrecoverysettings_set_overlapSkinVolume(this.__wbg_ptr,e)}set overlapSkipSelfTangled(e){X.rawsoftrecoverysettings_set_overlapSkipSelfTangled(this.__wbg_ptr,e)}set overlapSplit(e){X.rawsoftrecoverysettings_set_overlapSplit(this.__wbg_ptr,e)}set recoveryPace(e){X.rawsoftrecoverysettings_set_recoveryPace(this.__wbg_ptr,e)}set selfCrossingDetection(e){X.rawsoftrecoverysettings_set_selfCrossingDetection(this.__wbg_ptr,e)}set selfStandDown(e){X.rawsoftrecoverysettings_set_selfStandDown(this.__wbg_ptr,e)}};Symbol.dispose&&(Ia.prototype[Symbol.dispose]=Ia.prototype.free);var La=class{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,$o.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawvhacdparameters_free(e,0)}get alpha(){return X.rawvhacdparameters_alpha(this.__wbg_ptr)}get beta(){return X.rawvhacdparameters_beta(this.__wbg_ptr)}get concavity(){return X.rawvhacdparameters_concavity(this.__wbg_ptr)}get convex_hull_approximation(){return X.rawvhacdparameters_convex_hull_approximation(this.__wbg_ptr)!==0}get convex_hull_downsampling(){return X.rawvhacdparameters_convex_hull_downsampling(this.__wbg_ptr)>>>0}get max_convex_hulls(){return X.rawvhacdparameters_max_convex_hulls(this.__wbg_ptr)>>>0}constructor(){let e=X.rawvhacdparameters_new();return this.__wbg_ptr=e,$o.register(this,this.__wbg_ptr,this),this}get plane_downsampling(){return X.rawvhacdparameters_plane_downsampling(this.__wbg_ptr)>>>0}get resolution(){return X.rawvhacdparameters_resolution(this.__wbg_ptr)>>>0}set alpha(e){X.rawvhacdparameters_set_alpha(this.__wbg_ptr,e)}set beta(e){X.rawvhacdparameters_set_beta(this.__wbg_ptr,e)}set concavity(e){X.rawvhacdparameters_set_concavity(this.__wbg_ptr,e)}set convex_hull_approximation(e){X.rawvhacdparameters_set_convex_hull_approximation(this.__wbg_ptr,e)}set convex_hull_downsampling(e){X.rawvhacdparameters_set_convex_hull_downsampling(this.__wbg_ptr,e)}set max_convex_hulls(e){X.rawvhacdparameters_set_max_convex_hulls(this.__wbg_ptr,e)}set plane_downsampling(e){X.rawvhacdparameters_set_plane_downsampling(this.__wbg_ptr,e)}set resolution(e){X.rawvhacdparameters_set_resolution(this.__wbg_ptr,e)}};Symbol.dispose&&(La.prototype[Symbol.dispose]=La.prototype.free);var H=class e{static __wrap(t){let n=Object.create(e.prototype);return n.__wbg_ptr=t,es.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,es.unregister(this),e}free(){let e=this.__destroy_into_raw();X.__wbg_rawvector_free(e,0)}constructor(e,t,n){let r=X.rawvector_new(e,t,n);return this.__wbg_ptr=r,es.register(this,this.__wbg_ptr,this),this}set x(e){X.rawvector_set_x(this.__wbg_ptr,e)}set y(e){X.rawvector_set_y(this.__wbg_ptr,e)}set z(e){X.rawvector_set_z(this.__wbg_ptr,e)}get x(){return X.rawvector_x(this.__wbg_ptr)}xyz(){let t=X.rawvector_xyz(this.__wbg_ptr);return e.__wrap(t)}xzy(){let t=X.rawvector_xzy(this.__wbg_ptr);return e.__wrap(t)}get y(){return X.rawvector_y(this.__wbg_ptr)}yxz(){let t=X.rawvector_yxz(this.__wbg_ptr);return e.__wrap(t)}yzx(){let t=X.rawvector_yzx(this.__wbg_ptr);return e.__wrap(t)}get z(){return X.rawvector_z(this.__wbg_ptr)}static zero(){let t=X.rawvector_zero();return e.__wrap(t)}zxy(){let t=X.rawvector_zxy(this.__wbg_ptr);return e.__wrap(t)}zyx(){let t=X.rawvector_zyx(this.__wbg_ptr);return e.__wrap(t)}};Symbol.dispose&&(H.prototype[Symbol.dispose]=H.prototype.free);function Ra(e){let t=bs(e),n=typeof t==`boolean`?t:void 0;return q(n)?16777215:+!!n}function za(e){return typeof bs(e)==`function`}function Ba(e){return bs(e)===void 0}function Va(e,t){let n=bs(t),r=typeof n==`number`?n:void 0;G().setFloat64(e+8,q(r)?0:r,!0),G().setInt32(e+0,!q(r),!0)}function Ha(e,t){throw Error(hs(e,t))}function Ua(e,t,n,r){return ts(bs(e).bind(bs(t),bs(n),bs(r)))}function Wa(){return xs(function(e,t,n,r){return ts(bs(e).call(bs(t),bs(n),bs(r)))},arguments)}function Ga(){return xs(function(e,t,n){return ts(bs(e).call(bs(t),bs(n)))},arguments)}function Ka(){return xs(function(e,t,n,r,i){return ts(bs(e).call(bs(t),bs(n),bs(r),bs(i)))},arguments)}function qa(e){return bs(e).length}function Ja(e){return bs(e).length}function Ya(e,t){return ts(new Uint8Array(ss(e,t)))}function Xa(e){return ts(new Float32Array(e>>>0))}function Za(e){return bs(e).now()}function Qa(e){let t=bs(e).performance;return ts(t)}function $a(e,t,n){Uint8Array.prototype.set.call(ss(e,t),bs(n))}function eo(e){return ts(na.__wrap(e))}function to(e){return ts(wa.__wrap(e))}function no(e){return ka.__unwrap(bs(e))}function ro(e){return ts(Fa.__wrap(e))}function io(e,t,n){bs(e).set(rs(t,n))}function ao(e,t,n){bs(e)[t>>>0]=n}function oo(){let e=typeof global>`u`?null:global;return q(e)?0:ts(e)}function so(){let e=typeof globalThis>`u`?null:globalThis;return q(e)?0:ts(e)}function co(){let e=typeof self>`u`?null:self;return q(e)?0:ts(e)}function lo(){let e=typeof window>`u`?null:window;return q(e)?0:ts(e)}function uo(e){return ts(e)}function fo(e){return ts(bs(e))}function po(e){Es(e)}var mo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawbroadphase_free(e,1)),ho=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawccdsolver_free(e,1)),go=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawcharactercollision_free(e,1)),_o=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawcolliderset_free(e,1)),vo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawcollidershapecasthit_free(e,1)),yo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawcontactforceevent_free(e,1)),bo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawcontactmanifold_free(e,1)),xo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawcontactpair_free(e,1)),So=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawconvexmeshdata_free(e,1)),Co=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawdebugrenderpipeline_free(e,1)),wo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawdeserializedworld_free(e,1)),To=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawdynamicraycastvehiclecontroller_free(e,1)),Eo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_raweventqueue_free(e,1)),Do=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawgenericjoint_free(e,1)),Oo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawimpulsejointset_free(e,1)),ko=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawintegrationparameters_free(e,1)),Ao=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawislandmanager_free(e,1)),jo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawkinematiccharactercontroller_free(e,1)),Mo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawmultibodyjointset_free(e,1)),No=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawnarrowphase_free(e,1)),Po=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawphysicspipeline_free(e,1)),Fo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawpidcontroller_free(e,1)),Io=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawpointcolliderprojection_free(e,1)),Lo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawpointprojection_free(e,1)),Ro=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawraycolliderhit_free(e,1)),zo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawraycolliderintersection_free(e,1)),Bo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawrayintersection_free(e,1)),Vo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawrigidbodyset_free(e,1)),Ho=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawrotation_free(e,1)),Uo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawsdpmatrix3_free(e,1)),Wo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawserializationpipeline_free(e,1)),Go=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawshape_free(e,1)),Ko=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawshapecasthit_free(e,1)),qo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawshapecontact_free(e,1)),Jo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawsoftbodybuilder_free(e,1)),Yo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawsoftbodymaterial_free(e,1)),Xo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawsoftbodyset_free(e,1)),Zo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawsoftbodytearevent_free(e,1)),Qo=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawsoftrecoverysettings_free(e,1)),$o=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawvhacdparameters_free(e,1)),es=typeof FinalizationRegistry>`u`?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>X.__wbg_rawvector_free(e,1));function ts(e){Ss===K.length&&K.push(K.length+1);let t=Ss;return Ss=K[t],K[t]=e,t}function U(e,t){if(!(e instanceof t))throw Error(`expected instance of ${t.name}`)}function W(e){if(J==1)throw Error(`out of js stack`);return K[--J]=e,J}function ns(e){e<1028||(K[e]=Ss,Ss=e)}function rs(e,t){return e>>>=0,us().subarray(e/4,e/4+t)}function is(e,t){return e>>>=0,fs().subarray(e/8,e/8+t)}function as(e,t){return e>>>=0,ms().subarray(e/4,e/4+t)}function os(e,t){return e>>>=0,_s().subarray(e/4,e/4+t)}function ss(e,t){return e>>>=0,ys().subarray(e/1,e/1+t)}var cs=null;function G(){return(cs===null||cs.buffer.detached===!0||cs.buffer.detached===void 0&&cs.buffer!==X.memory.buffer)&&(cs=new DataView(X.memory.buffer)),cs}var ls=null;function us(){return(ls===null||ls.byteLength===0)&&(ls=new Float32Array(X.memory.buffer)),ls}var ds=null;function fs(){return(ds===null||ds.byteLength===0)&&(ds=new Float64Array(X.memory.buffer)),ds}var ps=null;function ms(){return(ps===null||ps.byteLength===0)&&(ps=new Int32Array(X.memory.buffer)),ps}function hs(e,t){return As(e>>>0,t)}var gs=null;function _s(){return(gs===null||gs.byteLength===0)&&(gs=new Uint32Array(X.memory.buffer)),gs}var vs=null;function ys(){return(vs===null||vs.byteLength===0)&&(vs=new Uint8Array(X.memory.buffer)),vs}function bs(e){return K[e]}function xs(e,t){try{return e.apply(this,t)}catch(e){X.__wbindgen_export(ts(e))}}var K=Array(1024).fill(void 0);K.push(void 0,null,!0,!1);var Ss=K.length;function q(e){return e==null}function Cs(e,t){let n=t(e.length*4,4)>>>0;return _s().set(e,n/4),Y=e.length,n}function ws(e,t){let n=t(e.length*4,4)>>>0;return us().set(e,n/4),Y=e.length,n}function Ts(e,t){let n=t(e.length*4,4)>>>0,r=G();for(let t=0;t<e.length;t++)r.setUint32(n+4*t,ts(e[t]),!0);return Y=e.length,n}var J=1024;function Es(e){let t=bs(e);return ns(e),t}var Ds=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0});Ds.decode();var Os=2146435072,ks=0;function As(e,t){return ks+=t,ks>=Os&&(Ds=new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}),Ds.decode(),ks=t),Ds.decode(ys().subarray(e,e+t))}var Y=0,X;function js(e){X=e}var Ms=mt({__abort_handler:()=>fw,__instance_terminated:()=>pw,__wbg_get_rawconvexmeshdata_indices:()=>Ps,__wbg_get_rawconvexmeshdata_vertices:()=>Fs,__wbg_rawbroadphase_free:()=>Is,__wbg_rawccdsolver_free:()=>Ls,__wbg_rawcharactercollision_free:()=>Rs,__wbg_rawcolliderset_free:()=>zs,__wbg_rawcollidershapecasthit_free:()=>Bs,__wbg_rawcontactforceevent_free:()=>Vs,__wbg_rawcontactmanifold_free:()=>Hs,__wbg_rawcontactpair_free:()=>Us,__wbg_rawconvexmeshdata_free:()=>Ws,__wbg_rawdebugrenderpipeline_free:()=>Gs,__wbg_rawdeserializedworld_free:()=>Ks,__wbg_rawdynamicraycastvehiclecontroller_free:()=>qs,__wbg_raweventqueue_free:()=>Js,__wbg_rawgenericjoint_free:()=>Ys,__wbg_rawimpulsejointset_free:()=>Xs,__wbg_rawintegrationparameters_free:()=>Zs,__wbg_rawislandmanager_free:()=>Qs,__wbg_rawkinematiccharactercontroller_free:()=>$s,__wbg_rawmultibodyjointset_free:()=>ec,__wbg_rawnarrowphase_free:()=>tc,__wbg_rawphysicspipeline_free:()=>nc,__wbg_rawpidcontroller_free:()=>rc,__wbg_rawpointcolliderprojection_free:()=>ic,__wbg_rawpointprojection_free:()=>ac,__wbg_rawraycolliderhit_free:()=>oc,__wbg_rawraycolliderintersection_free:()=>sc,__wbg_rawrayintersection_free:()=>cc,__wbg_rawrigidbodyset_free:()=>lc,__wbg_rawrotation_free:()=>uc,__wbg_rawsdpmatrix3_free:()=>dc,__wbg_rawserializationpipeline_free:()=>fc,__wbg_rawshape_free:()=>pc,__wbg_rawshapecasthit_free:()=>mc,__wbg_rawshapecontact_free:()=>hc,__wbg_rawsoftbodybuilder_free:()=>gc,__wbg_rawsoftbodymaterial_free:()=>_c,__wbg_rawsoftbodyset_free:()=>vc,__wbg_rawsoftbodytearevent_free:()=>yc,__wbg_rawsoftrecoverysettings_free:()=>bc,__wbg_rawvector_free:()=>xc,__wbg_rawvhacdparameters_free:()=>Sc,__wbg_set_rawconvexmeshdata_indices:()=>Cc,__wbg_set_rawconvexmeshdata_vertices:()=>wc,__wbindgen_add_to_stack_pointer:()=>hw,__wbindgen_export:()=>mw,__wbindgen_export2:()=>gw,__wbindgen_export3:()=>_w,memory:()=>Ns,rawbroadphase_castRay:()=>Tc,rawbroadphase_castRayAndGetNormal:()=>Ec,rawbroadphase_castShape:()=>Dc,rawbroadphase_collidersWithAabbIntersectingAabb:()=>Oc,rawbroadphase_intersectionWithShape:()=>kc,rawbroadphase_intersectionsWithPoint:()=>Ac,rawbroadphase_intersectionsWithRay:()=>jc,rawbroadphase_intersectionsWithShape:()=>Mc,rawbroadphase_new:()=>Nc,rawbroadphase_projectPoint:()=>Pc,rawbroadphase_projectPointAndGetFeature:()=>Fc,rawccdsolver_new:()=>Ic,rawcharactercollision_handle:()=>Lc,rawcharactercollision_new:()=>Rc,rawcharactercollision_toi:()=>zc,rawcharactercollision_translationDeltaApplied:()=>Bc,rawcharactercollision_translationDeltaRemaining:()=>Vc,rawcharactercollision_worldNormal1:()=>Hc,rawcharactercollision_worldNormal2:()=>Uc,rawcharactercollision_worldWitness1:()=>Wc,rawcharactercollision_worldWitness2:()=>Gc,rawcolliderset_coActiveCollisionTypes:()=>Kc,rawcolliderset_coActiveEvents:()=>qc,rawcolliderset_coActiveHooks:()=>Jc,rawcolliderset_coCastCollider:()=>Yc,rawcolliderset_coCastRay:()=>Xc,rawcolliderset_coCastRayAndGetNormal:()=>Zc,rawcolliderset_coCastShape:()=>Qc,rawcolliderset_coCollisionGroups:()=>$c,rawcolliderset_coCombineVoxelStates:()=>el,rawcolliderset_coCompoundFlags:()=>tl,rawcolliderset_coContactCollider:()=>nl,rawcolliderset_coContactForceEventThreshold:()=>rl,rawcolliderset_coContactShape:()=>il,rawcolliderset_coContactSkin:()=>al,rawcolliderset_coContainsPoint:()=>ol,rawcolliderset_coDensity:()=>sl,rawcolliderset_coFriction:()=>cl,rawcolliderset_coFrictionCombineRule:()=>ll,rawcolliderset_coHalfExtents:()=>ul,rawcolliderset_coHalfHeight:()=>dl,rawcolliderset_coHalfspaceNormal:()=>fl,rawcolliderset_coHeightFieldFlags:()=>pl,rawcolliderset_coHeightfieldHeights:()=>ml,rawcolliderset_coHeightfieldNCols:()=>hl,rawcolliderset_coHeightfieldNRows:()=>gl,rawcolliderset_coHeightfieldScale:()=>_l,rawcolliderset_coIndices:()=>vl,rawcolliderset_coIntersectsRay:()=>yl,rawcolliderset_coIntersectsShape:()=>bl,rawcolliderset_coIsDeformable:()=>xl,rawcolliderset_coIsEnabled:()=>Sl,rawcolliderset_coIsSensor:()=>Cl,rawcolliderset_coMass:()=>wl,rawcolliderset_coParent:()=>Tl,rawcolliderset_coPolylineFlags:()=>El,rawcolliderset_coProjectPoint:()=>Dl,rawcolliderset_coPropagateVoxelChange:()=>Ol,rawcolliderset_coRadius:()=>kl,rawcolliderset_coRestitution:()=>Al,rawcolliderset_coRestitutionCombineRule:()=>jl,rawcolliderset_coRotation:()=>Ml,rawcolliderset_coRotationWrtParent:()=>Nl,rawcolliderset_coRoundRadius:()=>Pl,rawcolliderset_coSetActiveCollisionTypes:()=>Fl,rawcolliderset_coSetActiveEvents:()=>Il,rawcolliderset_coSetActiveHooks:()=>Ll,rawcolliderset_coSetCollisionGroups:()=>Rl,rawcolliderset_coSetContactForceEventThreshold:()=>zl,rawcolliderset_coSetContactSkin:()=>Bl,rawcolliderset_coSetDensity:()=>Vl,rawcolliderset_coSetEnabled:()=>Hl,rawcolliderset_coSetFriction:()=>Ul,rawcolliderset_coSetFrictionCombineRule:()=>Wl,rawcolliderset_coSetHalfExtents:()=>Gl,rawcolliderset_coSetHalfHeight:()=>Kl,rawcolliderset_coSetMass:()=>ql,rawcolliderset_coSetMassProperties:()=>Jl,rawcolliderset_coSetRadius:()=>Yl,rawcolliderset_coSetRestitution:()=>Xl,rawcolliderset_coSetRestitutionCombineRule:()=>Zl,rawcolliderset_coSetRotation:()=>Ql,rawcolliderset_coSetRotationWrtParent:()=>$l,rawcolliderset_coSetRoundRadius:()=>eu,rawcolliderset_coSetSensor:()=>tu,rawcolliderset_coSetShape:()=>nu,rawcolliderset_coSetSolverGroups:()=>ru,rawcolliderset_coSetTranslation:()=>iu,rawcolliderset_coSetTranslationWrtParent:()=>au,rawcolliderset_coSetVoxel:()=>ou,rawcolliderset_coShape:()=>su,rawcolliderset_coShapeType:()=>cu,rawcolliderset_coSoftBody:()=>lu,rawcolliderset_coSolverGroups:()=>uu,rawcolliderset_coTranslation:()=>du,rawcolliderset_coTranslationWrtParent:()=>fu,rawcolliderset_coTriMeshFlags:()=>pu,rawcolliderset_coVertices:()=>mu,rawcolliderset_coVolume:()=>hu,rawcolliderset_coVoxelData:()=>gu,rawcolliderset_coVoxelSize:()=>_u,rawcolliderset_contains:()=>vu,rawcolliderset_createCollider:()=>yu,rawcolliderset_createDeformableCollider:()=>bu,rawcolliderset_forEachColliderHandle:()=>xu,rawcolliderset_isHandleValid:()=>Su,rawcolliderset_len:()=>Cu,rawcolliderset_new:()=>wu,rawcolliderset_remove:()=>Tu,rawcollidershapecasthit_colliderHandle:()=>Eu,rawcollidershapecasthit_getComponents:()=>Du,rawcontactforceevent_collider1:()=>Ou,rawcontactforceevent_collider2:()=>ku,rawcontactforceevent_max_force_direction:()=>Au,rawcontactforceevent_max_force_magnitude:()=>ju,rawcontactforceevent_total_force:()=>Mu,rawcontactforceevent_total_force_magnitude:()=>Nu,rawcontactmanifold_contact_dist:()=>Pu,rawcontactmanifold_contact_fid1:()=>Fu,rawcontactmanifold_contact_fid2:()=>Iu,rawcontactmanifold_contact_impulse:()=>Lu,rawcontactmanifold_contact_local_p1:()=>Ru,rawcontactmanifold_contact_local_p2:()=>zu,rawcontactmanifold_contact_tangent_impulse_x:()=>Bu,rawcontactmanifold_contact_tangent_impulse_y:()=>Vu,rawcontactmanifold_friction:()=>Hu,rawcontactmanifold_local_n1:()=>Uu,rawcontactmanifold_local_n2:()=>Wu,rawcontactmanifold_normal:()=>Gu,rawcontactmanifold_num_contacts:()=>Ku,rawcontactmanifold_num_solver_contacts:()=>qu,rawcontactmanifold_restitution:()=>Ju,rawcontactmanifold_solver_contact_dist:()=>Yu,rawcontactmanifold_solver_contact_point:()=>Xu,rawcontactmanifold_solver_contact_tangent_velocity:()=>Zu,rawcontactmanifold_subshape1:()=>Qu,rawcontactmanifold_subshape2:()=>$u,rawcontactpair_collider1:()=>ed,rawcontactpair_collider2:()=>td,rawcontactpair_contactManifold:()=>nd,rawcontactpair_numContactManifolds:()=>rd,rawdebugrenderpipeline_colors:()=>id,rawdebugrenderpipeline_new:()=>ad,rawdebugrenderpipeline_render:()=>od,rawdebugrenderpipeline_vertices:()=>sd,rawdeserializedworld_takeBodies:()=>cd,rawdeserializedworld_takeBroadPhase:()=>ld,rawdeserializedworld_takeColliders:()=>ud,rawdeserializedworld_takeGravity:()=>dd,rawdeserializedworld_takeImpulseJoints:()=>fd,rawdeserializedworld_takeIntegrationParameters:()=>pd,rawdeserializedworld_takeIslandManager:()=>md,rawdeserializedworld_takeMultibodyJoints:()=>hd,rawdeserializedworld_takeNarrowPhase:()=>gd,rawdeserializedworld_takeSoftBodies:()=>_d,rawdynamicraycastvehiclecontroller_add_wheel:()=>vd,rawdynamicraycastvehiclecontroller_chassis:()=>yd,rawdynamicraycastvehiclecontroller_current_vehicle_speed:()=>bd,rawdynamicraycastvehiclecontroller_index_forward_axis:()=>xd,rawdynamicraycastvehiclecontroller_index_up_axis:()=>Sd,rawdynamicraycastvehiclecontroller_new:()=>Cd,rawdynamicraycastvehiclecontroller_num_wheels:()=>wd,rawdynamicraycastvehiclecontroller_set_index_forward_axis:()=>Td,rawdynamicraycastvehiclecontroller_set_index_up_axis:()=>Ed,rawdynamicraycastvehiclecontroller_set_wheel_axle_cs:()=>Dd,rawdynamicraycastvehiclecontroller_set_wheel_brake:()=>Od,rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs:()=>kd,rawdynamicraycastvehiclecontroller_set_wheel_direction_cs:()=>Ad,rawdynamicraycastvehiclecontroller_set_wheel_engine_force:()=>jd,rawdynamicraycastvehiclecontroller_set_wheel_friction_slip:()=>Md,rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force:()=>Nd,rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel:()=>Pd,rawdynamicraycastvehiclecontroller_set_wheel_radius:()=>Fd,rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness:()=>Id,rawdynamicraycastvehiclecontroller_set_wheel_steering:()=>Ld,rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression:()=>Rd,rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation:()=>zd,rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length:()=>Bd,rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness:()=>Vd,rawdynamicraycastvehiclecontroller_update_vehicle:()=>Hd,rawdynamicraycastvehiclecontroller_wheel_axle_cs:()=>Ud,rawdynamicraycastvehiclecontroller_wheel_brake:()=>Wd,rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs:()=>Gd,rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws:()=>Kd,rawdynamicraycastvehiclecontroller_wheel_contact_point_ws:()=>qd,rawdynamicraycastvehiclecontroller_wheel_direction_cs:()=>Jd,rawdynamicraycastvehiclecontroller_wheel_engine_force:()=>Yd,rawdynamicraycastvehiclecontroller_wheel_forward_impulse:()=>Xd,rawdynamicraycastvehiclecontroller_wheel_friction_slip:()=>Zd,rawdynamicraycastvehiclecontroller_wheel_ground_object:()=>Qd,rawdynamicraycastvehiclecontroller_wheel_hard_point_ws:()=>$d,rawdynamicraycastvehiclecontroller_wheel_is_in_contact:()=>ef,rawdynamicraycastvehiclecontroller_wheel_max_suspension_force:()=>tf,rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel:()=>nf,rawdynamicraycastvehiclecontroller_wheel_radius:()=>rf,rawdynamicraycastvehiclecontroller_wheel_rotation:()=>af,rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness:()=>of,rawdynamicraycastvehiclecontroller_wheel_side_impulse:()=>sf,rawdynamicraycastvehiclecontroller_wheel_steering:()=>cf,rawdynamicraycastvehiclecontroller_wheel_suspension_compression:()=>lf,rawdynamicraycastvehiclecontroller_wheel_suspension_force:()=>uf,rawdynamicraycastvehiclecontroller_wheel_suspension_length:()=>df,rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation:()=>ff,rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length:()=>pf,rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness:()=>mf,raweventqueue_clear:()=>hf,raweventqueue_drainCollisionEvents:()=>gf,raweventqueue_drainContactForceEvents:()=>_f,raweventqueue_drainSoftBodyTearEvents:()=>vf,raweventqueue_new:()=>yf,rawgenericjoint_fixed:()=>bf,rawgenericjoint_generic:()=>xf,rawgenericjoint_prismatic:()=>Sf,rawgenericjoint_revolute:()=>Cf,rawgenericjoint_revoluteWithAxes:()=>wf,rawgenericjoint_rope:()=>Tf,rawgenericjoint_spherical:()=>Ef,rawgenericjoint_spring:()=>Df,rawimpulsejointset_contains:()=>Of,rawimpulsejointset_createJoint:()=>kf,rawimpulsejointset_forEachJointAttachedToRigidBody:()=>Af,rawimpulsejointset_forEachJointHandle:()=>jf,rawimpulsejointset_jointAnchor1:()=>Mf,rawimpulsejointset_jointAnchor2:()=>Nf,rawimpulsejointset_jointBodyHandle1:()=>Pf,rawimpulsejointset_jointBodyHandle2:()=>Ff,rawimpulsejointset_jointConfigureMotor:()=>If,rawimpulsejointset_jointConfigureMotorModel:()=>Lf,rawimpulsejointset_jointConfigureMotorPosition:()=>Rf,rawimpulsejointset_jointConfigureMotorVelocity:()=>zf,rawimpulsejointset_jointContactsEnabled:()=>Bf,rawimpulsejointset_jointFrameX1:()=>Vf,rawimpulsejointset_jointFrameX2:()=>Hf,rawimpulsejointset_jointLimitsEnabled:()=>Uf,rawimpulsejointset_jointLimitsMax:()=>Wf,rawimpulsejointset_jointLimitsMin:()=>Gf,rawimpulsejointset_jointSetAnchor1:()=>Kf,rawimpulsejointset_jointSetAnchor2:()=>qf,rawimpulsejointset_jointSetContactsEnabled:()=>Jf,rawimpulsejointset_jointSetFrameX1:()=>Yf,rawimpulsejointset_jointSetFrameX2:()=>Xf,rawimpulsejointset_jointSetLimits:()=>Zf,rawimpulsejointset_jointSetLocalFrame1:()=>Qf,rawimpulsejointset_jointSetLocalFrame2:()=>$f,rawimpulsejointset_jointSetMotorMaxForce:()=>ep,rawimpulsejointset_jointType:()=>tp,rawimpulsejointset_len:()=>np,rawimpulsejointset_new:()=>rp,rawimpulsejointset_remove:()=>ip,rawintegrationparameters_contact_erp:()=>ap,rawintegrationparameters_dt:()=>op,rawintegrationparameters_lengthUnit:()=>sp,rawintegrationparameters_maxCcdSubsteps:()=>cp,rawintegrationparameters_new:()=>lp,rawintegrationparameters_normalizedAllowedLinearError:()=>up,rawintegrationparameters_normalizedPredictionDistance:()=>dp,rawintegrationparameters_numInternalPgsIterations:()=>fp,rawintegrationparameters_numSolverIterations:()=>pp,rawintegrationparameters_set_contact_natural_frequency:()=>mp,rawintegrationparameters_set_dt:()=>hp,rawintegrationparameters_set_lengthUnit:()=>gp,rawintegrationparameters_set_maxCcdSubsteps:()=>_p,rawintegrationparameters_set_normalizedAllowedLinearError:()=>vp,rawintegrationparameters_set_normalizedPredictionDistance:()=>yp,rawintegrationparameters_set_numInternalPgsIterations:()=>bp,rawintegrationparameters_set_numSolverIterations:()=>xp,rawintegrationparameters_set_softBodiesContactStiffening:()=>Sp,rawintegrationparameters_set_softBodiesFemLinearTolerance:()=>Cp,rawintegrationparameters_set_softBodiesFemMaxDenseDofs:()=>wp,rawintegrationparameters_set_softBodiesFemMaxLinearIterations:()=>Tp,rawintegrationparameters_set_softBodiesMaxExtraSubsteps:()=>Ep,rawintegrationparameters_set_softBodiesRecovery:()=>Dp,rawintegrationparameters_set_softBodiesResweepStrain:()=>Op,rawintegrationparameters_softBodiesContactStiffening:()=>kp,rawintegrationparameters_softBodiesFemLinearTolerance:()=>Ap,rawintegrationparameters_softBodiesFemMaxDenseDofs:()=>jp,rawintegrationparameters_softBodiesFemMaxLinearIterations:()=>Mp,rawintegrationparameters_softBodiesMaxExtraSubsteps:()=>Np,rawintegrationparameters_softBodiesRecovery:()=>Pp,rawintegrationparameters_softBodiesResweepStrain:()=>Fp,rawislandmanager_forEachActiveRigidBodyHandle:()=>Ip,rawislandmanager_new:()=>Lp,rawkinematiccharactercontroller_autostepEnabled:()=>Rp,rawkinematiccharactercontroller_autostepIncludesDynamicBodies:()=>zp,rawkinematiccharactercontroller_autostepMaxHeight:()=>Bp,rawkinematiccharactercontroller_autostepMinWidth:()=>Vp,rawkinematiccharactercontroller_computeColliderMovement:()=>Hp,rawkinematiccharactercontroller_computedCollision:()=>Up,rawkinematiccharactercontroller_computedGrounded:()=>Wp,rawkinematiccharactercontroller_computedMovement:()=>Gp,rawkinematiccharactercontroller_disableAutostep:()=>Kp,rawkinematiccharactercontroller_disableSnapToGround:()=>qp,rawkinematiccharactercontroller_enableAutostep:()=>Jp,rawkinematiccharactercontroller_enableSnapToGround:()=>Yp,rawkinematiccharactercontroller_maxSlopeClimbAngle:()=>Xp,rawkinematiccharactercontroller_minSlopeSlideAngle:()=>Zp,rawkinematiccharactercontroller_new:()=>Qp,rawkinematiccharactercontroller_normalNudgeFactor:()=>$p,rawkinematiccharactercontroller_numComputedCollisions:()=>em,rawkinematiccharactercontroller_offset:()=>tm,rawkinematiccharactercontroller_setMaxSlopeClimbAngle:()=>nm,rawkinematiccharactercontroller_setMinSlopeSlideAngle:()=>rm,rawkinematiccharactercontroller_setNormalNudgeFactor:()=>im,rawkinematiccharactercontroller_setOffset:()=>am,rawkinematiccharactercontroller_setSlideEnabled:()=>om,rawkinematiccharactercontroller_setUp:()=>sm,rawkinematiccharactercontroller_slideEnabled:()=>cm,rawkinematiccharactercontroller_snapToGroundDistance:()=>lm,rawkinematiccharactercontroller_snapToGroundEnabled:()=>um,rawkinematiccharactercontroller_up:()=>dm,rawmultibodyjointset_contains:()=>fm,rawmultibodyjointset_createJoint:()=>pm,rawmultibodyjointset_forEachJointAttachedToRigidBody:()=>mm,rawmultibodyjointset_forEachJointHandle:()=>hm,rawmultibodyjointset_jointAnchor1:()=>gm,rawmultibodyjointset_jointAnchor2:()=>_m,rawmultibodyjointset_jointContactsEnabled:()=>vm,rawmultibodyjointset_jointFrameX1:()=>ym,rawmultibodyjointset_jointFrameX2:()=>bm,rawmultibodyjointset_jointLimitsEnabled:()=>xm,rawmultibodyjointset_jointLimitsMax:()=>Sm,rawmultibodyjointset_jointLimitsMin:()=>Cm,rawmultibodyjointset_jointSetContactsEnabled:()=>wm,rawmultibodyjointset_jointType:()=>Tm,rawmultibodyjointset_new:()=>Em,rawmultibodyjointset_remove:()=>Dm,rawnarrowphase_contact_pair:()=>Om,rawnarrowphase_contact_pairs_with:()=>km,rawnarrowphase_intersection_pair:()=>Am,rawnarrowphase_intersection_pairs_with:()=>jm,rawnarrowphase_new:()=>Mm,rawphysicspipeline_is_profiler_enabled:()=>Nm,rawphysicspipeline_new:()=>Pm,rawphysicspipeline_set_profiler_enabled:()=>Fm,rawphysicspipeline_step:()=>Im,rawphysicspipeline_stepWithEvents:()=>Lm,rawphysicspipeline_timing_broad_phase:()=>Rm,rawphysicspipeline_timing_ccd:()=>zm,rawphysicspipeline_timing_ccd_broad_phase:()=>Bm,rawphysicspipeline_timing_ccd_narrow_phase:()=>Vm,rawphysicspipeline_timing_ccd_solver:()=>Hm,rawphysicspipeline_timing_ccd_toi_computation:()=>Um,rawphysicspipeline_timing_collision_detection:()=>Wm,rawphysicspipeline_timing_island_construction:()=>Gm,rawphysicspipeline_timing_narrow_phase:()=>Km,rawphysicspipeline_timing_solver:()=>qm,rawphysicspipeline_timing_step:()=>Jm,rawphysicspipeline_timing_user_changes:()=>Ym,rawphysicspipeline_timing_velocity_assembly:()=>Xm,rawphysicspipeline_timing_velocity_resolution:()=>Zm,rawphysicspipeline_timing_velocity_update:()=>Qm,rawphysicspipeline_timing_velocity_writeback:()=>$m,rawpidcontroller_angular_correction:()=>eh,rawpidcontroller_apply_angular_correction:()=>th,rawpidcontroller_apply_linear_correction:()=>nh,rawpidcontroller_linear_correction:()=>rh,rawpidcontroller_new:()=>ih,rawpidcontroller_reset_integrals:()=>ah,rawpidcontroller_set_axes_mask:()=>oh,rawpidcontroller_set_kd:()=>sh,rawpidcontroller_set_ki:()=>ch,rawpidcontroller_set_kp:()=>lh,rawpointcolliderprojection_colliderHandle:()=>uh,rawpointcolliderprojection_featureId:()=>dh,rawpointcolliderprojection_featureType:()=>fh,rawpointcolliderprojection_isInside:()=>ph,rawpointcolliderprojection_point:()=>mh,rawpointprojection_isInside:()=>hh,rawpointprojection_point:()=>gh,rawraycolliderhit_colliderHandle:()=>_h,rawraycolliderhit_timeOfImpact:()=>vh,rawraycolliderintersection_colliderHandle:()=>yh,rawraycolliderintersection_featureId:()=>bh,rawraycolliderintersection_featureType:()=>xh,rawraycolliderintersection_normal:()=>Sh,rawraycolliderintersection_time_of_impact:()=>Ch,rawrayintersection_featureId:()=>wh,rawrayintersection_featureType:()=>Th,rawrayintersection_normal:()=>Eh,rawrayintersection_time_of_impact:()=>Dh,rawrigidbodyset_contains:()=>Oh,rawrigidbodyset_createRigidBody:()=>kh,rawrigidbodyset_forEachRigidBodyHandle:()=>Ah,rawrigidbodyset_len:()=>jh,rawrigidbodyset_new:()=>Mh,rawrigidbodyset_propagateModifiedBodyPositionsToColliders:()=>Nh,rawrigidbodyset_rbAddForce:()=>Ph,rawrigidbodyset_rbAddForceAtPoint:()=>Fh,rawrigidbodyset_rbAddTorque:()=>Ih,rawrigidbodyset_rbAdditionalPgsIterations:()=>Lh,rawrigidbodyset_rbAdditionalSolverIterations:()=>Rh,rawrigidbodyset_rbAngularDamping:()=>zh,rawrigidbodyset_rbAngvel:()=>Bh,rawrigidbodyset_rbApplyImpulse:()=>Vh,rawrigidbodyset_rbApplyImpulseAtPoint:()=>Hh,rawrigidbodyset_rbApplyTorqueImpulse:()=>Uh,rawrigidbodyset_rbBodyType:()=>Wh,rawrigidbodyset_rbCollider:()=>Gh,rawrigidbodyset_rbDominanceGroup:()=>Kh,rawrigidbodyset_rbEffectiveAngularInertia:()=>qh,rawrigidbodyset_rbEffectiveInvMass:()=>Jh,rawrigidbodyset_rbEffectiveWorldInvInertia:()=>Yh,rawrigidbodyset_rbEnableCcd:()=>Xh,rawrigidbodyset_rbGravityScale:()=>Zh,rawrigidbodyset_rbInvMass:()=>Qh,rawrigidbodyset_rbInvPrincipalInertia:()=>$h,rawrigidbodyset_rbIsCcdEnabled:()=>eg,rawrigidbodyset_rbIsDynamic:()=>tg,rawrigidbodyset_rbIsEnabled:()=>ng,rawrigidbodyset_rbIsFixed:()=>rg,rawrigidbodyset_rbIsKinematic:()=>ig,rawrigidbodyset_rbIsMoving:()=>ag,rawrigidbodyset_rbIsSleeping:()=>og,rawrigidbodyset_rbIsSoftFrame:()=>sg,rawrigidbodyset_rbLinearDamping:()=>cg,rawrigidbodyset_rbLinvel:()=>lg,rawrigidbodyset_rbLocalCom:()=>ug,rawrigidbodyset_rbLockRotations:()=>dg,rawrigidbodyset_rbLockTranslations:()=>fg,rawrigidbodyset_rbMass:()=>pg,rawrigidbodyset_rbNextRotation:()=>mg,rawrigidbodyset_rbNextTranslation:()=>hg,rawrigidbodyset_rbNumColliders:()=>gg,rawrigidbodyset_rbPrincipalInertia:()=>_g,rawrigidbodyset_rbPrincipalInertiaLocalFrame:()=>vg,rawrigidbodyset_rbRecomputeMassPropertiesFromColliders:()=>yg,rawrigidbodyset_rbResetForces:()=>bg,rawrigidbodyset_rbResetTorques:()=>xg,rawrigidbodyset_rbRotation:()=>Sg,rawrigidbodyset_rbSetAdditionalMass:()=>Cg,rawrigidbodyset_rbSetAdditionalMassProperties:()=>wg,rawrigidbodyset_rbSetAdditionalPgsIterations:()=>Tg,rawrigidbodyset_rbSetAdditionalSolverIterations:()=>Eg,rawrigidbodyset_rbSetAngularDamping:()=>Dg,rawrigidbodyset_rbSetAngvel:()=>Og,rawrigidbodyset_rbSetBodyType:()=>kg,rawrigidbodyset_rbSetDominanceGroup:()=>Ag,rawrigidbodyset_rbSetEnabled:()=>jg,rawrigidbodyset_rbSetEnabledRotations:()=>Mg,rawrigidbodyset_rbSetEnabledTranslations:()=>Ng,rawrigidbodyset_rbSetGravityScale:()=>Pg,rawrigidbodyset_rbSetLinearDamping:()=>Fg,rawrigidbodyset_rbSetLinvel:()=>Ig,rawrigidbodyset_rbSetNextKinematicRotation:()=>Lg,rawrigidbodyset_rbSetNextKinematicTranslation:()=>Rg,rawrigidbodyset_rbSetRotation:()=>zg,rawrigidbodyset_rbSetSoftCcdPrediction:()=>Bg,rawrigidbodyset_rbSetTranslation:()=>Vg,rawrigidbodyset_rbSetUserData:()=>Hg,rawrigidbodyset_rbSleep:()=>Ug,rawrigidbodyset_rbSoftBody:()=>Wg,rawrigidbodyset_rbSoftCcdPrediction:()=>Gg,rawrigidbodyset_rbSoftCluster:()=>Kg,rawrigidbodyset_rbTranslation:()=>qg,rawrigidbodyset_rbUserData:()=>Jg,rawrigidbodyset_rbUserForce:()=>Yg,rawrigidbodyset_rbUserTorque:()=>Xg,rawrigidbodyset_rbVelocityAtPoint:()=>Zg,rawrigidbodyset_rbWakeUp:()=>Qg,rawrigidbodyset_rbWorldCom:()=>$g,rawrigidbodyset_remove:()=>e_,rawrotation_identity:()=>t_,rawrotation_new:()=>n_,rawrotation_w:()=>r_,rawrotation_x:()=>i_,rawrotation_y:()=>a_,rawrotation_z:()=>o_,rawsdpmatrix3_elements:()=>s_,rawserializationpipeline_deserializeAll:()=>c_,rawserializationpipeline_new:()=>l_,rawserializationpipeline_serializeAll:()=>u_,rawshape_ball:()=>d_,rawshape_capsule:()=>f_,rawshape_castRay:()=>p_,rawshape_castRayAndGetNormal:()=>m_,rawshape_castShape:()=>h_,rawshape_compound:()=>g_,rawshape_compoundFlags:()=>__,rawshape_compoundLen:()=>v_,rawshape_compoundRotation:()=>y_,rawshape_compoundShape:()=>b_,rawshape_compoundTranslation:()=>x_,rawshape_cone:()=>S_,rawshape_contactShape:()=>C_,rawshape_containsPoint:()=>w_,rawshape_convexDecomposition:()=>T_,rawshape_convexDecompositionWithParams:()=>E_,rawshape_convexHull:()=>D_,rawshape_convexMesh:()=>O_,rawshape_convexMeshData:()=>k_,rawshape_cuboid:()=>A_,rawshape_cylinder:()=>j_,rawshape_halfExtents:()=>M_,rawshape_halfHeight:()=>N_,rawshape_halfspace:()=>P_,rawshape_halfspaceNormal:()=>F_,rawshape_heightFieldFlags:()=>I_,rawshape_heightfield:()=>L_,rawshape_heightfieldHeights:()=>R_,rawshape_heightfieldNCols:()=>z_,rawshape_heightfieldNRows:()=>B_,rawshape_heightfieldScale:()=>V_,rawshape_indices:()=>H_,rawshape_intersectsRay:()=>U_,rawshape_intersectsShape:()=>W_,rawshape_polyline:()=>G_,rawshape_polylineFlags:()=>K_,rawshape_projectPoint:()=>q_,rawshape_radius:()=>J_,rawshape_roundCone:()=>Y_,rawshape_roundConvexHull:()=>X_,rawshape_roundConvexMesh:()=>Z_,rawshape_roundCuboid:()=>Q_,rawshape_roundCylinder:()=>$_,rawshape_roundRadius:()=>ev,rawshape_roundTriangle:()=>tv,rawshape_segment:()=>nv,rawshape_shapeType:()=>rv,rawshape_triMeshFlags:()=>iv,rawshape_triangle:()=>av,rawshape_trimesh:()=>ov,rawshape_vertices:()=>sv,rawshape_voxelData:()=>cv,rawshape_voxelSize:()=>lv,rawshape_voxels:()=>uv,rawshape_voxelsFromPoints:()=>dv,rawshapecasthit_getComponents:()=>fv,rawshapecontact_getComponents:()=>pv,rawsoftbodybuilder_addEdges:()=>mv,rawsoftbodybuilder_append:()=>hv,rawsoftbodybuilder_cellEdges:()=>gv,rawsoftbodybuilder_cloth:()=>_v,rawsoftbodybuilder_clothAnisotropic:()=>vv,rawsoftbodybuilder_clothTube:()=>yv,rawsoftbodybuilder_cuboid:()=>bv,rawsoftbodybuilder_material:()=>xv,rawsoftbodybuilder_new:()=>Sv,rawsoftbodybuilder_numParticles:()=>Cv,rawsoftbodybuilder_particlePositions:()=>wv,rawsoftbodybuilder_rope:()=>Tv,rawsoftbodybuilder_setAdditionalPgsIterations:()=>Ev,rawsoftbodybuilder_setAdditionalSolverIterations:()=>Dv,rawsoftbodybuilder_setBendEdges:()=>Ov,rawsoftbodybuilder_setCanSleep:()=>kv,rawsoftbodybuilder_setCellModel:()=>Av,rawsoftbodybuilder_setCells:()=>jv,rawsoftbodybuilder_setDihedrals:()=>Mv,rawsoftbodybuilder_setDominanceGroup:()=>Nv,rawsoftbodybuilder_setEdgeSoftness:()=>Pv,rawsoftbodybuilder_setEdgeTearResistance:()=>Fv,rawsoftbodybuilder_setEdges:()=>Iv,rawsoftbodybuilder_setGravityScale:()=>Lv,rawsoftbodybuilder_setLinearDamping:()=>Rv,rawsoftbodybuilder_setMass:()=>zv,rawsoftbodybuilder_setMasses:()=>Bv,rawsoftbodybuilder_setMaterial:()=>Vv,rawsoftbodybuilder_setNoSurfaceCollider:()=>Hv,rawsoftbodybuilder_setOriented:()=>Uv,rawsoftbodybuilder_setParticleMass:()=>Wv,rawsoftbodybuilder_setParticleRadius:()=>Gv,rawsoftbodybuilder_setPinnedParticles:()=>Kv,rawsoftbodybuilder_setPositions:()=>qv,rawsoftbodybuilder_setSelfContacts:()=>Jv,rawsoftbodybuilder_setShapeMatching:()=>Yv,rawsoftbodybuilder_setSkin:()=>Xv,rawsoftbodybuilder_setSkinCollision:()=>Zv,rawsoftbodybuilder_setSoftness:()=>Qv,rawsoftbodybuilder_setSolver:()=>$v,rawsoftbodybuilder_setSurface:()=>ey,rawsoftbodybuilder_setSurfaceCollider:()=>ty,rawsoftbodybuilder_setTensionOnly:()=>ny,rawsoftbodybuilder_setVolumeFactor:()=>ry,rawsoftbodybuilder_setVolumePreservation:()=>iy,rawsoftbodybuilder_setWire:()=>ay,rawsoftbodybuilder_sphere:()=>oy,rawsoftbodybuilder_surfaceDihedrals:()=>sy,rawsoftbodybuilder_surfaceEdges:()=>cy,rawsoftbodybuilder_translated:()=>ly,rawsoftbodybuilder_trimesh:()=>uy,rawsoftbodybuilder_volumetric:()=>dy,rawsoftbodymaterial_bendDampingRatio:()=>fy,rawsoftbodymaterial_bendFrequency:()=>py,rawsoftbodymaterial_deformationDamping:()=>my,rawsoftbodymaterial_edgeDampingRatio:()=>hy,rawsoftbodymaterial_edgeFrequency:()=>gy,rawsoftbodymaterial_edgePlasticCreep:()=>_y,rawsoftbodymaterial_edgePlasticFlow:()=>vy,rawsoftbodymaterial_edgePlasticMax:()=>yy,rawsoftbodymaterial_edgePlasticYield:()=>by,rawsoftbodymaterial_elasticDampingRatio:()=>xy,rawsoftbodymaterial_interiorStrength:()=>Sy,rawsoftbodymaterial_maxTearsPerStep:()=>Cy,rawsoftbodymaterial_minPiece:()=>wy,rawsoftbodymaterial_new:()=>Ty,rawsoftbodymaterial_plasticCreep:()=>Ey,rawsoftbodymaterial_plasticMax:()=>Dy,rawsoftbodymaterial_plasticYield:()=>Oy,rawsoftbodymaterial_poissonRatio:()=>ky,rawsoftbodymaterial_set_bendDampingRatio:()=>Ay,rawsoftbodymaterial_set_bendFrequency:()=>jy,rawsoftbodymaterial_set_deformationDamping:()=>My,rawsoftbodymaterial_set_edgeDampingRatio:()=>Ny,rawsoftbodymaterial_set_edgeFrequency:()=>Py,rawsoftbodymaterial_set_edgePlasticCreep:()=>Fy,rawsoftbodymaterial_set_edgePlasticFlow:()=>Iy,rawsoftbodymaterial_set_edgePlasticMax:()=>Ly,rawsoftbodymaterial_set_edgePlasticYield:()=>Ry,rawsoftbodymaterial_set_elasticDampingRatio:()=>zy,rawsoftbodymaterial_set_interiorStrength:()=>By,rawsoftbodymaterial_set_maxTearsPerStep:()=>Vy,rawsoftbodymaterial_set_minPiece:()=>Hy,rawsoftbodymaterial_set_plasticCreep:()=>Uy,rawsoftbodymaterial_set_plasticMax:()=>Wy,rawsoftbodymaterial_set_plasticYield:()=>Gy,rawsoftbodymaterial_set_poissonRatio:()=>Ky,rawsoftbodymaterial_set_shapeMatchingDampingRatio:()=>qy,rawsoftbodymaterial_set_shapeMatchingFrequency:()=>Jy,rawsoftbodymaterial_set_tearForce:()=>Yy,rawsoftbodymaterial_set_tearSmoothing:()=>Xy,rawsoftbodymaterial_set_tearStrain:()=>Zy,rawsoftbodymaterial_set_volumeDampingRatio:()=>Qy,rawsoftbodymaterial_set_volumeFrequency:()=>$y,rawsoftbodymaterial_set_youngModulus:()=>eb,rawsoftbodymaterial_shapeMatchingDampingRatio:()=>tb,rawsoftbodymaterial_shapeMatchingFrequency:()=>nb,rawsoftbodymaterial_tearForce:()=>rb,rawsoftbodymaterial_tearSmoothing:()=>ib,rawsoftbodymaterial_tearStrain:()=>ab,rawsoftbodymaterial_tears:()=>ob,rawsoftbodymaterial_uniform:()=>sb,rawsoftbodymaterial_volumeDampingRatio:()=>cb,rawsoftbodymaterial_volumeFrequency:()=>lb,rawsoftbodymaterial_youngModulus:()=>ub,rawsoftbodyset_addCluster:()=>db,rawsoftbodyset_contains:()=>fb,rawsoftbodyset_cut:()=>pb,rawsoftbodyset_forEachSoftBodyHandle:()=>mb,rawsoftbodyset_insert:()=>hb,rawsoftbodyset_len:()=>gb,rawsoftbodyset_new:()=>_b,rawsoftbodyset_remove:()=>vb,rawsoftbodyset_removeCluster:()=>yb,rawsoftbodyset_sbAddForce:()=>bb,rawsoftbodyset_sbAddParticleForce:()=>xb,rawsoftbodyset_sbApplyImpulse:()=>Sb,rawsoftbodyset_sbApplyImpulseAtPoint:()=>Cb,rawsoftbodyset_sbApplyParticleImpulse:()=>wb,rawsoftbodyset_sbApplyRadialImpulse:()=>Tb,rawsoftbodyset_sbAttachParticle:()=>Eb,rawsoftbodyset_sbAttachmentBody:()=>Db,rawsoftbodyset_sbAttachmentParticle:()=>Ob,rawsoftbodyset_sbBoundary:()=>kb,rawsoftbodyset_sbCellModel:()=>Ab,rawsoftbodyset_sbCellRestVolume:()=>jb,rawsoftbodyset_sbCellStiffnessScale:()=>Mb,rawsoftbodyset_sbCellStress:()=>Nb,rawsoftbodyset_sbCellTearResistance:()=>Pb,rawsoftbodyset_sbCells:()=>Fb,rawsoftbodyset_sbCenterOfMass:()=>Ib,rawsoftbodyset_sbClusterParticles:()=>Lb,rawsoftbodyset_sbClusterProxy:()=>Rb,rawsoftbodyset_sbClusterShapeMatchingEnabled:()=>zb,rawsoftbodyset_sbDetachParticle:()=>Bb,rawsoftbodyset_sbDihedralRestAngle:()=>Vb,rawsoftbodyset_sbDihedrals:()=>Hb,rawsoftbodyset_sbEdgeImpulse:()=>Ub,rawsoftbodyset_sbEdgeIsBend:()=>Wb,rawsoftbodyset_sbEdgePlasticStrain:()=>Gb,rawsoftbodyset_sbEdgeRestLength:()=>Kb,rawsoftbodyset_sbEdgeStress:()=>qb,rawsoftbodyset_sbEdgeTearResistance:()=>Jb,rawsoftbodyset_sbEdges:()=>Yb,rawsoftbodyset_sbEnableClusterShapeMatching:()=>Xb,rawsoftbodyset_sbEnableVolumePreservation:()=>Zb,rawsoftbodyset_sbGravityScale:()=>Qb,rawsoftbodyset_sbHasPendingTears:()=>$b,rawsoftbodyset_sbIsClusterLive:()=>ex,rawsoftbodyset_sbIsEnabled:()=>tx,rawsoftbodyset_sbIsParticleDamaged:()=>nx,rawsoftbodyset_sbIsParticleOnSurface:()=>rx,rawsoftbodyset_sbIsParticlePinned:()=>ix,rawsoftbodyset_sbIsSleeping:()=>ax,rawsoftbodyset_sbLinearDamping:()=>ox,rawsoftbodyset_sbMass:()=>sx,rawsoftbodyset_sbMaterial:()=>cx,rawsoftbodyset_sbMeshCluster:()=>lx,rawsoftbodyset_sbMeshCollider:()=>ux,rawsoftbodyset_sbMeshCollisionEnabled:()=>dx,rawsoftbodyset_sbMeshIndices:()=>fx,rawsoftbodyset_sbMeshIsOriented:()=>px,rawsoftbodyset_sbMeshIsSkinned:()=>mx,rawsoftbodyset_sbMeshOfCollider:()=>hx,rawsoftbodyset_sbMeshVertices:()=>gx,rawsoftbodyset_sbNumAttachments:()=>_x,rawsoftbodyset_sbNumCells:()=>vx,rawsoftbodyset_sbNumClusters:()=>yx,rawsoftbodyset_sbNumDihedrals:()=>bx,rawsoftbodyset_sbNumEdges:()=>xx,rawsoftbodyset_sbNumMeshes:()=>Sx,rawsoftbodyset_sbNumParticles:()=>Cx,rawsoftbodyset_sbOrigin:()=>wx,rawsoftbodyset_sbParticleMass:()=>Tx,rawsoftbodyset_sbParticlePosition:()=>Ex,rawsoftbodyset_sbParticlePositions:()=>Dx,rawsoftbodyset_sbParticleRadius:()=>Ox,rawsoftbodyset_sbParticleRestPosition:()=>kx,rawsoftbodyset_sbParticleVelocities:()=>Ax,rawsoftbodyset_sbParticleVelocity:()=>jx,rawsoftbodyset_sbPieces:()=>Mx,rawsoftbodyset_sbResetForces:()=>Nx,rawsoftbodyset_sbResetPlasticity:()=>Px,rawsoftbodyset_sbRestVolume:()=>Fx,rawsoftbodyset_sbRootBody:()=>Ix,rawsoftbodyset_sbSetAdditionalPgsIterations:()=>Lx,rawsoftbodyset_sbSetClusterEdgeSoftness:()=>Rx,rawsoftbodyset_sbSetClusterKinematicTarget:()=>zx,rawsoftbodyset_sbSetClusterPinned:()=>Bx,rawsoftbodyset_sbSetClusterStiffnessScale:()=>Vx,rawsoftbodyset_sbSetClusterTearResistance:()=>Hx,rawsoftbodyset_sbSetEnabled:()=>Ux,rawsoftbodyset_sbSetMaterial:()=>Wx,rawsoftbodyset_sbSetParticleKinematicTarget:()=>Gx,rawsoftbodyset_sbSetParticlePinned:()=>Kx,rawsoftbodyset_sbSetParticlePosition:()=>qx,rawsoftbodyset_sbSetParticleVelocity:()=>Jx,rawsoftbodyset_sbSetSolver:()=>Yx,rawsoftbodyset_sbSetUserData:()=>Xx,rawsoftbodyset_sbSetVolumeFactor:()=>Zx,rawsoftbodyset_sbSolver:()=>Qx,rawsoftbodyset_sbTearCell:()=>$x,rawsoftbodyset_sbTearEdge:()=>eS,rawsoftbodyset_sbTopologyVersion:()=>tS,rawsoftbodyset_sbUserData:()=>nS,rawsoftbodyset_sbVolume:()=>rS,rawsoftbodyset_sbVolumeFactor:()=>iS,rawsoftbodyset_sbVolumePreservationEnabled:()=>aS,rawsoftbodyset_sbWakeUp:()=>oS,rawsoftbodyset_tear:()=>sS,rawsoftbodyset_wakeUp:()=>cS,rawsoftbodytearevent_clusterSplitCluster:()=>lS,rawsoftbodytearevent_clusterSplitKeepsProxy:()=>uS,rawsoftbodytearevent_clusterSplitProxy:()=>dS,rawsoftbodytearevent_clusterSplitSoftBody:()=>fS,rawsoftbodytearevent_clusterSplitSource:()=>pS,rawsoftbodytearevent_insertedParticles:()=>mS,rawsoftbodytearevent_movedJoint:()=>hS,rawsoftbodytearevent_movedJointFrom:()=>gS,rawsoftbodytearevent_movedJointTo:()=>_S,rawsoftbodytearevent_numClusterSplits:()=>vS,rawsoftbodytearevent_numMovedJoints:()=>yS,rawsoftbodytearevent_numPieces:()=>bS,rawsoftbodytearevent_particleDestinationBody:()=>xS,rawsoftbodytearevent_particleDestinationIndex:()=>SS,rawsoftbodytearevent_pieceClusters:()=>CS,rawsoftbodytearevent_pieceParticles:()=>wS,rawsoftbodytearevent_pieceSoftBody:()=>TS,rawsoftbodytearevent_removedEdges:()=>ES,rawsoftbodytearevent_seeds:()=>DS,rawsoftbodytearevent_softBody:()=>OS,rawsoftbodytearevent_splitParticles:()=>kS,rawsoftbodytearevent_tornCells:()=>AS,rawsoftbodytearevent_tornEdges:()=>jS,rawsoftrecoverysettings_authoredVelocityMargin:()=>MS,rawsoftrecoverysettings_crossBodyDetection:()=>NS,rawsoftrecoverysettings_crossBodyExpelGate:()=>PS,rawsoftrecoverysettings_crossingRepulsion:()=>FS,rawsoftrecoverysettings_crossingRepulsionGuide:()=>IS,rawsoftrecoverysettings_crossingRepulsionSelfGuide:()=>LS,rawsoftrecoverysettings_detectionMotionGating:()=>RS,rawsoftrecoverysettings_edgeSpeculation:()=>zS,rawsoftrecoverysettings_edgeStandDown:()=>BS,rawsoftrecoverysettings_invertedCellDetection:()=>VS,rawsoftrecoverysettings_new:()=>HS,rawsoftrecoverysettings_overlapConstraintPace:()=>US,rawsoftrecoverysettings_overlapConstraints:()=>WS,rawsoftrecoverysettings_overlapEdgeStandDown:()=>GS,rawsoftrecoverysettings_overlapKeptDepth:()=>KS,rawsoftrecoverysettings_overlapMultiVolume:()=>qS,rawsoftrecoverysettings_overlapNormalPush:()=>JS,rawsoftrecoverysettings_overlapPatchConstraints:()=>YS,rawsoftrecoverysettings_overlapPatience:()=>XS,rawsoftrecoverysettings_overlapProgressMargin:()=>ZS,rawsoftrecoverysettings_overlapRigid:()=>QS,rawsoftrecoverysettings_overlapSelfRegions:()=>$S,rawsoftrecoverysettings_overlapSkinVolume:()=>eC,rawsoftrecoverysettings_overlapSkipSelfTangled:()=>tC,rawsoftrecoverysettings_overlapSplit:()=>nC,rawsoftrecoverysettings_recoveryPace:()=>rC,rawsoftrecoverysettings_selfCrossingDetection:()=>iC,rawsoftrecoverysettings_selfStandDown:()=>aC,rawsoftrecoverysettings_set_authoredVelocityMargin:()=>oC,rawsoftrecoverysettings_set_crossBodyDetection:()=>sC,rawsoftrecoverysettings_set_crossBodyExpelGate:()=>cC,rawsoftrecoverysettings_set_crossingRepulsion:()=>lC,rawsoftrecoverysettings_set_crossingRepulsionGuide:()=>uC,rawsoftrecoverysettings_set_crossingRepulsionSelfGuide:()=>dC,rawsoftrecoverysettings_set_detectionMotionGating:()=>fC,rawsoftrecoverysettings_set_edgeSpeculation:()=>pC,rawsoftrecoverysettings_set_edgeStandDown:()=>mC,rawsoftrecoverysettings_set_invertedCellDetection:()=>hC,rawsoftrecoverysettings_set_overlapConstraintPace:()=>gC,rawsoftrecoverysettings_set_overlapConstraints:()=>_C,rawsoftrecoverysettings_set_overlapEdgeStandDown:()=>vC,rawsoftrecoverysettings_set_overlapKeptDepth:()=>yC,rawsoftrecoverysettings_set_overlapMultiVolume:()=>bC,rawsoftrecoverysettings_set_overlapNormalPush:()=>xC,rawsoftrecoverysettings_set_overlapPatchConstraints:()=>SC,rawsoftrecoverysettings_set_overlapPatience:()=>CC,rawsoftrecoverysettings_set_overlapProgressMargin:()=>wC,rawsoftrecoverysettings_set_overlapRigid:()=>TC,rawsoftrecoverysettings_set_overlapSelfRegions:()=>EC,rawsoftrecoverysettings_set_overlapSkinVolume:()=>DC,rawsoftrecoverysettings_set_overlapSkipSelfTangled:()=>OC,rawsoftrecoverysettings_set_overlapSplit:()=>kC,rawsoftrecoverysettings_set_recoveryPace:()=>AC,rawsoftrecoverysettings_set_selfCrossingDetection:()=>jC,rawsoftrecoverysettings_set_selfStandDown:()=>MC,rawvector_new:()=>NC,rawvector_set_x:()=>PC,rawvector_set_y:()=>FC,rawvector_set_z:()=>IC,rawvector_x:()=>LC,rawvector_xyz:()=>RC,rawvector_xzy:()=>zC,rawvector_y:()=>BC,rawvector_yxz:()=>VC,rawvector_yzx:()=>HC,rawvector_z:()=>UC,rawvector_zero:()=>WC,rawvector_zxy:()=>GC,rawvector_zyx:()=>KC,rawvhacdparameters_alpha:()=>qC,rawvhacdparameters_beta:()=>JC,rawvhacdparameters_concavity:()=>YC,rawvhacdparameters_convex_hull_approximation:()=>XC,rawvhacdparameters_convex_hull_downsampling:()=>ZC,rawvhacdparameters_max_convex_hulls:()=>QC,rawvhacdparameters_new:()=>$C,rawvhacdparameters_plane_downsampling:()=>ew,rawvhacdparameters_resolution:()=>tw,rawvhacdparameters_set_alpha:()=>nw,rawvhacdparameters_set_beta:()=>rw,rawvhacdparameters_set_concavity:()=>iw,rawvhacdparameters_set_convex_hull_approximation:()=>aw,rawvhacdparameters_set_convex_hull_downsampling:()=>ow,rawvhacdparameters_set_max_convex_hulls:()=>sw,rawvhacdparameters_set_plane_downsampling:()=>cw,rawvhacdparameters_set_resolution:()=>lw,reserve_memory:()=>uw,version:()=>dw});URL=globalThis.URL;var{memory:Ns,__wbg_get_rawconvexmeshdata_indices:Ps,__wbg_get_rawconvexmeshdata_vertices:Fs,__wbg_rawbroadphase_free:Is,__wbg_rawccdsolver_free:Ls,__wbg_rawcharactercollision_free:Rs,__wbg_rawcolliderset_free:zs,__wbg_rawcollidershapecasthit_free:Bs,__wbg_rawcontactforceevent_free:Vs,__wbg_rawcontactmanifold_free:Hs,__wbg_rawcontactpair_free:Us,__wbg_rawconvexmeshdata_free:Ws,__wbg_rawdebugrenderpipeline_free:Gs,__wbg_rawdeserializedworld_free:Ks,__wbg_rawdynamicraycastvehiclecontroller_free:qs,__wbg_raweventqueue_free:Js,__wbg_rawgenericjoint_free:Ys,__wbg_rawimpulsejointset_free:Xs,__wbg_rawintegrationparameters_free:Zs,__wbg_rawislandmanager_free:Qs,__wbg_rawkinematiccharactercontroller_free:$s,__wbg_rawmultibodyjointset_free:ec,__wbg_rawnarrowphase_free:tc,__wbg_rawphysicspipeline_free:nc,__wbg_rawpidcontroller_free:rc,__wbg_rawpointcolliderprojection_free:ic,__wbg_rawpointprojection_free:ac,__wbg_rawraycolliderhit_free:oc,__wbg_rawraycolliderintersection_free:sc,__wbg_rawrayintersection_free:cc,__wbg_rawrigidbodyset_free:lc,__wbg_rawrotation_free:uc,__wbg_rawsdpmatrix3_free:dc,__wbg_rawserializationpipeline_free:fc,__wbg_rawshape_free:pc,__wbg_rawshapecasthit_free:mc,__wbg_rawshapecontact_free:hc,__wbg_rawsoftbodybuilder_free:gc,__wbg_rawsoftbodymaterial_free:_c,__wbg_rawsoftbodyset_free:vc,__wbg_rawsoftbodytearevent_free:yc,__wbg_rawsoftrecoverysettings_free:bc,__wbg_rawvector_free:xc,__wbg_rawvhacdparameters_free:Sc,__wbg_set_rawconvexmeshdata_indices:Cc,__wbg_set_rawconvexmeshdata_vertices:wc,rawbroadphase_castRay:Tc,rawbroadphase_castRayAndGetNormal:Ec,rawbroadphase_castShape:Dc,rawbroadphase_collidersWithAabbIntersectingAabb:Oc,rawbroadphase_intersectionWithShape:kc,rawbroadphase_intersectionsWithPoint:Ac,rawbroadphase_intersectionsWithRay:jc,rawbroadphase_intersectionsWithShape:Mc,rawbroadphase_new:Nc,rawbroadphase_projectPoint:Pc,rawbroadphase_projectPointAndGetFeature:Fc,rawccdsolver_new:Ic,rawcharactercollision_handle:Lc,rawcharactercollision_new:Rc,rawcharactercollision_toi:zc,rawcharactercollision_translationDeltaApplied:Bc,rawcharactercollision_translationDeltaRemaining:Vc,rawcharactercollision_worldNormal1:Hc,rawcharactercollision_worldNormal2:Uc,rawcharactercollision_worldWitness1:Wc,rawcharactercollision_worldWitness2:Gc,rawcolliderset_coActiveCollisionTypes:Kc,rawcolliderset_coActiveEvents:qc,rawcolliderset_coActiveHooks:Jc,rawcolliderset_coCastCollider:Yc,rawcolliderset_coCastRay:Xc,rawcolliderset_coCastRayAndGetNormal:Zc,rawcolliderset_coCastShape:Qc,rawcolliderset_coCollisionGroups:$c,rawcolliderset_coCombineVoxelStates:el,rawcolliderset_coCompoundFlags:tl,rawcolliderset_coContactCollider:nl,rawcolliderset_coContactForceEventThreshold:rl,rawcolliderset_coContactShape:il,rawcolliderset_coContactSkin:al,rawcolliderset_coContainsPoint:ol,rawcolliderset_coDensity:sl,rawcolliderset_coFriction:cl,rawcolliderset_coFrictionCombineRule:ll,rawcolliderset_coHalfExtents:ul,rawcolliderset_coHalfHeight:dl,rawcolliderset_coHalfspaceNormal:fl,rawcolliderset_coHeightFieldFlags:pl,rawcolliderset_coHeightfieldHeights:ml,rawcolliderset_coHeightfieldNCols:hl,rawcolliderset_coHeightfieldNRows:gl,rawcolliderset_coHeightfieldScale:_l,rawcolliderset_coIndices:vl,rawcolliderset_coIntersectsRay:yl,rawcolliderset_coIntersectsShape:bl,rawcolliderset_coIsDeformable:xl,rawcolliderset_coIsEnabled:Sl,rawcolliderset_coIsSensor:Cl,rawcolliderset_coMass:wl,rawcolliderset_coParent:Tl,rawcolliderset_coPolylineFlags:El,rawcolliderset_coProjectPoint:Dl,rawcolliderset_coPropagateVoxelChange:Ol,rawcolliderset_coRadius:kl,rawcolliderset_coRestitution:Al,rawcolliderset_coRestitutionCombineRule:jl,rawcolliderset_coRotation:Ml,rawcolliderset_coRotationWrtParent:Nl,rawcolliderset_coRoundRadius:Pl,rawcolliderset_coSetActiveCollisionTypes:Fl,rawcolliderset_coSetActiveEvents:Il,rawcolliderset_coSetActiveHooks:Ll,rawcolliderset_coSetCollisionGroups:Rl,rawcolliderset_coSetContactForceEventThreshold:zl,rawcolliderset_coSetContactSkin:Bl,rawcolliderset_coSetDensity:Vl,rawcolliderset_coSetEnabled:Hl,rawcolliderset_coSetFriction:Ul,rawcolliderset_coSetFrictionCombineRule:Wl,rawcolliderset_coSetHalfExtents:Gl,rawcolliderset_coSetHalfHeight:Kl,rawcolliderset_coSetMass:ql,rawcolliderset_coSetMassProperties:Jl,rawcolliderset_coSetRadius:Yl,rawcolliderset_coSetRestitution:Xl,rawcolliderset_coSetRestitutionCombineRule:Zl,rawcolliderset_coSetRotation:Ql,rawcolliderset_coSetRotationWrtParent:$l,rawcolliderset_coSetRoundRadius:eu,rawcolliderset_coSetSensor:tu,rawcolliderset_coSetShape:nu,rawcolliderset_coSetSolverGroups:ru,rawcolliderset_coSetTranslation:iu,rawcolliderset_coSetTranslationWrtParent:au,rawcolliderset_coSetVoxel:ou,rawcolliderset_coShape:su,rawcolliderset_coShapeType:cu,rawcolliderset_coSoftBody:lu,rawcolliderset_coSolverGroups:uu,rawcolliderset_coTranslation:du,rawcolliderset_coTranslationWrtParent:fu,rawcolliderset_coTriMeshFlags:pu,rawcolliderset_coVertices:mu,rawcolliderset_coVolume:hu,rawcolliderset_coVoxelData:gu,rawcolliderset_coVoxelSize:_u,rawcolliderset_contains:vu,rawcolliderset_createCollider:yu,rawcolliderset_createDeformableCollider:bu,rawcolliderset_forEachColliderHandle:xu,rawcolliderset_isHandleValid:Su,rawcolliderset_len:Cu,rawcolliderset_new:wu,rawcolliderset_remove:Tu,rawcollidershapecasthit_colliderHandle:Eu,rawcollidershapecasthit_getComponents:Du,rawcontactforceevent_collider1:Ou,rawcontactforceevent_collider2:ku,rawcontactforceevent_max_force_direction:Au,rawcontactforceevent_max_force_magnitude:ju,rawcontactforceevent_total_force:Mu,rawcontactforceevent_total_force_magnitude:Nu,rawcontactmanifold_contact_dist:Pu,rawcontactmanifold_contact_fid1:Fu,rawcontactmanifold_contact_fid2:Iu,rawcontactmanifold_contact_impulse:Lu,rawcontactmanifold_contact_local_p1:Ru,rawcontactmanifold_contact_local_p2:zu,rawcontactmanifold_contact_tangent_impulse_x:Bu,rawcontactmanifold_contact_tangent_impulse_y:Vu,rawcontactmanifold_friction:Hu,rawcontactmanifold_local_n1:Uu,rawcontactmanifold_local_n2:Wu,rawcontactmanifold_normal:Gu,rawcontactmanifold_num_contacts:Ku,rawcontactmanifold_num_solver_contacts:qu,rawcontactmanifold_restitution:Ju,rawcontactmanifold_solver_contact_dist:Yu,rawcontactmanifold_solver_contact_point:Xu,rawcontactmanifold_solver_contact_tangent_velocity:Zu,rawcontactmanifold_subshape1:Qu,rawcontactmanifold_subshape2:$u,rawcontactpair_collider1:ed,rawcontactpair_collider2:td,rawcontactpair_contactManifold:nd,rawcontactpair_numContactManifolds:rd,rawdebugrenderpipeline_colors:id,rawdebugrenderpipeline_new:ad,rawdebugrenderpipeline_render:od,rawdebugrenderpipeline_vertices:sd,rawdeserializedworld_takeBodies:cd,rawdeserializedworld_takeBroadPhase:ld,rawdeserializedworld_takeColliders:ud,rawdeserializedworld_takeGravity:dd,rawdeserializedworld_takeImpulseJoints:fd,rawdeserializedworld_takeIntegrationParameters:pd,rawdeserializedworld_takeIslandManager:md,rawdeserializedworld_takeMultibodyJoints:hd,rawdeserializedworld_takeNarrowPhase:gd,rawdeserializedworld_takeSoftBodies:_d,rawdynamicraycastvehiclecontroller_add_wheel:vd,rawdynamicraycastvehiclecontroller_chassis:yd,rawdynamicraycastvehiclecontroller_current_vehicle_speed:bd,rawdynamicraycastvehiclecontroller_index_forward_axis:xd,rawdynamicraycastvehiclecontroller_index_up_axis:Sd,rawdynamicraycastvehiclecontroller_new:Cd,rawdynamicraycastvehiclecontroller_num_wheels:wd,rawdynamicraycastvehiclecontroller_set_index_forward_axis:Td,rawdynamicraycastvehiclecontroller_set_index_up_axis:Ed,rawdynamicraycastvehiclecontroller_set_wheel_axle_cs:Dd,rawdynamicraycastvehiclecontroller_set_wheel_brake:Od,rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs:kd,rawdynamicraycastvehiclecontroller_set_wheel_direction_cs:Ad,rawdynamicraycastvehiclecontroller_set_wheel_engine_force:jd,rawdynamicraycastvehiclecontroller_set_wheel_friction_slip:Md,rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force:Nd,rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel:Pd,rawdynamicraycastvehiclecontroller_set_wheel_radius:Fd,rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness:Id,rawdynamicraycastvehiclecontroller_set_wheel_steering:Ld,rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression:Rd,rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation:zd,rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length:Bd,rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness:Vd,rawdynamicraycastvehiclecontroller_update_vehicle:Hd,rawdynamicraycastvehiclecontroller_wheel_axle_cs:Ud,rawdynamicraycastvehiclecontroller_wheel_brake:Wd,rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs:Gd,rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws:Kd,rawdynamicraycastvehiclecontroller_wheel_contact_point_ws:qd,rawdynamicraycastvehiclecontroller_wheel_direction_cs:Jd,rawdynamicraycastvehiclecontroller_wheel_engine_force:Yd,rawdynamicraycastvehiclecontroller_wheel_forward_impulse:Xd,rawdynamicraycastvehiclecontroller_wheel_friction_slip:Zd,rawdynamicraycastvehiclecontroller_wheel_ground_object:Qd,rawdynamicraycastvehiclecontroller_wheel_hard_point_ws:$d,rawdynamicraycastvehiclecontroller_wheel_is_in_contact:ef,rawdynamicraycastvehiclecontroller_wheel_max_suspension_force:tf,rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel:nf,rawdynamicraycastvehiclecontroller_wheel_radius:rf,rawdynamicraycastvehiclecontroller_wheel_rotation:af,rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness:of,rawdynamicraycastvehiclecontroller_wheel_side_impulse:sf,rawdynamicraycastvehiclecontroller_wheel_steering:cf,rawdynamicraycastvehiclecontroller_wheel_suspension_compression:lf,rawdynamicraycastvehiclecontroller_wheel_suspension_force:uf,rawdynamicraycastvehiclecontroller_wheel_suspension_length:df,rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation:ff,rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length:pf,rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness:mf,raweventqueue_clear:hf,raweventqueue_drainCollisionEvents:gf,raweventqueue_drainContactForceEvents:_f,raweventqueue_drainSoftBodyTearEvents:vf,raweventqueue_new:yf,rawgenericjoint_fixed:bf,rawgenericjoint_generic:xf,rawgenericjoint_prismatic:Sf,rawgenericjoint_revolute:Cf,rawgenericjoint_revoluteWithAxes:wf,rawgenericjoint_rope:Tf,rawgenericjoint_spherical:Ef,rawgenericjoint_spring:Df,rawimpulsejointset_contains:Of,rawimpulsejointset_createJoint:kf,rawimpulsejointset_forEachJointAttachedToRigidBody:Af,rawimpulsejointset_forEachJointHandle:jf,rawimpulsejointset_jointAnchor1:Mf,rawimpulsejointset_jointAnchor2:Nf,rawimpulsejointset_jointBodyHandle1:Pf,rawimpulsejointset_jointBodyHandle2:Ff,rawimpulsejointset_jointConfigureMotor:If,rawimpulsejointset_jointConfigureMotorModel:Lf,rawimpulsejointset_jointConfigureMotorPosition:Rf,rawimpulsejointset_jointConfigureMotorVelocity:zf,rawimpulsejointset_jointContactsEnabled:Bf,rawimpulsejointset_jointFrameX1:Vf,rawimpulsejointset_jointFrameX2:Hf,rawimpulsejointset_jointLimitsEnabled:Uf,rawimpulsejointset_jointLimitsMax:Wf,rawimpulsejointset_jointLimitsMin:Gf,rawimpulsejointset_jointSetAnchor1:Kf,rawimpulsejointset_jointSetAnchor2:qf,rawimpulsejointset_jointSetContactsEnabled:Jf,rawimpulsejointset_jointSetFrameX1:Yf,rawimpulsejointset_jointSetFrameX2:Xf,rawimpulsejointset_jointSetLimits:Zf,rawimpulsejointset_jointSetLocalFrame1:Qf,rawimpulsejointset_jointSetLocalFrame2:$f,rawimpulsejointset_jointSetMotorMaxForce:ep,rawimpulsejointset_jointType:tp,rawimpulsejointset_len:np,rawimpulsejointset_new:rp,rawimpulsejointset_remove:ip,rawintegrationparameters_contact_erp:ap,rawintegrationparameters_dt:op,rawintegrationparameters_lengthUnit:sp,rawintegrationparameters_maxCcdSubsteps:cp,rawintegrationparameters_new:lp,rawintegrationparameters_normalizedAllowedLinearError:up,rawintegrationparameters_normalizedPredictionDistance:dp,rawintegrationparameters_numInternalPgsIterations:fp,rawintegrationparameters_numSolverIterations:pp,rawintegrationparameters_set_contact_natural_frequency:mp,rawintegrationparameters_set_dt:hp,rawintegrationparameters_set_lengthUnit:gp,rawintegrationparameters_set_maxCcdSubsteps:_p,rawintegrationparameters_set_normalizedAllowedLinearError:vp,rawintegrationparameters_set_normalizedPredictionDistance:yp,rawintegrationparameters_set_numInternalPgsIterations:bp,rawintegrationparameters_set_numSolverIterations:xp,rawintegrationparameters_set_softBodiesContactStiffening:Sp,rawintegrationparameters_set_softBodiesFemLinearTolerance:Cp,rawintegrationparameters_set_softBodiesFemMaxDenseDofs:wp,rawintegrationparameters_set_softBodiesFemMaxLinearIterations:Tp,rawintegrationparameters_set_softBodiesMaxExtraSubsteps:Ep,rawintegrationparameters_set_softBodiesRecovery:Dp,rawintegrationparameters_set_softBodiesResweepStrain:Op,rawintegrationparameters_softBodiesContactStiffening:kp,rawintegrationparameters_softBodiesFemLinearTolerance:Ap,rawintegrationparameters_softBodiesFemMaxDenseDofs:jp,rawintegrationparameters_softBodiesFemMaxLinearIterations:Mp,rawintegrationparameters_softBodiesMaxExtraSubsteps:Np,rawintegrationparameters_softBodiesRecovery:Pp,rawintegrationparameters_softBodiesResweepStrain:Fp,rawislandmanager_forEachActiveRigidBodyHandle:Ip,rawislandmanager_new:Lp,rawkinematiccharactercontroller_autostepEnabled:Rp,rawkinematiccharactercontroller_autostepIncludesDynamicBodies:zp,rawkinematiccharactercontroller_autostepMaxHeight:Bp,rawkinematiccharactercontroller_autostepMinWidth:Vp,rawkinematiccharactercontroller_computeColliderMovement:Hp,rawkinematiccharactercontroller_computedCollision:Up,rawkinematiccharactercontroller_computedGrounded:Wp,rawkinematiccharactercontroller_computedMovement:Gp,rawkinematiccharactercontroller_disableAutostep:Kp,rawkinematiccharactercontroller_disableSnapToGround:qp,rawkinematiccharactercontroller_enableAutostep:Jp,rawkinematiccharactercontroller_enableSnapToGround:Yp,rawkinematiccharactercontroller_maxSlopeClimbAngle:Xp,rawkinematiccharactercontroller_minSlopeSlideAngle:Zp,rawkinematiccharactercontroller_new:Qp,rawkinematiccharactercontroller_normalNudgeFactor:$p,rawkinematiccharactercontroller_numComputedCollisions:em,rawkinematiccharactercontroller_offset:tm,rawkinematiccharactercontroller_setMaxSlopeClimbAngle:nm,rawkinematiccharactercontroller_setMinSlopeSlideAngle:rm,rawkinematiccharactercontroller_setNormalNudgeFactor:im,rawkinematiccharactercontroller_setOffset:am,rawkinematiccharactercontroller_setSlideEnabled:om,rawkinematiccharactercontroller_setUp:sm,rawkinematiccharactercontroller_slideEnabled:cm,rawkinematiccharactercontroller_snapToGroundDistance:lm,rawkinematiccharactercontroller_snapToGroundEnabled:um,rawkinematiccharactercontroller_up:dm,rawmultibodyjointset_contains:fm,rawmultibodyjointset_createJoint:pm,rawmultibodyjointset_forEachJointAttachedToRigidBody:mm,rawmultibodyjointset_forEachJointHandle:hm,rawmultibodyjointset_jointAnchor1:gm,rawmultibodyjointset_jointAnchor2:_m,rawmultibodyjointset_jointContactsEnabled:vm,rawmultibodyjointset_jointFrameX1:ym,rawmultibodyjointset_jointFrameX2:bm,rawmultibodyjointset_jointLimitsEnabled:xm,rawmultibodyjointset_jointLimitsMax:Sm,rawmultibodyjointset_jointLimitsMin:Cm,rawmultibodyjointset_jointSetContactsEnabled:wm,rawmultibodyjointset_jointType:Tm,rawmultibodyjointset_new:Em,rawmultibodyjointset_remove:Dm,rawnarrowphase_contact_pair:Om,rawnarrowphase_contact_pairs_with:km,rawnarrowphase_intersection_pair:Am,rawnarrowphase_intersection_pairs_with:jm,rawnarrowphase_new:Mm,rawphysicspipeline_is_profiler_enabled:Nm,rawphysicspipeline_new:Pm,rawphysicspipeline_set_profiler_enabled:Fm,rawphysicspipeline_step:Im,rawphysicspipeline_stepWithEvents:Lm,rawphysicspipeline_timing_broad_phase:Rm,rawphysicspipeline_timing_ccd:zm,rawphysicspipeline_timing_ccd_broad_phase:Bm,rawphysicspipeline_timing_ccd_narrow_phase:Vm,rawphysicspipeline_timing_ccd_solver:Hm,rawphysicspipeline_timing_ccd_toi_computation:Um,rawphysicspipeline_timing_collision_detection:Wm,rawphysicspipeline_timing_island_construction:Gm,rawphysicspipeline_timing_narrow_phase:Km,rawphysicspipeline_timing_solver:qm,rawphysicspipeline_timing_step:Jm,rawphysicspipeline_timing_user_changes:Ym,rawphysicspipeline_timing_velocity_assembly:Xm,rawphysicspipeline_timing_velocity_resolution:Zm,rawphysicspipeline_timing_velocity_update:Qm,rawphysicspipeline_timing_velocity_writeback:$m,rawpidcontroller_angular_correction:eh,rawpidcontroller_apply_angular_correction:th,rawpidcontroller_apply_linear_correction:nh,rawpidcontroller_linear_correction:rh,rawpidcontroller_new:ih,rawpidcontroller_reset_integrals:ah,rawpidcontroller_set_axes_mask:oh,rawpidcontroller_set_kd:sh,rawpidcontroller_set_ki:ch,rawpidcontroller_set_kp:lh,rawpointcolliderprojection_colliderHandle:uh,rawpointcolliderprojection_featureId:dh,rawpointcolliderprojection_featureType:fh,rawpointcolliderprojection_isInside:ph,rawpointcolliderprojection_point:mh,rawpointprojection_isInside:hh,rawpointprojection_point:gh,rawraycolliderhit_colliderHandle:_h,rawraycolliderhit_timeOfImpact:vh,rawraycolliderintersection_colliderHandle:yh,rawraycolliderintersection_featureId:bh,rawraycolliderintersection_featureType:xh,rawraycolliderintersection_normal:Sh,rawraycolliderintersection_time_of_impact:Ch,rawrayintersection_featureId:wh,rawrayintersection_featureType:Th,rawrayintersection_normal:Eh,rawrayintersection_time_of_impact:Dh,rawrigidbodyset_contains:Oh,rawrigidbodyset_createRigidBody:kh,rawrigidbodyset_forEachRigidBodyHandle:Ah,rawrigidbodyset_len:jh,rawrigidbodyset_new:Mh,rawrigidbodyset_propagateModifiedBodyPositionsToColliders:Nh,rawrigidbodyset_rbAddForce:Ph,rawrigidbodyset_rbAddForceAtPoint:Fh,rawrigidbodyset_rbAddTorque:Ih,rawrigidbodyset_rbAdditionalPgsIterations:Lh,rawrigidbodyset_rbAdditionalSolverIterations:Rh,rawrigidbodyset_rbAngularDamping:zh,rawrigidbodyset_rbAngvel:Bh,rawrigidbodyset_rbApplyImpulse:Vh,rawrigidbodyset_rbApplyImpulseAtPoint:Hh,rawrigidbodyset_rbApplyTorqueImpulse:Uh,rawrigidbodyset_rbBodyType:Wh,rawrigidbodyset_rbCollider:Gh,rawrigidbodyset_rbDominanceGroup:Kh,rawrigidbodyset_rbEffectiveAngularInertia:qh,rawrigidbodyset_rbEffectiveInvMass:Jh,rawrigidbodyset_rbEffectiveWorldInvInertia:Yh,rawrigidbodyset_rbEnableCcd:Xh,rawrigidbodyset_rbGravityScale:Zh,rawrigidbodyset_rbInvMass:Qh,rawrigidbodyset_rbInvPrincipalInertia:$h,rawrigidbodyset_rbIsCcdEnabled:eg,rawrigidbodyset_rbIsDynamic:tg,rawrigidbodyset_rbIsEnabled:ng,rawrigidbodyset_rbIsFixed:rg,rawrigidbodyset_rbIsKinematic:ig,rawrigidbodyset_rbIsMoving:ag,rawrigidbodyset_rbIsSleeping:og,rawrigidbodyset_rbIsSoftFrame:sg,rawrigidbodyset_rbLinearDamping:cg,rawrigidbodyset_rbLinvel:lg,rawrigidbodyset_rbLocalCom:ug,rawrigidbodyset_rbLockRotations:dg,rawrigidbodyset_rbLockTranslations:fg,rawrigidbodyset_rbMass:pg,rawrigidbodyset_rbNextRotation:mg,rawrigidbodyset_rbNextTranslation:hg,rawrigidbodyset_rbNumColliders:gg,rawrigidbodyset_rbPrincipalInertia:_g,rawrigidbodyset_rbPrincipalInertiaLocalFrame:vg,rawrigidbodyset_rbRecomputeMassPropertiesFromColliders:yg,rawrigidbodyset_rbResetForces:bg,rawrigidbodyset_rbResetTorques:xg,rawrigidbodyset_rbRotation:Sg,rawrigidbodyset_rbSetAdditionalMass:Cg,rawrigidbodyset_rbSetAdditionalMassProperties:wg,rawrigidbodyset_rbSetAdditionalPgsIterations:Tg,rawrigidbodyset_rbSetAdditionalSolverIterations:Eg,rawrigidbodyset_rbSetAngularDamping:Dg,rawrigidbodyset_rbSetAngvel:Og,rawrigidbodyset_rbSetBodyType:kg,rawrigidbodyset_rbSetDominanceGroup:Ag,rawrigidbodyset_rbSetEnabled:jg,rawrigidbodyset_rbSetEnabledRotations:Mg,rawrigidbodyset_rbSetEnabledTranslations:Ng,rawrigidbodyset_rbSetGravityScale:Pg,rawrigidbodyset_rbSetLinearDamping:Fg,rawrigidbodyset_rbSetLinvel:Ig,rawrigidbodyset_rbSetNextKinematicRotation:Lg,rawrigidbodyset_rbSetNextKinematicTranslation:Rg,rawrigidbodyset_rbSetRotation:zg,rawrigidbodyset_rbSetSoftCcdPrediction:Bg,rawrigidbodyset_rbSetTranslation:Vg,rawrigidbodyset_rbSetUserData:Hg,rawrigidbodyset_rbSleep:Ug,rawrigidbodyset_rbSoftBody:Wg,rawrigidbodyset_rbSoftCcdPrediction:Gg,rawrigidbodyset_rbSoftCluster:Kg,rawrigidbodyset_rbTranslation:qg,rawrigidbodyset_rbUserData:Jg,rawrigidbodyset_rbUserForce:Yg,rawrigidbodyset_rbUserTorque:Xg,rawrigidbodyset_rbVelocityAtPoint:Zg,rawrigidbodyset_rbWakeUp:Qg,rawrigidbodyset_rbWorldCom:$g,rawrigidbodyset_remove:e_,rawrotation_identity:t_,rawrotation_new:n_,rawrotation_w:r_,rawrotation_x:i_,rawrotation_y:a_,rawrotation_z:o_,rawsdpmatrix3_elements:s_,rawserializationpipeline_deserializeAll:c_,rawserializationpipeline_new:l_,rawserializationpipeline_serializeAll:u_,rawshape_ball:d_,rawshape_capsule:f_,rawshape_castRay:p_,rawshape_castRayAndGetNormal:m_,rawshape_castShape:h_,rawshape_compound:g_,rawshape_compoundFlags:__,rawshape_compoundLen:v_,rawshape_compoundRotation:y_,rawshape_compoundShape:b_,rawshape_compoundTranslation:x_,rawshape_cone:S_,rawshape_contactShape:C_,rawshape_containsPoint:w_,rawshape_convexDecomposition:T_,rawshape_convexDecompositionWithParams:E_,rawshape_convexHull:D_,rawshape_convexMesh:O_,rawshape_convexMeshData:k_,rawshape_cuboid:A_,rawshape_cylinder:j_,rawshape_halfExtents:M_,rawshape_halfHeight:N_,rawshape_halfspace:P_,rawshape_halfspaceNormal:F_,rawshape_heightFieldFlags:I_,rawshape_heightfield:L_,rawshape_heightfieldHeights:R_,rawshape_heightfieldNCols:z_,rawshape_heightfieldNRows:B_,rawshape_heightfieldScale:V_,rawshape_indices:H_,rawshape_intersectsRay:U_,rawshape_intersectsShape:W_,rawshape_polyline:G_,rawshape_polylineFlags:K_,rawshape_projectPoint:q_,rawshape_radius:J_,rawshape_roundCone:Y_,rawshape_roundConvexHull:X_,rawshape_roundConvexMesh:Z_,rawshape_roundCuboid:Q_,rawshape_roundCylinder:$_,rawshape_roundRadius:ev,rawshape_roundTriangle:tv,rawshape_segment:nv,rawshape_shapeType:rv,rawshape_triMeshFlags:iv,rawshape_triangle:av,rawshape_trimesh:ov,rawshape_vertices:sv,rawshape_voxelData:cv,rawshape_voxelSize:lv,rawshape_voxels:uv,rawshape_voxelsFromPoints:dv,rawshapecasthit_getComponents:fv,rawshapecontact_getComponents:pv,rawsoftbodybuilder_addEdges:mv,rawsoftbodybuilder_append:hv,rawsoftbodybuilder_cellEdges:gv,rawsoftbodybuilder_cloth:_v,rawsoftbodybuilder_clothAnisotropic:vv,rawsoftbodybuilder_clothTube:yv,rawsoftbodybuilder_cuboid:bv,rawsoftbodybuilder_material:xv,rawsoftbodybuilder_new:Sv,rawsoftbodybuilder_numParticles:Cv,rawsoftbodybuilder_particlePositions:wv,rawsoftbodybuilder_rope:Tv,rawsoftbodybuilder_setAdditionalPgsIterations:Ev,rawsoftbodybuilder_setAdditionalSolverIterations:Dv,rawsoftbodybuilder_setBendEdges:Ov,rawsoftbodybuilder_setCanSleep:kv,rawsoftbodybuilder_setCellModel:Av,rawsoftbodybuilder_setCells:jv,rawsoftbodybuilder_setDihedrals:Mv,rawsoftbodybuilder_setDominanceGroup:Nv,rawsoftbodybuilder_setEdgeSoftness:Pv,rawsoftbodybuilder_setEdgeTearResistance:Fv,rawsoftbodybuilder_setEdges:Iv,rawsoftbodybuilder_setGravityScale:Lv,rawsoftbodybuilder_setLinearDamping:Rv,rawsoftbodybuilder_setMass:zv,rawsoftbodybuilder_setMasses:Bv,rawsoftbodybuilder_setMaterial:Vv,rawsoftbodybuilder_setNoSurfaceCollider:Hv,rawsoftbodybuilder_setOriented:Uv,rawsoftbodybuilder_setParticleMass:Wv,rawsoftbodybuilder_setParticleRadius:Gv,rawsoftbodybuilder_setPinnedParticles:Kv,rawsoftbodybuilder_setPositions:qv,rawsoftbodybuilder_setSelfContacts:Jv,rawsoftbodybuilder_setShapeMatching:Yv,rawsoftbodybuilder_setSkin:Xv,rawsoftbodybuilder_setSkinCollision:Zv,rawsoftbodybuilder_setSoftness:Qv,rawsoftbodybuilder_setSolver:$v,rawsoftbodybuilder_setSurface:ey,rawsoftbodybuilder_setSurfaceCollider:ty,rawsoftbodybuilder_setTensionOnly:ny,rawsoftbodybuilder_setVolumeFactor:ry,rawsoftbodybuilder_setVolumePreservation:iy,rawsoftbodybuilder_setWire:ay,rawsoftbodybuilder_sphere:oy,rawsoftbodybuilder_surfaceDihedrals:sy,rawsoftbodybuilder_surfaceEdges:cy,rawsoftbodybuilder_translated:ly,rawsoftbodybuilder_trimesh:uy,rawsoftbodybuilder_volumetric:dy,rawsoftbodymaterial_bendDampingRatio:fy,rawsoftbodymaterial_bendFrequency:py,rawsoftbodymaterial_deformationDamping:my,rawsoftbodymaterial_edgeDampingRatio:hy,rawsoftbodymaterial_edgeFrequency:gy,rawsoftbodymaterial_edgePlasticCreep:_y,rawsoftbodymaterial_edgePlasticFlow:vy,rawsoftbodymaterial_edgePlasticMax:yy,rawsoftbodymaterial_edgePlasticYield:by,rawsoftbodymaterial_elasticDampingRatio:xy,rawsoftbodymaterial_interiorStrength:Sy,rawsoftbodymaterial_maxTearsPerStep:Cy,rawsoftbodymaterial_minPiece:wy,rawsoftbodymaterial_new:Ty,rawsoftbodymaterial_plasticCreep:Ey,rawsoftbodymaterial_plasticMax:Dy,rawsoftbodymaterial_plasticYield:Oy,rawsoftbodymaterial_poissonRatio:ky,rawsoftbodymaterial_set_bendDampingRatio:Ay,rawsoftbodymaterial_set_bendFrequency:jy,rawsoftbodymaterial_set_deformationDamping:My,rawsoftbodymaterial_set_edgeDampingRatio:Ny,rawsoftbodymaterial_set_edgeFrequency:Py,rawsoftbodymaterial_set_edgePlasticCreep:Fy,rawsoftbodymaterial_set_edgePlasticFlow:Iy,rawsoftbodymaterial_set_edgePlasticMax:Ly,rawsoftbodymaterial_set_edgePlasticYield:Ry,rawsoftbodymaterial_set_elasticDampingRatio:zy,rawsoftbodymaterial_set_interiorStrength:By,rawsoftbodymaterial_set_maxTearsPerStep:Vy,rawsoftbodymaterial_set_minPiece:Hy,rawsoftbodymaterial_set_plasticCreep:Uy,rawsoftbodymaterial_set_plasticMax:Wy,rawsoftbodymaterial_set_plasticYield:Gy,rawsoftbodymaterial_set_poissonRatio:Ky,rawsoftbodymaterial_set_shapeMatchingDampingRatio:qy,rawsoftbodymaterial_set_shapeMatchingFrequency:Jy,rawsoftbodymaterial_set_tearForce:Yy,rawsoftbodymaterial_set_tearSmoothing:Xy,rawsoftbodymaterial_set_tearStrain:Zy,rawsoftbodymaterial_set_volumeDampingRatio:Qy,rawsoftbodymaterial_set_volumeFrequency:$y,rawsoftbodymaterial_set_youngModulus:eb,rawsoftbodymaterial_shapeMatchingDampingRatio:tb,rawsoftbodymaterial_shapeMatchingFrequency:nb,rawsoftbodymaterial_tearForce:rb,rawsoftbodymaterial_tearSmoothing:ib,rawsoftbodymaterial_tearStrain:ab,rawsoftbodymaterial_tears:ob,rawsoftbodymaterial_uniform:sb,rawsoftbodymaterial_volumeDampingRatio:cb,rawsoftbodymaterial_volumeFrequency:lb,rawsoftbodymaterial_youngModulus:ub,rawsoftbodyset_addCluster:db,rawsoftbodyset_contains:fb,rawsoftbodyset_cut:pb,rawsoftbodyset_forEachSoftBodyHandle:mb,rawsoftbodyset_insert:hb,rawsoftbodyset_len:gb,rawsoftbodyset_new:_b,rawsoftbodyset_remove:vb,rawsoftbodyset_removeCluster:yb,rawsoftbodyset_sbAddForce:bb,rawsoftbodyset_sbAddParticleForce:xb,rawsoftbodyset_sbApplyImpulse:Sb,rawsoftbodyset_sbApplyImpulseAtPoint:Cb,rawsoftbodyset_sbApplyParticleImpulse:wb,rawsoftbodyset_sbApplyRadialImpulse:Tb,rawsoftbodyset_sbAttachParticle:Eb,rawsoftbodyset_sbAttachmentBody:Db,rawsoftbodyset_sbAttachmentParticle:Ob,rawsoftbodyset_sbBoundary:kb,rawsoftbodyset_sbCellModel:Ab,rawsoftbodyset_sbCellRestVolume:jb,rawsoftbodyset_sbCellStiffnessScale:Mb,rawsoftbodyset_sbCellStress:Nb,rawsoftbodyset_sbCellTearResistance:Pb,rawsoftbodyset_sbCells:Fb,rawsoftbodyset_sbCenterOfMass:Ib,rawsoftbodyset_sbClusterParticles:Lb,rawsoftbodyset_sbClusterProxy:Rb,rawsoftbodyset_sbClusterShapeMatchingEnabled:zb,rawsoftbodyset_sbDetachParticle:Bb,rawsoftbodyset_sbDihedralRestAngle:Vb,rawsoftbodyset_sbDihedrals:Hb,rawsoftbodyset_sbEdgeImpulse:Ub,rawsoftbodyset_sbEdgeIsBend:Wb,rawsoftbodyset_sbEdgePlasticStrain:Gb,rawsoftbodyset_sbEdgeRestLength:Kb,rawsoftbodyset_sbEdgeStress:qb,rawsoftbodyset_sbEdgeTearResistance:Jb,rawsoftbodyset_sbEdges:Yb,rawsoftbodyset_sbEnableClusterShapeMatching:Xb,rawsoftbodyset_sbEnableVolumePreservation:Zb,rawsoftbodyset_sbGravityScale:Qb,rawsoftbodyset_sbHasPendingTears:$b,rawsoftbodyset_sbIsClusterLive:ex,rawsoftbodyset_sbIsEnabled:tx,rawsoftbodyset_sbIsParticleDamaged:nx,rawsoftbodyset_sbIsParticleOnSurface:rx,rawsoftbodyset_sbIsParticlePinned:ix,rawsoftbodyset_sbIsSleeping:ax,rawsoftbodyset_sbLinearDamping:ox,rawsoftbodyset_sbMass:sx,rawsoftbodyset_sbMaterial:cx,rawsoftbodyset_sbMeshCluster:lx,rawsoftbodyset_sbMeshCollider:ux,rawsoftbodyset_sbMeshCollisionEnabled:dx,rawsoftbodyset_sbMeshIndices:fx,rawsoftbodyset_sbMeshIsOriented:px,rawsoftbodyset_sbMeshIsSkinned:mx,rawsoftbodyset_sbMeshOfCollider:hx,rawsoftbodyset_sbMeshVertices:gx,rawsoftbodyset_sbNumAttachments:_x,rawsoftbodyset_sbNumCells:vx,rawsoftbodyset_sbNumClusters:yx,rawsoftbodyset_sbNumDihedrals:bx,rawsoftbodyset_sbNumEdges:xx,rawsoftbodyset_sbNumMeshes:Sx,rawsoftbodyset_sbNumParticles:Cx,rawsoftbodyset_sbOrigin:wx,rawsoftbodyset_sbParticleMass:Tx,rawsoftbodyset_sbParticlePosition:Ex,rawsoftbodyset_sbParticlePositions:Dx,rawsoftbodyset_sbParticleRadius:Ox,rawsoftbodyset_sbParticleRestPosition:kx,rawsoftbodyset_sbParticleVelocities:Ax,rawsoftbodyset_sbParticleVelocity:jx,rawsoftbodyset_sbPieces:Mx,rawsoftbodyset_sbResetForces:Nx,rawsoftbodyset_sbResetPlasticity:Px,rawsoftbodyset_sbRestVolume:Fx,rawsoftbodyset_sbRootBody:Ix,rawsoftbodyset_sbSetAdditionalPgsIterations:Lx,rawsoftbodyset_sbSetClusterEdgeSoftness:Rx,rawsoftbodyset_sbSetClusterKinematicTarget:zx,rawsoftbodyset_sbSetClusterPinned:Bx,rawsoftbodyset_sbSetClusterStiffnessScale:Vx,rawsoftbodyset_sbSetClusterTearResistance:Hx,rawsoftbodyset_sbSetEnabled:Ux,rawsoftbodyset_sbSetMaterial:Wx,rawsoftbodyset_sbSetParticleKinematicTarget:Gx,rawsoftbodyset_sbSetParticlePinned:Kx,rawsoftbodyset_sbSetParticlePosition:qx,rawsoftbodyset_sbSetParticleVelocity:Jx,rawsoftbodyset_sbSetSolver:Yx,rawsoftbodyset_sbSetUserData:Xx,rawsoftbodyset_sbSetVolumeFactor:Zx,rawsoftbodyset_sbSolver:Qx,rawsoftbodyset_sbTearCell:$x,rawsoftbodyset_sbTearEdge:eS,rawsoftbodyset_sbTopologyVersion:tS,rawsoftbodyset_sbUserData:nS,rawsoftbodyset_sbVolume:rS,rawsoftbodyset_sbVolumeFactor:iS,rawsoftbodyset_sbVolumePreservationEnabled:aS,rawsoftbodyset_sbWakeUp:oS,rawsoftbodyset_tear:sS,rawsoftbodyset_wakeUp:cS,rawsoftbodytearevent_clusterSplitCluster:lS,rawsoftbodytearevent_clusterSplitKeepsProxy:uS,rawsoftbodytearevent_clusterSplitProxy:dS,rawsoftbodytearevent_clusterSplitSoftBody:fS,rawsoftbodytearevent_clusterSplitSource:pS,rawsoftbodytearevent_insertedParticles:mS,rawsoftbodytearevent_movedJoint:hS,rawsoftbodytearevent_movedJointFrom:gS,rawsoftbodytearevent_movedJointTo:_S,rawsoftbodytearevent_numClusterSplits:vS,rawsoftbodytearevent_numMovedJoints:yS,rawsoftbodytearevent_numPieces:bS,rawsoftbodytearevent_particleDestinationBody:xS,rawsoftbodytearevent_particleDestinationIndex:SS,rawsoftbodytearevent_pieceClusters:CS,rawsoftbodytearevent_pieceParticles:wS,rawsoftbodytearevent_pieceSoftBody:TS,rawsoftbodytearevent_removedEdges:ES,rawsoftbodytearevent_seeds:DS,rawsoftbodytearevent_softBody:OS,rawsoftbodytearevent_splitParticles:kS,rawsoftbodytearevent_tornCells:AS,rawsoftbodytearevent_tornEdges:jS,rawsoftrecoverysettings_authoredVelocityMargin:MS,rawsoftrecoverysettings_crossBodyDetection:NS,rawsoftrecoverysettings_crossBodyExpelGate:PS,rawsoftrecoverysettings_crossingRepulsion:FS,rawsoftrecoverysettings_crossingRepulsionGuide:IS,rawsoftrecoverysettings_crossingRepulsionSelfGuide:LS,rawsoftrecoverysettings_detectionMotionGating:RS,rawsoftrecoverysettings_edgeSpeculation:zS,rawsoftrecoverysettings_edgeStandDown:BS,rawsoftrecoverysettings_invertedCellDetection:VS,rawsoftrecoverysettings_new:HS,rawsoftrecoverysettings_overlapConstraintPace:US,rawsoftrecoverysettings_overlapConstraints:WS,rawsoftrecoverysettings_overlapEdgeStandDown:GS,rawsoftrecoverysettings_overlapKeptDepth:KS,rawsoftrecoverysettings_overlapMultiVolume:qS,rawsoftrecoverysettings_overlapNormalPush:JS,rawsoftrecoverysettings_overlapPatchConstraints:YS,rawsoftrecoverysettings_overlapPatience:XS,rawsoftrecoverysettings_overlapProgressMargin:ZS,rawsoftrecoverysettings_overlapRigid:QS,rawsoftrecoverysettings_overlapSelfRegions:$S,rawsoftrecoverysettings_overlapSkinVolume:eC,rawsoftrecoverysettings_overlapSkipSelfTangled:tC,rawsoftrecoverysettings_overlapSplit:nC,rawsoftrecoverysettings_recoveryPace:rC,rawsoftrecoverysettings_selfCrossingDetection:iC,rawsoftrecoverysettings_selfStandDown:aC,rawsoftrecoverysettings_set_authoredVelocityMargin:oC,rawsoftrecoverysettings_set_crossBodyDetection:sC,rawsoftrecoverysettings_set_crossBodyExpelGate:cC,rawsoftrecoverysettings_set_crossingRepulsion:lC,rawsoftrecoverysettings_set_crossingRepulsionGuide:uC,rawsoftrecoverysettings_set_crossingRepulsionSelfGuide:dC,rawsoftrecoverysettings_set_detectionMotionGating:fC,rawsoftrecoverysettings_set_edgeSpeculation:pC,rawsoftrecoverysettings_set_edgeStandDown:mC,rawsoftrecoverysettings_set_invertedCellDetection:hC,rawsoftrecoverysettings_set_overlapConstraintPace:gC,rawsoftrecoverysettings_set_overlapConstraints:_C,rawsoftrecoverysettings_set_overlapEdgeStandDown:vC,rawsoftrecoverysettings_set_overlapKeptDepth:yC,rawsoftrecoverysettings_set_overlapMultiVolume:bC,rawsoftrecoverysettings_set_overlapNormalPush:xC,rawsoftrecoverysettings_set_overlapPatchConstraints:SC,rawsoftrecoverysettings_set_overlapPatience:CC,rawsoftrecoverysettings_set_overlapProgressMargin:wC,rawsoftrecoverysettings_set_overlapRigid:TC,rawsoftrecoverysettings_set_overlapSelfRegions:EC,rawsoftrecoverysettings_set_overlapSkinVolume:DC,rawsoftrecoverysettings_set_overlapSkipSelfTangled:OC,rawsoftrecoverysettings_set_overlapSplit:kC,rawsoftrecoverysettings_set_recoveryPace:AC,rawsoftrecoverysettings_set_selfCrossingDetection:jC,rawsoftrecoverysettings_set_selfStandDown:MC,rawvector_new:NC,rawvector_set_x:PC,rawvector_set_y:FC,rawvector_set_z:IC,rawvector_x:LC,rawvector_xyz:RC,rawvector_xzy:zC,rawvector_y:BC,rawvector_yxz:VC,rawvector_yzx:HC,rawvector_z:UC,rawvector_zero:WC,rawvector_zxy:GC,rawvector_zyx:KC,rawvhacdparameters_alpha:qC,rawvhacdparameters_beta:JC,rawvhacdparameters_concavity:YC,rawvhacdparameters_convex_hull_approximation:XC,rawvhacdparameters_convex_hull_downsampling:ZC,rawvhacdparameters_max_convex_hulls:QC,rawvhacdparameters_new:$C,rawvhacdparameters_plane_downsampling:ew,rawvhacdparameters_resolution:tw,rawvhacdparameters_set_alpha:nw,rawvhacdparameters_set_beta:rw,rawvhacdparameters_set_concavity:iw,rawvhacdparameters_set_convex_hull_approximation:aw,rawvhacdparameters_set_convex_hull_downsampling:ow,rawvhacdparameters_set_max_convex_hulls:sw,rawvhacdparameters_set_plane_downsampling:cw,rawvhacdparameters_set_resolution:lw,reserve_memory:uw,version:dw,__abort_handler:fw,__instance_terminated:pw,__wbindgen_export:mw,__wbindgen_add_to_stack_pointer:hw,__wbindgen_export2:gw,__wbindgen_export3:_w}=await Xi({"./rapier_wasm3d_bg.js":{__wbindgen_object_drop_ref:po,__wbg_call_187d372bd5fdd4aa:Ga,__wbg_rawraycolliderintersection_new:to,__wbg_call_939a2607c4484b0b:Ka,__wbg_rawcontactforceevent_new:eo,__wbg_rawsoftbodytearevent_new:ro,__wbg_bind_e7f12e49a3040c89:Ua,__wbg_call_1875a20c43a36133:Wa,__wbg_rawshape_unwrap:no,__wbg_performance_3fcf6e32a7e1ed0a:Qa,__wbg_now_e7c6795a7f81e10f:Za,__wbindgen_object_clone_ref:fo,__wbg_length_7f3c00c40364105e:Ja,__wbg_prototypesetcall_bc27214492979395:$a,__wbg_length_58572db4c38f3c3e:qa,__wbg_set_070bd465f1c195a4:io,__wbg_new_from_slice_9a868026ffa4208a:Ya,__wbg_set_index_3a9fd81ba7ece0c0:ao,__wbg_new_with_length_cc0362bfe8499e5a:Xa,__wbg_static_accessor_GLOBAL_THIS_10fb7dc1ae063179:so,__wbg_static_accessor_SELF_0b583911f537483a:co,__wbg_static_accessor_GLOBAL_266715b9d96ba635:oo,__wbg_static_accessor_WINDOW_d7f903d1508cbdc4:lo,__wbg___wbindgen_number_get_2e0e7dee9f701a71:Va,__wbg___wbindgen_throw_41e9ee4f547fc59a:Ha,__wbg___wbindgen_boolean_get_5b446f51afd21013:Ra,__wbg___wbindgen_is_function_1f9d30630b8b1d3d:za,__wbg___wbindgen_is_undefined_8865fb403f8fe9d8:Ba,__wbindgen_generic_0000000000000001:uo}},Yi);js(Ms);var Z=new Float32Array(16),vw=class{constructor(e,t,n){this.x=e,this.y=t,this.z=n}},Q=class e{static new(e,t,n){return new vw(e,t,n)}static intoRaw(e){return new H(e.x,e.y,e.z)}static zeros(){return e.new(0,0,0)}static fromBuffer(t,n){return t?(n??=e.zeros(),n.x=t[0],n.y=t[1],n.z=t[2],n):null}static fromRaw(t){if(!t)return null;let n=e.new(t.x,t.y,t.z);return t.free(),n}static copy(e,t){e.x=t.x,e.y=t.y,e.z=t.z}},yw=class{constructor(e,t,n,r){this.x=e,this.y=t,this.z=n,this.w=r}},$=class e{static identity(){return new yw(0,0,0,1)}static fromBuffer(t,n){return t?(n??=e.identity(),n.x=t[0],n.y=t[1],n.z=t[2],n.w=t[3],n):null}static fromRaw(e){if(!e)return null;let t=new yw(e.x,e.y,e.z,e.w);return e.free(),t}static intoRaw(e){return new B(e.x,e.y,e.z,e.w)}static copy(e,t){e.x=t.x,e.y=t.y,e.z=t.z,e.w=t.w}},bw=class{get m11(){return this.elements[0]}get m12(){return this.elements[1]}get m21(){return this.m12}get m13(){return this.elements[2]}get m31(){return this.m13}get m22(){return this.elements[3]}get m23(){return this.elements[4]}get m32(){return this.m23}get m33(){return this.elements[5]}constructor(e){this.elements=e}},xw=class{static fromBuffer(e,t){return e?(t??=new bw(e),t.elements[0]=e[0],t.elements[1]=e[1],t.elements[2]=e[2],t.elements[3]=e[3],t.elements[4]=e[4],t.elements[5]=e[5],t):null}static fromRaw(e){let t=new bw(e.elements());return e.free(),t}},Sw;(function(e){e[e.Dynamic=0]=`Dynamic`,e[e.Fixed=1]=`Fixed`,e[e.KinematicPositionBased=2]=`KinematicPositionBased`,e[e.KinematicVelocityBased=3]=`KinematicVelocityBased`,e[e.SoftFrame=4]=`SoftFrame`})(Sw||={});var Cw=class{constructor(e,t,n){this.rawSet=e,this.colliderSet=t,this.handle=n}finalizeDeserialization(e){this.colliderSet=e}isValid(){return this.rawSet.contains(this.handle)}lockTranslations(e,t){return this.rawSet.rbLockTranslations(this.handle,e,t)}lockRotations(e,t){return this.rawSet.rbLockRotations(this.handle,e,t)}setEnabledTranslations(e,t,n,r){return this.rawSet.rbSetEnabledTranslations(this.handle,e,t,n,r)}restrictTranslations(e,t,n,r){this.setEnabledTranslations(e,t,n,r)}setEnabledRotations(e,t,n,r){return this.rawSet.rbSetEnabledRotations(this.handle,e,t,n,r)}restrictRotations(e,t,n,r){this.setEnabledRotations(e,t,n,r)}dominanceGroup(){return this.rawSet.rbDominanceGroup(this.handle)}setDominanceGroup(e){this.rawSet.rbSetDominanceGroup(this.handle,e)}additionalSolverIterations(){return this.rawSet.rbAdditionalSolverIterations(this.handle)}additionalPgsIterations(){return this.rawSet.rbAdditionalPgsIterations(this.handle)}setAdditionalPgsIterations(e){this.rawSet.rbSetAdditionalPgsIterations(this.handle,e)}isSoftFrame(){return this.rawSet.rbIsSoftFrame(this.handle)}softBody(){let e=this.rawSet.rbSoftBody(this.handle);return e===void 0?null:e}softCluster(){let e=this.rawSet.rbSoftCluster(this.handle);return e===void 0?null:e}setAdditionalSolverIterations(e){this.rawSet.rbSetAdditionalSolverIterations(this.handle,e)}enableCcd(e){this.rawSet.rbEnableCcd(this.handle,e)}setSoftCcdPrediction(e){this.rawSet.rbSetSoftCcdPrediction(this.handle,e)}softCcdPrediction(){return this.rawSet.rbSoftCcdPrediction(this.handle)}translation(e){return this.rawSet.rbTranslation(this.handle,Z),Q.fromBuffer(Z,e)}rotation(e){return this.rawSet.rbRotation(this.handle,Z),$.fromBuffer(Z,e)}nextTranslation(e){return this.rawSet.rbNextTranslation(this.handle,Z),Q.fromBuffer(Z,e)}nextRotation(e){return this.rawSet.rbNextRotation(this.handle,Z),$.fromBuffer(Z,e)}setTranslation(e,t){this.rawSet.rbSetTranslation(this.handle,e.x,e.y,e.z,t)}setLinvel(e,t){let n=Q.intoRaw(e);this.rawSet.rbSetLinvel(this.handle,n,t),n.free()}gravityScale(){return this.rawSet.rbGravityScale(this.handle)}setGravityScale(e,t){this.rawSet.rbSetGravityScale(this.handle,e,t)}setRotation(e,t){this.rawSet.rbSetRotation(this.handle,e.x,e.y,e.z,e.w,t)}setAngvel(e,t){let n=Q.intoRaw(e);this.rawSet.rbSetAngvel(this.handle,n,t),n.free()}setNextKinematicTranslation(e){this.rawSet.rbSetNextKinematicTranslation(this.handle,e.x,e.y,e.z)}setNextKinematicRotation(e){this.rawSet.rbSetNextKinematicRotation(this.handle,e.x,e.y,e.z,e.w)}linvel(e){return this.rawSet.rbLinvel(this.handle,Z),Q.fromBuffer(Z,e)}velocityAtPoint(e,t){let n=Q.intoRaw(e);return this.rawSet.rbVelocityAtPoint(this.handle,n,Z),n.free(),Q.fromBuffer(Z,t)}angvel(e){return this.rawSet.rbAngvel(this.handle,Z),Q.fromBuffer(Z,e)}mass(){return this.rawSet.rbMass(this.handle)}effectiveInvMass(e){return this.rawSet.rbEffectiveInvMass(this.handle,Z),Q.fromBuffer(Z,e)}invMass(){return this.rawSet.rbInvMass(this.handle)}localCom(e){return this.rawSet.rbLocalCom(this.handle,Z),Q.fromBuffer(Z,e)}worldCom(e){return this.rawSet.rbWorldCom(this.handle,Z),Q.fromBuffer(Z,e)}invPrincipalInertia(e){return this.rawSet.rbInvPrincipalInertia(this.handle,Z),Q.fromBuffer(Z,e)}principalInertia(e){return this.rawSet.rbPrincipalInertia(this.handle,Z),Q.fromBuffer(Z,e)}principalInertiaLocalFrame(e){return this.rawSet.rbPrincipalInertiaLocalFrame(this.handle,Z),$.fromBuffer(Z,e)}effectiveWorldInvInertia(e){return this.rawSet.rbEffectiveWorldInvInertia(this.handle,Z),xw.fromBuffer(Z,e)}effectiveAngularInertia(e){return this.rawSet.rbEffectiveAngularInertia(this.handle,Z),xw.fromBuffer(Z,e)}sleep(){this.rawSet.rbSleep(this.handle)}wakeUp(){this.rawSet.rbWakeUp(this.handle)}isCcdEnabled(){return this.rawSet.rbIsCcdEnabled(this.handle)}numColliders(){return this.rawSet.rbNumColliders(this.handle)}collider(e){return this.colliderSet.get(this.rawSet.rbCollider(this.handle,e))}setEnabled(e){this.rawSet.rbSetEnabled(this.handle,e)}isEnabled(){return this.rawSet.rbIsEnabled(this.handle)}bodyType(){return this.rawSet.rbBodyType(this.handle)}setBodyType(e,t){return this.rawSet.rbSetBodyType(this.handle,e,t)}isSleeping(){return this.rawSet.rbIsSleeping(this.handle)}isMoving(){return this.rawSet.rbIsMoving(this.handle)}isFixed(){return this.rawSet.rbIsFixed(this.handle)}isKinematic(){return this.rawSet.rbIsKinematic(this.handle)}isDynamic(){return this.rawSet.rbIsDynamic(this.handle)}linearDamping(){return this.rawSet.rbLinearDamping(this.handle)}angularDamping(){return this.rawSet.rbAngularDamping(this.handle)}setLinearDamping(e){this.rawSet.rbSetLinearDamping(this.handle,e)}recomputeMassPropertiesFromColliders(){this.rawSet.rbRecomputeMassPropertiesFromColliders(this.handle,this.colliderSet.raw)}setAdditionalMass(e,t){this.rawSet.rbSetAdditionalMass(this.handle,e,t)}setAdditionalMassProperties(e,t,n,r,i){let a=Q.intoRaw(t),o=Q.intoRaw(n),s=$.intoRaw(r);this.rawSet.rbSetAdditionalMassProperties(this.handle,e,a,o,s,i),a.free(),o.free(),s.free()}setAngularDamping(e){this.rawSet.rbSetAngularDamping(this.handle,e)}resetForces(e){this.rawSet.rbResetForces(this.handle,e)}resetTorques(e){this.rawSet.rbResetTorques(this.handle,e)}addForce(e,t){let n=Q.intoRaw(e);this.rawSet.rbAddForce(this.handle,n,t),n.free()}applyImpulse(e,t){let n=Q.intoRaw(e);this.rawSet.rbApplyImpulse(this.handle,n,t),n.free()}addTorque(e,t){let n=Q.intoRaw(e);this.rawSet.rbAddTorque(this.handle,n,t),n.free()}applyTorqueImpulse(e,t){let n=Q.intoRaw(e);this.rawSet.rbApplyTorqueImpulse(this.handle,n,t),n.free()}addForceAtPoint(e,t,n){let r=Q.intoRaw(e),i=Q.intoRaw(t);this.rawSet.rbAddForceAtPoint(this.handle,r,i,n),r.free(),i.free()}applyImpulseAtPoint(e,t,n){let r=Q.intoRaw(e),i=Q.intoRaw(t);this.rawSet.rbApplyImpulseAtPoint(this.handle,r,i,n),r.free(),i.free()}userForce(e){return this.rawSet.rbUserForce(this.handle,Z),Q.fromBuffer(Z,e)}userTorque(e){return this.rawSet.rbUserTorque(this.handle,Z),Q.fromBuffer(Z,e)}},ww=class e{constructor(e){this.enabled=!0,this.status=e,this.translation=Q.zeros(),this.rotation=$.identity(),this.gravityScale=1,this.linvel=Q.zeros(),this.mass=0,this.massOnly=!1,this.centerOfMass=Q.zeros(),this.translationsEnabledX=!0,this.translationsEnabledY=!0,this.angvel=Q.zeros(),this.principalAngularInertia=Q.zeros(),this.angularInertiaLocalFrame=$.identity(),this.translationsEnabledZ=!0,this.rotationsEnabledX=!0,this.rotationsEnabledY=!0,this.rotationsEnabledZ=!0,this.linearDamping=0,this.angularDamping=0,this.canSleep=!0,this.sleeping=!1,this.ccdEnabled=!1,this.softCcdPrediction=0,this.dominanceGroup=0,this.additionalSolverIterations=0,this.additionalPgsIterations=0}static dynamic(){return new e(Sw.Dynamic)}static kinematicPositionBased(){return new e(Sw.KinematicPositionBased)}static kinematicVelocityBased(){return new e(Sw.KinematicVelocityBased)}static fixed(){return new e(Sw.Fixed)}static newDynamic(){return new e(Sw.Dynamic)}static newKinematicPositionBased(){return new e(Sw.KinematicPositionBased)}static newKinematicVelocityBased(){return new e(Sw.KinematicVelocityBased)}static newStatic(){return new e(Sw.Fixed)}setDominanceGroup(e){return this.dominanceGroup=e,this}setAdditionalSolverIterations(e){return this.additionalSolverIterations=e,this}setAdditionalPgsIterations(e){return this.additionalPgsIterations=e,this}setEnabled(e){return this.enabled=e,this}setTranslation(e,t,n){if(typeof e!=`number`||typeof t!=`number`||typeof n!=`number`)throw TypeError(`The translation components must be numbers.`);return this.translation={x:e,y:t,z:n},this}setRotation(e){return $.copy(this.rotation,e),this}setGravityScale(e){return this.gravityScale=e,this}setAdditionalMass(e){return this.mass=e,this.massOnly=!0,this}setLinvel(e,t,n){if(typeof e!=`number`||typeof t!=`number`||typeof n!=`number`)throw TypeError(`The linvel components must be numbers.`);return this.linvel={x:e,y:t,z:n},this}setAngvel(e){return Q.copy(this.angvel,e),this}setAdditionalMassProperties(e,t,n,r){return this.mass=e,Q.copy(this.centerOfMass,t),Q.copy(this.principalAngularInertia,n),$.copy(this.angularInertiaLocalFrame,r),this.massOnly=!1,this}enabledTranslations(e,t,n){return this.translationsEnabledX=e,this.translationsEnabledY=t,this.translationsEnabledZ=n,this}restrictTranslations(e,t,n){return this.enabledTranslations(e,t,n)}lockTranslations(){return this.enabledTranslations(!1,!1,!1)}enabledRotations(e,t,n){return this.rotationsEnabledX=e,this.rotationsEnabledY=t,this.rotationsEnabledZ=n,this}restrictRotations(e,t,n){return this.enabledRotations(e,t,n)}lockRotations(){return this.restrictRotations(!1,!1,!1)}setLinearDamping(e){return this.linearDamping=e,this}setAngularDamping(e){return this.angularDamping=e,this}setCanSleep(e){return this.canSleep=e,this}setSleeping(e){return this.sleeping=e,this}setCcdEnabled(e){return this.ccdEnabled=e,this}setSoftCcdPrediction(e){return this.softCcdPrediction=e,this}setUserData(e){return this.userData=e,this}},Tw=class{constructor(){this.fconv=new Float64Array(1),this.uconv=new Uint32Array(this.fconv.buffer),this.data=[],this.size=0}set(e,t){let n=this.index(e);for(;this.data.length<=n;)this.data.push(null);this.data[n]??(this.size+=1),this.data[n]=t}len(){return this.size}delete(e){let t=this.index(e);t<this.data.length&&(this.data[t]!=null&&--this.size,this.data[t]=null)}clear(){this.data=[]}get(e){let t=this.index(e);return t<this.data.length?this.data[t]:null}forEach(e){for(let t of this.data)t!=null&&e(t)}getAll(){return this.data.filter(e=>e!=null)}index(e){return this.fconv[0]=e,this.uconv[0]}},Ew=class{free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}constructor(e){this.raw=e||new Ea,this.map=new Tw,e&&e.forEachRigidBodyHandle(t=>{this.map.set(t,new Cw(e,null,t))})}finalizeDeserialization(e){this.map.forEach(t=>t.finalizeDeserialization(e))}createRigidBody(e,t){let n=Q.intoRaw(t.translation),r=$.intoRaw(t.rotation),i=Q.intoRaw(t.linvel),a=Q.intoRaw(t.centerOfMass),o=Q.intoRaw(t.angvel),s=Q.intoRaw(t.principalAngularInertia),c=$.intoRaw(t.angularInertiaLocalFrame),l=this.raw.createRigidBody(t.enabled,n,r,t.gravityScale,t.mass,t.massOnly,a,i,o,s,c,t.translationsEnabledX,t.translationsEnabledY,t.translationsEnabledZ,t.rotationsEnabledX,t.rotationsEnabledY,t.rotationsEnabledZ,t.linearDamping,t.angularDamping,t.status,t.canSleep,t.sleeping,t.softCcdPrediction,t.ccdEnabled,t.dominanceGroup,t.additionalSolverIterations,t.additionalPgsIterations);n.free(),r.free(),i.free(),a.free(),o.free(),s.free(),c.free();let u=new Cw(this.raw,e,l);return u.userData=t.userData,this.map.set(l,u),u}remove(e,t,n,r,i,a){for(let t=0;t<this.raw.rbNumColliders(e);t+=1)n.unmap(this.raw.rbCollider(e,t));i.forEachJointHandleAttachedToRigidBody(e,e=>i.unmap(e)),a.forEachJointHandleAttachedToRigidBody(e,e=>a.unmap(e)),this.raw.remove(e,t.raw,n.raw,r.raw,i.raw,a.raw),this.map.delete(e),n.unmapRemovedColliders()}mapNewBodies(e){this.raw.forEachRigidBodyHandle(t=>{this.map.get(t)||this.map.set(t,new Cw(this.raw,e,t))})}unmapRemovedBodies(){for(let e of this.map.getAll())this.raw.contains(e.handle)||this.map.delete(e.handle)}len(){return this.map.len()}contains(e){return this.get(e)!=null}get(e){return this.map.get(e)}forEach(e){this.map.forEach(e)}forEachActiveRigidBody(e,t){e.forEachActiveRigidBodyHandle(e=>{t(this.get(e))})}getAll(){return this.map.getAll()}},Dw;(function(e){e[e.Vertex=0]=`Vertex`,e[e.Edge=1]=`Edge`,e[e.Face=2]=`Face`,e[e.Unknown=3]=`Unknown`})(Dw||={});var Ow=class{constructor(e,t){this.origin=e,this.dir=t}pointAt(e){return{x:this.origin.x+this.dir.x*e,y:this.origin.y+this.dir.y*e,z:this.origin.z+this.dir.z*e}}},kw=class e{constructor(e,t,n,r){this.featureType=Dw.Unknown,this.featureId=void 0,this.timeOfImpact=e,this.normal=t,r!==void 0&&(this.featureId=r),n!==void 0&&(this.featureType=n)}static fromBuffer(t,n){return t?(t.normal(Z),n??=new e(0,Q.zeros()),n.timeOfImpact=t.time_of_impact(),n.normal=Q.fromBuffer(Z,n.normal),n.featureType=t.featureType(),n.featureId=t.featureId(),t.free(),n):null}},Aw=class e{constructor(e,t,n,r,i){this.featureType=Dw.Unknown,this.featureId=void 0,this.collider=e,this.timeOfImpact=t,this.normal=n,i!==void 0&&(this.featureId=i),r!==void 0&&(this.featureType=r)}static fromBuffer(t,n,r){return n?(n.normal(Z),r??=new e(null,0,Q.zeros()),r.collider=t.get(n.colliderHandle()),r.timeOfImpact=n.time_of_impact(),r.normal=Q.fromBuffer(Z,r.normal),r.featureType=n.featureType(),r.featureId=n.featureId(),n.free(),r):null}},jw=class e{constructor(e,t){this.collider=e,this.timeOfImpact=t}static fromRaw(t,n){if(!n)return null;let r=new e(t.get(n.colliderHandle()),n.timeOfImpact());return n.free(),r}},Mw=class e{constructor(e,t){this.point=e,this.isInside=t}static fromBuffer(t,n){return t?(t.point(Z),n??=new e(Q.zeros(),!1),n.point=Q.fromBuffer(Z,n.point),n.isInside=t.isInside(),t.free(),n):null}},Nw=class e{constructor(e,t,n,r,i){this.featureType=Dw.Unknown,this.featureId=void 0,this.collider=e,this.point=t,this.isInside=n,i!==void 0&&(this.featureId=i),r!==void 0&&(this.featureType=r)}static fromBuffer(t,n,r){return n?(n.point(Z),r??=new e(null,Q.zeros(),!1),r.collider=t.get(n.colliderHandle()),r.point=Q.fromBuffer(Z,r.point),r.isInside=n.isInside(),r.featureType=n.featureType(),r.featureId=n.featureId(),n.free(),r):null}},Pw=class e{constructor(e,t,n,r,i){this.time_of_impact=e,this.witness1=t,this.witness2=n,this.normal1=r,this.normal2=i}static fromBuffer(t,n,r){return n?(r??=new e(0,Q.zeros(),Q.zeros(),Q.zeros(),Q.zeros()),r.time_of_impact=n[0],r.witness1.x=n[1],r.witness1.y=n[2],r.witness1.z=n[3],r.witness2.x=n[4],r.witness2.y=n[5],r.witness2.z=n[6],r.normal1.x=n[7],r.normal1.y=n[8],r.normal1.z=n[9],r.normal2.x=n[10],r.normal2.y=n[11],r.normal2.z=n[12],r):null}},Fw=class e extends Pw{constructor(e,t,n,r,i,a){super(t,n,r,i,a),this.collider=e}static fromBuffer(t,n,r){return n?(r??=new e(null,0,Q.zeros(),Q.zeros(),Q.zeros(),Q.zeros()),r.collider=t,r.time_of_impact=n[0],r.witness1.x=n[1],r.witness1.y=n[2],r.witness1.z=n[3],r.witness2.x=n[4],r.witness2.y=n[5],r.witness2.z=n[6],r.normal1.x=n[7],r.normal1.y=n[8],r.normal1.z=n[9],r.normal2.x=n[10],r.normal2.y=n[11],r.normal2.z=n[12],r):null}},Iw=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e){this.raw=e||new Zi}castRay(e,t,n,r,i,a,o,s,c,l,u){let d=Q.intoRaw(r.origin),f=Q.intoRaw(r.dir),p=jw.fromRaw(n,this.raw.castRay(e.raw,t.raw,n.raw,d,f,i,a,o,s,c,l,u));return d.free(),f.free(),p}castRayAndGetNormal(e,t,n,r,i,a,o,s,c,l,u,d){let f=Q.intoRaw(r.origin),p=Q.intoRaw(r.dir),m=Aw.fromBuffer(n,this.raw.castRayAndGetNormal(e.raw,t.raw,n.raw,f,p,i,a,o,s,c,l,u),d);return f.free(),p.free(),m}intersectionsWithRay(e,t,n,r,i,a,o,s,c,l,u,d){let f=Q.intoRaw(r.origin),p=Q.intoRaw(r.dir);this.raw.intersectionsWithRay(e.raw,t.raw,n.raw,f,p,i,a,e=>o(Aw.fromBuffer(n,e)),s,c,l,u,d),f.free(),p.free()}intersectionWithShape(e,t,n,r,i,a,o,s,c,l,u){let d=Q.intoRaw(r),f=$.intoRaw(i),p=a.intoRaw(),m=this.raw.intersectionWithShape(e.raw,t.raw,n.raw,d,f,p,o,s,c,l,u);return d.free(),f.free(),p.free(),m}projectPoint(e,t,n,r,i,a,o,s,c,l,u){let d=Q.intoRaw(r),f=Nw.fromBuffer(n,this.raw.projectPoint(e.raw,t.raw,n.raw,d,i,a,o,s,c,l),u);return d.free(),f}projectPointAndGetFeature(e,t,n,r,i,a,o,s,c,l){let u=Q.intoRaw(r),d=Nw.fromBuffer(n,this.raw.projectPointAndGetFeature(e.raw,t.raw,n.raw,u,i,a,o,s,c),l);return u.free(),d}intersectionsWithPoint(e,t,n,r,i,a,o,s,c,l){let u=Q.intoRaw(r);this.raw.intersectionsWithPoint(e.raw,t.raw,n.raw,u,i,a,o,s,c,l),u.free()}castShape(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=Q.intoRaw(r),_=$.intoRaw(i),v=Q.intoRaw(a),y=o.intoRaw(),b=this.raw.castShape(e.raw,t.raw,n.raw,g,_,v,y,s,c,l,u,d,f,p,m),x=null;if(b){let e=b.colliderHandle();b.getComponents(Z),x=Fw.fromBuffer(n.get(e),Z,h),b.free()}return g.free(),_.free(),v.free(),y.free(),x}intersectionsWithShape(e,t,n,r,i,a,o,s,c,l,u,d){let f=Q.intoRaw(r),p=$.intoRaw(i),m=a.intoRaw();this.raw.intersectionsWithShape(e.raw,t.raw,n.raw,f,p,m,o,s,c,l,u,d),f.free(),p.free(),m.free()}collidersWithAabbIntersectingAabb(e,t,n,r,i,a){let o=Q.intoRaw(r),s=Q.intoRaw(i);this.raw.collidersWithAabbIntersectingAabb(e.raw,t.raw,n.raw,o,s,a),o.free(),s.free()}},Lw=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e){this.raw=e||new va,this.tempManifold=new Rw(null)}contactPairsWith(e,t){this.raw.contact_pairs_with(e,t)}intersectionPairsWith(e,t){this.raw.intersection_pairs_with(e,t)}contactPair(e,t,n,r){let i=this.raw.contact_pair(e,t);if(i){let t=i.collider1()!=e,a=0;for(;a<i.numContactManifolds();++a)this.tempManifold.bodies=n,this.tempManifold.raw=i.contactManifold(a),this.tempManifold.raw&&r(this.tempManifold,t),this.tempManifold.free();i.free()}}intersectionPair(e,t){return this.raw.intersection_pair(e,t)}},Rw=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e,t){this.raw=e,this.bodies=t}normal(e){return this.raw.normal(Z),Q.fromBuffer(Z,e)}localNormal1(e){return this.raw.local_n1(Z),Q.fromBuffer(Z,e)}localNormal2(e){return this.raw.local_n2(Z),Q.fromBuffer(Z,e)}subshape1(){return this.raw.subshape1()}subshape2(){return this.raw.subshape2()}numContacts(){return this.raw.num_contacts()}localContactPoint1(e,t){return this.raw.contact_local_p1(e,Z)?Q.fromBuffer(Z,t):null}localContactPoint2(e,t){return this.raw.contact_local_p2(e,Z)?Q.fromBuffer(Z,t):null}contactDist(e){return this.raw.contact_dist(e)}contactFid1(e){return this.raw.contact_fid1(e)}contactFid2(e){return this.raw.contact_fid2(e)}contactImpulse(e){return this.raw.contact_impulse(e)}contactTangentImpulseX(e){return this.raw.contact_tangent_impulse_x(e)}contactTangentImpulseY(e){return this.raw.contact_tangent_impulse_y(e)}numSolverContacts(){return this.raw.num_solver_contacts()}solverContactPoint(e,t){return this.raw.solver_contact_point(this.bodies.raw,e,Z)?Q.fromBuffer(Z,t):null}solverContactDist(e){return this.raw.solver_contact_dist(e)}friction(){return this.raw.friction()}restitution(){return this.raw.restitution()}solverContactTangentVelocity(e,t){return this.raw.solver_contact_tangent_velocity(e,Z),Q.fromBuffer(Z,t)}},zw=class e{constructor(e,t,n,r,i){this.distance=e,this.point1=t,this.point2=n,this.normal1=r,this.normal2=i}static fromBuffer(t,n){return t?(t.getComponents(Z),t.free(),n??=new e(0,Q.zeros(),Q.zeros(),Q.zeros(),Q.zeros()),n.distance=Z[0],n.point1.x=Z[1],n.point1.y=Z[2],n.point1.z=Z[3],n.point2.x=Z[4],n.point2.y=Z[5],n.point2.z=Z[6],n.normal1.x=Z[7],n.normal1.y=Z[8],n.normal1.z=Z[9],n.normal2.x=Z[10],n.normal2.y=Z[11],n.normal2.z=Z[12],n):null}},Bw=class{static fromRaw(e,t){let n=e.coShapeType(t);if(n===V.Compound)return nT.fromRawShape(e.coShape(t));let r,i,a,o,s,c;switch(n){case V.Ball:return new Kw(e.coRadius(t));case V.Cuboid:return e.coHalfExtents(t,Z),new Jw(Z[0],Z[1],Z[2]);case V.RoundCuboid:return r=e.coRoundRadius(t),e.coHalfExtents(t,Z),new Yw(Z[0],Z[1],Z[2],r);case V.Capsule:return o=e.coHalfHeight(t),s=e.coRadius(t),new Xw(o,s);case V.Segment:return i=e.coVertices(t),new Zw(Q.new(i[0],i[1],i[2]),Q.new(i[3],i[4],i[5]));case V.Polyline:return i=e.coVertices(t),a=e.coIndices(t),new eT(i,a,e.coPolylineFlags(t));case V.Triangle:return i=e.coVertices(t),new Qw(Q.new(i[0],i[1],i[2]),Q.new(i[3],i[4],i[5]),Q.new(i[6],i[7],i[8]));case V.RoundTriangle:return i=e.coVertices(t),r=e.coRoundRadius(t),new $w(Q.new(i[0],i[1],i[2]),Q.new(i[3],i[4],i[5]),Q.new(i[6],i[7],i[8]),r);case V.HalfSpace:return e.coHalfspaceNormal(t,Z),c=Q.fromBuffer(Z),new qw(c);case V.Voxels:return new tT(e.coVoxelData(t),e.coVoxelSize(t));case V.TriMesh:i=e.coVertices(t),a=e.coIndices(t);let l=e.coTriMeshFlags(t);return new rT(i,a,l);case V.HeightField:let u=e.coHeightfieldHeights(t);e.coHeightfieldScale(t,Z);let d={x:Z[0],y:Z[1],z:Z[2]};return new oT(e.coHeightfieldNRows(t),e.coHeightfieldNCols(t),u,d,e.coHeightFieldFlags(t));case V.ConvexPolyhedron:return i=e.coVertices(t),a=e.coIndices(t),new iT(i,a);case V.RoundConvexPolyhedron:return i=e.coVertices(t),a=e.coIndices(t),r=e.coRoundRadius(t),new aT(i,a,r);case V.Cylinder:return o=e.coHalfHeight(t),s=e.coRadius(t),new sT(o,s);case V.RoundCylinder:return o=e.coHalfHeight(t),s=e.coRadius(t),r=e.coRoundRadius(t),new cT(o,s,r);case V.Cone:return o=e.coHalfHeight(t),s=e.coRadius(t),new lT(o,s);case V.RoundCone:return o=e.coHalfHeight(t),s=e.coRadius(t),r=e.coRoundRadius(t),new uT(o,s,r);default:throw Error(`unknown shape type: `+n)}}static fromRawShape(e){if(!e)return null;let t,n,r,i,a,o,s,c=e.shapeType();try{switch(c){case V.Ball:return new Kw(e.radius());case V.Cuboid:return t=Q.fromRaw(e.halfExtents()),new Jw(t.x,t.y,t.z);case V.RoundCuboid:return t=Q.fromRaw(e.halfExtents()),n=e.roundRadius(),new Yw(t.x,t.y,t.z,n);case V.Capsule:return a=e.halfHeight(),o=e.radius(),new Xw(a,o);case V.Segment:return r=e.vertices(),new Zw(Q.new(r[0],r[1],r[2]),Q.new(r[3],r[4],r[5]));case V.Polyline:return r=e.vertices(),i=e.indices(),new eT(r,i,e.polylineFlags());case V.Triangle:return r=e.vertices(),new Qw(Q.new(r[0],r[1],r[2]),Q.new(r[3],r[4],r[5]),Q.new(r[6],r[7],r[8]));case V.RoundTriangle:return r=e.vertices(),n=e.roundRadius(),new $w(Q.new(r[0],r[1],r[2]),Q.new(r[3],r[4],r[5]),Q.new(r[6],r[7],r[8]),n);case V.HalfSpace:return s=Q.fromRaw(e.halfspaceNormal()),new qw(s);case V.Voxels:return new tT(e.voxelData(),Q.fromRaw(e.voxelSize()));case V.TriMesh:r=e.vertices(),i=e.indices();let l=e.triMeshFlags();return new rT(r,i,l);case V.HeightField:let u=Q.fromRaw(e.heightfieldScale()),d=e.heightfieldHeights();return new oT(e.heightfieldNRows(),e.heightfieldNCols(),d,u,e.heightFieldFlags());case V.ConvexPolyhedron:{let t=e.convexMeshData();if(!t)throw Error(`Failed to compute the convex hull of a convex polyhedron shape.`);return r=t.vertices,i=t.indices,t.free(),new iT(r,i)}case V.RoundConvexPolyhedron:{let t=e.convexMeshData();if(!t)throw Error(`Failed to compute the convex hull of a convex polyhedron shape.`);return r=t.vertices,i=t.indices,t.free(),n=e.roundRadius(),new aT(r,i,n)}case V.Cylinder:return a=e.halfHeight(),o=e.radius(),new sT(a,o);case V.RoundCylinder:return a=e.halfHeight(),o=e.radius(),n=e.roundRadius(),new cT(a,o,n);case V.Cone:return a=e.halfHeight(),o=e.radius(),new lT(a,o);case V.RoundCone:return a=e.halfHeight(),o=e.radius(),n=e.roundRadius(),new uT(a,o,n);case V.Compound:return nT.fromRawShape(e);default:throw Error(`unknown shape type: `+c)}}finally{c!==V.Compound&&e.free()}}castShape(e,t,n,r,i,a,o,s,c,l,u){let d=Q.intoRaw(e),f=$.intoRaw(t),p=Q.intoRaw(n),m=Q.intoRaw(i),h=$.intoRaw(a),g=Q.intoRaw(o),_=this.intoRaw(),v=r.intoRaw(),y=_.castShape(d,f,p,v,m,h,g,s,c,l),b=null;return y&&(y.getComponents(Z),b=Pw.fromBuffer(null,Z,u),y.free()),d.free(),f.free(),p.free(),m.free(),h.free(),g.free(),_.free(),v.free(),b}intersectsShape(e,t,n,r,i){let a=Q.intoRaw(e),o=$.intoRaw(t),s=Q.intoRaw(r),c=$.intoRaw(i),l=this.intoRaw(),u=n.intoRaw(),d=l.intersectsShape(a,o,u,s,c);return a.free(),o.free(),s.free(),c.free(),l.free(),u.free(),d}contactShape(e,t,n,r,i,a,o){let s=Q.intoRaw(e),c=$.intoRaw(t),l=Q.intoRaw(r),u=$.intoRaw(i),d=this.intoRaw(),f=n.intoRaw(),p=zw.fromBuffer(d.contactShape(s,c,f,l,u,a),o);return s.free(),c.free(),l.free(),u.free(),d.free(),f.free(),p}containsPoint(e,t,n){let r=Q.intoRaw(e),i=$.intoRaw(t),a=Q.intoRaw(n),o=this.intoRaw(),s=o.containsPoint(r,i,a);return r.free(),i.free(),a.free(),o.free(),s}projectPoint(e,t,n,r,i){let a=Q.intoRaw(e),o=$.intoRaw(t),s=Q.intoRaw(n),c=this.intoRaw(),l=Mw.fromBuffer(c.projectPoint(a,o,s,r),i);return a.free(),o.free(),s.free(),c.free(),l}intersectsRay(e,t,n,r){let i=Q.intoRaw(t),a=$.intoRaw(n),o=Q.intoRaw(e.origin),s=Q.intoRaw(e.dir),c=this.intoRaw(),l=c.intersectsRay(i,a,o,s,r);return i.free(),a.free(),o.free(),s.free(),c.free(),l}castRay(e,t,n,r,i){let a=Q.intoRaw(t),o=$.intoRaw(n),s=Q.intoRaw(e.origin),c=Q.intoRaw(e.dir),l=this.intoRaw(),u=l.castRay(a,o,s,c,r,i);return a.free(),o.free(),s.free(),c.free(),l.free(),u}castRayAndGetNormal(e,t,n,r,i,a){let o=Q.intoRaw(t),s=$.intoRaw(n),c=Q.intoRaw(e.origin),l=Q.intoRaw(e.dir),u=this.intoRaw(),d=kw.fromBuffer(u.castRayAndGetNormal(o,s,c,l,r,i),a);return o.free(),s.free(),c.free(),l.free(),u.free(),d}},Vw;(function(e){e[e.Ball=0]=`Ball`,e[e.Cuboid=1]=`Cuboid`,e[e.Capsule=2]=`Capsule`,e[e.Segment=3]=`Segment`,e[e.Polyline=4]=`Polyline`,e[e.Triangle=5]=`Triangle`,e[e.TriMesh=6]=`TriMesh`,e[e.HeightField=7]=`HeightField`,e[e.Compound=8]=`Compound`,e[e.ConvexPolyhedron=9]=`ConvexPolyhedron`,e[e.Cylinder=10]=`Cylinder`,e[e.Cone=11]=`Cone`,e[e.RoundCuboid=12]=`RoundCuboid`,e[e.RoundTriangle=13]=`RoundTriangle`,e[e.RoundCylinder=14]=`RoundCylinder`,e[e.RoundCone=15]=`RoundCone`,e[e.RoundConvexPolyhedron=16]=`RoundConvexPolyhedron`,e[e.HalfSpace=17]=`HalfSpace`,e[e.Voxels=18]=`Voxels`})(Vw||={});var Hw;(function(e){e[e.FIX_INTERNAL_EDGES=1]=`FIX_INTERNAL_EDGES`})(Hw||={});var Uw;(function(e){e[e.DEFORMABLE=2]=`DEFORMABLE`})(Uw||={});var Ww;(function(e){e[e.FIX_INTERNAL_EDGES=1]=`FIX_INTERNAL_EDGES`})(Ww||={});var Gw;(function(e){e[e.DELETE_BAD_TOPOLOGY_TRIANGLES=4]=`DELETE_BAD_TOPOLOGY_TRIANGLES`,e[e.ORIENTED=8]=`ORIENTED`,e[e.MERGE_DUPLICATE_VERTICES=16]=`MERGE_DUPLICATE_VERTICES`,e[e.DELETE_DEGENERATE_TRIANGLES=32]=`DELETE_DEGENERATE_TRIANGLES`,e[e.DELETE_DUPLICATE_TRIANGLES=64]=`DELETE_DUPLICATE_TRIANGLES`,e[e.FIX_INTERNAL_EDGES=144]=`FIX_INTERNAL_EDGES`,e[e.DEFORMABLE=256]=`DEFORMABLE`,e[e.FIX_INTERNAL_EDGES_TWO_SIDED=656]=`FIX_INTERNAL_EDGES_TWO_SIDED`})(Gw||={});var Kw=class extends Bw{constructor(e){super(),this.type=Vw.Ball,this.radius=e}intoRaw(){return ka.ball(this.radius)}},qw=class extends Bw{constructor(e){super(),this.type=Vw.HalfSpace,this.normal=e}intoRaw(){let e=Q.intoRaw(this.normal),t=ka.halfspace(e);return e.free(),t}},Jw=class extends Bw{constructor(e,t,n){super(),this.type=Vw.Cuboid,this.halfExtents=Q.new(e,t,n)}intoRaw(){return ka.cuboid(this.halfExtents.x,this.halfExtents.y,this.halfExtents.z)}},Yw=class extends Bw{constructor(e,t,n,r){super(),this.type=Vw.RoundCuboid,this.halfExtents=Q.new(e,t,n),this.borderRadius=r}intoRaw(){return ka.roundCuboid(this.halfExtents.x,this.halfExtents.y,this.halfExtents.z,this.borderRadius)}},Xw=class extends Bw{constructor(e,t){super(),this.type=Vw.Capsule,this.halfHeight=e,this.radius=t}intoRaw(){return ka.capsule(this.halfHeight,this.radius)}},Zw=class extends Bw{constructor(e,t){super(),this.type=Vw.Segment,this.a=e,this.b=t}intoRaw(){let e=Q.intoRaw(this.a),t=Q.intoRaw(this.b),n=ka.segment(e,t);return e.free(),t.free(),n}},Qw=class extends Bw{constructor(e,t,n){super(),this.type=Vw.Triangle,this.a=e,this.b=t,this.c=n}intoRaw(){let e=Q.intoRaw(this.a),t=Q.intoRaw(this.b),n=Q.intoRaw(this.c),r=ka.triangle(e,t,n);return e.free(),t.free(),n.free(),r}},$w=class extends Bw{constructor(e,t,n,r){super(),this.type=Vw.RoundTriangle,this.a=e,this.b=t,this.c=n,this.borderRadius=r}intoRaw(){let e=Q.intoRaw(this.a),t=Q.intoRaw(this.b),n=Q.intoRaw(this.c),r=ka.roundTriangle(e,t,n,this.borderRadius);return e.free(),t.free(),n.free(),r}},eT=class extends Bw{constructor(e,t,n){super(),this.type=Vw.Polyline,this.vertices=e,this.indices=t??new Uint32Array,this.flags=n??0}intoRaw(){return ka.polyline(this.vertices,this.indices,this.flags)}},tT=class extends Bw{constructor(e,t){super(),this.type=Vw.Voxels,this.data=e,this.voxelSize=t}intoRaw(){let e=Q.intoRaw(this.voxelSize),t;return t=this.data instanceof Int32Array?ka.voxels(e,this.data):ka.voxelsFromPoints(e,this.data),e.free(),t}},nT=class e extends Bw{constructor(e,t,n,r){if(super(),this.type=Vw.Compound,e.length!==t.length||e.length!==n.length)throw Error(`shapes, positions, and rotations arrays must have the same length`);if(e.length===0)throw Error(`a compound shape must contain at least one shape`);if(e.some(e=>e.type===Vw.Compound))throw Error(`nested compound shapes are not allowed`);this.shapes=e,this.positions=t,this.rotations=n,this.flags=r??0}static fromRawShape(t){try{let n=t.compoundLen();if(n==null)throw Error(`Expected a raw compound shape.`);let r=Array(n),i=Array(n),a=Array(n);for(let e=0;e<n;e++)r[e]=Bw.fromRawShape(t.compoundShape(e)),i[e]=Q.fromRaw(t.compoundTranslation(e)),a[e]=$.fromRaw(t.compoundRotation(e));return new e(r,i,a,t.compoundFlags())}finally{t.free()}}intoRaw(){let e=this.shapes.map(e=>e.intoRaw()),t=new Float32Array(this.positions.length*3);this.positions.forEach((e,n)=>{t[n*3]=e.x,t[n*3+1]=e.y,t[n*3+2]=e.z});let n=new Float32Array(this.rotations.length*4);return this.rotations.forEach((e,t)=>{n[t*4]=e.x,n[t*4+1]=e.y,n[t*4+2]=e.z,n[t*4+3]=e.w}),ka.compound(e,t,n,this.flags)}},rT=class extends Bw{constructor(e,t,n){super(),this.type=Vw.TriMesh,this.vertices=e,this.indices=t,this.flags=n}intoRaw(){return ka.trimesh(this.vertices,this.indices,this.flags)}},iT=class extends Bw{constructor(e,t){super(),this.type=Vw.ConvexPolyhedron,this.vertices=e,this.indices=t}intoRaw(){return this.indices?ka.convexMesh(this.vertices,this.indices):ka.convexHull(this.vertices)}},aT=class extends Bw{constructor(e,t,n){super(),this.type=Vw.RoundConvexPolyhedron,this.vertices=e,this.indices=t,this.borderRadius=n}intoRaw(){return this.indices?ka.roundConvexMesh(this.vertices,this.indices,this.borderRadius):ka.roundConvexHull(this.vertices,this.borderRadius)}},oT=class extends Bw{constructor(e,t,n,r,i){super(),this.type=Vw.HeightField,this.nrows=e,this.ncols=t,this.heights=n,this.scale=r,this.flags=i}intoRaw(){let e=Q.intoRaw(this.scale),t=ka.heightfield(this.nrows,this.ncols,this.heights,e,this.flags);return e.free(),t}},sT=class extends Bw{constructor(e,t){super(),this.type=Vw.Cylinder,this.halfHeight=e,this.radius=t}intoRaw(){return ka.cylinder(this.halfHeight,this.radius)}},cT=class extends Bw{constructor(e,t,n){super(),this.type=Vw.RoundCylinder,this.borderRadius=n,this.halfHeight=e,this.radius=t}intoRaw(){return ka.roundCylinder(this.halfHeight,this.radius,this.borderRadius)}},lT=class extends Bw{constructor(e,t){super(),this.type=Vw.Cone,this.halfHeight=e,this.radius=t}intoRaw(){return ka.cone(this.halfHeight,this.radius)}},uT=class extends Bw{constructor(e,t,n){super(),this.type=Vw.RoundCone,this.halfHeight=e,this.radius=t,this.borderRadius=n}intoRaw(){return ka.roundCone(this.halfHeight,this.radius,this.borderRadius)}},dT=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e){this.raw=e||new ya}step(e,t,n,r,i,a,o,s,c,l,u,d,f){let p=Q.intoRaw(e);d?this.raw.stepWithEvents(p,t.raw,n.raw,r.raw,i.raw,a.raw,o.raw,s.raw,c.raw,l.raw,u.raw,d.raw,f,f?f.filterContactPair:null,f?f.filterIntersectionPair:null):this.raw.step(p,t.raw,n.raw,r.raw,i.raw,a.raw,o.raw,s.raw,c.raw,l.raw,u.raw),p.free()}},fT=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e){this.raw=e||new Oa}serializeAll(e,t,n,r,i,a,o,s,c,l){let u=Q.intoRaw(e),d=this.raw.serializeAll(u,t.raw,n.raw,r.raw,i.raw,a.raw,o.raw,s.raw,c.raw,l.raw);return u.free(),d}deserializeAll(e){return bT.fromRaw(this.raw.deserializeAll(e))}},pT=class{constructor(e,t){this.vertices=e,this.colors=t}},mT=class{free(){this.raw&&this.raw.free(),this.raw=void 0,this.vertices=void 0,this.colors=void 0}constructor(e){this.raw=e||new oa}render(e,t,n,r,i,a,o,s){this.raw.render(e.raw,t.raw,n.raw,r.raw,i.raw,a.raw,o,t.castClosure(s)),this.vertices=this.raw.vertices(),this.colors=this.raw.colors()}},hT=class{},gT=class{constructor(e,t,n,r,i,a){this.params=t,this.bodies=i,this.colliders=a,this.broadPhase=n,this.narrowPhase=r,this.raw=new ga(e),this.rawCharacterCollision=new $i,this._applyImpulsesToDynamicBodies=!1,this._characterMass=null}free(){this.raw&&(this.raw.free(),this.rawCharacterCollision.free()),this.raw=void 0,this.rawCharacterCollision=void 0}up(){return this.raw.up()}setUp(e){let t=Q.intoRaw(e);return this.raw.setUp(t)}applyImpulsesToDynamicBodies(){return this._applyImpulsesToDynamicBodies}setApplyImpulsesToDynamicBodies(e){this._applyImpulsesToDynamicBodies=e}characterMass(){return this._characterMass}setCharacterMass(e){this._characterMass=e}offset(){return this.raw.offset()}setOffset(e){this.raw.setOffset(e)}normalNudgeFactor(){return this.raw.normalNudgeFactor()}setNormalNudgeFactor(e){this.raw.setNormalNudgeFactor(e)}slideEnabled(){return this.raw.slideEnabled()}setSlideEnabled(e){this.raw.setSlideEnabled(e)}autostepMaxHeight(){return this.raw.autostepMaxHeight()}autostepMinWidth(){return this.raw.autostepMinWidth()}autostepIncludesDynamicBodies(){return this.raw.autostepIncludesDynamicBodies()}autostepEnabled(){return this.raw.autostepEnabled()}enableAutostep(e,t,n){this.raw.enableAutostep(e,t,n)}disableAutostep(){return this.raw.disableAutostep()}maxSlopeClimbAngle(){return this.raw.maxSlopeClimbAngle()}setMaxSlopeClimbAngle(e){this.raw.setMaxSlopeClimbAngle(e)}minSlopeSlideAngle(){return this.raw.minSlopeSlideAngle()}setMinSlopeSlideAngle(e){this.raw.setMinSlopeSlideAngle(e)}snapToGroundDistance(){return this.raw.snapToGroundDistance()}enableSnapToGround(e){this.raw.enableSnapToGround(e)}disableSnapToGround(){this.raw.disableSnapToGround()}snapToGroundEnabled(){return this.raw.snapToGroundEnabled()}computeColliderMovement(e,t,n,r,i){let a=Q.intoRaw(t);this.raw.computeColliderMovement(this.params.dt,this.broadPhase.raw,this.narrowPhase.raw,this.bodies.raw,this.colliders.raw,e.handle,a,this._applyImpulsesToDynamicBodies,this._characterMass,n,r,this.colliders.castClosure(i)),a.free()}computedMovement(e){return this.raw.computedMovement(Z),Q.fromBuffer(Z,e)}computedGrounded(){return this.raw.computedGrounded()}numComputedCollisions(){return this.raw.numComputedCollisions()}computedCollision(e,t){if(this.raw.computedCollision(e,this.rawCharacterCollision)){let e=this.rawCharacterCollision;return t??=new hT,e.translationDeltaApplied(Z),t.translationDeltaApplied=Q.fromBuffer(Z,t.translationDeltaApplied),e.translationDeltaRemaining(Z),t.translationDeltaRemaining=Q.fromBuffer(Z,t.translationDeltaRemaining),t.toi=e.toi(),e.worldWitness1(Z),t.witness1=Q.fromBuffer(Z,t.witness1),e.worldWitness2(Z),t.witness2=Q.fromBuffer(Z,t.witness2),e.worldNormal1(Z),t.normal1=Q.fromBuffer(Z,t.normal1),e.worldNormal2(Z),t.normal2=Q.fromBuffer(Z,t.normal2),t.collider=this.colliders.get(e.handle()),t}return null}},_T;(function(e){e[e.None=0]=`None`,e[e.LinX=1]=`LinX`,e[e.LinY=2]=`LinY`,e[e.LinZ=4]=`LinZ`,e[e.AngX=8]=`AngX`,e[e.AngY=16]=`AngY`,e[e.AngZ=32]=`AngZ`,e[e.AllLin=7]=`AllLin`,e[e.AllAng=56]=`AllAng`,e[e.All=63]=`All`})(_T||={});var vT=class{constructor(e,t,n,r,i,a){this.params=e,this.bodies=t,this.raw=new ba(n,r,i,a)}free(){this.raw&&this.raw.free(),this.raw=void 0}setKp(e,t){this.raw.set_kp(e,t)}setKi(e,t){this.raw.set_kp(e,t)}setKd(e,t){this.raw.set_kp(e,t)}setAxes(e){this.raw.set_axes_mask(e)}resetIntegrals(){this.raw.reset_integrals()}applyLinearCorrection(e,t,n){let r=Q.intoRaw(t),i=Q.intoRaw(n);this.raw.apply_linear_correction(this.params.dt,this.bodies.raw,e.handle,r,i),r.free(),i.free()}applyAngularCorrection(e,t,n){let r=$.intoRaw(t),i=Q.intoRaw(n);this.raw.apply_angular_correction(this.params.dt,this.bodies.raw,e.handle,r,i),r.free(),i.free()}linearCorrection(e,t,n,r){let i=Q.intoRaw(t),a=Q.intoRaw(n);return this.raw.linear_correction(this.params.dt,this.bodies.raw,e.handle,i,a,Z),i.free(),a.free(),Q.fromBuffer(Z,r)}angularCorrection(e,t,n,r){let i=$.intoRaw(t),a=Q.intoRaw(n);return this.raw.angular_correction(this.params.dt,this.bodies.raw,e.handle,i,a,Z),i.free(),a.free(),Q.fromBuffer(Z,r)}},yT=class{constructor(e,t,n,r,i){this.raw=new ca(e.handle),this.broadPhase=t,this.narrowPhase=n,this.bodies=r,this.colliders=i,this._chassis=e}free(){this.raw&&this.raw.free(),this.raw=void 0}updateVehicle(e,t,n,r){this.raw.update_vehicle(e,this.broadPhase.raw,this.narrowPhase.raw,this.bodies.raw,this.colliders.raw,t,n,this.colliders.castClosure(r))}currentVehicleSpeed(){return this.raw.current_vehicle_speed()}chassis(){return this._chassis}get indexUpAxis(){return this.raw.index_up_axis()}set indexUpAxis(e){this.raw.set_index_up_axis(e)}get indexForwardAxis(){return this.raw.index_forward_axis()}set setIndexForwardAxis(e){this.raw.set_index_forward_axis(e)}addWheel(e,t,n,r,i){let a=Q.intoRaw(e),o=Q.intoRaw(t),s=Q.intoRaw(n);this.raw.add_wheel(a,o,s,r,i),a.free(),o.free(),s.free()}numWheels(){return this.raw.num_wheels()}wheelChassisConnectionPointCs(e,t){return this.raw.wheel_chassis_connection_point_cs(e,Z)?Q.fromBuffer(Z,t):null}setWheelChassisConnectionPointCs(e,t){let n=Q.intoRaw(t);this.raw.set_wheel_chassis_connection_point_cs(e,n),n.free()}wheelSuspensionRestLength(e){return this.raw.wheel_suspension_rest_length(e)}setWheelSuspensionRestLength(e,t){this.raw.set_wheel_suspension_rest_length(e,t)}wheelMaxSuspensionTravel(e){return this.raw.wheel_max_suspension_travel(e)}setWheelMaxSuspensionTravel(e,t){this.raw.set_wheel_max_suspension_travel(e,t)}wheelRadius(e){return this.raw.wheel_radius(e)}setWheelRadius(e,t){this.raw.set_wheel_radius(e,t)}wheelSuspensionStiffness(e){return this.raw.wheel_suspension_stiffness(e)}setWheelSuspensionStiffness(e,t){this.raw.set_wheel_suspension_stiffness(e,t)}wheelSuspensionCompression(e){return this.raw.wheel_suspension_compression(e)}setWheelSuspensionCompression(e,t){this.raw.set_wheel_suspension_compression(e,t)}wheelSuspensionRelaxation(e){return this.raw.wheel_suspension_relaxation(e)}setWheelSuspensionRelaxation(e,t){this.raw.set_wheel_suspension_relaxation(e,t)}wheelMaxSuspensionForce(e){return this.raw.wheel_max_suspension_force(e)}setWheelMaxSuspensionForce(e,t){this.raw.set_wheel_max_suspension_force(e,t)}wheelBrake(e){return this.raw.wheel_brake(e)}setWheelBrake(e,t){this.raw.set_wheel_brake(e,t)}wheelSteering(e){return this.raw.wheel_steering(e)}setWheelSteering(e,t){this.raw.set_wheel_steering(e,t)}wheelEngineForce(e){return this.raw.wheel_engine_force(e)}setWheelEngineForce(e,t){this.raw.set_wheel_engine_force(e,t)}wheelDirectionCs(e,t){return this.raw.wheel_direction_cs(e,Z)?Q.fromBuffer(Z,t):null}setWheelDirectionCs(e,t){let n=Q.intoRaw(t);this.raw.set_wheel_direction_cs(e,n),n.free()}wheelAxleCs(e,t){return this.raw.wheel_axle_cs(e,Z)?Q.fromBuffer(Z,t):null}setWheelAxleCs(e,t){let n=Q.intoRaw(t);this.raw.set_wheel_axle_cs(e,n),n.free()}wheelFrictionSlip(e){return this.raw.wheel_friction_slip(e)}setWheelFrictionSlip(e,t){this.raw.set_wheel_friction_slip(e,t)}wheelSideFrictionStiffness(e){return this.raw.wheel_side_friction_stiffness(e)}setWheelSideFrictionStiffness(e,t){this.raw.set_wheel_side_friction_stiffness(e,t)}wheelRotation(e){return this.raw.wheel_rotation(e)}wheelForwardImpulse(e){return this.raw.wheel_forward_impulse(e)}wheelSideImpulse(e){return this.raw.wheel_side_impulse(e)}wheelSuspensionForce(e){return this.raw.wheel_suspension_force(e)}wheelContactNormal(e,t){return this.raw.wheel_contact_normal_ws(e,Z)?Q.fromBuffer(Z,t):null}wheelContactPoint(e,t){return this.raw.wheel_contact_point_ws(e,Z)?Q.fromBuffer(Z,t):null}wheelSuspensionLength(e){return this.raw.wheel_suspension_length(e)}wheelHardPoint(e,t){return this.raw.wheel_hard_point_ws(e,Z)?Q.fromBuffer(Z,t):null}wheelIsInContact(e){return this.raw.wheel_is_in_contact(e)}wheelGroundObject(e){return this.colliders.get(this.raw.wheel_ground_object(e))}},bT=class e{free(){this.integrationParameters.free(),this.islands.free(),this.broadPhase.free(),this.narrowPhase.free(),this.bodies.free(),this.colliders.free(),this.impulseJoints.free(),this.multibodyJoints.free(),this.softBodies.free(),this.ccdSolver.free(),this.physicsPipeline.free(),this.serializationPipeline.free(),this.debugRenderPipeline.free(),this.characterControllers.forEach(e=>e.free()),this.pidControllers.forEach(e=>e.free()),this.vehicleControllers.forEach(e=>e.free()),this.integrationParameters=void 0,this.islands=void 0,this.broadPhase=void 0,this.narrowPhase=void 0,this.bodies=void 0,this.colliders=void 0,this.ccdSolver=void 0,this.impulseJoints=void 0,this.multibodyJoints=void 0,this.softBodies=void 0,this.physicsPipeline=void 0,this.serializationPipeline=void 0,this.debugRenderPipeline=void 0,this.characterControllers=void 0,this.pidControllers=void 0,this.vehicleControllers=void 0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p){this.gravity=e,this.integrationParameters=new zT(t),this.islands=new lE(n),this.broadPhase=new Iw(r),this.narrowPhase=new Lw(i),this.bodies=new Ew(a),this.colliders=new kT(o),this.impulseJoints=new $T(c),this.multibodyJoints=new oE(l),this.softBodies=new uE(s),this.ccdSolver=new cE(u),this.physicsPipeline=new dT(d),this.serializationPipeline=new fT(f),this.debugRenderPipeline=new mT(p),this.characterControllers=new Set,this.pidControllers=new Set,this.vehicleControllers=new Set,this.impulseJoints.finalizeDeserialization(this.bodies),this.bodies.finalizeDeserialization(this.colliders),this.colliders.finalizeDeserialization(this.bodies),this.softBodies.finalizeDeserialization(this.bodies,this.colliders)}static fromRaw(t){return t?new e(Q.fromRaw(t.takeGravity()),t.takeIntegrationParameters(),t.takeIslandManager(),t.takeBroadPhase(),t.takeNarrowPhase(),t.takeBodies(),t.takeColliders(),t.takeSoftBodies(),t.takeImpulseJoints(),t.takeMultibodyJoints()):null}takeSnapshot(){return this.serializationPipeline.serializeAll(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.softBodies,this.impulseJoints,this.multibodyJoints)}static restoreSnapshot(e){return new fT().deserializeAll(e)}debugRender(e,t){return this.debugRenderPipeline.render(this.bodies,this.colliders,this.softBodies,this.impulseJoints,this.multibodyJoints,this.narrowPhase,e,t),new pT(this.debugRenderPipeline.vertices,this.debugRenderPipeline.colors)}step(e,t){this.physicsPipeline.step(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.softBodies,this.impulseJoints,this.multibodyJoints,this.ccdSolver,e,t),this.mapNewSoftBodies()}mapNewSoftBodies(){this.softBodies.mapNewSoftBodies(this.bodies,this.colliders),this.bodies.mapNewBodies(this.colliders),this.colliders.mapNewColliders(this.bodies),this.bodies.unmapRemovedBodies(),this.colliders.unmapRemovedColliders(),this.impulseJoints.unmapRemovedJoints(),this.multibodyJoints.unmapRemovedJoints()}propagateModifiedBodyPositionsToColliders(){this.bodies.raw.propagateModifiedBodyPositionsToColliders(this.colliders.raw)}get timestep(){return this.integrationParameters.dt}set timestep(e){this.integrationParameters.dt=e}get lengthUnit(){return this.integrationParameters.lengthUnit}set lengthUnit(e){this.integrationParameters.lengthUnit=e}get numSolverIterations(){return this.integrationParameters.numSolverIterations}set numSolverIterations(e){this.integrationParameters.numSolverIterations=e}get numInternalPgsIterations(){return this.integrationParameters.numInternalPgsIterations}set numInternalPgsIterations(e){this.integrationParameters.numInternalPgsIterations=e}get maxCcdSubsteps(){return this.integrationParameters.maxCcdSubsteps}set maxCcdSubsteps(e){this.integrationParameters.maxCcdSubsteps=e}createRigidBody(e){return this.bodies.createRigidBody(this.colliders,e)}createCharacterController(e){let t=new gT(e,this.integrationParameters,this.broadPhase,this.narrowPhase,this.bodies,this.colliders);return this.characterControllers.add(t),t}removeCharacterController(e){this.characterControllers.delete(e),e.free()}createPidController(e,t,n,r){let i=new vT(this.integrationParameters,this.bodies,e,t,n,r);return this.pidControllers.add(i),i}removePidController(e){this.pidControllers.delete(e),e.free()}createVehicleController(e){let t=new yT(e,this.broadPhase,this.narrowPhase,this.bodies,this.colliders);return this.vehicleControllers.add(t),t}removeVehicleController(e){this.vehicleControllers.delete(e),e.free()}createCollider(e,t){let n=t?t.handle:void 0;return this.colliders.createCollider(this.bodies,e,n)}createSoftBody(e){return this.softBodies.createSoftBody(this.bodies,this.colliders,e)}createDeformableCollider(e,t,n){return this.colliders.createDeformableCollider(this.bodies,this.softBodies,e,t,n.handle)}addSoftBodyCluster(e,t){return this.softBodies.addCluster(e.handle,t,this.bodies,this.colliders)}removeSoftBodyCluster(e,t){return this.softBodies.removeCluster(e.handle,t,this.islands,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}tearSoftBody(e,t,n){return this.softBodies.tear(e.handle,t,n,this.islands,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}cutSoftBody(e,t){return this.softBodies.cut(e.handle,t,this.islands,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}wakeUpSoftBody(e,t){this.softBodies.wakeUp(e.handle,this.bodies,t)}createImpulseJoint(e,t,n,r){return this.impulseJoints.createJoint(this.bodies,e,t.handle,n.handle,r)}createMultibodyJoint(e,t,n,r){return this.multibodyJoints.createJoint(e,t.handle,n.handle,r)}getRigidBody(e){return this.bodies.get(e)}getCollider(e){return this.colliders.get(e)}getImpulseJoint(e){return this.impulseJoints.get(e)}getMultibodyJoint(e){return this.multibodyJoints.get(e)}getSoftBody(e){return this.softBodies.get(e)}removeRigidBody(e){this.bodies&&this.bodies.remove(e.handle,this.islands,this.colliders,this.softBodies,this.impulseJoints,this.multibodyJoints)}removeSoftBody(e){this.softBodies&&this.softBodies.remove(e.handle,this.islands,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}removeCollider(e,t){this.colliders&&this.colliders.remove(e.handle,this.islands,this.bodies,this.softBodies,t)}removeImpulseJoint(e,t){this.impulseJoints&&this.impulseJoints.remove(e.handle,t)}removeMultibodyJoint(e,t){this.impulseJoints&&this.multibodyJoints.remove(e.handle,t)}forEachCollider(e){this.colliders.forEach(e)}forEachRigidBody(e){this.bodies.forEach(e)}forEachActiveRigidBody(e){this.bodies.forEachActiveRigidBody(this.islands,e)}forEachSoftBody(e){this.softBodies.forEach(e)}castRay(e,t,n,r,i,a,o,s){return this.broadPhase.castRay(this.narrowPhase,this.bodies,this.colliders,e,t,n,r,i,a?a.handle:null,o?o.handle:null,this.colliders.castClosure(s))}castRayAndGetNormal(e,t,n,r,i,a,o,s){return this.broadPhase.castRayAndGetNormal(this.narrowPhase,this.bodies,this.colliders,e,t,n,r,i,a?a.handle:null,o?o.handle:null,this.colliders.castClosure(s))}intersectionsWithRay(e,t,n,r,i,a,o,s,c){this.broadPhase.intersectionsWithRay(this.narrowPhase,this.bodies,this.colliders,e,t,n,r,i,a,o?o.handle:null,s?s.handle:null,this.colliders.castClosure(c))}intersectionWithShape(e,t,n,r,i,a,o,s){let c=this.broadPhase.intersectionWithShape(this.narrowPhase,this.bodies,this.colliders,e,t,n,r,i,a?a.handle:null,o?o.handle:null,this.colliders.castClosure(s));return c==null?null:this.colliders.get(c)}projectPoint(e,t,n,r,i,a,o){return this.broadPhase.projectPoint(this.narrowPhase,this.bodies,this.colliders,e,t,n,r,i?i.handle:null,a?a.handle:null,this.colliders.castClosure(o))}projectPointAndGetFeature(e,t,n,r,i,a){return this.broadPhase.projectPointAndGetFeature(this.narrowPhase,this.bodies,this.colliders,e,t,n,r?r.handle:null,i?i.handle:null,this.colliders.castClosure(a))}intersectionsWithPoint(e,t,n,r,i,a,o){this.broadPhase.intersectionsWithPoint(this.narrowPhase,this.bodies,this.colliders,e,this.colliders.castClosure(t),n,r,i?i.handle:null,a?a.handle:null,this.colliders.castClosure(o))}castShape(e,t,n,r,i,a,o,s,c,l,u,d){return this.broadPhase.castShape(this.narrowPhase,this.bodies,this.colliders,e,t,n,r,i,a,o,s,c,l?l.handle:null,u?u.handle:null,this.colliders.castClosure(d))}intersectionsWithShape(e,t,n,r,i,a,o,s,c){this.broadPhase.intersectionsWithShape(this.narrowPhase,this.bodies,this.colliders,e,t,n,this.colliders.castClosure(r),i,a,o?o.handle:null,s?s.handle:null,this.colliders.castClosure(c))}collidersWithAabbIntersectingAabb(e,t,n){this.broadPhase.collidersWithAabbIntersectingAabb(this.narrowPhase,this.bodies,this.colliders,e,t,this.colliders.castClosure(n))}contactPairsWith(e,t){this.narrowPhase.contactPairsWith(e.handle,this.colliders.castClosure(t))}intersectionPairsWith(e,t){this.narrowPhase.intersectionPairsWith(e.handle,this.colliders.castClosure(t))}contactPair(e,t,n){this.narrowPhase.contactPair(e.handle,t.handle,this.bodies,n)}intersectionPair(e,t){return this.narrowPhase.intersectionPair(e.handle,t.handle)}set profilerEnabled(e){this.physicsPipeline.raw.set_profiler_enabled(e)}get profilerEnabled(){return this.physicsPipeline.raw.is_profiler_enabled()}timingStep(){return this.physicsPipeline.raw.timing_step()}timingCollisionDetection(){return this.physicsPipeline.raw.timing_collision_detection()}timingBroadPhase(){return this.physicsPipeline.raw.timing_broad_phase()}timingNarrowPhase(){return this.physicsPipeline.raw.timing_narrow_phase()}timingSolver(){return this.physicsPipeline.raw.timing_solver()}timingVelocityAssembly(){return this.physicsPipeline.raw.timing_velocity_assembly()}timingVelocityResolution(){return this.physicsPipeline.raw.timing_velocity_resolution()}timingVelocityUpdate(){return this.physicsPipeline.raw.timing_velocity_update()}timingVelocityWriteback(){return this.physicsPipeline.raw.timing_velocity_writeback()}timingCcd(){return this.physicsPipeline.raw.timing_ccd()}timingCcdToiComputation(){return this.physicsPipeline.raw.timing_ccd_toi_computation()}timingCcdBroadPhase(){return this.physicsPipeline.raw.timing_ccd_broad_phase()}timingCcdNarrowPhase(){return this.physicsPipeline.raw.timing_ccd_narrow_phase()}timingCcdSolver(){return this.physicsPipeline.raw.timing_ccd_solver()}timingIslandConstruction(){return this.physicsPipeline.raw.timing_island_construction()}timingUserChanges(){return this.physicsPipeline.raw.timing_user_changes()}},xT;(function(e){e[e.NONE=0]=`NONE`,e[e.COLLISION_EVENTS=1]=`COLLISION_EVENTS`,e[e.CONTACT_FORCE_EVENTS=2]=`CONTACT_FORCE_EVENTS`})(xT||={});var ST;(function(e){e[e.NONE=0]=`NONE`,e[e.FILTER_CONTACT_PAIRS=1]=`FILTER_CONTACT_PAIRS`,e[e.FILTER_INTERSECTION_PAIRS=2]=`FILTER_INTERSECTION_PAIRS`})(ST||={});var CT;(function(e){e[e.EMPTY=0]=`EMPTY`,e[e.COMPUTE_IMPULSE=1]=`COMPUTE_IMPULSE`})(CT||={});var wT;(function(e){e[e.EXCLUDE_FIXED=1]=`EXCLUDE_FIXED`,e[e.EXCLUDE_KINEMATIC=2]=`EXCLUDE_KINEMATIC`,e[e.EXCLUDE_DYNAMIC=4]=`EXCLUDE_DYNAMIC`,e[e.EXCLUDE_SENSORS=8]=`EXCLUDE_SENSORS`,e[e.EXCLUDE_SOLIDS=16]=`EXCLUDE_SOLIDS`,e[e.ONLY_DYNAMIC=3]=`ONLY_DYNAMIC`,e[e.ONLY_KINEMATIC=5]=`ONLY_KINEMATIC`,e[e.ONLY_FIXED=6]=`ONLY_FIXED`})(wT||={});var TT;(function(e){e[e.DYNAMIC_DYNAMIC=1]=`DYNAMIC_DYNAMIC`,e[e.DYNAMIC_KINEMATIC=12]=`DYNAMIC_KINEMATIC`,e[e.DYNAMIC_FIXED=2]=`DYNAMIC_FIXED`,e[e.KINEMATIC_KINEMATIC=52224]=`KINEMATIC_KINEMATIC`,e[e.KINEMATIC_FIXED=8704]=`KINEMATIC_FIXED`,e[e.FIXED_FIXED=32]=`FIXED_FIXED`,e[e.DEFAULT=15]=`DEFAULT`,e[e.ALL=60943]=`ALL`})(TT||={});var ET=class{constructor(e,t,n,r){this.colliderSet=e,this.handle=t,this._parent=n,this._shape=r}finalizeDeserialization(e){this.handle!=null&&(this._parent=e.get(this.colliderSet.raw.coParent(this.handle)))}ensureShapeIsCached(){this._shape||=Bw.fromRaw(this.colliderSet.raw,this.handle)}get shape(){return this.ensureShapeIsCached(),this._shape}clearShapeCache(){this._shape=null}isValid(){return this.colliderSet.raw.contains(this.handle)}translation(e){return this.colliderSet.raw.coTranslation(this.handle,Z),Q.fromBuffer(Z,e)}translationWrtParent(e){return this.colliderSet.raw.coTranslationWrtParent(this.handle,Z)?Q.fromBuffer(Z,e):null}rotation(e){return this.colliderSet.raw.coRotation(this.handle,Z),$.fromBuffer(Z,e)}rotationWrtParent(e){return this.colliderSet.raw.coRotationWrtParent(this.handle,Z)?$.fromBuffer(Z,e):null}isSensor(){return this.colliderSet.raw.coIsSensor(this.handle)}setSensor(e){this.colliderSet.raw.coSetSensor(this.handle,e)}setShape(e){let t=e.intoRaw();this.colliderSet.raw.coSetShape(this.handle,t),t.free(),this._shape=e}setEnabled(e){this.colliderSet.raw.coSetEnabled(this.handle,e)}isEnabled(){return this.colliderSet.raw.coIsEnabled(this.handle)}setRestitution(e){this.colliderSet.raw.coSetRestitution(this.handle,e)}setFriction(e){this.colliderSet.raw.coSetFriction(this.handle,e)}frictionCombineRule(){return this.colliderSet.raw.coFrictionCombineRule(this.handle)}setFrictionCombineRule(e){this.colliderSet.raw.coSetFrictionCombineRule(this.handle,e)}restitutionCombineRule(){return this.colliderSet.raw.coRestitutionCombineRule(this.handle)}setRestitutionCombineRule(e){this.colliderSet.raw.coSetRestitutionCombineRule(this.handle,e)}setCollisionGroups(e){this.colliderSet.raw.coSetCollisionGroups(this.handle,e)}setSolverGroups(e){this.colliderSet.raw.coSetSolverGroups(this.handle,e)}contactSkin(){return this.colliderSet.raw.coContactSkin(this.handle)}setContactSkin(e){return this.colliderSet.raw.coSetContactSkin(this.handle,e)}activeHooks(){return this.colliderSet.raw.coActiveHooks(this.handle)}setActiveHooks(e){this.colliderSet.raw.coSetActiveHooks(this.handle,e)}activeEvents(){return this.colliderSet.raw.coActiveEvents(this.handle)}setActiveEvents(e){this.colliderSet.raw.coSetActiveEvents(this.handle,e)}activeCollisionTypes(){return this.colliderSet.raw.coActiveCollisionTypes(this.handle)}setContactForceEventThreshold(e){return this.colliderSet.raw.coSetContactForceEventThreshold(this.handle,e)}contactForceEventThreshold(){return this.colliderSet.raw.coContactForceEventThreshold(this.handle)}setActiveCollisionTypes(e){this.colliderSet.raw.coSetActiveCollisionTypes(this.handle,e)}setDensity(e){this.colliderSet.raw.coSetDensity(this.handle,e)}setMass(e){this.colliderSet.raw.coSetMass(this.handle,e)}setMassProperties(e,t,n,r){let i=Q.intoRaw(t),a=Q.intoRaw(n),o=$.intoRaw(r);this.colliderSet.raw.coSetMassProperties(this.handle,e,i,a,o),i.free(),a.free(),o.free()}setTranslation(e){this.colliderSet.raw.coSetTranslation(this.handle,e.x,e.y,e.z)}setTranslationWrtParent(e){this.colliderSet.raw.coSetTranslationWrtParent(this.handle,e.x,e.y,e.z)}setRotation(e){this.colliderSet.raw.coSetRotation(this.handle,e.x,e.y,e.z,e.w)}setRotationWrtParent(e){this.colliderSet.raw.coSetRotationWrtParent(this.handle,e.x,e.y,e.z,e.w)}shapeType(){return this.colliderSet.raw.coShapeType(this.handle)}halfExtents(e){return this.colliderSet.raw.coHalfExtents(this.handle,Z)?Q.fromBuffer(Z,e):null}setHalfExtents(e){let t=Q.intoRaw(e);this.colliderSet.raw.coSetHalfExtents(this.handle,t)}radius(){return this.colliderSet.raw.coRadius(this.handle)}setRadius(e){this.colliderSet.raw.coSetRadius(this.handle,e)}roundRadius(){return this.colliderSet.raw.coRoundRadius(this.handle)}setRoundRadius(e){this.colliderSet.raw.coSetRoundRadius(this.handle,e)}halfHeight(){return this.colliderSet.raw.coHalfHeight(this.handle)}setHalfHeight(e){this.colliderSet.raw.coSetHalfHeight(this.handle,e)}setVoxel(e,t,n,r){this.colliderSet.raw.coSetVoxel(this.handle,e,t,n,r),this._shape=null}propagateVoxelChange(e,t,n,r,i,a,o){this.colliderSet.raw.coPropagateVoxelChange(this.handle,e.handle,t,n,r,i,a,o),this._shape=null}combineVoxelStates(e,t,n,r){this.colliderSet.raw.coCombineVoxelStates(this.handle,e.handle,t,n,r),this._shape=null}vertices(){return this.colliderSet.raw.coVertices(this.handle)}indices(){return this.colliderSet.raw.coIndices(this.handle)}heightfieldHeights(){return this.colliderSet.raw.coHeightfieldHeights(this.handle)}heightfieldScale(e){return this.colliderSet.raw.coHeightfieldScale(this.handle,Z)?Q.fromBuffer(Z,e):null}heightfieldNRows(){return this.colliderSet.raw.coHeightfieldNRows(this.handle)}heightfieldNCols(){return this.colliderSet.raw.coHeightfieldNCols(this.handle)}parent(){return this._parent}softBody(){let e=this.colliderSet.raw.coSoftBody(this.handle);return e===void 0?null:e}isDeformable(){return this.colliderSet.raw.coIsDeformable(this.handle)}friction(){return this.colliderSet.raw.coFriction(this.handle)}restitution(){return this.colliderSet.raw.coRestitution(this.handle)}density(){return this.colliderSet.raw.coDensity(this.handle)}mass(){return this.colliderSet.raw.coMass(this.handle)}volume(){return this.colliderSet.raw.coVolume(this.handle)}collisionGroups(){return this.colliderSet.raw.coCollisionGroups(this.handle)}solverGroups(){return this.colliderSet.raw.coSolverGroups(this.handle)}containsPoint(e){let t=Q.intoRaw(e),n=this.colliderSet.raw.coContainsPoint(this.handle,t);return t.free(),n}projectPoint(e,t,n){let r=Q.intoRaw(e),i=Mw.fromBuffer(this.colliderSet.raw.coProjectPoint(this.handle,r,t),n);return r.free(),i}intersectsRay(e,t){let n=Q.intoRaw(e.origin),r=Q.intoRaw(e.dir),i=this.colliderSet.raw.coIntersectsRay(this.handle,n,r,t);return n.free(),r.free(),i}castShape(e,t,n,r,i,a,o,s,c){let l=Q.intoRaw(e),u=Q.intoRaw(n),d=$.intoRaw(r),f=Q.intoRaw(i),p=t.intoRaw(),m=this.colliderSet.raw.coCastShape(this.handle,l,p,u,d,f,a,o,s),h=null;return m&&(m.getComponents(Z),h=Pw.fromBuffer(null,Z,c),m.free()),l.free(),u.free(),d.free(),f.free(),p.free(),h}castCollider(e,t,n,r,i,a,o){let s=Q.intoRaw(e),c=Q.intoRaw(n),l=this.colliderSet.raw.coCastCollider(this.handle,s,t.handle,c,r,i,a),u=null;if(l){let e=l.colliderHandle();l.getComponents(Z),u=Fw.fromBuffer(this.colliderSet.get(e),Z,o),l.free()}return s.free(),c.free(),u}intersectsShape(e,t,n){let r=Q.intoRaw(t),i=$.intoRaw(n),a=e.intoRaw(),o=this.colliderSet.raw.coIntersectsShape(this.handle,a,r,i);return r.free(),i.free(),a.free(),o}contactShape(e,t,n,r,i){let a=Q.intoRaw(t),o=$.intoRaw(n),s=e.intoRaw(),c=zw.fromBuffer(this.colliderSet.raw.coContactShape(this.handle,s,a,o,r),i);return a.free(),o.free(),s.free(),c}contactCollider(e,t,n){return zw.fromBuffer(this.colliderSet.raw.coContactCollider(this.handle,e.handle,t),n)}castRay(e,t,n){let r=Q.intoRaw(e.origin),i=Q.intoRaw(e.dir),a=this.colliderSet.raw.coCastRay(this.handle,r,i,t,n);return r.free(),i.free(),a}castRayAndGetNormal(e,t,n,r){let i=Q.intoRaw(e.origin),a=Q.intoRaw(e.dir),o=kw.fromBuffer(this.colliderSet.raw.coCastRayAndGetNormal(this.handle,i,a,t,n),r);return i.free(),a.free(),o}},DT;(function(e){e[e.Density=0]=`Density`,e[e.Mass=1]=`Mass`,e[e.MassProps=2]=`MassProps`})(DT||={});var OT=class e{constructor(e){this.enabled=!0,this.shape=e,this.massPropsMode=DT.Density,this.density=1,this.friction=.5,this.restitution=0,this.rotation=$.identity(),this.translation=Q.zeros(),this.isSensor=!1,this.collisionGroups=4294967295,this.solverGroups=4294967295,this.frictionCombineRule=sE.Average,this.restitutionCombineRule=sE.Average,this.activeCollisionTypes=TT.DEFAULT,this.activeEvents=xT.NONE,this.activeHooks=ST.NONE,this.mass=0,this.centerOfMass=Q.zeros(),this.contactForceEventThreshold=0,this.contactSkin=0,this.principalAngularInertia=Q.zeros(),this.angularInertiaLocalFrame=$.identity()}static ball(t){let n=new Kw(t);return new e(n)}static capsule(t,n){let r=new Xw(t,n);return new e(r)}static segment(t,n){let r=new Zw(t,n);return new e(r)}static triangle(t,n,r){let i=new Qw(t,n,r);return new e(i)}static roundTriangle(t,n,r,i){let a=new $w(t,n,r,i);return new e(a)}static polyline(t,n,r){let i=new eT(t,n,r);return new e(i)}static voxels(t,n){let r=new tT(t,n);return new e(r)}static trimesh(t,n,r){let i=new rT(t,n,r);return new e(i)}static cuboid(t,n,r){let i=new Jw(t,n,r);return new e(i)}static roundCuboid(t,n,r,i){let a=new Yw(t,n,r,i);return new e(a)}static heightfield(t,n,r,i,a){let o=new oT(t,n,r,i,a);return new e(o)}static cylinder(t,n){let r=new sT(t,n);return new e(r)}static roundCylinder(t,n,r){let i=new cT(t,n,r);return new e(i)}static cone(t,n){let r=new lT(t,n);return new e(r)}static roundCone(t,n,r){let i=new uT(t,n,r);return new e(i)}static convexHull(t){let n=new iT(t,null);return new e(n)}static convexMesh(t,n){let r=new iT(t,n);return new e(r)}static roundConvexHull(t,n){let r=new aT(t,null,n);return new e(r)}static roundConvexMesh(t,n,r){let i=new aT(t,n,r);return new e(i)}static compound(t,n,r,i){let a=new nT(t,n,r,i);return new e(a)}static convexDecomposition(t,n,r,i){let a,o=i??0;if(r){let e=new La;r.alpha!==void 0&&(e.alpha=r.alpha),r.beta!==void 0&&(e.beta=r.beta),r.concavity!==void 0&&(e.concavity=r.concavity),r.planeDownsampling!==void 0&&(e.plane_downsampling=r.planeDownsampling),r.convexHullDownsampling!==void 0&&(e.convex_hull_downsampling=r.convexHullDownsampling),r.maxConvexHulls!==void 0&&(e.max_convex_hulls=r.maxConvexHulls),r.resolution!==void 0&&(e.resolution=r.resolution),r.convexHullApproximation!==void 0&&(e.convex_hull_approximation=r.convexHullApproximation),a=ka.convexDecompositionWithParams(t,n,e,o),e.free()}else a=ka.convexDecomposition(t,n,o);if(!a)return null;let s=Bw.fromRawShape(a);return new e(s)}setTranslation(e,t,n){if(typeof e!=`number`||typeof t!=`number`||typeof n!=`number`)throw TypeError(`The translation components must be numbers.`);return this.translation={x:e,y:t,z:n},this}setRotation(e){return $.copy(this.rotation,e),this}setSensor(e){return this.isSensor=e,this}setEnabled(e){return this.enabled=e,this}setContactSkin(e){return this.contactSkin=e,this}setDensity(e){return this.massPropsMode=DT.Density,this.density=e,this}setMass(e){return this.massPropsMode=DT.Mass,this.mass=e,this}setMassProperties(e,t,n,r){return this.massPropsMode=DT.MassProps,this.mass=e,Q.copy(this.centerOfMass,t),Q.copy(this.principalAngularInertia,n),$.copy(this.angularInertiaLocalFrame,r),this}setRestitution(e){return this.restitution=e,this}setFriction(e){return this.friction=e,this}setFrictionCombineRule(e){return this.frictionCombineRule=e,this}setRestitutionCombineRule(e){return this.restitutionCombineRule=e,this}setCollisionGroups(e){return this.collisionGroups=e,this}setSolverGroups(e){return this.solverGroups=e,this}setActiveHooks(e){return this.activeHooks=e,this}setActiveEvents(e){return this.activeEvents=e,this}setActiveCollisionTypes(e){return this.activeCollisionTypes=e,this}setContactForceEventThreshold(e){return this.contactForceEventThreshold=e,this}},kT=class{free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}constructor(e){this.raw=e||new ea,this.map=new Tw,e&&e.forEachColliderHandle(e=>{this.map.set(e,new ET(this,e,null))})}castClosure(e){return t=>{if(e)return e(this.get(t))}}finalizeDeserialization(e){this.map.forEach(t=>t.finalizeDeserialization(e))}createCollider(e,t,n){let r=n!=null&&n!=null;if(r&&isNaN(n))throw Error(`Cannot create a collider with a parent rigid-body handle that is not a number.`);let i=t.shape.intoRaw(),a=Q.intoRaw(t.translation),o=$.intoRaw(t.rotation),s=Q.intoRaw(t.centerOfMass),c=Q.intoRaw(t.principalAngularInertia),l=$.intoRaw(t.angularInertiaLocalFrame),u=this.raw.createCollider(t.enabled,i,a,o,t.massPropsMode,t.mass,s,c,l,t.density,t.friction,t.restitution,t.frictionCombineRule,t.restitutionCombineRule,t.isSensor,t.collisionGroups,t.solverGroups,t.activeCollisionTypes,t.activeHooks,t.activeEvents,t.contactForceEventThreshold,t.contactSkin,r,r?n:0,e.raw);i.free(),a.free(),o.free(),s.free(),c.free(),l.free();let d=r?e.get(n):null,f=new ET(this,u,d,t.shape);return this.map.set(u,f),f}createDeformableCollider(e,t,n,r,i){let a=n.shape.intoRaw(),o=Q.intoRaw(n.translation),s=$.intoRaw(n.rotation),c=Q.intoRaw(n.centerOfMass),l=Q.intoRaw(n.principalAngularInertia),u=$.intoRaw(n.angularInertiaLocalFrame),d=this.raw.createDeformableCollider(n.enabled,a,o,s,n.massPropsMode,n.mass,c,l,u,n.density,n.friction,n.restitution,n.frictionCombineRule,n.restitutionCombineRule,n.isSensor,n.collisionGroups,n.solverGroups,n.activeCollisionTypes,n.activeHooks,n.activeEvents,n.contactForceEventThreshold,n.contactSkin,r.rawMode(),r.particles,r.eps,r.selfContacts,i,e.raw,t.raw);if(a.free(),o.free(),s.free(),c.free(),l.free(),u.free(),d===void 0)return null;let f=e.get(i),p=new ET(this,d,f,n.shape);return this.map.set(d,p),p}mapNewColliders(e){this.raw.forEachColliderHandle(t=>{if(!this.map.get(t)){let n=this.raw.coParent(t),r=n===void 0?null:e.get(n);this.map.set(t,new ET(this,t,r))}})}unmapRemovedColliders(){for(let e of this.map.getAll())this.raw.contains(e.handle)||this.map.delete(e.handle)}remove(e,t,n,r,i){this.raw.remove(e,t.raw,n.raw,r.raw,i),this.unmap(e)}unmap(e){this.map.delete(e)}get(e){return this.map.get(e)}len(){return this.map.len()}contains(e){return this.get(e)!=null}forEach(e){this.map.forEach(e)}getAll(){return this.map.getAll()}},AT;(function(e){e[e.Volume=0]=`Volume`,e[e.Corotational=1]=`Corotational`,e[e.NeoHookean=2]=`NeoHookean`})(AT||={});var jT;(function(e){e[e.Both=0]=`Both`,e[e.Compression=1]=`Compression`,e[e.Tension=2]=`Tension`})(jT||={});var MT;(function(e){e[e.Constraints=0]=`Constraints`,e[e.Fem=1]=`Fem`})(MT||={});var NT;(function(e){e[e.Keep=0]=`Keep`,e[e.StandDown=1]=`StandDown`,e[e.AlongNormal=2]=`AlongNormal`})(NT||={});var PT=class e{constructor(){e.copyFromRaw(this,new Ia,!0)}static fromRaw(t){let n=new e;return e.copyFromRaw(n,t,!0),n}static copyFromRaw(e,t,n){e.authoredVelocityMargin=t.authoredVelocityMargin,e.edgeSpeculation=t.edgeSpeculation,e.invertedCellDetection=t.invertedCellDetection,e.selfCrossingDetection=t.selfCrossingDetection,e.detectionMotionGating=t.detectionMotionGating,e.crossBodyDetection=t.crossBodyDetection,e.selfStandDown=t.selfStandDown,e.crossBodyExpelGate=t.crossBodyExpelGate,e.edgeStandDown=t.edgeStandDown,e.crossingRepulsion=t.crossingRepulsion,e.crossingRepulsionGuide=t.crossingRepulsionGuide,e.crossingRepulsionSelfGuide=t.crossingRepulsionSelfGuide,e.overlapConstraints=t.overlapConstraints,e.overlapRigid=t.overlapRigid,e.overlapSkipSelfTangled=t.overlapSkipSelfTangled,e.overlapEdgeStandDown=t.overlapEdgeStandDown,e.overlapSkinVolume=t.overlapSkinVolume,e.overlapSelfRegions=t.overlapSelfRegions,e.overlapNormalPush=t.overlapNormalPush,e.overlapMultiVolume=t.overlapMultiVolume,e.recoveryPace=t.recoveryPace,e.overlapConstraintPace=t.overlapConstraintPace,e.overlapKeptDepth=t.overlapKeptDepth,e.overlapProgressMargin=t.overlapProgressMargin,e.overlapSplit=t.overlapSplit,e.overlapPatience=t.overlapPatience,e.overlapPatchConstraints=t.overlapPatchConstraints,n&&t.free()}intoRaw(){let e=new Ia;return e.authoredVelocityMargin=this.authoredVelocityMargin,e.edgeSpeculation=this.edgeSpeculation,e.invertedCellDetection=this.invertedCellDetection,e.selfCrossingDetection=this.selfCrossingDetection,e.detectionMotionGating=this.detectionMotionGating,e.crossBodyDetection=this.crossBodyDetection,e.selfStandDown=this.selfStandDown,e.crossBodyExpelGate=this.crossBodyExpelGate,e.edgeStandDown=this.edgeStandDown,e.crossingRepulsion=this.crossingRepulsion,e.crossingRepulsionGuide=this.crossingRepulsionGuide,e.crossingRepulsionSelfGuide=this.crossingRepulsionSelfGuide,e.overlapConstraints=this.overlapConstraints,e.overlapRigid=this.overlapRigid,e.overlapSkipSelfTangled=this.overlapSkipSelfTangled,e.overlapEdgeStandDown=this.overlapEdgeStandDown,e.overlapSkinVolume=this.overlapSkinVolume,e.overlapSelfRegions=this.overlapSelfRegions,e.overlapNormalPush=this.overlapNormalPush,e.overlapMultiVolume=this.overlapMultiVolume,e.recoveryPace=this.recoveryPace,e.overlapConstraintPace=this.overlapConstraintPace,e.overlapKeptDepth=this.overlapKeptDepth,e.overlapProgressMargin=this.overlapProgressMargin,e.overlapSplit=this.overlapSplit,e.overlapPatience=this.overlapPatience,e.overlapPatchConstraints=this.overlapPatchConstraints,e}},FT;(function(e){e[e.Direct=0]=`Direct`,e[e.DirectByPosition=1]=`DirectByPosition`,e[e.Skinned=2]=`Skinned`})(FT||={});var IT=class e{constructor(){e.copyFromRaw(this,new Na,!0)}static uniform(t,n){let r=new e,i=Na.uniform(t,n);return e.copyFromRaw(r,i,!0),r}static fromRaw(t){let n=new e;return e.copyFromRaw(n,t,!0),n}static copyFromRaw(e,t,n){e.edgeSoftness={naturalFrequency:t.edgeFrequency,dampingRatio:t.edgeDampingRatio},e.bendSoftness={naturalFrequency:t.bendFrequency,dampingRatio:t.bendDampingRatio},e.volumeSoftness={naturalFrequency:t.volumeFrequency,dampingRatio:t.volumeDampingRatio},e.shapeMatchingSoftness={naturalFrequency:t.shapeMatchingFrequency,dampingRatio:t.shapeMatchingDampingRatio},e.youngModulus=t.youngModulus,e.poissonRatio=t.poissonRatio,e.elasticDampingRatio=t.elasticDampingRatio,e.plasticYield=t.plasticYield,e.plasticCreep=t.plasticCreep,e.plasticMax=t.plasticMax,e.deformationDamping=t.deformationDamping,e.edgePlasticYield=t.edgePlasticYield,e.edgePlasticCreep=t.edgePlasticCreep,e.edgePlasticMax=t.edgePlasticMax,e.edgePlasticFlow=t.edgePlasticFlow,e.tearStrain=t.tearStrain??null,e.tearForce=t.tearForce??null,e.tearSmoothing=t.tearSmoothing,e.interiorStrength=t.interiorStrength,e.maxTearsPerStep=t.maxTearsPerStep,e.minPiece=t.minPiece??null,n&&t.free()}intoRaw(){let e=new Na;return e.edgeFrequency=this.edgeSoftness.naturalFrequency,e.edgeDampingRatio=this.edgeSoftness.dampingRatio,e.bendFrequency=this.bendSoftness.naturalFrequency,e.bendDampingRatio=this.bendSoftness.dampingRatio,e.volumeFrequency=this.volumeSoftness.naturalFrequency,e.volumeDampingRatio=this.volumeSoftness.dampingRatio,e.shapeMatchingFrequency=this.shapeMatchingSoftness.naturalFrequency,e.shapeMatchingDampingRatio=this.shapeMatchingSoftness.dampingRatio,e.youngModulus=this.youngModulus,e.poissonRatio=this.poissonRatio,e.elasticDampingRatio=this.elasticDampingRatio,e.plasticYield=this.plasticYield,e.plasticCreep=this.plasticCreep,e.plasticMax=this.plasticMax,e.deformationDamping=this.deformationDamping,e.edgePlasticYield=this.edgePlasticYield,e.edgePlasticCreep=this.edgePlasticCreep,e.edgePlasticMax=this.edgePlasticMax,e.edgePlasticFlow=this.edgePlasticFlow,e.tearStrain=this.tearStrain??void 0,e.tearForce=this.tearForce??void 0,e.tearSmoothing=this.tearSmoothing,e.interiorStrength=this.interiorStrength,e.maxTearsPerStep=this.maxTearsPerStep,e.minPiece=this.minPiece??void 0,e}},LT=class{constructor(e,t,n,r){this.rawSet=e,this.bodies=t,this.colliders=n,this.handle=r}finalizeDeserialization(e,t){this.bodies=e,this.colliders=t}isValid(){return this.rawSet.contains(this.handle)}topologyVersion(){return this.rawSet.sbTopologyVersion(this.handle)}numParticles(){return this.rawSet.sbNumParticles(this.handle)}particlePosition(e,t){return this.rawSet.sbParticlePosition(this.handle,e,Z),Q.fromBuffer(Z,t)}particlePositions(){return this.rawSet.sbParticlePositions(this.handle)}particleVelocity(e,t){return this.rawSet.sbParticleVelocity(this.handle,e,Z),Q.fromBuffer(Z,t)}particleVelocities(){return this.rawSet.sbParticleVelocities(this.handle)}particleRestPosition(e,t){return this.rawSet.sbParticleRestPosition(this.handle,e,Z),Q.fromBuffer(Z,t)}particleMass(e){return this.rawSet.sbParticleMass(this.handle,e)}isParticlePinned(e){return this.rawSet.sbIsParticlePinned(this.handle,e)}isParticleOnSurface(e){return this.rawSet.sbIsParticleOnSurface(this.handle,e)}isParticleDamaged(e){return this.rawSet.sbIsParticleDamaged(this.handle,e)}setParticlePosition(e,t){let n=Q.intoRaw(t);this.rawSet.sbSetParticlePosition(this.handle,e,n),n.free()}setParticleVelocity(e,t){let n=Q.intoRaw(t);this.rawSet.sbSetParticleVelocity(this.handle,e,n),n.free()}setParticleKinematicTarget(e,t){let n=Q.intoRaw(t);this.rawSet.sbSetParticleKinematicTarget(this.handle,e,n),n.free()}setParticlePinned(e,t){this.rawSet.sbSetParticlePinned(this.handle,e,t)}attachParticle(e,t){this.rawSet.sbAttachParticle(this.handle,e,t.handle,this.bodies.raw)}detachParticle(e){return this.rawSet.sbDetachParticle(this.handle,e)}numAttachments(){return this.rawSet.sbNumAttachments(this.handle)}attachmentParticle(e){return this.rawSet.sbAttachmentParticle(this.handle,e)}attachmentBody(e){return this.bodies.get(this.rawSet.sbAttachmentBody(this.handle,e))}numEdges(){return this.rawSet.sbNumEdges(this.handle)}edges(){return this.rawSet.sbEdges(this.handle)}edgeRestLength(e){return this.rawSet.sbEdgeRestLength(this.handle,e)}isEdgeBend(e){return this.rawSet.sbEdgeIsBend(this.handle,e)}edgeImpulse(e){return this.rawSet.sbEdgeImpulse(this.handle,e)}edgeStress(e){return this.rawSet.sbEdgeStress(this.handle,e)}edgePlasticStrain(e){return this.rawSet.sbEdgePlasticStrain(this.handle,e)}edgeTearResistance(e){return this.rawSet.sbEdgeTearResistance(this.handle,e)}numCells(){return this.rawSet.sbNumCells(this.handle)}cells(){return this.rawSet.sbCells(this.handle)}cellRestVolume(e){return this.rawSet.sbCellRestVolume(this.handle,e)}cellStress(e){return this.rawSet.sbCellStress(this.handle,e)}cellStiffnessScale(e){return this.rawSet.sbCellStiffnessScale(this.handle,e)}cellTearResistance(e){return this.rawSet.sbCellTearResistance(this.handle,e)}numDihedrals(){return this.rawSet.sbNumDihedrals(this.handle)}dihedrals(){return this.rawSet.sbDihedrals(this.handle)}dihedralRestAngle(e){return this.rawSet.sbDihedralRestAngle(this.handle,e)}boundary(){return this.rawSet.sbBoundary(this.handle)}material(){return IT.fromRaw(this.rawSet.sbMaterial(this.handle))}setMaterial(e){let t=e.intoRaw();this.rawSet.sbSetMaterial(this.handle,t),t.free()}cellModel(){return this.rawSet.sbCellModel(this.handle)}solver(){return this.rawSet.sbSolver(this.handle)}setSolver(e){this.rawSet.sbSetSolver(this.handle,e)}volumePreservationEnabled(){return this.rawSet.sbVolumePreservationEnabled(this.handle)}enableVolumePreservation(e){this.rawSet.sbEnableVolumePreservation(this.handle,e)}restVolume(){return this.rawSet.sbRestVolume(this.handle)}volume(){return this.rawSet.sbVolume(this.handle)}volumeFactor(){return this.rawSet.sbVolumeFactor(this.handle)}setVolumeFactor(e){this.rawSet.sbSetVolumeFactor(this.handle,e)}particleRadius(){return this.rawSet.sbParticleRadius(this.handle)}resetPlasticity(){this.rawSet.sbResetPlasticity(this.handle)}rootBody(){return this.bodies.get(this.rawSet.sbRootBody(this.handle))}origin(){let e=this.rawSet.sbOrigin(this.handle);return e===void 0?null:e}pieces(){return Array.from(this.rawSet.sbPieces(this.handle))}centerOfMass(e){return this.rawSet.sbCenterOfMass(this.handle,Z),Q.fromBuffer(Z,e)}mass(){return this.rawSet.sbMass(this.handle)}isSleeping(){return this.rawSet.sbIsSleeping(this.handle)}wakeUp(){this.rawSet.sbWakeUp(this.handle)}isEnabled(){return this.rawSet.sbIsEnabled(this.handle)}setEnabled(e){this.rawSet.sbSetEnabled(this.handle,e)}setAdditionalPgsIterations(e){this.rawSet.sbSetAdditionalPgsIterations(this.handle,e)}linearDamping(){return this.rawSet.sbLinearDamping(this.handle)}gravityScale(){return this.rawSet.sbGravityScale(this.handle)}addForce(e,t){let n=Q.intoRaw(e);this.rawSet.sbAddForce(this.handle,n,t),n.free()}addParticleForce(e,t,n){let r=Q.intoRaw(t);this.rawSet.sbAddParticleForce(this.handle,e,r,n),r.free()}resetForces(e){this.rawSet.sbResetForces(this.handle,e)}applyImpulse(e,t){let n=Q.intoRaw(e);this.rawSet.sbApplyImpulse(this.handle,n,t),n.free()}applyParticleImpulse(e,t,n){let r=Q.intoRaw(t);this.rawSet.sbApplyParticleImpulse(this.handle,e,r,n),r.free()}applyImpulseAtPoint(e,t,n,r){let i=Q.intoRaw(e),a=Q.intoRaw(t);this.rawSet.sbApplyImpulseAtPoint(this.handle,i,a,n,r),i.free(),a.free()}applyRadialImpulse(e,t,n,r){let i=Q.intoRaw(e);this.rawSet.sbApplyRadialImpulse(this.handle,i,t,n,r),i.free()}tearEdge(e){this.rawSet.sbTearEdge(this.handle,e)}tearCell(e){this.rawSet.sbTearCell(this.handle,e)}hasPendingTears(){return this.rawSet.sbHasPendingTears(this.handle)}numClusters(){return this.rawSet.sbNumClusters(this.handle)}isClusterLive(e){return this.rawSet.sbIsClusterLive(this.handle,e)}clusterProxy(e){let t=this.rawSet.sbClusterProxy(this.handle,e);return t===void 0?null:this.bodies.get(t)}clusterParticles(e){return this.rawSet.sbClusterParticles(this.handle,e)}clusterShapeMatchingEnabled(e){return this.rawSet.sbClusterShapeMatchingEnabled(this.handle,e)}enableClusterShapeMatching(e,t){this.rawSet.sbEnableClusterShapeMatching(this.handle,e,t)}setClusterStiffnessScale(e,t){this.rawSet.sbSetClusterStiffnessScale(this.handle,e,t)}setClusterEdgeSoftness(e,t){this.rawSet.sbSetClusterEdgeSoftness(this.handle,e,t?t.naturalFrequency:void 0,t?t.dampingRatio:void 0)}setClusterTearResistance(e,t){this.rawSet.sbSetClusterTearResistance(this.handle,e,t)}setClusterPinned(e,t){this.rawSet.sbSetClusterPinned(this.handle,e,t)}setClusterKinematicTarget(e,t,n){let r=Q.intoRaw(t),i=$.intoRaw(n);this.rawSet.sbSetClusterKinematicTarget(this.handle,e,r,i),r.free(),i.free()}numMeshes(){return this.rawSet.sbNumMeshes(this.handle)}meshCluster(e){let t=this.rawSet.sbMeshCluster(this.handle,e);return t===void 0?null:t}meshCollider(e){let t=this.rawSet.sbMeshCollider(this.handle,e);return t===void 0?null:this.colliders.get(t)}isMeshSkinned(e){return this.rawSet.sbMeshIsSkinned(this.handle,e)}meshCollisionEnabled(e){return this.rawSet.sbMeshCollisionEnabled(this.handle,e)}isMeshOriented(e){return this.rawSet.sbMeshIsOriented(this.handle,e)}meshVertices(e){return this.rawSet.sbMeshVertices(this.handle,e)}meshIndices(e){return this.rawSet.sbMeshIndices(this.handle,e)}meshOfCollider(e){let t=this.rawSet.sbMeshOfCollider(this.handle,e.handle);return t===void 0?null:t}},RT=class{constructor(e){this.raw=e}free(){this.raw&&this.raw.free(),this.raw=void 0}softBody(){return this.raw.softBody()}tornEdges(){return this.raw.tornEdges()}tornCells(){return this.raw.tornCells()}removedEdges(){return this.raw.removedEdges()}splitParticles(){return this.raw.splitParticles()}insertedParticles(){return this.raw.insertedParticles()}seeds(){return this.raw.seeds()}numPieces(){return this.raw.numPieces()}pieceSoftBody(e){return this.raw.pieceSoftBody(e)}pieceParticles(e){return this.raw.pieceParticles(e)}pieceClusters(e){return this.raw.pieceClusters(e)}numClusterSplits(){return this.raw.numClusterSplits()}clusterSplitSource(e){return this.raw.clusterSplitSource(e)}clusterSplitSoftBody(e){return this.raw.clusterSplitSoftBody(e)}clusterSplitCluster(e){return this.raw.clusterSplitCluster(e)}clusterSplitProxy(e){return this.raw.clusterSplitProxy(e)}clusterSplitKeepsProxy(e){return this.raw.clusterSplitKeepsProxy(e)}numMovedJoints(){return this.raw.numMovedJoints()}movedJoint(e){return this.raw.movedJoint(e)}movedJointFrom(e){return this.raw.movedJointFrom(e)}movedJointTo(e){return this.raw.movedJointTo(e)}particleDestination(e){let t=this.raw.particleDestinationBody(e),n=this.raw.particleDestinationIndex(e);return t===void 0||n===void 0?null:{softBody:t,particle:n}}},zT=class{constructor(e){this.raw=e||new fa}free(){this.raw&&this.raw.free(),this.raw=void 0}get dt(){return this.raw.dt}get contact_erp(){return this.raw.contact_erp}get lengthUnit(){return this.raw.lengthUnit}get normalizedAllowedLinearError(){return this.raw.normalizedAllowedLinearError}get normalizedPredictionDistance(){return this.raw.normalizedPredictionDistance}get numSolverIterations(){return this.raw.numSolverIterations}get numInternalPgsIterations(){return this.raw.numInternalPgsIterations}get maxCcdSubsteps(){return this.raw.maxCcdSubsteps}get softBodiesResweepStrain(){return this.raw.softBodiesResweepStrain}get softBodiesMaxExtraSubsteps(){return this.raw.softBodiesMaxExtraSubsteps}get softBodiesContactStiffening(){return this.raw.softBodiesContactStiffening}get softBodiesRecovery(){return PT.fromRaw(this.raw.softBodiesRecovery)}get softBodiesFemLinearTolerance(){return this.raw.softBodiesFemLinearTolerance}get softBodiesFemMaxLinearIterations(){return this.raw.softBodiesFemMaxLinearIterations}get softBodiesFemMaxDenseDofs(){return this.raw.softBodiesFemMaxDenseDofs}set dt(e){this.raw.dt=e}set softBodiesResweepStrain(e){this.raw.softBodiesResweepStrain=e}set softBodiesMaxExtraSubsteps(e){this.raw.softBodiesMaxExtraSubsteps=e}set softBodiesContactStiffening(e){this.raw.softBodiesContactStiffening=e}set softBodiesRecovery(e){let t=e.intoRaw();this.raw.softBodiesRecovery=t,t.free()}set softBodiesFemLinearTolerance(e){this.raw.softBodiesFemLinearTolerance=e}set softBodiesFemMaxLinearIterations(e){this.raw.softBodiesFemMaxLinearIterations=e}set softBodiesFemMaxDenseDofs(e){this.raw.softBodiesFemMaxDenseDofs=e}set contact_natural_frequency(e){this.raw.contact_natural_frequency=e}set lengthUnit(e){this.raw.lengthUnit=e}set normalizedAllowedLinearError(e){this.raw.normalizedAllowedLinearError=e}set normalizedPredictionDistance(e){this.raw.normalizedPredictionDistance=e}set numSolverIterations(e){this.raw.numSolverIterations=e}set numInternalPgsIterations(e){this.raw.numInternalPgsIterations=e}set maxCcdSubsteps(e){this.raw.maxCcdSubsteps=e}},BT;(function(e){e[e.Revolute=0]=`Revolute`,e[e.Fixed=1]=`Fixed`,e[e.Prismatic=2]=`Prismatic`,e[e.Rope=3]=`Rope`,e[e.Spring=4]=`Spring`,e[e.Spherical=5]=`Spherical`,e[e.Generic=6]=`Generic`})(BT||={});var VT;(function(e){e[e.AccelerationBased=0]=`AccelerationBased`,e[e.ForceBased=1]=`ForceBased`})(VT||={});var HT;(function(e){e[e.LinX=0]=`LinX`,e[e.LinY=1]=`LinY`,e[e.LinZ=2]=`LinZ`,e[e.AngX=3]=`AngX`,e[e.AngY=4]=`AngY`,e[e.AngZ=5]=`AngZ`})(HT||={});var UT;(function(e){e[e.LinX=1]=`LinX`,e[e.LinY=2]=`LinY`,e[e.LinZ=4]=`LinZ`,e[e.AngX=8]=`AngX`,e[e.AngY=16]=`AngY`,e[e.AngZ=32]=`AngZ`})(UT||={});var WT=class e{constructor(e,t,n){this.rawSet=e,this.bodySet=t,this.handle=n}static newTyped(t,n,r){switch(t.jointType(r)){case ha.Revolute:return new XT(t,n,r);case ha.Prismatic:return new YT(t,n,r);case ha.Fixed:return new KT(t,n,r);case ha.Spring:return new JT(t,n,r);case ha.Rope:return new qT(t,n,r);case ha.Spherical:return new QT(t,n,r);case ha.Generic:return new ZT(t,n,r);default:return new e(t,n,r)}}finalizeDeserialization(e){this.bodySet=e}isValid(){return this.rawSet.contains(this.handle)}body1(){return this.bodySet.get(this.rawSet.jointBodyHandle1(this.handle))}body2(){return this.bodySet.get(this.rawSet.jointBodyHandle2(this.handle))}type(){return this.rawSet.jointType(this.handle)}frameX1(e){return this.rawSet.jointFrameX1(this.handle,Z),$.fromBuffer(Z,e)}frameX2(e){return this.rawSet.jointFrameX2(this.handle,Z),$.fromBuffer(Z,e)}anchor1(e){return this.rawSet.jointAnchor1(this.handle,Z),Q.fromBuffer(Z,e)}anchor2(e){return this.rawSet.jointAnchor2(this.handle,Z),Q.fromBuffer(Z,e)}setAnchor1(e){let t=Q.intoRaw(e);this.rawSet.jointSetAnchor1(this.handle,t),t.free()}setAnchor2(e){let t=Q.intoRaw(e);this.rawSet.jointSetAnchor2(this.handle,t),t.free()}setFrameX1(e){let t=$.intoRaw(e);this.rawSet.jointSetFrameX1(this.handle,t),t.free()}setFrameX2(e){let t=$.intoRaw(e);this.rawSet.jointSetFrameX2(this.handle,t),t.free()}setLocalFrame1(e,t){let n=Q.intoRaw(e),r=$.intoRaw(t);this.rawSet.jointSetLocalFrame1(this.handle,n,r),n.free(),r.free()}setLocalFrame2(e,t){let n=Q.intoRaw(e),r=$.intoRaw(t);this.rawSet.jointSetLocalFrame2(this.handle,n,r),n.free(),r.free()}setContactsEnabled(e){this.rawSet.jointSetContactsEnabled(this.handle,e)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}},GT=class extends WT{limitsEnabled(){return this.rawSet.jointLimitsEnabled(this.handle,this.rawAxis())}limitsMin(){return this.rawSet.jointLimitsMin(this.handle,this.rawAxis())}limitsMax(){return this.rawSet.jointLimitsMax(this.handle,this.rawAxis())}setLimits(e,t){this.rawSet.jointSetLimits(this.handle,this.rawAxis(),e,t)}configureMotorModel(e){this.rawSet.jointConfigureMotorModel(this.handle,this.rawAxis(),e)}setMotorMaxForce(e){this.rawSet.jointSetMotorMaxForce(this.handle,this.rawAxis(),e)}configureMotorVelocity(e,t){this.rawSet.jointConfigureMotorVelocity(this.handle,this.rawAxis(),e,t)}configureMotorPosition(e,t,n){this.rawSet.jointConfigureMotorPosition(this.handle,this.rawAxis(),e,t,n)}configureMotor(e,t,n,r){this.rawSet.jointConfigureMotor(this.handle,this.rawAxis(),e,t,n,r)}},KT=class extends WT{},qT=class extends WT{},JT=class extends WT{},YT=class extends GT{rawAxis(){return ma.LinX}},XT=class extends GT{rawAxis(){return ma.AngX}},ZT=class extends WT{},QT=class extends WT{configureMotorModel(e,t){this.rawSet.jointConfigureMotorModel(this.handle,e,t)}setMotorMaxForce(e,t){this.rawSet.jointSetMotorMaxForce(this.handle,e,t)}configureMotorVelocity(e,t,n){this.rawSet.jointConfigureMotorVelocity(this.handle,e,t,n)}configureMotorPosition(e,t,n,r){this.rawSet.jointConfigureMotorPosition(this.handle,e,t,n,r)}configureMotor(e,t,n,r,i){this.rawSet.jointConfigureMotor(this.handle,e,t,n,r,i)}},$T=class{free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}constructor(e){this.raw=e||new da,this.map=new Tw,e&&e.forEachJointHandle(t=>{this.map.set(t,WT.newTyped(e,null,t))})}finalizeDeserialization(e){this.map.forEach(t=>t.finalizeDeserialization(e))}createJoint(e,t,n,r,i){let a=t.intoRaw(),o=this.raw.createJoint(a,n,r,i);a.free();let s=WT.newTyped(this.raw,e,o);return this.map.set(o,s),s}remove(e,t){this.raw.remove(e,t),this.unmap(e)}forEachJointHandleAttachedToRigidBody(e,t){this.raw.forEachJointAttachedToRigidBody(e,t)}unmap(e){this.map.delete(e)}unmapRemovedJoints(){for(let e of this.map.getAll())this.raw.contains(e.handle)||this.map.delete(e.handle)}len(){return this.map.len()}contains(e){return this.get(e)!=null}get(e){return this.map.get(e)}forEach(e){this.map.forEach(e)}getAll(){return this.map.getAll()}},eE=class e{constructor(e,t){this.rawSet=e,this.handle=t}static newTyped(t,n){switch(t.jointType(n)){case ha.Revolute:return new iE(t,n);case ha.Prismatic:return new rE(t,n);case ha.Fixed:return new nE(t,n);case ha.Spherical:return new aE(t,n);default:return new e(t,n)}}isValid(){return this.rawSet.contains(this.handle)}setContactsEnabled(e){this.rawSet.jointSetContactsEnabled(this.handle,e)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}},tE=class extends eE{},nE=class extends eE{},rE=class extends tE{rawAxis(){return ma.LinX}},iE=class extends tE{rawAxis(){return ma.AngX}},aE=class extends eE{},oE=class{free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}constructor(e){this.raw=e||new _a,this.map=new Tw,e&&e.forEachJointHandle(e=>{this.map.set(e,eE.newTyped(this.raw,e))})}createJoint(e,t,n,r){let i=e.intoRaw(),a=this.raw.createJoint(i,t,n,r);i.free();let o=eE.newTyped(this.raw,a);return this.map.set(a,o),o}remove(e,t){this.raw.remove(e,t),this.map.delete(e)}unmap(e){this.map.delete(e)}unmapRemovedJoints(){for(let e of this.map.getAll())this.raw.contains(e.handle)||this.map.delete(e.handle)}len(){return this.map.len()}contains(e){return this.get(e)!=null}get(e){return this.map.get(e)}forEach(e){this.map.forEach(e)}forEachJointHandleAttachedToRigidBody(e,t){this.raw.forEachJointAttachedToRigidBody(e,t)}getAll(){return this.map.getAll()}},sE;(function(e){e[e.Average=0]=`Average`,e[e.Min=1]=`Min`,e[e.Multiply=2]=`Multiply`,e[e.Max=3]=`Max`})(sE||={});var cE=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e){this.raw=e||new Qi}},lE=class{free(){this.raw&&this.raw.free(),this.raw=void 0}constructor(e){this.raw=e||new pa}forEachActiveRigidBodyHandle(e){this.raw.forEachActiveRigidBodyHandle(e)}},uE=class{free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}constructor(e){this.raw=e||new Pa,this.map=new Tw,e&&e.forEachSoftBodyHandle(t=>{this.map.set(t,new LT(e,null,null,t))})}finalizeDeserialization(e,t){this.map.forEach(n=>n.finalizeDeserialization(e,t))}createSoftBody(e,t,n){let r=n.intoRaw(),i=this.raw.insert(r,e.raw,t.raw);r.free(),e.mapNewBodies(t),t.mapNewColliders(e);let a=new LT(this.raw,e,t,i);return a.userData=n.userData,this.map.set(i,a),a}remove(e,t,n,r,i,a){this.raw.remove(e,t.raw,n.raw,r.raw,i.raw,a.raw),this.map.delete(e),n.unmapRemovedBodies(),r.unmapRemovedColliders(),i.unmapRemovedJoints(),a.unmapRemovedJoints()}addCluster(e,t,n,r){let i=this.raw.addCluster(e,Uint32Array.from(t),n.raw,r.raw);return n.mapNewBodies(r),i===void 0?null:i}removeCluster(e,t,n,r,i,a,o){let s=this.raw.removeCluster(e,t,n.raw,r.raw,i.raw,a.raw,o.raw);return r.unmapRemovedBodies(),i.unmapRemovedColliders(),a.unmapRemovedJoints(),o.unmapRemovedJoints(),s}tear(e,t,n,r,i,a,o,s){let c=this.raw.tear(e,Uint32Array.from(t),Uint32Array.from(n),r.raw,i.raw,a.raw,o.raw,s.raw);return this.finishTopologyChange(c,i,a,o,s)}cut(e,t,n,r,i,a,o){let s=[];for(let e of t)s.push(e.x,e.y),s.push(e.z);let c=this.raw.cut(e,Float32Array.from(s),n.raw,r.raw,i.raw,a.raw,o.raw);return this.finishTopologyChange(c,r,i,a,o)}finishTopologyChange(e,t,n,r,i){return e?(this.mapNewSoftBodies(t,n),t.mapNewBodies(n),n.mapNewColliders(t),t.unmapRemovedBodies(),n.unmapRemovedColliders(),r.unmapRemovedJoints(),i.unmapRemovedJoints(),new RT(e)):null}mapNewSoftBodies(e,t){this.raw.forEachSoftBodyHandle(n=>{this.map.get(n)||this.map.set(n,new LT(this.raw,e,t,n))})}wakeUp(e,t,n){this.raw.wakeUp(e,t.raw,n)}len(){return this.map.len()}contains(e){return this.get(e)!=null}get(e){return this.map.get(e)}forEach(e){this.map.forEach(e)}getAll(){return this.map.getAll()}},dE=new s,fE=new b,pE=class{world;car;constructor(){this.world=new bT({x:0,y:Ii,z:0}),this.world.timestep=Fi,this.car=this.world.createRigidBody(ww.kinematicPositionBased().setTranslation(0,Li,0)),this.buildCar()}buildCar(){let e=e=>e-Li,t=e=>this.world.createCollider(e.setFriction(.9).setRestitution(.02),this.car);t(OT.cuboid(.85,.4,2.05).setTranslation(0,e(.65),.1)),t(OT.cuboid(.75,.29,1.25).setTranslation(0,e(1.34),.65));let n=e(z.topY-.03);t(OT.cuboid(z.halfX,.03,z.halfZ).setTranslation(0,n,z.centerZ));let r=.035;for(let n of[-1,1])t(OT.cuboid(.025,r,z.halfZ).setTranslation(n*(z.halfX-.025),e(z.topY+r),z.centerZ)),t(OT.cuboid(z.halfX,r,.025).setTranslation(0,e(z.topY+r),z.centerZ+n*(z.halfZ-.025)))}setCarPose(e){this.car.setNextKinematicTranslation({x:0,y:Li+e.heave.pos,z:0}),dE.set(e.pitch.pos,0,e.roll.pos,`XYZ`),fE.setFromEuler(dE),this.car.setNextKinematicRotation({x:fE.x,y:fE.y,z:fE.z,w:fE.w})}addItem(e,t,n){let r=ww.dynamic().setTranslation(t.x,t.y,t.z).setRotation({x:n.x,y:n.y,z:n.z,w:n.w}).setCanSleep(!1).setLinearDamping(.05).setAngularDamping(e.angularDamping??.3),i=this.world.createRigidBody(r),a=e.shape,o;return a.type===`box`?o=OT.cuboid(...a.half):a.type===`cylinder`?(o=OT.cylinder(a.halfHeight,a.radius),a.lying&&o.setRotation({x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2})):o=OT.ball(a.radius),o.setMass(e.mass).setFriction(e.friction).setRestitution(e.restitution??.03),this.world.createCollider(o,i),i}removeItem(e){this.world.removeRigidBody(e)}applyFelt(e,t,n){if(t.x!==0||t.z!==0)for(let r of e){let e=r.mass();r.applyImpulse({x:e*t.x*n,y:0,z:e*t.z*n},!0)}}step(){this.world.step()}surfaceBelow(e,t,n){let r=new Ow({x:e,y:t,z:n},{x:0,y:-1,z:0}),i=this.world.castRay(r,t,!0);return i?t-i.timeOfImpact:null}dispose(){this.world.free()}},mE=`mudik-stack.mute`;function hE(){try{return localStorage.getItem(mE)===`1`}catch{return!1}}var gE=class{ctx=null;master=null;noise=null;engine=null;muted=hE();constructor(){let e=()=>this.unlock();window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,e),window.addEventListener(`touchend`,e)}unlock(){if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:.8,this.master.connect(this.ctx.destination);let t=this.ctx.sampleRate*2;this.noise=this.ctx.createBuffer(1,t,this.ctx.sampleRate);let n=this.noise.getChannelData(0);for(let e=0;e<t;e++)n[e]=Math.random()*2-1}this.ctx.state!==`running`&&this.ctx.resume()}toggleMute(){this.muted=!this.muted;try{localStorage.setItem(mE,this.muted?`1`:`0`)}catch{}return this.ctx&&this.master&&this.master.gain.setTargetAtTime(this.muted?0:.8,this.ctx.currentTime,.05),this.muted}ready(){return this.ctx&&this.ctx.state===`running`&&this.master?this.ctx:null}tone(e,t,n,r,i,a){let o=this.ctx,s=o.createOscillator(),c=o.createGain();s.type=e,s.frequency.setValueAtTime(t,r),s.frequency.exponentialRampToValueAtTime(Math.max(1,n),r+i),c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(a,r+.01),c.gain.exponentialRampToValueAtTime(1e-4,r+i),s.connect(c).connect(this.master),s.start(r),s.stop(r+i+.02)}hiss(e,t,n,r,i,a,o){let s=this.ctx,c=s.createBufferSource();c.buffer=this.noise;let l=s.createBiquadFilter();l.type=e,l.frequency.setValueAtTime(t,r),o&&l.frequency.exponentialRampToValueAtTime(o,r+i),l.Q.value=n;let u=s.createGain();u.gain.setValueAtTime(a,r),u.gain.exponentialRampToValueAtTime(1e-4,r+i),c.connect(l).connect(u).connect(this.master),c.start(r,Math.random()),c.stop(r+i+.02)}drive(e,t){let n=this.ready();if(!n)return;if(!this.engine){let e=n.createOscillator();e.type=`sawtooth`;let t=n.createBiquadFilter();t.type=`lowpass`,t.frequency.value=260;let r=n.createGain();r.gain.value=0,e.connect(t).connect(r).connect(this.master),e.start();let i=n.createGain();i.gain.value=0;let a=n.createBufferSource();a.buffer=this.noise,a.loop=!0;let o=n.createBiquadFilter();o.type=`lowpass`,o.frequency.value=500,a.connect(o).connect(i).connect(this.master),a.start(),this.engine={gain:r,osc:e,road:i}}let r=n.currentTime;this.engine.osc.frequency.setTargetAtTime(38+22*e,r,.2),this.engine.gain.gain.setTargetAtTime(t?.05:.02,r,.3),this.engine.road.gain.setTargetAtTime(t?.05*e:.02,r,.3)}land(e,t){let n=this.ready();if(!n)return;let r=n.currentTime,i=Math.min(.5,.08+e*.09);this.tone(`sine`,140,45,r,.22,i),this.hiss(`lowpass`,900,.7,r,.08,i*.6),t===`galon`&&this.tone(`sine`,300,180,r+.02,.25,i*.35),t===`kandang`&&this.cluck(r+.05),t===`tv`&&this.hiss(`bandpass`,2600,4,r,.15,i*.4)}cluck(e){for(let t=0;t<3;t++){let n=e+t*.11+Math.random()*.03;this.tone(`square`,700+Math.random()*300,450,n,.07,.05),this.hiss(`bandpass`,1300,3,n,.05,.06)}}drop(){let e=this.ready();e&&this.hiss(`bandpass`,1400,1.2,e.currentTime,.25,.08,400)}loaded(){let e=this.ready();if(!e)return;let t=e.currentTime;this.tone(`triangle`,880,880,t,.12,.12),this.tone(`triangle`,1320,1320,t+.09,.18,.12)}lost(){let e=this.ready();if(!e)return;let t=e.currentTime;this.tone(`triangle`,520,140,t,.55,.14),this.tone(`sine`,110,40,t+.35,.3,.3),this.hiss(`lowpass`,600,.7,t+.35,.2,.25)}bump(e){let t=this.ready();if(!t)return;let n=t.currentTime;this.tone(`sine`,90,35,n,.2,Math.min(.45,.2*e)),this.hiss(`bandpass`,2200,2,n+.02,.18,.06*e)}horn(){let e=this.ready();if(!e)return;let t=e.currentTime;for(let e of[t,t+.24])this.tone(`square`,415,415,e,.16,.05),this.tone(`square`,523,523,e,.16,.04)}gameOver(){let e=this.ready();if(!e)return;let t=e.currentTime;[392,370,349,294].forEach((e,n)=>this.tone(`triangle`,e,e*.98,t+n*.28,n===3?.7:.26,.13))}arrived(){let e=this.ready();if(!e)return;let t=e.currentTime;[523,659,784,1047].forEach((e,n)=>this.tone(`triangle`,e,e,t+n*.13,n===3?.6:.14,.13))}};function _E(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function vE(e,t,n){return t+(n-t)*e()}function yE(e,t){let n=t.reduce((e,t)=>e+t.weight,0),r=e()*n;for(let e of t)if(r-=e.weight,r<0)return e;return t[t.length-1]}var bE=150;function xE(e){let t=Math.min(1,Math.max(0,e/bE));return t*t*(3-2*t)}var SE=(e,t,n)=>e+(t-e)*n,CE={bump:2.4,pothole:2,curve:1.5,brake:.75};function wE(e,t){let n=xE(t),r=t+SE(5.5,2.4,n)*vE(e,.8,1.2),i=yE(e,[{kind:`bump`,weight:3},{kind:`curve`,weight:2.5},{kind:`brake`,weight:SE(.6,1.6,n)},{kind:`pothole`,weight:SE(.4,1.4,n)}]).kind,a=e()<.5?-1:1,o=vE(e,.85,1.15);switch(i){case`bump`:return{kind:i,at:r,dir:a,strength:SE(.9,1.5,n)*o,duration:0,lead:CE.bump};case`pothole`:return{kind:i,at:r,dir:a,strength:SE(.5,.95,n)*o,duration:0,lead:CE.pothole};case`curve`:return{kind:i,at:r,dir:a,strength:SE(2.6,5.2,n)*o,duration:vE(e,2.6,3.4),lead:CE.curve};case`brake`:return{kind:i,at:r,dir:a,strength:SE(3.5,6.5,n)*o,duration:1.1,lead:CE.brake}}}var TE=.2;function EE(e,t){let n={x:0,z:0,yaw:0,speed:1};for(let r of e){if(r.duration<=0)continue;let e=(t-r.at)/r.duration;if(!(e<0||e>1)){if(r.kind===`curve`){let t=Math.sin(Math.PI*e);n.x+=-r.dir*r.strength*t,n.yaw+=-r.dir*TE*t}else r.kind===`brake`&&(n.z+=e<.5?-r.strength*Math.sin(2*Math.PI*e):.35*r.strength*Math.sin(2*Math.PI*(e-.5)),n.speed-=.45*Math.sin(Math.PI*e))}}return n}function DE(e,t){return t>e.at+e.duration+.5}function OE(){return{phase:`falling`,restTime:0}}function kE(e,t,n){return e.phase===`lost`?null:t.y<z.topY-.45?(e.phase=`lost`,`lost`):e.phase===`falling`&&(t.speed<.25?e.restTime+=n:t.speed>.5&&(e.restTime=0),e.restTime>=1.2)?(e.phase=`loaded`,`loaded`):null}function AE(e){return e.dropped>=3}var jE=[{name:`Cikampek`,km:70},{name:`Subang`,km:130},{name:`Cirebon`,km:220},{name:`Brebes`,km:285},{name:`Tegal`,km:330}];function ME(e){return jE.find(t=>t.km>e)??jE[jE.length-1]}var NE=.75,PE=e=>document.getElementById(e),FE=class{hud=PE(`hud`);menu=PE(`menu`);over=PE(`over`);score=PE(`score`);drops=PE(`drops`);routeNext=PE(`route-next`);routeKm=PE(`route-km`);routeBar=PE(`route-bar`);nextCard=PE(`next`);nextName=PE(`next-name`);nextMass=PE(`next-mass`);nextTimer=PE(`next-timer`);bannerEl=PE(`banner`);toasts=PE(`toasts`);bannerTimer=0;lastKm=-1;lastOver=null;constructor(){this.drops.innerHTML=Array.from({length:3},()=>`<i></i>`).join(``),PE(`route-total`).textContent=`Jakarta → ${jE[jE.length-1].name}`,PE(`share-score`).addEventListener(`click`,()=>this.shareResult())}onStart(e){PE(`start`).addEventListener(`click`,e),PE(`restart`).addEventListener(`click`,e)}showMenu(e){this.menu.hidden=!1,this.over.hidden=!0,this.hud.hidden=!0,PE(`best`).textContent=e>0?`Rekor kamu: ${e}`:``}showPlaying(){this.menu.hidden=!0,this.over.hidden=!0,this.hud.hidden=!1,this.toasts.innerHTML=``,this.lastKm=-1}showOver(e,t,n,r,i){this.over.hidden=!1,this.lastOver={score:n,km:Math.floor(r),best:i},PE(`over-title`).textContent=e,PE(`over-sub`).textContent=t,PE(`over-score`).textContent=String(n),PE(`over-km`).textContent=`${Math.floor(r)} km`,PE(`over-best`).textContent=String(i)}shareResult(){if(!this.lastOver)return;let e=`🚗 REKOR MUATAN MUDIK STACK 🚗\n📦 Barang Terangkut: ${this.lastOver.score} kardus & barang\n🛣️ Jarak Tempuh: ${this.lastOver.km} km perjalanan mudik\n🏆 Rekor Terbaik: ${this.lastOver.best}\n\nBisa tumpuk barang mudik di atap mobil lebih tinggi tanpa jatuh?\n👉 https://lwn2210.github.io/mini-arcade/mudik-stack/`,t=PE(`share-score`);navigator.share?navigator.share({title:`Rekor Mudik Stack!`,text:e,url:`https://lwn2210.github.io/mini-arcade/mudik-stack/`}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(e).then(()=>{let e=t.textContent;t.textContent=`✅ Hasil disalin ke clipboard!`,setTimeout(()=>t.textContent=e,2500)}).catch(()=>{window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(e)}`,`_blank`)}):window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(e)}`,`_blank`)}get playing(){return!this.hud.hidden&&this.over.hidden}setScore(e,t){this.score.textContent=String(e),this.drops.querySelectorAll(`i`).forEach((e,n)=>e.classList.toggle(`on`,n<t))}setRoute(e){let t=Math.floor(e);if(t===this.lastKm)return;this.lastKm=t;let n=ME(e);this.routeNext.textContent=n.name,this.routeKm.textContent=`${Math.max(0,Math.ceil(n.km-e))} km`,this.routeBar.style.width=`${Math.min(100,e/jE[jE.length-1].km*100)}%`}setNext(e,t=0){this.nextCard.style.visibility=e?`visible`:`hidden`,e&&(this.nextName.textContent=e,this.nextMass.textContent=`${t} kg`)}setTimer(e){this.nextTimer.style.width=`${Math.max(0,Math.min(1,e))*100}%`}banner(e,t){this.bannerEl.textContent=e,this.bannerEl.classList.add(`show`),clearTimeout(this.bannerTimer),this.bannerTimer=window.setTimeout(()=>this.bannerEl.classList.remove(`show`),t*1e3)}toast(e,t=!1){let n=document.createElement(`div`);n.className=t?`toast bad`:`toast`,n.textContent=e,this.toasts.appendChild(n),setTimeout(()=>n.remove(),1300)}},IE=new e;function LE(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;IE.copy(t),IE[r]=0,IE.normalize();let l=.5*o/(o+s),u=1-IE.angleTo(e)/c;return Math.sign(IE[n])===1?u*l:s/(o+s)+l+l*(1-u)}var RE=class t extends Ue{constructor(t=1,n=1,r=1,i=2,a=.1){let o=i*2+1;if(a=Math.min(t/2,n/2,r/2,a),super(1,1,1,o,o,o),this.type=`RoundedBoxGeometry`,this.parameters={width:t,height:n,depth:r,segments:i,radius:a},o===1)return;let s=this.toNonIndexed();this.index=null,this.attributes.position=s.attributes.position,this.attributes.normal=s.attributes.normal,this.attributes.uv=s.attributes.uv;let c=new e,l=new e,u=new e(t,n,r).divideScalar(2).subScalar(a),d=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,m=d.length/6,h=new e,g=.5/o;for(let e=0,i=0;e<d.length;e+=3,i+=2)switch(c.fromArray(d,e),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[e+0]=u.x*Math.sign(c.x)+l.x*a,d[e+1]=u.y*Math.sign(c.y)+l.y*a,d[e+2]=u.z*Math.sign(c.z)+l.z*a,f[e+0]=l.x,f[e+1]=l.y,f[e+2]=l.z,Math.floor(e/m)){case 0:h.set(1,0,0),p[i+0]=LE(h,l,`z`,`y`,a,r),p[i+1]=1-LE(h,l,`y`,`z`,a,n);break;case 1:h.set(-1,0,0),p[i+0]=1-LE(h,l,`z`,`y`,a,r),p[i+1]=1-LE(h,l,`y`,`z`,a,n);break;case 2:h.set(0,1,0),p[i+0]=1-LE(h,l,`x`,`z`,a,t),p[i+1]=LE(h,l,`z`,`x`,a,r);break;case 3:h.set(0,-1,0),p[i+0]=1-LE(h,l,`x`,`z`,a,t),p[i+1]=1-LE(h,l,`z`,`x`,a,r);break;case 4:h.set(0,0,1),p[i+0]=1-LE(h,l,`x`,`y`,a,t),p[i+1]=1-LE(h,l,`y`,`x`,a,n);break;case 5:h.set(0,0,-1),p[i+0]=LE(h,l,`x`,`y`,a,t),p[i+1]=1-LE(h,l,`y`,`x`,a,n)}}static fromJSON(e){return new t(e.width,e.height,e.depth,e.segments,e.radius)}},zE=e=>new pe({roughness:.8,...e});function BE(){let e=Wi(`kardus-side`,256,160,(e,t,n)=>{e.fillStyle=`#c89356`,e.fillRect(0,0,t,n),Gi(e,t,n,400,.12),e.fillStyle=`#d63a2a`,e.fillRect(18,38,t-36,64),Ki(e,`MI GORENG`,t/2,72,40,`#fff6d8`),Ki(e,`isi 40 bungkus`,t/2,126,20,`#6b4423`,600)}),t=Wi(`kardus-top`,256,180,(e,t,n)=>{e.fillStyle=`#c89356`,e.fillRect(0,0,t,n),Gi(e,t,n,400,.12),e.fillStyle=`rgba(214, 190, 140, 0.85)`,e.fillRect(0,n/2-16,t,32),e.strokeStyle=`rgba(90, 60, 30, 0.5)`,e.beginPath(),e.moveTo(0,n/2),e.lineTo(t,n/2),e.stroke()}),n=zE({map:e}),r=zE({map:t});return[n,n,r,r,n,n]}function VE(){return Wi(`karung`,256,256,(e,t,n)=>{e.fillStyle=`#ece8dc`,e.fillRect(0,0,t,n),e.strokeStyle=`rgba(150, 140, 120, 0.35)`;for(let r=0;r<t;r+=4)e.beginPath(),e.moveTo(r,0),e.lineTo(r,n),e.stroke(),e.beginPath(),e.moveTo(0,r),e.lineTo(t,r),e.stroke();Ki(e,`BERAS`,t/2,n/2-22,54,`#2f8a3c`),Ki(e,`25 kg`,t/2,n/2+30,34,`#c23b2b`)})}function HE(e,t,n,r){return Wi(e,256,64,(e,i,a)=>{let o=i/r;for(let i=0;i<r;i++)e.fillStyle=i%2?t:n,e.fillRect(i*o,0,o,a);Gi(e,i,a,200,.08)})}function UE(){return Wi(`anyaman`,128,128,(e,t,n)=>{e.clearRect(0,0,t,n),e.strokeStyle=`#b8894a`,e.lineWidth=7;for(let r=8;r<t;r+=20)e.beginPath(),e.moveTo(r,0),e.lineTo(r,n),e.stroke(),e.beginPath(),e.moveTo(0,r),e.lineTo(t,r),e.stroke()})}function WE(){let e=new m,t=zE({color:`#f4efe6`}),n=new M(new h(.12,14,10),t);n.scale.set(1.25,.95,.9),n.position.y=-.06;let r=new M(new h(.06,12,8),t);r.position.set(.13,.06,0);let i=new M(new Ue(.06,.04,.015),zE({color:`#d8262a`}));i.position.set(.14,.12,0);let a=new M(new ke(.02,.05,6),zE({color:`#f2b21b`}));return a.rotation.z=-Math.PI/2,a.position.set(.2,.06,0),e.add(n,r,i,a),e}function GE(t){let n=new dt(t,2),r=n.attributes.position,i=new e;for(let e=0;e<r.count;e++){i.fromBufferAttribute(r,e);let t=1+.16*Math.max(0,Math.sin(i.x*61)*Math.sin(i.y*53)*Math.sin(i.z*47));i.multiplyScalar(t),r.setXYZ(e,i.x,i.y,i.z)}return n.computeVertexNormals(),n}var KE=[`#c0392b`,`#2c3e50`,`#7d3c98`,`#138d75`,`#d35400`];function qE(e){let t=e.shape,r;switch(e.id){case`kardus`:{let[e,n,i]=t.type===`box`?t.half:[.25,.15,.2];r=new M(new Ue(e*2,n*2,i*2),BE());break}case`koper`:{let[e,n,i]=t.type===`box`?t.half:[.3,.12,.2],a=KE[Math.floor(Math.random()*KE.length)],o=new m,s=new M(new RE(e*2,n*2,i*2,3,.05),zE({color:a,roughness:.45})),c=new M(new Ue(.16,.03,.03),zE({color:`#222`}));c.position.set(0,n+.012,0);let l=new M(new Ue(e*2+.01,n*2+.01,.03),zE({color:`#f1c40f`}));o.add(s,c,l),r=o;break}case`karung`:{let[e,n,i]=t.type===`box`?t.half:[.25,.12,.35];r=new M(new RE(e*2,n*2,i*2,4,.09),zE({map:VE()}));break}case`galon`:{let e=t.type===`cylinder`?t.radius:.14,n=t.type===`cylinder`?t.halfHeight:.24,i=new m,a=new M(new lt(e,e,n*2-.06,24),new Oe({color:`#58b4f0`,roughness:.08,metalness:0,transparent:!0,opacity:.62,clearcoat:1}));a.position.y=-.03;let o=new M(new lt(.05,e,.06,24),a.material);o.position.y=n-.03;let s=new M(new lt(.04,.04,.035,16),zE({color:`#1f5fbf`,roughness:.4}));s.position.y=n+.015;let c=new M(new lt(e+.003,e+.003,.1,24,1,!0),zE({color:`#e8f4ff`}));c.position.y=-.02,i.add(a,o,s,c),r=i;break}case`kasur`:{let e=t.type===`cylinder`?t.radius:.2,i=t.type===`cylinder`?t.halfHeight:.6,a=new m,o=HE(`kasur`,`#f3a7b7`,`#fdf3f0`,18),s=new M(new lt(e,e,i*2,24),zE({map:o}));s.rotation.z=Math.PI/2,a.add(s);for(let t of[-i*.55,i*.55]){let r=new M(new n(e+.004,.012,6,24),zE({color:`#e03a2f`}));r.rotation.y=Math.PI/2,r.position.x=t,a.add(r)}r=a;break}case`kandang`:{let[e,n,i]=t.type===`box`?t.half:[.3,.22,.22],a=new m,o=new M(new Ue(e*2,n*2,i*2),zE({map:UE(),transparent:!0,alphaTest:.4,side:2})),s=new M(new Ue(e*2,.02,i*2),zE({color:`#8d6236`}));s.position.y=-n+.01;let c=WE();c.position.y=-.04,a.add(o,s,c),r=a;break}case`tv`:{let[e,n,i]=t.type===`box`?t.half:[.26,.22,.24],a=new m,o=new M(new RE(e*2,n*2,i*2,3,.03),zE({color:`#6b5a48`,roughness:.6})),s=new M(new c(e*1.45,n*1.4),zE({color:`#1b2a2f`,roughness:.15,metalness:.2}));s.position.set(-e*.15,0,i+.002),a.add(o,s);for(let e of[-1,1]){let t=new M(new lt(.004,.004,.3,4),zE({color:`#bbb`,metalness:.8}));t.position.set(e*.06,n+.13,0),t.rotation.z=e*-.45,a.add(t)}r=a;break}case`tikar`:{let e=t.type===`cylinder`?t.radius:.08,n=t.type===`cylinder`?t.halfHeight:.55,i=new M(new lt(e,e,n*2,18),zE({map:HE(`tikar`,`#d8b45c`,`#7aa64a`,10)}));i.rotation.z=Math.PI/2,r=i;break}case`durian`:{let e=t.type===`ball`?t.radius:.17,n=new m,i=new M(GE(e*.92),zE({color:`#8c9a3a`,flatShading:!0})),a=new M(new lt(.015,.02,.07,6),zE({color:`#5b4a2a`}));a.position.y=e,n.add(i,a),r=n;break}default:r=new M(new Ue(.4,.3,.4),zE({color:`#999`}))}return r.traverse(e=>{e instanceof M&&(e.castShadow=!0,e.receiveShadow=!0)}),r}var JE=[{id:`kardus`,name:`Kardus Mi`,mass:6,friction:.8,weight:3,shape:{type:`box`,half:[.27,.16,.19]}},{id:`koper`,name:`Koper`,mass:9,friction:.6,weight:2,shape:{type:`box`,half:[.31,.13,.21]}},{id:`karung`,name:`Karung Beras`,mass:20,friction:1,weight:2,shape:{type:`box`,half:[.25,.12,.36]}},{id:`galon`,name:`Galon`,mass:19,friction:.5,weight:1.5,shape:{type:`cylinder`,radius:.14,halfHeight:.24,lying:!1}},{id:`kasur`,name:`Kasur Gulung`,mass:7,friction:.9,weight:1.5,shape:{type:`cylinder`,radius:.2,halfHeight:.62,lying:!0}},{id:`kandang`,name:`Kandang Ayam`,mass:4,friction:.7,weight:1.4,restitution:.15,shape:{type:`box`,half:[.3,.22,.22]}},{id:`tv`,name:`TV Tabung`,mass:14,friction:.7,weight:.8,shape:{type:`box`,half:[.26,.22,.24]}},{id:`tikar`,name:`Tikar`,mass:2,friction:.8,weight:1,shape:{type:`cylinder`,radius:.08,halfHeight:.55,lying:!0}},{id:`durian`,name:`Durian`,mass:2.5,friction:1,weight:.6,angularDamping:3,shape:{type:`ball`,radius:.17}}];function YE(e,t){let{x:n,y:r,z:i,w:a}=t,o=2*(n*r+a*i),s=1-2*(n*n+i*i),c=2*(r*i-a*n);switch(e.type){case`box`:{let[t,n,r]=e.half;return Math.abs(o)*t+Math.abs(s)*n+Math.abs(c)*r}case`cylinder`:{let t=e.lying?o:s;return Math.abs(t)*e.halfHeight+Math.sqrt(Math.max(0,1-t*t))*e.radius}case`ball`:return e.radius}}var XE=3.6,ZE=XE/2,QE=XE,$E=-260,eD=30,tD=290,nD=330,rD=8,iD=e=>new pe({roughness:.85,...e});function aD(){let e=Wi(`jalan`,512,512,(e,t,n)=>{e.fillStyle=`#4a4c50`,e.fillRect(0,0,t,n),Gi(e,t,n,5e3,.18);let r=e=>(e+QE)/(QE*2)*t;e.fillStyle=`#ecebe4`,e.fillRect(r(-3.4),0,10,n),e.fillRect(r(3.4)-10,0,10,n),e.fillRect(r(0)-6,0,12,3/rD*n)});return e.wrapS=Ce,e.wrapT=st,e.repeat.set(1,nD/rD),e}function oD(){let e=Wi(`sawah`,256,256,(e,t,n)=>{e.fillStyle=`#6fa63a`,e.fillRect(0,0,t,n);for(let r=0;r<n;r+=8)e.fillStyle=r%16?`rgba(40, 90, 20, 0.22)`:`rgba(170, 210, 90, 0.18)`,e.fillRect(0,r,t,4);e.fillStyle=`rgba(120, 95, 50, 0.55)`,e.fillRect(0,0,t,5),e.fillRect(0,0,5,n),Gi(e,t,n,1500,.1)});return e.wrapS=st,e.wrapT=st,e.repeat.set(30,nD/12),e}function sD(){let t=new m,n=6+Math.random()*4,r=(Math.random()-.5)*.25,i=new M(new lt(.14,.22,n,7),iD({color:`#8a6d4b`}));i.position.y=n/2,i.rotation.z=r,i.castShadow=!0,t.add(i);let a=new e(-Math.sin(r)*n,n,0),o=iD({color:`#3f8a2c`,side:2});for(let e=0;e<8;e++){let n=new M(new c(.6,3.2),o);n.position.copy(a),n.rotation.set(-1-Math.random()*.4,e/8*Math.PI*2,0,`YXZ`),n.translateY(1.4),t.add(n)}return t}function cD(){let e=new m,t=[`#f1e3c6`,`#dfe9e1`,`#f5d0a9`,`#e8e2f0`],n=6+Math.random()*3,r=5+Math.random()*2,i=new M(new Ue(n,3,r),iD({color:t[Math.floor(Math.random()*t.length)]}));i.position.y=1.5;let a=new M(new ke(Math.hypot(n,r)/2+.4,2.2,4),iD({color:`#b5502c`}));return a.rotation.y=Math.PI/4,a.scale.set(n/Math.hypot(n,r),1,r/Math.hypot(n,r)),a.position.y=4.1,i.castShadow=a.castShadow=!0,e.add(i,a),e}function lD(){let e=new m,t=new M(new Ue(7,3.2,5),iD({color:`#fdf7e2`}));t.position.y=1.6;let n=new M(new ke(5.5,1.8,4),iD({color:`#1b5e20`}));n.rotation.y=Math.PI/4,n.scale.set(7/7.8,1,5/7.8),n.position.y=4.1;let r=Wi(`warteg-banner`,256,64,(e,t,n)=>{e.fillStyle=`#ffeb3b`,e.fillRect(0,0,t,n),e.strokeStyle=`#c62828`,e.lineWidth=4,e.strokeRect(2,2,t-4,n-4),Ki(e,`WARTEG BAHARI`,t/2,n/2-5,24,`#c62828`,800),Ki(e,`SEDIA NASI LENGKO & ES TEH`,t/2,n/2+16,12,`#1b5e20`,700)}),i=new M(new c(5.5,1.3),iD({map:r}));return i.position.set(0,2.1,2.52),t.castShadow=n.castShadow=!0,e.add(t,n,i),e}function uD(e,t,n){let r=new m,i=Wi(`bb-${e}`,512,256,(r,i,a)=>{r.fillStyle=n,r.fillRect(0,0,i,a),r.strokeStyle=`#fff`,r.lineWidth=10,r.strokeRect(10,10,i-20,a-20),Ki(r,e,i/2,a/2-22,72,`#fff`),Ki(r,t,i/2,a/2+52,34,`#fff3c4`,600)}),a=new M(new c(6,3),iD({map:i,side:2}));a.position.y=5,a.rotation.y=.5,r.add(a);for(let e of[-2.2,2.2]){let t=new M(new lt(.1,.1,4,6),iD({color:`#666`}));t.position.set(e*Math.cos(.5),2,-e*Math.sin(.5)),r.add(t)}return r}function dD(){let e=new m,t=new M(new lt(.1,.14,9,6),iD({color:`#9a9a96`}));t.position.y=4.5;let n=new M(new Ue(1.6,.1,.1),iD({color:`#555`}));return n.position.y=8.4,t.castShadow=!0,e.add(t,n),e}function fD(){let e=Wi(`polisi-tidur`,256,32,(e,t,n)=>{for(let r=0;r<16;r++)e.fillStyle=r%2?`#141414`:`#f2c21b`,e.fillRect(r*t/16,0,t/16,n)}),t=new M(new Ue(QE*2,.08,.5),iD({map:e}));return t.position.set(ZE,.04,0),t.receiveShadow=!0,t}function pD(){let e=new M(new ye(.5,16),iD({color:`#26272a`,roughness:1}));return e.rotation.x=-Math.PI/2,e.scale.set(1,.7,1),e}var mD=class{trafficModels;group=new m;road;field;props=[];obstacles=[];traffic=[];trafficTimer=3;constructor(e,t){this.trafficModels=t,e.add(this.group),this.road=aD(),this.field=oD();let n=new M(new c(QE*2,nD),iD({map:this.road,roughness:.92}));n.rotation.x=-Math.PI/2,n.position.set(ZE,.01,-115),n.receiveShadow=!0;let r=iD({color:`#a38b62`});for(let e of[-1,1]){let t=new M(new c(2.4,nD),r);t.rotation.x=-Math.PI/2,t.position.set(ZE+e*4.8,.005,n.position.z),t.receiveShadow=!0,this.group.add(t)}let i=new M(new c(360,nD),iD({map:this.field}));i.rotation.x=-Math.PI/2,i.position.set(0,0,n.position.z),i.receiveShadow=!0,this.group.add(n,i),this.scatter(sD,16,()=>Math.random()<.5?-7-Math.random()*6:10+Math.random()*10),this.scatter(cD,4,()=>Math.random()<.5?-16-Math.random()*10:20+Math.random()*12),this.scatter(lD,3,()=>Math.random()<.5?-14-Math.random()*6:16+Math.random()*8),this.scatter(dD,7,()=>-4.6,!0),this.scatter(()=>uD(`SELAMAT MUDIK`,`Hati-hati di jalan, ya!`,`#1f7a4d`),1,()=>-9),this.scatter(()=>uD(`POSKO MUDIK`,`Istirahat dulu 500 m`,`#c0392b`),1,()=>12);let a=new m,o=iD({color:`#7d9db5`,roughness:1,flatShading:!0});for(let e=0;e<9;e++){let t=40+Math.random()*60,n=new M(new ke(70+Math.random()*60,t,6),o);n.position.set(-280+e*70+Math.random()*30,t/2-4,-340-Math.random()*60),a.add(n)}e.add(a)}scatter(e,t,n,r=!1){for(let i=0;i<t;i++){let a=e(),o=r?$E+i/t*tD:$E+Math.random()*tD;a.position.set(n(),0,o),a.rotation.y+=Math.random()*.3,this.group.add(a),this.props.push({obj:a})}}addObstacle(e,t,n,r){let i=e===`bump`?fD():pD();e===`pothole`&&i.position.set(n*.78,.015,0),i.position.z=-t,this.group.add(i),this.obstacles.push({mesh:i,onMove:r})}carry(e){this.group.attach(e),this.obstacles.push({mesh:e,onMove:()=>!1})}update(e,t,n){this.group.rotation.y=n;let r=t*e;this.road.offset.y=(this.road.offset.y+r/rD)%1,this.field.offset.y=(this.field.offset.y+r/12)%1;for(let e of this.props)e.obj.position.z+=r,e.obj.position.z>eD&&(e.obj.position.z-=tD);for(let e=this.obstacles.length-1;e>=0;e--){let t=this.obstacles[e];t.mesh.position.z+=r,(t.onMove(t.mesh.position.z)||t.mesh.position.z>eD)&&(this.group.remove(t.mesh),this.obstacles.splice(e,1))}if(this.trafficTimer-=e,this.trafficTimer<=0){this.trafficTimer=5+Math.random()*7;let e=this.trafficModels[Math.floor(Math.random()*this.trafficModels.length)];if(!e)return;let t=e.clone(!0);t.position.set(3.6,0,$E),this.group.add(t),this.traffic.push(t)}for(let t=this.traffic.length-1;t>=0;t--){let n=this.traffic[t];n.position.z+=r+15*e,n.position.z>40&&(this.group.remove(n),this.traffic.splice(t,1))}}clearObstacles(){for(let e of this.obstacles)this.group.remove(e.mesh);this.obstacles.length=0}},hD={heave:170,pitch:130,roll:120},gD={heave:11,pitch:9,roll:9},_D=.012;function vD(){return{heave:{pos:0,vel:0},pitch:{pos:0,vel:0},roll:{pos:0,vel:0}}}function yD(e,t,n,r,i){let a=-n*(e.pos-t)-r*e.vel;e.vel+=a*i,e.pos+=e.vel*i}function bD(e,t,n){yD(e.heave,0,hD.heave,gD.heave,n),yD(e.pitch,_D*t.z,hD.pitch,gD.pitch,n),yD(e.roll,-.012*t.x,hD.roll,gD.roll,n)}function xD(e,t,n){e.heave.vel+=.8*n,e.pitch.vel+=(t===`front`?1:-1)*.6*n}function SD(e,t,n){e.heave.vel-=.3*n,e.roll.vel+=-t*.9*n}var CD=`mudik-stack.best`,wD=jE[jE.length-1].km,TD=(e,t,n)=>e+(t-e)*n,ED=e=>2*Math.abs((e%2+2)%2-1)-1;function DD(){try{return Number(localStorage.getItem(CD))||0}catch{return 0}}function OD(e){try{localStorage.setItem(CD,String(e))}catch{}}function kD(){let e=new Fe({side:1,depthWrite:!1,fog:!1,uniforms:{top:{value:new Ge(`#4f9be0`)},bottom:{value:new Ge(`#d7ecf6`)}},vertexShader:`varying vec3 vPos; void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform vec3 top; uniform vec3 bottom; varying vec3 vPos; void main() { float h = clamp(normalize(vPos).y * 2.2, 0.0, 1.0); gl_FragColor = vec4(mix(bottom, top, h), 1.0); }`});return new M(new h(500,24,12),e)}var AD=class{renderer;scene=new t;camera=new k(45,1,.1,900);car;scenery;hud=new FE;sfx=new gE;marker;dropLine;cargo=new pE;phase=`menu`;rng=_E(1);susp=vD();time=0;pending=null;active=[];felt={x:0,z:0,yaw:0,speed:1};items=[];debris=[];hover=null;spawnDelay=0;nextAxis=`x`;stats={loaded:0,dropped:0,km:0};best=DD();stackTop=z.topY;focusY=2;accumulator=0;last=performance.now();overTimer=-1;arrived=!1;constructor(t,n){this.renderer=new Mi({canvas:t,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.05,this.scene.fog=new x(`#d7ecf6`,70,300);let r=new Rt(this.renderer);this.scene.environment=r.fromScene(new Ni,.04).texture,this.scene.environmentIntensity=.55,this.scene.add(kD()),this.scene.add(new D(`#cfe8ff`,`#6c8a3a`,1.1));let i=new l(`#fff4dc`,2.4);i.position.set(-6,12,4),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),Object.assign(i.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:1,far:40}),i.shadow.bias=-5e-4,this.scene.add(i,i.target),this.scenery=new mD(this.scene,n.traffic),this.car=new Ji(n.car),this.scene.add(this.car.root),this.marker=new M(new a(.1,.16,24),new Te({color:`#2f9e5b`,transparent:!0,opacity:.85,depthTest:!1})),this.marker.rotation.x=-Math.PI/2,this.marker.renderOrder=10,this.marker.visible=!1,this.scene.add(this.marker),this.dropLine=new oe(new _e().setFromPoints([new e,new e]),new le({color:`#ffffff`,transparent:!0,opacity:.7,depthTest:!1})),this.dropLine.renderOrder=10,this.dropLine.visible=!1,this.scene.add(this.dropLine),this.hud.onStart(()=>this.start()),this.hud.showMenu(this.best),this.bindInput(t),window.addEventListener(`resize`,()=>this.resize()),this.resize(),this.renderer.setAnimationLoop(()=>this.frame())}bindInput(e){e.addEventListener(`pointerdown`,()=>this.drop());let t=document.getElementById(`mute`),n=()=>t.textContent=this.sfx.muted?`🔇`:`🔊`;n(),t.addEventListener(`click`,()=>{this.sfx.toggleMute(),n()}),window.addEventListener(`keydown`,e=>{e.code===`KeyM`?(this.sfx.toggleMute(),n()):(e.code===`Space`||e.code===`Enter`)&&(e.preventDefault(),e.repeat||(this.phase===`playing`?this.drop():this.overTimer<0&&this.start()))})}resize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.fov=e/t<1?62:45,this.camera.updateProjectionMatrix()}start(){this.reset(),this.phase=`playing`,this.hud.showPlaying(),this.hud.setScore(0,0),this.hud.setRoute(0),this.spawnDelay=.4}reset(){for(let e of this.items)this.scene.remove(e.mesh);for(let e of this.debris)e.mesh.removeFromParent();this.hover&&this.scene.remove(this.hover.mesh),this.cargo.dispose(),this.cargo=new pE,this.scenery.clearObstacles(),this.items=[],this.debris=[],this.hover=null,this.rng=_E(Math.random()*2**32>>>0),this.susp=vD(),this.time=0,this.pending=wE(this.rng,2),this.active=[],this.stats={loaded:0,dropped:0,km:0},this.stackTop=z.topY,this.overTimer=-1}frame(){let e=performance.now(),t=Math.min(.1,(e-this.last)/1e3);for(this.last=e,this.accumulator+=t;this.accumulator>=Fi;)this.fixedStep(),this.accumulator-=Fi;this.syncVisuals(t),this.renderer.render(this.scene,this.camera)}fixedStep(){let e=Fi;if(this.phase===`menu`){this.scenery.update(e,16,0),bD(this.susp,{x:0,z:0},e);return}this.time+=e,this.scheduleEvents(),this.felt=EE(this.active,this.time),this.active=this.active.filter(e=>!DE(e,this.time));let t=16*this.felt.speed;this.scenery.update(e,t,this.felt.yaw),bD(this.susp,this.felt,e),this.cargo.setCarPose(this.susp),this.cargo.applyFelt(this.items.map(e=>e.body),this.felt,e),this.cargo.step(),this.trackCargo(e),this.stepDebris(e,t),this.phase===`playing`?(this.stepHover(e),this.stats.km+=NE*this.felt.speed*e,AE(this.stats)?this.finish(!1):this.stats.km>=wD&&this.finish(!0)):this.overTimer>0&&(this.overTimer-=e,this.overTimer<=0&&this.showResult())}scheduleEvents(){for(;this.pending&&this.time>=this.pending.at-this.pending.lead;)this.announce(this.pending),this.active.push(this.pending),this.pending=wE(this.rng,this.pending.at)}announce(e){let t=this.susp;if(e.kind===`bump`||e.kind===`pothole`){let n=16*e.lead-Ri.front,r=!1,i=!1;this.scenery.addObstacle(e.kind,n,e.dir,n=>{let a=n=>{e.kind===`bump`?xD(t,n,e.strength):SD(t,e.dir,e.strength*(n===`front`?1:.8)),this.sfx.bump(e.kind===`bump`?e.strength:e.strength*1.4)};return!r&&n>=Ri.front&&(r=!0,a(`front`)),!i&&n>=Ri.rear&&(i=!0,a(`rear`)),!1}),this.say(e.kind===`bump`?`Polisi tidur!`:`Lubang di ${e.dir<0?`kiri`:`kanan`}!`,e.lead)}else e.kind===`curve`?this.say(e.dir<0?`⟵ Tikungan kiri`:`Tikungan kanan ⟶`,e.lead+e.duration*.6):(this.say(`Motor nyelonong! Rem!`,e.lead+e.duration*.5),this.phase===`playing`&&this.sfx.horn())}say(e,t){this.phase===`playing`&&this.hud.banner(e,t)}trackCargo(e){let t=z.topY;for(let n=this.items.length-1;n>=0;n--){let r=this.items[n],i=r.body.translation(),a=r.body.linvel(),o=Math.hypot(a.x,a.y,a.z);r.lastVy<-1.2&&a.y>r.lastVy+1&&this.sfx.land(-r.lastVy,r.kind.id),r.lastVy=a.y;let s=kE(r.track,{y:i.y,speed:o},e);if(s===`loaded`&&this.phase===`playing`)this.stats.loaded++,this.hud.setScore(this.stats.loaded,this.stats.dropped),this.hud.toast(`+1 ${r.kind.name}`),this.sfx.loaded();else if(s===`lost`){this.phase===`playing`&&(this.stats.dropped++,this.hud.setScore(this.stats.loaded,this.stats.dropped),this.hud.toast(`${r.kind.name} jatuh!`,!0),this.sfx.lost()),this.toDebris(r),this.items.splice(n,1);continue}o<.6&&(t=Math.max(t,i.y+YE(r.kind.shape,r.body.rotation())))}this.stackTop=t}toDebris(t){let n=t.body.linvel(),r=t.body.angvel();this.cargo.removeItem(t.body),this.debris.push({mesh:t.mesh,vel:new e(n.x,n.y,n.z),spin:new e(r.x,r.y,r.z)})}stepDebris(e,t){for(let n=this.debris.length-1;n>=0;n--){let r=this.debris[n];r.vel.y-=9.81*e,r.vel.z+=(t-r.vel.z)*Math.min(1,e*1.5),r.mesh.position.addScaledVector(r.vel,e),r.mesh.rotation.x+=r.spin.x*e,r.mesh.rotation.z+=r.spin.z*e,r.mesh.position.y<=.2&&(r.mesh.position.y=.2,this.scenery.carry(r.mesh),this.debris.splice(n,1))}}stepHover(e){if(!this.hover){this.spawnDelay-=e,this.spawnDelay<=0&&this.spawnHover();return}let t=this.hover;t.age+=e;let n=xE(this.time),r=t.axis===`x`?Hi.x:Hi.z;t.phase+=TD(.75,1.5,n)/r*e,this.hud.setTimer(1-t.age/t.limit),t.age>=t.limit&&this.drop()}spawnHover(){let t=yE(this.rng,JE),n=qE(t),r=new b().setFromAxisAngle(new e(0,1,0),this.rng()<.5?0:Math.PI/2),i=this.nextAxis;this.nextAxis=i===`x`?`z`:`x`,this.hover={kind:t,mesh:n,rot:r,axis:i,phase:this.rng()*2,offset:(this.rng()-.5)*.5,age:0,limit:TD(Vi,2.8,xE(this.time))},n.quaternion.copy(r),n.position.copy(this.hoverPosition(this.hover)),this.scene.add(n),this.hud.setNext(t.name,t.mass)}hoverPosition(t){let n=this.stackTop+Bi+YE(t.kind.shape,t.rot),r=ED(t.phase);return t.axis===`x`?new e(r*Hi.x,n,z.centerZ+t.offset):new e(t.offset,n,z.centerZ+r*Hi.z)}drop(){if(this.phase!==`playing`||!this.hover)return;let e=this.hover,t=this.cargo.addItem(e.kind,e.mesh.position,e.rot);this.items.push({kind:e.kind,body:t,mesh:e.mesh,track:OE(),lastVy:0}),this.sfx.drop(),this.hover=null,this.spawnDelay=.8,this.hud.setNext(null),this.marker.visible=!1,this.dropLine.visible=!1}finish(e){this.phase=`over`,this.hover&&=(this.scene.remove(this.hover.mesh),null),this.marker.visible=!1,this.dropLine.visible=!1,this.hud.setNext(null),this.hud.banner(``,0),this.arrived=e,this.overTimer=1.2}showResult(){let e=this.stats.loaded;e>this.best&&(this.best=e,OD(e));let t=this.items.filter(e=>e.track.phase===`loaded`).length;if(this.arrived?this.sfx.arrived():this.sfx.gameOver(),this.arrived)this.hud.showOver(`Sampai kampung!`,`${t} barang selamat sampai rumah Emak.`,e,this.stats.km,this.best);else{let t=[`Emak udah nelpon terus…`,`Barangnya dipungut orang di jalan.`,`Mending naik bus aja tahun depan.`];this.hud.showOver(`3 barang jatuh!`,t[Math.floor(Math.random()*t.length)],e,this.stats.km,this.best)}this.overTimer=-1}syncVisuals(e){this.car.update(this.susp,16*this.felt.speed,zi,e),this.sfx.drive(this.felt.speed,this.phase===`playing`);for(let e of this.items){let t=e.body.translation(),n=e.body.rotation();e.mesh.position.set(t.x,t.y,t.z),e.mesh.quaternion.set(n.x,n.y,n.z,n.w)}if(this.hover){let t=this.hoverPosition(this.hover),n=this.hover.mesh;n.position.x=t.x,n.position.z=t.z,n.position.y+=(t.y-n.position.y)*Math.min(1,e*6);let r=this.cargo.surfaceBelow(n.position.x,n.position.y,n.position.z),i=r!==null&&r>z.topY-.15;this.marker.visible=!0,this.marker.position.set(n.position.x,(r??0)+.02,n.position.z),this.marker.material.color.set(i?`#2f9e5b`:`#e8542f`);let a=n.position.y-YE(this.hover.kind.shape,this.hover.rot),o=this.dropLine.geometry.attributes.position;o.setXYZ(0,n.position.x,a,n.position.z),o.setXYZ(1,n.position.x,(r??0)+.02,n.position.z),o.needsUpdate=!0,this.dropLine.visible=!0}this.phase===`playing`&&this.hud.setRoute(this.stats.km);let t=Math.max(0,this.stackTop-z.topY);this.focusY+=(Math.max(1.9,this.stackTop+.25)-this.focusY)*Math.min(1,e*2);let n=this.camera.aspect<.8?1.3:1,r=(1+t*.25)*n,i=this.susp.heave.vel*.03;this.camera.position.set(4.4*r-this.felt.x*.06,this.focusY+1.6*r+i,6.2*r),this.camera.lookAt(0,this.focusY-.2,.2)}};export{AD as Game};