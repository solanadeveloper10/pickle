import { useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Links = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const flyZoneRef = useRef(null);
  const fly1Ref = useRef(null);
  const fly2Ref = useRef(null);

  useEffect(() => {
    const flyZone = flyZoneRef.current;
    const fly1 = fly1Ref.current;
    const fly2 = fly2Ref.current;

    // Kill previous triggers to avoid duplicates on resize
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (isMobile) {
      // Mobile: fly straight up
      gsap.to(fly1, {
        x: "30vw",
        y: "-35vh",
        ease: "none",
        scrollTrigger: {
          trigger: flyZone,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      });

      gsap.to(fly2, {
        x: "-30vw",
        y: "-35vh",
        ease: "none",
        scrollTrigger: {
          trigger: flyZone,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      });
    } else {
      // Desktop: fly to corners
      gsap.to(fly1, {
        x: "51vw",
        y: "-40vh",
        ease: "none",
        scrollTrigger: {
          trigger: flyZone,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      });

      gsap.to(fly2, {
        x: "-51vw",
        y: "-40vh",
        ease: "none",
        scrollTrigger: {
          trigger: flyZone,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [isMobile]);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        ref={flyZoneRef}
        sx={{
          height: "100vh",
          position: "relative",
          img: {
            transition: "0.5s",
          },
        }}
      >
        <Box
          ref={fly1Ref}
          sx={{
            position: "absolute",
            left: { xs: 100, md: 0 },
            bottom: 0,
            transition: { xs: "1s", md: "1s" },
          }}
        >
          <Box
            sx={{
              ":hover": {
                img: {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <a href='https://t.me/mwah_coin' target='_blank'>
              <img src='/telegram.png' width={80} height={80} />
            </a>
          </Box>
          <Box
            sx={{
              position: "relative",
              top: { xs: 80, md: 80 },
              left: { xs: -130, md: -140 },
              ":hover": {
                img: {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <a href='https://x.com/mwah_coin' target='_blank'>
              <img src='/twitter.png' width={80} height={80} />
            </a>
          </Box>
        </Box>
        <Box
          ref={fly2Ref}
          sx={{
            position: "absolute",
            right: { xs: 100, md: 0 },
            bottom: 0,
            transition: { xs: "1s", md: "1s" },
          }}
        >
          <Box
            sx={{
              ":hover": {
                img: {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <a
              href='https://dexscreener.com/solana/9wpzgealy8lsqkvowhy8sppbkluaxyw7knt3ywms8v4k'
              target='_blank'
            >
              <img src='/dexscreener.png' width={80} height={80} />
            </a>
          </Box>
          <Box
            sx={{
              position: "relative",
              top: { xs: 80, md: 80 },
              left: { xs: 130, md: 140 },
              ":hover": {
                img: {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <a
              href='https://www.dextools.io/app/en/solana/pair-explorer/9wPZgEALy8LSqkVoWHy8sPPbkLUaXyw7knT3YWMs8V4K?t=1750777482992'
              target='_blank'
            >
              <img src='/dextools.png' width={80} height={80} />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Links;
