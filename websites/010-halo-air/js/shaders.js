export const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;      // panel (#heroVisual) size in px
uniform vec2 uTextureSize;     // sky image size in px
uniform vec2 uHeroSize;        // whole .hero size in px
uniform vec2 uPanelOffset;     // panel top-left inside .hero in px
uniform vec2 uMouse;
uniform float uParallaxStrength;
uniform float uDistortionMultiplier;
uniform float uGlassStrength;
uniform float ustripesFrequency;
uniform float uglassSmoothness;
uniform float uEdgePadding;

varying vec2 vUv;

// px = pixel position inside the hero, origin top-left.
// Maps it onto the sky image the same way CSS "background-size: cover;
// background-position: center" does for the full hero.
vec2 getCoverUV(vec2 px, vec2 textureSize) {
    if (textureSize.x < 1.0 || textureSize.y < 1.0) return vec2(0.0);

    vec2 s = uHeroSize / textureSize;
    float scale = max(s.x, s.y);

    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uHeroSize - scaledSize) * 0.5;

    vec2 t = (px - offset) / scaledSize;
    return vec2(t.x, 1.0 - t.y); // flip Y for texture space
}

float displacement(float x, float num_stripes, float strength) {
    float modulus = 1.0 / num_stripes;
    return mod(x, modulus) * strength;
}

float fractalGlass(float x) {
    float d = 0.0;

    for (int i = -5; i <= 5; i++) {
        d += displacement(
            x + float(i) * uglassSmoothness,
            ustripesFrequency,
            uGlassStrength
        );
    }

    d = d / 11.0;
    return x + d;
}

float smoothEdge(float x, float padding) {
    float edge = padding;

    if (x < edge) {
        return smoothstep(0.0, edge, x);
    } else if (x > 1.0 - edge) {
        return 1.0 - smoothstep(1.0 - edge, 1.0, x);
    }

    return 1.0;
}

void main() {
    vec2 uv = vUv;

    float originalX = uv.x;
    float edgeFactor = smoothEdge(originalX, uEdgePadding);
    float distortedX = fractalGlass(originalX);

    uv.x = mix(originalX, distortedX, edgeFactor);

    float distortionFactor = uv.x - originalX;
    float parallaxDirection = -sign(0.5 - uMouse.x);

    vec2 parallaxOffset = vec2(
        parallaxDirection *
        abs(uMouse.x - 0.5) *
        uParallaxStrength *
        (1.0 + abs(distortionFactor) * uDistortionMultiplier),
        0.0
    );

    parallaxOffset *= edgeFactor;
    uv += parallaxOffset;

    // panel-local UV -> pixel position inside the hero (top-left origin)
    vec2 px = uPanelOffset + vec2(
        uv.x * uResolution.x,
        (1.0 - uv.y) * uResolution.y
    );

    vec2 coverUV = clamp(getCoverUV(px, uTextureSize), 0.0, 1.0);

    gl_FragColor = texture2D(uTexture, coverUV);
}
`;