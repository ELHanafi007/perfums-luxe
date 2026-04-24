"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mousePosition.x - 8, springConfig);
  const cursorY = useSpring(mousePosition.y - 8, springConfig);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-gold rounded-full z-[999] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 3 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-gold rounded-full z-[998] pointer-events-none hidden md:block"
        style={{
          x: useSpring(mousePosition.x - 16, springConfig),
          y: useSpring(mousePosition.y - 16, springConfig),
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 0.5,
        }}
      />
    </>
  );
}
