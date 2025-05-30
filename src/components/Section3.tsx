import { Box, Container, useMediaQuery, type Theme } from "@mui/material";
import { motion } from "framer-motion";

const Section3 = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatingImageVariants = {
    animate: {
      y: [0, 100, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      height='100%'
      width='100%'
      display='flex'
      justifyContent='start'
      alignItems='center'
      position='relative'
    >
      <Container maxWidth='xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box display='flex' flexDirection='column' gap={4}>
            {[
              { text: "Telegram", href: "https://www.google.com" },
              { text: "Twitter", href: "https://www.google.com" },
              { text: "Dextools", href: "https://www.google.com" },
              { text: "Dexscreener", href: "https://www.google.com" },
            ].map((link, index) => (
              <Box key={index}>
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
                  onClick={() =>
                    window.open(link.href, "_blank", "noopener,noreferrer")
                  }
                  variants={linkVariants}
                >
                  {link.text}
                </motion.span>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
      <Box
        component={motion.div}
        position='absolute'
        sx={{ top: { xs: "5%", md: "30%" }, transform: "translateY(-50%)" }}
        right={{ xs: 30, md: "20%" }}
        zIndex={-1}
        variants={floatingImageVariants}
        animate='animate'
      >
        <motion.img
          src='/usd.png'
          alt='pdf'
          height={isMobile ? 150 : 250}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true }}
        />
      </Box>
    </Box>
  );
};

export default Section3;
