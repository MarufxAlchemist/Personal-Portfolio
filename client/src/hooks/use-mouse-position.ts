import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const rafRef = useRef<number>();

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = (x / window.innerWidth - 0.5) * 2;
      const normalizedY = (y / window.innerHeight - 0.5) * 2;

      setMousePosition({ x, y, normalizedX, normalizedY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition]);

  return mousePosition;
}
