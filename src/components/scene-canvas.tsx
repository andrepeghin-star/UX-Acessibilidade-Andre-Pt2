import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SceneCanvasProps = { paused: boolean };

function pentagonGeometry() {
  const shape = new THREE.Shape();
  const sides = 5;
  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

function CameraRig({ paused }: { paused: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (paused) return;
    const d = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const targetX = Math.sin(t * 0.06) * 1.15 + pointer.current.x * 0.55;
    const targetY = 0.55 + Math.cos(t * 0.045) * 0.35 + pointer.current.y * 0.28;
    camera.position.x += (targetX - camera.position.x) * 1.15 * d;
    camera.position.y += (targetY - camera.position.y) * 1.15 * d;
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

function Crystal({
  position,
  scale,
  color,
  speed,
  kind,
  paused,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  kind: "ico" | "oct" | "dod";
  paused: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current || paused) return;
    const d = Math.min(delta, 0.1);
    ref.current.rotation.x += speed * 0.18 * d;
    ref.current.rotation.y += speed * 0.32 * d;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.45 * speed) * 0.18;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {kind === "ico" ? <icosahedronGeometry args={[1, 0]} /> : null}
      {kind === "oct" ? <octahedronGeometry args={[1, 0]} /> : null}
      {kind === "dod" ? <dodecahedronGeometry args={[1, 0]} /> : null}
      <meshStandardMaterial color={color} metalness={0.42} roughness={0.38} />
    </mesh>
  );
}

function Shield({
  position,
  color,
  speed,
  paused,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  paused: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => pentagonGeometry(), []);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((state, delta) => {
    if (!ref.current || paused) return;
    const d = Math.min(delta, 0.1);
    ref.current.rotation.y += speed * 0.25 * d;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.18;
  });

  return (
    <mesh ref={ref} position={position} geometry={geo} scale={1.15}>
      <meshStandardMaterial color={color} metalness={0.28} roughness={0.46} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Rings({ paused }: { paused: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (paused) return;
    const d = Math.min(delta, 0.1);
    if (outer.current) {
      outer.current.rotation.z += 0.08 * d;
      outer.current.rotation.y += 0.05 * d;
    }
    if (inner.current) {
      inner.current.rotation.z -= 0.12 * d;
      inner.current.rotation.x += 0.04 * d;
    }
  });

  return (
    <group>
      <mesh ref={outer} rotation={[Math.PI / 2.6, 0.35, 0.2]}>
        <torusGeometry args={[5.1, 0.045, 12, 96]} />
        <meshStandardMaterial color="#8a9188" metalness={0.55} roughness={0.32} />
      </mesh>
      <mesh ref={inner} rotation={[Math.PI / 3.2, -0.4, 0.5]}>
        <torusGeometry args={[3.35, 0.035, 12, 80]} />
        <meshStandardMaterial color="#2a5a4c" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

function DustField({ count, paused }: { count: number; paused: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    const out: Array<{
      x: number;
      y: number;
      z: number;
      s: number;
      rx: number;
      ry: number;
      spin: number;
    }> = [];
    for (let i = 0; i < count; i += 1) {
      const u = (i + 0.37) / count;
      const v = ((i * 7) % count) / count;
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 6.2 + ((i * 13) % 80) / 10;
      out.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta) * 0.55,
        z: r * Math.cos(phi) - 1.4,
        s: 0.07 + ((i * 17) % 12) / 80,
        rx: (i % 8) * 0.4,
        ry: (i % 5) * 0.6,
        spin: 0.12 + ((i * 3) % 9) / 20,
      });
    }
    return out;
  }, [count]);

  useEffect(() => {
    if (!mesh.current) return;
    seeds.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, 0);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [dummy, seeds]);

  useFrame((_, delta) => {
    if (!mesh.current || paused) return;
    const d = Math.min(delta, 0.1);
    seeds.forEach((p, i) => {
      p.ry += p.spin * d;
      p.rx += p.spin * 0.35 * d;
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, 0);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#8a9188" metalness={0.38} roughness={0.48} />
    </instancedMesh>
  );
}

function Cage({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || paused) return;
    ref.current.rotation.y += Math.min(delta, 0.1) * 0.04;
  });
  return (
    <mesh ref={ref} scale={9.5} rotation={[0.35, 0.2, 0.15]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#3d5248" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

function SceneBody({ paused }: { paused: boolean }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
  const dustCount = isMobile ? 22 : 42;

  return (
    <>
      <color attach="background" args={["#080a10"]} />
      <fog attach="fog" args={["#080a10", 6, 28]} />
      <ambientLight intensity={0.32} color="#d7e0dc" />
      <hemisphereLight args={["#9aaba4", "#1a2420", 0.55]} />
      <directionalLight position={[6, 8, 4]} intensity={1.15} color="#f0eadb" />
      <pointLight position={[-6, 2, 3]} intensity={18} distance={22} color="#2f5c4e" />
      <pointLight position={[4, -3, -2]} intensity={10} distance={16} color="#c4bba8" />

      <CameraRig paused={paused} />
      <Cage paused={paused} />
      <Rings paused={paused} />
      <DustField count={dustCount} paused={paused} />

      <Crystal position={[3.4, 0.35, -2.2]} scale={0.78} color="#2f5c4e" speed={1.1} kind="ico" paused={paused} />
      <Crystal position={[-3.7, -0.15, -1.8]} scale={0.64} color="#c4bba8" speed={0.85} kind="oct" paused={paused} />
      <Crystal position={[1.8, -1.9, -1.1]} scale={0.48} color="#5a6b72" speed={1.35} kind="dod" paused={paused} />
      <Crystal position={[-2.6, 1.55, -3.4]} scale={0.86} color="#3d6a5a" speed={0.7} kind="ico" paused={paused} />
      <Crystal position={[4.6, -1.1, -3.6]} scale={0.42} color="#8a9188" speed={1.5} kind="oct" paused={paused} />
      <Crystal position={[-4.4, -1.7, -2.6]} scale={0.56} color="#2a4540" speed={0.95} kind="dod" paused={paused} />
      <Crystal position={[0.2, -0.85, -2.8]} scale={1.05} color="#1f4a3e" speed={0.55} kind="oct" paused={paused} />

      <Shield position={[-3.1, -1.1, -0.8]} color="#1f4a3e" speed={0.8} paused={paused} />
      <Shield position={[3.2, 0.9, -2.8]} color="#c4bba8" speed={1.05} paused={paused} />
      <Shield position={[0.6, -2.4, -1.8]} color="#5c6b73" speed={0.7} paused={paused} />
    </>
  );
}

export function SceneCanvas({ paused }: SceneCanvasProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
  const [hidden, setHidden] = useState(
    typeof document !== "undefined" ? document.hidden : false,
  );

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const freeze = paused || hidden;

  return (
    <Canvas
      camera={{
        position: [0, 0.6, isMobile ? 17.2 : 14.4],
        fov: isMobile ? 36 : 40,
        near: 0.1,
        far: 80,
      }}
      dpr={isMobile ? [1, 1.15] : [1, 1.5]}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: "low-power",
        stencil: false,
        depth: true,
      }}
      frameloop={freeze ? "demand" : "always"}
      onCreated={({ gl, invalidate }) => {
        gl.setClearColor("#080a10", 1);
        invalidate();
      }}
    >
      <SceneBody paused={freeze} />
    </Canvas>
  );
}
