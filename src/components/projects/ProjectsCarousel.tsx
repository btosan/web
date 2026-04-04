"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTicker } from "./useTicker";
import ProjectCard from "./ProjectCard";
import type { Project } from "./projects";

interface Props {
  projects?: Project[];
}

export default function ProjectsCarousel({ projects = [] }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [userStopped, setUserStopped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const itemWidth = 320;
  const gap = 24;
  const safeProjects = projects;
  const baseWidth = safeProjects.length * (itemWidth + gap) - gap;

  const isPaused = userStopped || isHovered;

  const {
    getOffset,
    setOffset,
    addVelocity,
    setVelocity,
    start,
    stop,
    isDraggingRef,
  } = useTicker({
    autoSpeed: -50,
    inertiaDecay: 0.965,
    loopWidth: Math.max(baseWidth, 1),
    paused: isPaused,
  });

  const activePointerId = useRef<number | null>(null);
  const downX = useRef(0);
  const lastX = useRef(0);
  const moved = useRef(false);
  const downAt = useRef(0);

  const DRAG_THRESHOLD = 6;
  const TAP_MAX_MS = 260;

  useEffect(() => {
    if (!safeProjects.length) return;
    start();
    return () => stop();
  }, [safeProjects.length, start, stop]);

  useEffect(() => {
    if (!safeProjects.length) return;

    let raf: number;
    const animate = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${getOffset()}px, 0, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [safeProjects.length, getOffset]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;

      const outer = outerRef.current;
      if (!outer || !safeProjects.length) return;

      isDraggingRef.current = true;
      setVelocity(0);
      activePointerId.current = e.pointerId;
      downX.current = e.clientX;
      lastX.current = e.clientX;
      downAt.current = performance.now();
      moved.current = false;

      try {
        outer.setPointerCapture(e.pointerId);
      } catch {}
    },
    [safeProjects.length, isDraggingRef, setVelocity]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current || activePointerId.current !== e.pointerId) return;

      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;

      if (!moved.current && Math.abs(e.clientX - downX.current) > DRAG_THRESHOLD) {
        moved.current = true;
      }

      let off = getOffset() + dx;
      if (off <= -baseWidth) off += baseWidth;
      if (off >= 0) off -= baseWidth;
      setOffset(off);

      if (moved.current) {
        const velocityFactor = e.pointerType === "touch" ? 6 : 20;
        addVelocity(dx * velocityFactor);
      }
    },
    [getOffset, setOffset, addVelocity, baseWidth, isDraggingRef]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (activePointerId.current !== e.pointerId) return;

      const outer = outerRef.current;
      if (outer) {
        try {
          outer.releasePointerCapture(e.pointerId);
        } catch {}
      }

      const elapsed = performance.now() - downAt.current;
      const isTap = !moved.current && elapsed <= TAP_MAX_MS;

      if (isTap) {
        setUserStopped(true);
      }

      isDraggingRef.current = false;
      activePointerId.current = null;
    },
    [isDraggingRef]
  );

  const onPointerCancel = useCallback(() => {
    isDraggingRef.current = false;
    activePointerId.current = null;
  }, [isDraggingRef]);

  if (!safeProjects.length) {
    return null;
  }

  const displayed =
    safeProjects.length > 1
      ? [...safeProjects, ...safeProjects, ...safeProjects]
      : safeProjects;

  return (
    <div
      ref={outerRef}
      className="overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={{
        touchAction: "pan-y",
        WebkitOverflowScrolling: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
      }}
    >
      <div
        ref={trackRef}
        className="flex py-6 will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {displayed.map((project, idx) => (
          <div
            key={`${project.slug}-${idx}`}
            className="shrink-0"
            style={{ width: `${itemWidth}px` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}