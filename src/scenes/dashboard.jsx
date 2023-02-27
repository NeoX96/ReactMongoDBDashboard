import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { watchCollection, getSumOfRevenue, getShopsData } from "../data/shopsData_live";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shopsData, setShopsData] = useState([]);
  const [sumOfRevenue, setSumOfRevenue] = useState(0);

  const loadData = async () => {
    const data = await getShopsData();
    const sum = await getSumOfRevenue();

    setShopsData(data);
    setSumOfRevenue(sum);
  };

  useEffect(() => {
    loadData();

    return () => {
      loadData();
    };

  }, []);

  useEffect(() => {
    // watch collection and use the function getShopsData und getSumOfRevenue
    if (shopsData.length > 0) {
      const handleChange = async () => {
        await watchCollection(async (updatedShop) => {
          const updatedShopIndex = shopsData.findIndex((shop) => shop.ShopName === updatedShop.ShopName);
          console.log("ShopUpdated", updatedShopIndex);
          if (updatedShopIndex >= 0) {
            const updatedData = [...shopsData];
            updatedData[updatedShopIndex] = updatedShop;
            setShopsData(updatedData);
          }
        });
      }

      handleChange();
    }
  }, [shopsData]);



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Valentin" />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        {/* ROW 1 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Gesmte Einnahmen
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {sumOfRevenue} Mio. $
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Alle Shops
            </Typography>
          </Box>
          {shopsData.map((shop, i) => (
            <Box
              key={`${shop.ShopName}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {shop.ShopName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {shop.Country}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{shop.Year}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                color="black"
              >
                ${shop.Revenue} Mio.
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 2 */}
        <Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            anderes Chart
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >


          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Pie Chart
          </Typography>
          <Box height="250px" mt="-20px">
            {/*call piechart mit dashboard true*/ }
            <PieChart isDashboard={true} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
