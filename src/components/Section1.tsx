import { Box, Typography, useMediaQuery, type Theme } from "@mui/material";
import { motion } from "framer-motion";

const floatingImageVariants = {
  animate: {
    y: [0, 40, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Section1 = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box
      height='100%'
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box textAlign='center'>
        <Typography variant='h1' mb={4}>
          PDF
        </Typography>
        <Box
          component={motion.div}
          zIndex={-1}
          variants={floatingImageVariants}
          animate='animate'
        >
          <motion.img
            src='/usd.png'
            height={isMobile ? 150 : 250}
            alt='pdf'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8 },
            }}
            viewport={{ once: true }}
          />
        </Box>

        <Box mt={6}>
          <motion.span
            style={{
              display: "inline-block",
              color: "#000",
              fontSize: "3rem",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.05,
              x: 10,
              transition: { duration: 0.2 },
            }}
            onClick={() => window.open("", "_blank", "noopener,noreferrer")}
          >
            Buy
          </motion.span>
        </Box>

        <Typography
          variant='body1'
          fontSize={{ xs: 14, md: 20, wordBreak: "break-word" }}
          mt={4}
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            window.navigator.clipboard.writeText("contract address");
            const target = e.currentTarget;
            target.style.transform = "scale(0.6)";
            target.style.transition = "transform 0.3s ease-in";

            setTimeout(() => {
              target.style.transform = "scale(1.25)";
              target.style.transition = "transform 0.3s ease-out";

              setTimeout(() => {
                target.style.transform = "scale(1)";
                target.style.transition = "transform 0.3s ease-out";
              }, 300);
            }, 300);
          }}
        >
          ca: 8SQQ1urC3Dynq9C2ieM6AozWgi4GCrLE6fnRoiWdpump
        </Typography>
      </Box>
    </Box>
  );
};

export default Section1;
