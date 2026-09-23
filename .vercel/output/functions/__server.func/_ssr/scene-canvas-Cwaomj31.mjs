import { i as __toESM } from "../_runtime.mjs";
import { a as Object3D, c as require_jsx_runtime, i as ExtrudeGeometry, l as require_react, n as useFrame, o as Shape, r as useThree, t as Canvas } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-canvas-Cwaomj31.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pentagonGeometry() {
	const shape = new Shape();
	const sides = 5;
	for (let i = 0; i < sides; i += 1) {
		const angle = i / sides * Math.PI * 2 - Math.PI / 2;
		const x = Math.cos(angle);
		const y = Math.sin(angle);
		if (i === 0) shape.moveTo(x, y);
		else shape.lineTo(x, y);
	}
	shape.closePath();
	const geo = new ExtrudeGeometry(shape, {
		depth: .14,
		bevelEnabled: true,
		bevelThickness: .04,
		bevelSize: .03,
		bevelSegments: 2
	});
	geo.center();
	return geo;
}
function CameraRig({ paused }) {
	const pointer = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const { camera } = useThree();
	(0, import_react.useEffect)(() => {
		const onMove = (event) => {
			pointer.current.x = event.clientX / window.innerWidth * 2 - 1;
			pointer.current.y = event.clientY / window.innerHeight * 2 - 1;
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	useFrame((state, delta) => {
		if (paused) return;
		const d = Math.min(delta, .1);
		const t = state.clock.elapsedTime;
		const targetX = Math.sin(t * .06) * 1.15 + pointer.current.x * .55;
		const targetY = .55 + Math.cos(t * .045) * .35 + pointer.current.y * .28;
		camera.position.x += (targetX - camera.position.x) * 1.15 * d;
		camera.position.y += (targetY - camera.position.y) * 1.15 * d;
		camera.lookAt(0, .2, 0);
	});
	return null;
}
function Crystal({ position, scale, color, speed, kind, paused }) {
	const ref = (0, import_react.useRef)(null);
	useFrame((state, delta) => {
		if (!ref.current || paused) return;
		const d = Math.min(delta, .1);
		ref.current.rotation.x += speed * .18 * d;
		ref.current.rotation.y += speed * .32 * d;
		ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * .45 * speed) * .18;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		position,
		scale,
		children: [
			kind === "ico" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }) : null,
			kind === "oct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [1, 0] }) : null,
			kind === "dod" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [1, 0] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				metalness: .42,
				roughness: .38
			})
		]
	});
}
function Shield({ position, color, speed, paused }) {
	const ref = (0, import_react.useRef)(null);
	const geo = (0, import_react.useMemo)(() => pentagonGeometry(), []);
	(0, import_react.useEffect)(() => () => geo.dispose(), [geo]);
	useFrame((state, delta) => {
		if (!ref.current || paused) return;
		const d = Math.min(delta, .1);
		ref.current.rotation.y += speed * .25 * d;
		ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .2 * speed) * .18;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		ref,
		position,
		geometry: geo,
		scale: 1.15,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			metalness: .28,
			roughness: .46,
			side: 2
		})
	});
}
function Rings({ paused }) {
	const outer = (0, import_react.useRef)(null);
	const inner = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (paused) return;
		const d = Math.min(delta, .1);
		if (outer.current) {
			outer.current.rotation.z += .08 * d;
			outer.current.rotation.y += .05 * d;
		}
		if (inner.current) {
			inner.current.rotation.z -= .12 * d;
			inner.current.rotation.x += .04 * d;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref: outer,
		rotation: [
			Math.PI / 2.6,
			.35,
			.2
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			5.1,
			.045,
			12,
			96
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#8a9188",
			metalness: .55,
			roughness: .32
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref: inner,
		rotation: [
			Math.PI / 3.2,
			-.4,
			.5
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			3.35,
			.035,
			12,
			80
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#2a5a4c",
			metalness: .5,
			roughness: .3
		})]
	})] });
}
function DustField({ count, paused }) {
	const mesh = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const seeds = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i < count; i += 1) {
			const u = (i + .37) / count;
			const v = i * 7 % count / count;
			const theta = 2 * Math.PI * u;
			const phi = Math.acos(2 * v - 1);
			const r = 6.2 + i * 13 % 80 / 10;
			out.push({
				x: r * Math.sin(phi) * Math.cos(theta),
				y: r * Math.sin(phi) * Math.sin(theta) * .55,
				z: r * Math.cos(phi) - 1.4,
				s: .07 + i * 17 % 12 / 80,
				rx: i % 8 * .4,
				ry: i % 5 * .6,
				spin: .12 + i * 3 % 9 / 20
			});
		}
		return out;
	}, [count]);
	(0, import_react.useEffect)(() => {
		if (!mesh.current) return;
		seeds.forEach((p, i) => {
			dummy.position.set(p.x, p.y, p.z);
			dummy.rotation.set(p.rx, p.ry, 0);
			dummy.scale.setScalar(p.s);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.matrix);
		});
		mesh.current.instanceMatrix.needsUpdate = true;
	}, [dummy, seeds]);
	useFrame((_, delta) => {
		if (!mesh.current || paused) return;
		const d = Math.min(delta, .1);
		seeds.forEach((p, i) => {
			p.ry += p.spin * d;
			p.rx += p.spin * .35 * d;
			dummy.position.set(p.x, p.y, p.z);
			dummy.rotation.set(p.rx, p.ry, 0);
			dummy.scale.setScalar(p.s);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.matrix);
		});
		mesh.current.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: mesh,
		args: [
			void 0,
			void 0,
			count
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tetrahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#8a9188",
			metalness: .38,
			roughness: .48
		})]
	});
}
function Cage({ paused }) {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (!ref.current || paused) return;
		ref.current.rotation.y += Math.min(delta, .1) * .04;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		scale: 9.5,
		rotation: [
			.35,
			.2,
			.15
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#3d5248",
			wireframe: true,
			transparent: true,
			opacity: .16
		})]
	});
}
function SceneBody({ paused }) {
	const dustCount = typeof window !== "undefined" && window.innerWidth < 700 ? 22 : 42;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#080a10"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#080a10",
				6,
				28
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .32,
			color: "#d7e0dc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#9aaba4",
			"#1a2420",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				6,
				8,
				4
			],
			intensity: 1.15,
			color: "#f0eadb"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-6,
				2,
				3
			],
			intensity: 18,
			distance: 22,
			color: "#2f5c4e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				4,
				-3,
				-2
			],
			intensity: 10,
			distance: 16,
			color: "#c4bba8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, { paused }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cage, { paused }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rings, { paused }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DustField, {
			count: dustCount,
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				3.4,
				.35,
				-2.2
			],
			scale: .78,
			color: "#2f5c4e",
			speed: 1.1,
			kind: "ico",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				-3.7,
				-.15,
				-1.8
			],
			scale: .64,
			color: "#c4bba8",
			speed: .85,
			kind: "oct",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				1.8,
				-1.9,
				-1.1
			],
			scale: .48,
			color: "#5a6b72",
			speed: 1.35,
			kind: "dod",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				-2.6,
				1.55,
				-3.4
			],
			scale: .86,
			color: "#3d6a5a",
			speed: .7,
			kind: "ico",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				4.6,
				-1.1,
				-3.6
			],
			scale: .42,
			color: "#8a9188",
			speed: 1.5,
			kind: "oct",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				-4.4,
				-1.7,
				-2.6
			],
			scale: .56,
			color: "#2a4540",
			speed: .95,
			kind: "dod",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crystal, {
			position: [
				.2,
				-.85,
				-2.8
			],
			scale: 1.05,
			color: "#1f4a3e",
			speed: .55,
			kind: "oct",
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
			position: [
				-3.1,
				-1.1,
				-.8
			],
			color: "#1f4a3e",
			speed: .8,
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
			position: [
				3.2,
				.9,
				-2.8
			],
			color: "#c4bba8",
			speed: 1.05,
			paused
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
			position: [
				.6,
				-2.4,
				-1.8
			],
			color: "#5c6b73",
			speed: .7,
			paused
		})
	] });
}
function SceneCanvas({ paused }) {
	const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
	const [hidden, setHidden] = (0, import_react.useState)(typeof document !== "undefined" ? document.hidden : false);
	(0, import_react.useEffect)(() => {
		const onVis = () => setHidden(document.hidden);
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	const freeze = paused || hidden;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		camera: {
			position: [
				0,
				.6,
				isMobile ? 17.2 : 14.4
			],
			fov: isMobile ? 36 : 40,
			near: .1,
			far: 80
		},
		dpr: isMobile ? [1, 1.15] : [1, 1.5],
		gl: {
			antialias: !isMobile,
			alpha: false,
			powerPreference: "low-power",
			stencil: false,
			depth: true
		},
		frameloop: freeze ? "demand" : "always",
		onCreated: ({ gl, invalidate }) => {
			gl.setClearColor("#080a10", 1);
			invalidate();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneBody, { paused: freeze })
	});
}
//#endregion
export { SceneCanvas };
