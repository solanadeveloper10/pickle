import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Dialog,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useState, type FC } from "react";
import { formatWalletAddress } from "../helpers/formatWalletAddress";
import QA from "./QA";
import { Close } from "@mui/icons-material";

type PhantomProvider = {
  isPhantom: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const Header: FC<{ onChangeWallet: (wallet: string) => void }> = ({
  onChangeWallet,
}) => {
  const provider = window.solana;
  const [walletAddress, setWalletAddress] = useState<string | null>(
    localStorage.getItem("wallet")
  );
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const connectWallet = async () => {
    if (provider?.isPhantom) {
      try {
        const response = await provider.connect();
        console.log(response);
        setWalletAddress(response.publicKey.toString());
        onChangeWallet(response.publicKey.toString());
        localStorage.setItem("wallet", response.publicKey.toString());
      } catch (err) {
        console.error("Connection to Phantom failed", err);
      }
    } else {
      if (isPhone) {
        const baseUrl = window.location.origin;
        console.log(baseUrl);

        window.location.href = `https://phantom.app/ul/browse/${baseUrl}`;
      } else {
        alert("Phantom wallet not found. Please install it.");
      }
    }
  };

  const disconnectWallet = async () => {
    if (provider?.isPhantom) {
      try {
        await provider.disconnect();
        setWalletAddress(null);
        onChangeWallet("");
        localStorage.setItem("wallet", "");
      } catch (err) {
        console.error("Failed to disconnect wallet", err);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ py: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent='space-between'
        >
          <QA />
          <Box
            display='flex'
            alignItems={{ xs: "end", md: "center" }}
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            {!walletAddress ? (
              <Button
                variant='contained'
                color='primary'
                onClick={connectWallet}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                }}
              >
                Connect Wallet
              </Button>
            ) : (
              <Box>
                <Typography
                  variant='body1'
                  sx={{ fontWeight: 500, mr: 1 }}
                  component='span'
                >
                  {formatWalletAddress(walletAddress || "")}
                </Typography>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={disconnectWallet}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                  }}
                >
                  Disconnect
                </Button>
              </Box>
            )}
            <Box display={{ xs: "none", md: "block" }}>
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
                Buy
              </Button>
            </Box>

            <Dialog
              open={isOpen}
              fullWidth
              maxWidth='lg'
              onClose={() => setIsOpen(false)}
              fullScreen={isMobile}
              sx={{
                iframe: {
                  height: { xs: "100%", md: 800 },
                  border: 0,
                },
              }}
            >
              <Box
                display='flex'
                justifyContent='end'
                bgcolor='primary.light'
                padding={1}
              >
                <IconButton onClick={() => setIsOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
              <iframe
                src='https://jup.ag/swap/SOL-GBsjn6VTF8qBokiubyRDVyUS8hUyzpmVdDQTSKxzpump'
                height={800}
                width='100%'
              />
            </Dialog>
          </Box>
        </Stack>
        <Box display={{ xs: "flex", md: "none" }} alignItems='center' mt={4}>
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
            Buy
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
