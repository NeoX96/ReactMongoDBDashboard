import { Box, IconButton, useTheme, Typography, Link } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box>
      <Typography
                variant="h1"
                fontWeight="600"
              >
                <Link href="https://de.statista.com/prognosen/646009/top-online-shops-deutschland-ecommercedb" target="_blank" rel="noopener noreferrer" underline="none" color={colors.grey[100]}>
                Umsatzstärkste Online-Shops in Deutschland im Jahr 2021 (in Millionen Euro) 
                </Link>
              </Typography>
      </Box>

      {/* ICON */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode} fontSize="20px" >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: "32px"}}/>
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: "32px"}}/>
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
