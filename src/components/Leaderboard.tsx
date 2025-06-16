import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Fade,
  Slide,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { formatWalletAddress } from "../helpers/formatWalletAddress";

const API_URL = "https://clicker-game-api-xq9w.onrender.com";
const ITEMS_PER_PAGE = 10;

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "$rank",
})<{ $rank?: number }>(({ theme, $rank }) => {
  let background;
  if ($rank === 0) {
    background =
      "linear-gradient(270deg, rgba(255,251,230,0.5) 0%, rgba(255,224,102,0.5) 50%, rgba(255,215,0,0.5) 100%)"; // Gold gradient
  } else if ($rank === 1) {
    background =
      "linear-gradient(270deg, rgba(248,249,250,0.5) 0%, rgba(233,236,239,0.5) 50%, rgba(192,192,192,0.5) 100%)"; // Silver gradient
  } else if ($rank === 2) {
    background =
      "linear-gradient(270deg, rgba(251,238,230,0.5) 0%, rgba(230,195,165,0.5) 50%, rgba(205,127,50,0.5) 100%)"; // Bronze gradient
  } else {
    background = theme.palette.background.default;
  }

  return {
    background,
    "&:hover": {
      transform: "scale(1.01)",
      transition: "transform 0.2s ease-in-out",
    },
    transition: "all 0.2s ease-in-out",
  };
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: "1rem",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& th": {
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: "1.1rem",
    padding: theme.spacing(2),
  },
}));

const MotionBox = motion(Box);

const Leaderboard = ({ wallet }: { wallet: string }) => {
  console.log(wallet);
  const [users, setUsers] = useState<
    { walletAddress: string; clicks: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const user = users.find((user) => user.walletAddress === wallet);
  const rank = users.findIndex((user) => user.walletAddress === wallet) + 1;
  const currentUser = {
    ...user,
    rank,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leaderboard`, {
          method: "GET",
        }).then((res) => res.json());
        setUsers(res);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginatedUsers = users.slice(0, ITEMS_PER_PAGE);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor='background.default'
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box
      minHeight='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      py={6}
    >
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant='h1'
          component='h1'
          gutterBottom
          align='center'
          sx={{
            mb: 4,
            fontWeight: 700,
            color: "primary.main",
            textShadow: "12px 12px 12px rgba(0,0,0,0.2)",
          }}
        >
          Leaderboard
        </Typography>
      </MotionBox>

      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          "& .MuiTable-root": {
            borderCollapse: "separate",
            borderSpacing: 0,
          },
        }}
      >
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell align='center'>Rank</StyledTableCell>
              <StyledTableCell>Wallet Address</StyledTableCell>
              <StyledTableCell align='right'>Mwahs</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <Slide
                key={user.walletAddress}
                direction='up'
                in={true}
                timeout={500}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <StyledTableRow $rank={index}>
                  <StyledTableCell align='center'>
                    <Typography
                      sx={{
                        fontWeight: index < 3 ? 700 : 400,
                        color: index < 3 ? "primary.main" : "inherit",
                        textShadow: `
                          0 0 2px #000, 
                          0 0 2px #000, 
                          0 0 2px #000, 
                          0 0 2px #000,
                          ${
                            index < 3
                              ? "5px 10px 8px rgba(0,0,0,0.18), 0 0px 2px #fff"
                              : ""
                          }
                        `,
                        WebkitTextStroke:
                          index < 3 ? "1px #fac8f2" : "1px #000",
                        textStroke: "1px #000",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box display='flex' alignItems='center' gap={1}>
                      <Typography>
                        {formatWalletAddress(user.walletAddress)}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        letterSpacing: 1,
                        textShadow: `
                          0 0 2px #000, 
                          0 0 2px #000, 
                          0 0 2px #000, 
                          0 0 2px #000,
                          ${
                            index < 3
                              ? "5px 10px 8px rgba(0,0,0,0.18), 0 0px 2px #fff"
                              : "0 1px 4px rgba(0,0,0,0.10)"
                          }
                        `,
                        WebkitTextStroke:
                          index < 3 ? "1px #fac8f2" : "1px #fac8f2",
                        textStroke: "1px #fac8f2",
                      }}
                    >
                      {user.clicks}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </Slide>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {currentUser.walletAddress && (
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box>
                <Typography variant='h6' gutterBottom>
                  Your Score
                </Typography>
                <Typography variant='body1'>
                  {formatWalletAddress(currentUser.walletAddress || "")}
                </Typography>
              </Box>
              <Box textAlign='right'>
                <Chip
                  label={`Rank #${currentUser.rank}`}
                  color='secondary'
                  sx={{ mb: 1 }}
                />
                <Typography variant='h4' sx={{ fontWeight: 700 }}>
                  {currentUser.clicks} Mwahs
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default Leaderboard;
