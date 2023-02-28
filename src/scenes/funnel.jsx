import { Box } from "@mui/material";
import Header from "../components/Header";
import FunnelChart from "../components/FunnelChart";

const Funnel = () => {
  return (
    <Box m="20px">
      <Header title="Funnel Chart" subtitle="Simple Funnel Chart" />
      <Box height="75vh">
        <FunnelChart />
      </Box>
    </Box>
  );
};

export default Funnel;
