import { Box, Button, Dialog, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";

const QA = () => {
  const [open, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        onClick={() => setIsOpen(true)}
        variant='contained'
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          py: 1,
        }}
      >
        Q&A
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='md'
        slotProps={{
          paper: {
            sx: { borderRadius: 0 },
          },
        }}
      >
        <Box bgcolor='transparent' border={1} borderColor='rgb(48, 71, 0)'>
          <Box display='flex' padding={3} justifyContent='end'>
            <Box
              onClick={onClose}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Close />
            </Box>
          </Box>
          <Box padding={3}>
            <Typography variant='h4' gutterBottom mb={5}>
              Frequently Asked Questions
            </Typography>

            <Box mb={4}>
              <Typography variant='h6' gutterBottom>
                1. What is this game about?
              </Typography>
              <Typography variant='body1'>
                This is a fun clicker game where you can earn points by clicking
                on the cat. The more you click, the more points you earn!
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography variant='h6' gutterBottom>
                2. How do I connect my wallet?
              </Typography>
              <Typography variant='body1'>
                Click the "Connect Wallet" button in the top right corner.
                You'll need to have Phantom wallet installed. If you don't have
                it, you'll be prompted to install it.
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography variant='h6' gutterBottom>
                3. How does the leaderboard work?
              </Typography>
              <Typography variant='body1'>
                The leaderboard shows the top players based on their total
                clicks. Your rank and score will be displayed when you connect
                your wallet.
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography variant='h6' gutterBottom>
                4. Can I play without connecting my wallet?
              </Typography>
              <Typography variant='body1'>
                Yes, you can still click and see the animations, but your clicks
                won't be recorded on the leaderboard without connecting your
                wallet.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default QA;
