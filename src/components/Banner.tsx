import { useState } from "react";
import { Box } from "@mui/material";

const Banner = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleImageClick = () => {
    setIsAnimating(true);
    // Reset animation after 2 seconds
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box onClick={handleImageClick}>
        <img
          src={
            isAnimating
              ? "/path-to-your-gif.gif"
              : "/path-to-your-static-image.jpg"
          }
          alt="Banner"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            transition: "all 0.3s ease-in-out",
          }}
        />
      </Box>
    </Box>
  );
};

export default Banner;
