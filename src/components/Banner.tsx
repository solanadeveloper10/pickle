import { Box, useMediaQuery } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Banner = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXl = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Box
      minHeight={{ xs: "100vh", md: "100vh" }}
      position='relative'
      width='100%'
      sx={{
        overflow: "hidden",
      }}
    >
      {/* CA: */}
      <Box
        component='img'
        src='/pic_4.png'
        sx={{
          position: "absolute",
          top: { xs: "25%", md: "32%", xl: "35%" },
          left: "50%",
          width: { xs: 350, md: 800, xl: 1500 },
          transform: "translateX(-50%)",
          zIndex: 5,
          transition: "0.5s",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={async (e) => {
          try {
            await navigator.clipboard.writeText(
              "HKccVWHaz3yd2zt8VFMc72HaTGGboxtE5W68vLVJpump"
            );

            const img = e.target as HTMLImageElement;

            setTimeout(() => {
              img.style.transform = "translateX(-50%) scale(1.25)";
              img.style.transition = "transform 0.3s ease-out";

              setTimeout(() => {
                img.style.transform = "translateX(-50%) scale(1)";
                img.style.transition = "transform 0.3s ease-out";
              }, 300);
            }, 300);
          } catch (e) {
            // fallback: do nothing
          }
        }}
      />

      {/* BUTTONS */}
      <Box
        component='a'
        href='https://x.com/PickleShowSol'
        target='_blank'
        sx={{
          position: "absolute",
          bottom: { xs: "28%", md: "25%", lg: "25%", xl: "30%" },
          left: { xs: "59%", md: "11%", lg: "11%", xl: "10%" },
          zIndex: 2,
        }}
      >
        <Box
          component='img'
          src='/pic_8.png'
          sx={{
            height: { xs: "80px", md: 110, xl: 220 },
            transform: { xs: "rotate(50deg)", md: "none" },
            transition: "0.5s",
            ":hover": {
              cursor: "pointer",
              transform: { md: "scale(1.2)" },
            },
          }}
        />
      </Box>

      <Box
        component='a'
        href='https://t.me/PickleShowSol'
        target='_blank'
        sx={{
          position: "absolute",
          bottom: { xs: "21%", md: "14%", lg: "14%", xl: "20%" },
          left: {
            xs: "36%",
            md: window.innerHeight > 730 ? "18%" : "18%",
            xl: "12%",
          },

          zIndex: 2,
        }}
      >
        <Box
          component='img'
          src='/pic_5.png'
          sx={{
            transform: { xs: "rotate(50deg)", md: "none" },
            height: { xs: 100, md: 120, xl: 220 },
            transition: "0.5s",
            ":hover": {
              cursor: "pointer",
              transform: { md: "scale(1.2)" },
            },
          }}
        />
      </Box>

      <Box
        component='a'
        href='#'
        target='_blank'
        sx={{
          position: "absolute",
          bottom: { xs: "13%", md: "5%", lg: "5%", xl: "10%" },
          left: {
            xs: "22%",
            md: window.innerHeight > 730 ? "29%" : "27%",
            xl: "23%",
          },

          zIndex: 2,
        }}
      >
        <Box
          component='img'
          src='/pic_6.png'
          sx={{
            height: { xs: 110, md: 150, xl: 250 },
            transform: { xs: "rotate(50deg)", md: "none" },
            transition: "0.5s",
            ":hover": {
              cursor: "pointer",
              transform: { md: "scale(1.2)" },
            },
          }}
        />
      </Box>

      <Box
        component='a'
        href='#'
        target='_blank'
        sx={{
          position: "absolute",
          bottom: { xs: "4%", md: "1.5%", lg: "1.5%", xl: "2%" },
          left: {
            xs: "8%",
            md: window.innerHeight > 730 ? "47%" : "44%",
            xl: "40%",
          },
          zIndex: 2,
        }}
      >
        <Box
          component='img'
          src='/pic_7.png'
          sx={{
            height: { xs: "120px", md: 160, xl: 380 },
            transform: { xs: "rotate(50deg)", md: "none" },
            transition: "0.5s",
            ":hover": {
              cursor: "pointer",
              transform: { md: "scale(1.2)" },
            },
          }}
        />
      </Box>

      {isXs && (
        <Box
          component='img'
          src='/rainbow_mobile.gif'
          sx={{
            height: "auto",
            width: "100%",
            display: { xs: "block", md: "none" },
          }}
        />
      )}
      {isMd && (
        <Box
          component='img'
          src='/c1440.gif'
          sx={{
            height: "auto",
            width: "100%",
            display: { xs: "none", md: "block", xl: "none" },
          }}
        />
      )}
      {isXl && (
        <Box
          component='img'
          src='/c2560.gif'
          sx={{
            width: "100%",
            display: { xs: "none", md: "none", xl: "block" },
          }}
        />
      )}
    </Box>
  );
};

export default Banner;
