import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Three.js backdrop for the hero: an ocean of brand-red dots rolling
 * left → right (same direction as the platform marquee), wind particles
 * drifting through, and a few flowing "wind line" ribbons. The wave also
 * swells gently under the cursor, and the whole group parallaxes with it.
 *
 * Rendering pauses when the hero is offscreen or the tab is hidden, and
 * prefers-reduced-motion gets a single static frame instead of a loop.
 */

/** Ashima/IQ simplex noise, the standard GLSL implementation. */
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

/**
 * Brand colors as raw sRGB floats. ShaderMaterial writes straight to the
 * canvas without three's color management, so this keeps them CSS-exact.
 */
const srgb = (hex: number) =>
  new THREE.Vector3(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255)

const WAVE_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform vec2 uPointer;
varying float vElev;
varying float vFade;
${NOISE_GLSL}
void main() {
  vec3 p = position;
  // noise field slides on +x so the swells travel left -> right
  float elev =
    snoise(vec3(p.x * 0.14 - uTime * 0.28, p.y * 0.18, uTime * 0.10)) * 1.15 +
    snoise(vec3(p.x * 0.50 - uTime * 0.55, p.y * 0.55, uTime * 0.18)) * 0.35;
  float d = distance(p.xy, uPointer);
  elev += 1.1 * exp(-d * d * 0.07); // swell under the cursor
  p.z += elev;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float crest = smoothstep(-1.2, 1.5, elev);
  gl_PointSize = min((3.2 + 3.0 * crest) * uPixelRatio * (10.0 / -mv.z), 22.0 * uPixelRatio);
  vElev = elev;
  vFade = (1.0 - smoothstep(2.0, 12.0, p.y) * 0.8) * (1.0 - smoothstep(-7.0, -12.0, p.y) * 0.6);
}
`

const WAVE_FRAGMENT = /* glsl */ `
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
varying float vElev;
varying float vFade;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float circle = smoothstep(0.5, 0.16, d);
  float h = smoothstep(-1.4, 1.6, vElev);
  float alpha = circle * vFade * (0.30 + 0.55 * h);
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(mix(uColorLow, uColorHigh, h), alpha);
}
`

const DUST_VERTEX = /* glsl */ `
attribute float aSeed;
attribute float aSize;
uniform float uTime;
uniform float uPixelRatio;
varying float vAlpha;
void main() {
  vec3 p = position;
  float speed = 1.0 + aSeed * 2.2;
  p.x = mod(p.x + 24.0 + uTime * speed, 48.0) - 24.0; // wind blows left -> right
  p.y += sin(uTime * (0.6 + aSeed * 0.8) + aSeed * 40.0) * 0.55;
  p.z += cos(uTime * 0.5 + aSeed * 30.0) * 0.6;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = min(aSize * uPixelRatio * (18.0 / -mv.z), 14.0 * uPixelRatio);
  float edge = smoothstep(-24.0, -18.0, p.x) * (1.0 - smoothstep(18.0, 24.0, p.x));
  vAlpha = edge * (0.16 + 0.34 * fract(aSeed * 7.31));
}
`

const DUST_FRAGMENT = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.12, d) * vAlpha;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(uColor, alpha);
}
`

