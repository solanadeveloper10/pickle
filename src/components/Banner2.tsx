import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionMoney from "./SectionMoney";
import Section3 from "./Section3";
import Section1 from "./Section1";
import Section5 from "./Section5";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Animate even sections up from bottom
    gsap.utils
      .toArray(sectionRefs.current.filter((_, i) => i % 2 !== 0))
      .forEach((section) => {
        // @ts-ignore
        gsap.to(section, {
          y: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            // @ts-ignore
            trigger: section.previousElementSibling,
            start: "bottom bottom",
            end: "+=100%",
            scrub: 1,
            markers: false,
          },
        });
      });

    // Pin odd sections during animation
    gsap.utils
      .toArray(sectionRefs.current.filter((_, i) => i % 2 === 0))
      .forEach((section) => {
        ScrollTrigger.create({
          // @ts-ignore
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: false,
        });
      });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <Box>
      {[1, 2, 3, 4, 5, 6].map((num, index) => (
        <Box
          key={num}
          // @ts-ignore
          ref={(el) => (sectionRefs.current[index] = el)}
          sx={{
            height: "100vh",
            width: "100%",
            position: "relative",
            overflow: "hidden",
            transform: index % 2 !== 0 ? "translateY(100%)" : "none",
            willChange: index % 2 !== 0 ? "transform" : "auto",
            bgcolor: index % 2 !== 0 ? "transparent" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {index === 0 && <Section1 />}
          {index === 1 && <SectionMoney />}
          {index === 2 && <Section3 />}
          {index === 3 && <SectionMoney />}
          {index === 4 && <Section5 />}
          {index === 5 && <SectionMoney />}
        </Box>
      ))}
    </Box>
  );
};

export default ScrollAnimation;
