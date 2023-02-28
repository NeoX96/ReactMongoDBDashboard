import { Box, IconButton, useTheme, Typography } from "@mui/material";
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
                color={colors.grey[100]}
              >
                Umsatzstärkste Online-Shops in Deutschland im Jahr 2021 (in Millionen Euro) 
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