const RIBBON_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uSeed;
uniform float uSpeed;
uniform float uAmp;
varying vec2 vUv;
${NOISE_GLSL}
void main() {
  vUv = uv;
  vec3 p = position;
  p.y += snoise(vec3(p.x * 0.13 - uTime * uSpeed, uSeed * 9.0, uTime * 0.15)) * uAmp
       + sin(p.x * 0.06 + uSeed * 6.28) * 0.6;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

const RIBBON_FRAGMENT = /* glsl */ `
uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  float ends = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
  float core = smoothstep(0.0, 0.45, 1.0 - abs(vUv.y - 0.5) * 2.0);
  float pulse = 0.65 + 0.35 * sin(vUv.x * 9.0 - uTime * 1.6);
  float alpha = ends * core * pulse * uOpacity;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(uColor, alpha);
}
`

const RIBBONS = [
  { y: 3.4, z: -6.0, speed: 0.45, amp: 1.0, opacity: 0.5, seed: 1 },
  { y: 1.6, z: -3.0, speed: 0.6, amp: 1.25, opacity: 0.38, seed: 2 },
  { y: 0.2, z: 1.5, speed: 0.35, amp: 0.9, opacity: 0.3, seed: 3 },
]

const DUST_COUNT = 240

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = containerRef.current
    if (!mount) return

    let cancelled = false
    let teardown: (() => void) | undefined

    // Building the scene compiles GLSL and uploads ~12k vertices — heavy work
    // we keep off the first-paint path so the hero text and entrance
    // animations stay smooth. It runs once the browser is idle instead.
    const setup = () => {
      if (cancelled) return
      teardown = init(mount)
    }

    const hasIdle = 'requestIdleCallback' in window
    const handle = hasIdle
      ? window.requestIdleCallback(setup, { timeout: 400 })
      : window.setTimeout(setup, 80)

    return () => {
      cancelled = true
      if (hasIdle) window.cancelIdleCallback(handle as number)
      else window.clearTimeout(handle as number)
      teardown?.()
    }

    function init(container: HTMLDivElement) {
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
    } catch {
      return // no WebGL — the CSS glows still carry the hero
    }
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.className = 'block h-full w-full'
    container.appendChild(renderer.domElement)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80)
    camera.position.set(0, 2, 10)
    camera.lookAt(0, 0.6, 0)

    const group = new THREE.Group()
    scene.add(group)
    const disposables: { dispose: () => void }[] = []
    const pixelRatioUniforms: THREE.IUniform<number>[] = []
    const timeUniforms: THREE.IUniform<number>[] = []

    // ── dot-wave ocean ──────────────────────────────────────────────
    const waveGeometry = new THREE.PlaneGeometry(50, 24, 150, 80)
    const waveUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uPointer: { value: new THREE.Vector2(999, 999) },
      uColorLow: { value: srgb(0xfccec6) }, // brand-200
      uColorHigh: { value: srgb(0xe5472f) }, // brand-500
    }
    const waveMaterial = new THREE.ShaderMaterial({
      uniforms: waveUniforms,
      vertexShader: WAVE_VERTEX,
      fragmentShader: WAVE_FRAGMENT,
      transparent: true,
      depthWrite: false,
    })
    const wave = new THREE.Points(waveGeometry, waveMaterial)
    wave.rotation.x = -Math.PI / 2.18 // almost flat, tipped toward the camera
    wave.position.set(0, -3.2, -4)
    group.add(wave)
    disposables.push(waveGeometry, waveMaterial)
    pixelRatioUniforms.push(waveUniforms.uPixelRatio)
    timeUniforms.push(waveUniforms.uTime)

    // ── wind dust ───────────────────────────────────────────────────
    const dustGeometry = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(DUST_COUNT * 3)
    const dustSeeds = new Float32Array(DUST_COUNT)
    const dustSizes = new Float32Array(DUST_COUNT)
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 48
      dustPositions[i * 3 + 1] = -2.5 + Math.random() * 9
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 12
      dustSeeds[i] = Math.random()
      dustSizes[i] = 0.6 + Math.random() * 1.6
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    dustGeometry.setAttribute('aSeed', new THREE.BufferAttribute(dustSeeds, 1))
    dustGeometry.setAttribute('aSize', new THREE.BufferAttribute(dustSizes, 1))
    const dustUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uColor: { value: srgb(0xf0816c) }, // brand-400
    }
    const dustMaterial = new THREE.ShaderMaterial({
      uniforms: dustUniforms,
      vertexShader: DUST_VERTEX,
      fragmentShader: DUST_FRAGMENT,
      transparent: true,
      depthWrite: false,
    })
    group.add(new THREE.Points(dustGeometry, dustMaterial))
    disposables.push(dustGeometry, dustMaterial)
    pixelRatioUniforms.push(dustUniforms.uPixelRatio)
    timeUniforms.push(dustUniforms.uTime)

    // ── wind-line ribbons ───────────────────────────────────────────
    const ribbonGeometry = new THREE.PlaneGeometry(44, 0.14, 240, 1)
    disposables.push(ribbonGeometry)
    for (const r of RIBBONS) {
      const uniforms = {
        uTime: { value: 0 },
        uSeed: { value: r.seed },
        uSpeed: { value: r.speed },
        uAmp: { value: r.amp },
        uOpacity: { value: r.opacity },
        uColor: { value: srgb(0xf8ab9d) }, // brand-300
      }
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: RIBBON_VERTEX,
        fragmentShader: RIBBON_FRAGMENT,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const ribbon = new THREE.Mesh(ribbonGeometry, material)
      ribbon.position.set(0, r.y, r.z)
      group.add(ribbon)
      disposables.push(material)
      timeUniforms.push(uniforms.uTime)
    }

    // ── pointer parallax + cursor swell ─────────────────────────────
    const pointer = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
    }
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove)

    const clock = new THREE.Clock()
    let time = 0
    function tick() {
      time += Math.min(clock.getDelta(), 0.05)
      smooth.x += (pointer.x - smooth.x) * 0.045
      smooth.y += (pointer.y - smooth.y) * 0.045
      group.rotation.y = smooth.x * 0.16
      group.rotation.x = smooth.y * 0.1
      camera.position.x = smooth.x * 1.2
      camera.position.y = 2 - smooth.y * 0.8
      camera.lookAt(0, 0.6, 0)
      waveUniforms.uPointer.value.set(smooth.x * 44, -smooth.y * 18 - 2)
      for (const u of timeUniforms) u.value = time
      renderer.render(scene, camera)
    }

    // ── run only when visible; reduced motion gets one static frame ─
    let inView = true
    function startStop() {
      const run = inView && !document.hidden && !reduceMotion
      renderer.setAnimationLoop(run ? tick : null)
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      startStop()
    })
    observer.observe(container)
    document.addEventListener('visibilitychange', startStop)

    function renderStatic() {
      time = 5
      for (const u of timeUniforms) u.value = time
      renderer.render(scene, camera)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      renderer.setPixelRatio(dpr)
      renderer.setSize(container.clientWidth, container.clientHeight, false)
      for (const u of pixelRatioUniforms) u.value = dpr
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1)
      camera.updateProjectionMatrix()
      if (reduceMotion) renderStatic()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // Fade the canvas in so it arrives gently instead of popping after the
    // deferred init — and compile shaders off the main thread first, so the
    // first frame doesn't stall.
    const canvas = renderer.domElement
    canvas.style.opacity = '0'
    canvas.style.transition = 'opacity 700ms ease'
    const reveal = () => {
      if (!cancelled) canvas.style.opacity = '1'
    }

    if (reduceMotion) {
      renderStatic()
      reveal()
    } else {
      renderer
        .compileAsync(scene, camera)
        .then(() => {
          if (cancelled) return
          startStop()
          reveal()
        })
        .catch(reveal)
    }

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', startStop)
      window.removeEventListener('pointermove', onPointerMove)
      renderer.setAnimationLoop(null)
      for (const d of disposables) d.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_26%,black_90%,transparent_100%)]"
    />
  )
}
