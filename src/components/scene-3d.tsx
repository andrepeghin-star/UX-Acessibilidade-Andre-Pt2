import { useEffect, useState, type ComponentType } from "react";
import { useSettings } from "@/components/settings-provider";

type SceneCanvasProps = { paused: boolean };

export function Scene3D() {
  const { motionPaused } = useSettings();
  const [Canvas, setCanvas] = useState<ComponentType<SceneCanvasProps> | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let alive = true;
    import("@/components/scene-canvas")
      .then((mod) => {
        if (alive) setCanvas(() => mod.SceneCanvas);
      })
      .catch(() => {
        /* WebGL module failed — ink fallback remains */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <div className="scene-root bg-ink" aria-hidden="true">
        {Canvas ? <Canvas paused={motionPaused || reduced} /> : null}
      </div>
      <div className="scene-vignette" aria-hidden="true" />
    </>
  );
}
