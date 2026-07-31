"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    const ringPos = { ...pos };
    let hasMoved = false;

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        pos.x = target.x;
        pos.y = target.y;
        ringPos.x = target.x;
        ringPos.y = target.y;
        dotRef.current?.classList.add("opacity-100");
        ringRef.current?.classList.add("opacity-100");
      }
    };
    window.addEventListener("mousemove", handleMove);

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && el.closest("a, button, input, textarea");

    const handleOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        ringRef.current?.classList.add("scale-150", "border-primary/70");
        ringRef.current?.classList.remove("border-primary/30");
      }
    };
    const handleOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        ringRef.current?.classList.remove("scale-150", "border-primary/70");
        ringRef.current?.classList.add("border-primary/30");
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    let frame: number;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      ringPos.x += (target.x - ringPos.x) * 0.1;
      ringPos.y += (target.y - ringPos.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.x}px`;
        ringRef.current.style.top = `${ringPos.y}px`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-999 hidden h-2 w-2 rounded-full bg-primary opacity-0 shadow-[0_0_12px_3px_rgba(237,28,36,0.55)] transition-opacity duration-300 md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-998 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 opacity-0 transition-[transform,opacity,border-color] duration-300 ease-out md:block"
      />
    </>
  );
}
