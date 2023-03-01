import { Box, Typography, useTheme, Link, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import FunnelChart from "../components/FunnelChart";
import { watchCollection, getSumOfRevenue, getShopsData } from "../data/shopsData_live";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const [shopsData, setShopsData] = useState([]);
  const [sumOfRevenue, setSumOfRevenue] = useState(0);
  const [changed, setChanged] = useState(false);

  const loadData = async () => {
    const data = await getShopsData();
    const sum = await getSumOfRevenue();

    console.log("inital: ", data);
    setShopsData(data);
    setSumOfRevenue(sum);
  };

  const handleChange = async () => {
    watchCollection((updatedShop) => {
      const updatedShopIndex = shopsData.findIndex((shop) => shop.ShopName === updatedShop.ShopName);
      console.log("ShopUpdated", updatedShopIndex);
      if (updatedShopIndex >= 0) {
        const updatedData = [...shopsData];
        updatedData[updatedShopIndex] = updatedShop;

        setShopsData(updatedData);
        setChanged(true)
      }
    });

    if (changed) {
      const sum = await getSumOfRevenue();
      setSumOfRevenue(sum);
      setChanged(false);
    }
  }


  useEffect(() => {
    loadData();

  }, []);


  useEffect(() => {

    if (shopsData.length > 0) {
      handleChange();
    }

  }, [shopsData, handleChange]);



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Datenvisualisierung der Umsatzstärksten Online-Shops aus dem Jahr 2021" />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isSmallScreen ? 'repeat(6, 1fr)' : 'repeat(12, 1fr)'}
        gridAutoRows="140px"
        gap="20px"
      >

        {/* ROW 1 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          boxShadow={1}
          borderRadius="4px"
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
                {sumOfRevenue} Mio. €
              </Typography>
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
          boxShadow={1}
          borderRadius="4px"
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
                    <Link href={`https://${shop.ShopName}`} target="_blank" rel="noopener noreferrer" underline="none" color={colors.greenAccent[500]}>
                      {shop.ShopName}
                    </Link>
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
                {shop.Revenue} Mio. €
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          height="450px"
          boxShadow={1}
          borderRadius="4px"
        >
          <Typography variant="h5" fontWeight="600">
            Funnel Chart
          </Typography>
          <Box height="400px" mt="5px">
            <FunnelChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          height="450px"
          boxShadow={1}
          borderRadius="4px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Pie Chart
          </Typography>
          <Box height="400px" mt="-20px">
            {/*call piechart mit dashboard true*/ }
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        <Box           
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          boxShadow={1}
          borderRadius="4px"
          height="450px">
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
            color={colors.greenAccent[500]}
            fontSize={20}
          >
            Hinweise und Anmerkungen
          </Typography>
          <Box height="200px" mt="-20px">
            <Typography m="30px" fontSize={16}>
              Der E-Commerce-Markt umfasst den Verkauf von physischen Gütern über einen digitalen Kanal an private Endnutzer (B2C).<br /><br />
              In die Betrachtung fließen sowohl Käufe über Desktop-Computer (inkl. Notebooks oder Laptops) als auch Käufe über mobile Endgeräte wie Smartphones oder Tablets ein.<br /><br />
              Nicht enthalten sind ausschließliche Marktplätze, digital vertriebene Dienstleistungen (siehe hierfür: eServices), digitale Medieninhalte als Download oder Stream, digital vertriebene Güter in B2B-Märkten sowie der digitale An- oder Weiterverkauf von gebrauchter, defekter oder reparierter Ware (re-commerce und C2C).<br /><br />
              Alle monetären Werte beziehen sich auf Netto-Umsätze, Versandkosten werden nicht berücksichtigt.
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;