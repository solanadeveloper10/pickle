import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const placeholder = "https://via.placeholder.com/50";

const Links = () => {
  const [scrollY, setScrollY] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Responsive movement range (smaller on mobile)
  const isMobile = containerSize.width < 600;
  const moveRange = isMobile ? 40 : 80;

  // Center positions as percentages
  const basePositions = [
    { x: 0.25, y: 0.35 }, // top-left
    { x: 0.35, y: 0.65 }, // bottom-left
    { x: 0.65, y: 0.35 }, // top-right
    { x: 0.75, y: 0.65 }, // bottom-right
  ];

  // Movement directions for each link
  const directions = [
    { dx: -1, dy: -1 }, // up-left
    { dx: -1, dy: 1 }, // down-left
    { dx: 1, dy: -1 }, // up-right
    { dx: 1, dy: 1 }, // down-right
  ];

  // Calculate positions
  const positions = basePositions.map((base, idx) => {
    const { width, height } = containerSize;
    const dir = directions[idx];
    // Move max moveRange px in each direction, based on scroll
    const move = Math.min(Math.abs(scrollY), moveRange);
    const left = width * base.x + dir.dx * move;
    const top = height * base.y + dir.dy * move;
    // Clamp to stay on screen
    const imgSize = isMobile ? 36 : 50;
    return {
      left: Math.max(0, Math.min(left, width - imgSize)),
      top: Math.max(0, Math.min(top, height - imgSize)),
    };
  });

  return (
    <Box
      ref={containerRef}
      height="100vh"
      bgcolor="red"
      position="relative"
      overflow="hidden"
      width="100vw"
    >
      {positions.map((pos, idx) => (
        <a
          key={idx}
          href="#"
          style={{
            position: "absolute",
            left: pos.left,
            top: pos.top,
            transition: "left 3s, top 5s",
          }}
        >
          <img
            src={placeholder}
            alt={`Link ${idx + 1}`}
            style={{ width: isMobile ? 36 : 50, height: isMobile ? 36 : 50 }}
          />
        </a>
      ))}
    </Box>
  );
};

export default Links;
