import { useRef, useState, type MouseEventHandler } from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import Links from "./Links";

const API_URL = "https://clicker-game-api-xq9w.onrender.com";

const words = ["Mwah", "Mwah!"];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function getRandomFontSize() {
  return Math.floor(Math.random() * (48 - 16 + 1)) + 30;
}

const Banner = () => {
  const [wallet, setWallet] = useState(localStorage.getItem("wallet") || "");
  const [clickCount, setClickCount] = useState(1);
  const [showGif, setShowGif] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  const [texts, setTexts] = useState([]);
  const containerRef = useRef(null);

  const handleTap = (event: MouseEventHandler<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const containerRect = (
      containerRef.current as HTMLElement
    ).getBoundingClientRect();

    const fontSize = getRandomFontSize();
    const word = getRandomWord();

    // Calculate mouse position relative to container
    const mouseEvent = event as unknown as React.MouseEvent<HTMLDivElement>;
    const x = mouseEvent.clientX - containerRect.left;
    const y = mouseEvent.clientY - containerRect.top;

    // Create a temporary span to measure text height for vertical offset
    const tempSpan = document.createElement("span");
    tempSpan.style.fontSize = fontSize + "px";
    tempSpan.style.position = "absolute";
    tempSpan.style.visibility = "hidden";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.innerText = word;
    document.body.appendChild(tempSpan);
    const textHeight = tempSpan.offsetHeight;
    document.body.removeChild(tempSpan);

    const posX = x + (Math.random() * 200 - 200);
    const posY = y - textHeight - 8 - 150; // 8px padding above cursor

    const id = Date.now();

    //@ts-expect-error
    setTexts((prev) => [...prev, { id, word, fontSize, x: posX, y: posY }]);

    // Remove text after 2 seconds
    setTimeout(() => {
      //@ts-expect-error
      setTexts((prev) => prev.filter((t) => t.id !== id));
    }, 1000);
  };

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const sendClickRequest = async (count: number) => {
    setClickCount(1);

    if (wallet) {
      try {
        await fetch(`${API_URL}/api/click`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress: wallet, clicks: count }),
        });
      } catch (error) {
        console.error("Error sending clicks:", error);
      }
    }
  };

  const handleClick = () => {
    setShowGif(true);
    // Change key to force reload/replay GIF
    setGifKey((prev) => prev + 1);

    // Optional: revert to static image after GIF duration (e.g., 1s)
    setTimeout(() => setShowGif(false), 400); // Adjust duration as needed
    setClickCount((prev) => prev + 1);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (clickCount > 0) {
        sendClickRequest(clickCount);
      }
    }, 500);
  };

  return (
    <>
      <Header onChangeWallet={setWallet} />
      {/* @ts-expect-error */}
      <Box
        onClick={handleTap}
        ref={containerRef}
        height='calc(100vh - 150px)'
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='relative'
        sx={{ cursor: "pointer" }}
        overflow='hidden'
      >
        {texts.map(({ id, word, fontSize, x, y }) => (
          <Typography
            key={id}
            sx={{
              position: "absolute",
              left: x,
              top: y,
              fontSize,
              fontWeight: "bold",
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
              color: "#333",
              transition: "opacity 0.5s ease",
            }}
          >
            {word}
          </Typography>
        ))}
        <Box
          onClick={handleClick}
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
          component='img'
          height={{ xs: 300, md: "auto" }}
          src={showGif ? `cat.gif?key=${gifKey}` : "cat.png"}
          alt='Cat Kiss'
        />
      </Box>

      <Links />

      <Container>
        <Leaderboard wallet={wallet} />
      </Container>
    </>
  );
};

export default Banner;
