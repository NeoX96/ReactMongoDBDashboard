import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { watchCollection, getShopRevenueChartData } from "../data/shopsData_live";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shopData, setShopData] = useState([]);


  // Wird beim ersten Laden der Seite und beim Ändern der Daten in der MongoDB-Collection aufgerufen
  useEffect(() => {
    const loadData = async () => {
      const data = await getShopRevenueChartData();
      setShopData(data);
    };

      loadData();


  }, []);

  // Wird beim ersten Laden der Seite und beim Ändern der Daten in der MongoDB-Collection aufgerufen
  useEffect(() => {
    
    // Update shopData state when a shop revenue data changes in MongoDB collection
    const handleChange = async () => {
      await watchCollection((updatedShop) => {
        // Get index of updated shop in shopData array
        const updatedShopIndex = shopData.findIndex((shop) => shop.id === updatedShop.ShopName);
        
        // If updated shop is found in shopData array
        if (updatedShopIndex >= 0) {
          // Update shopData with new revenue data
          const updatedData = [...shopData];
          updatedData[updatedShopIndex] = {
            id: updatedShop.ShopName,
            value: updatedShop.Revenue,
          };
          setShopData(updatedData);
        }
      });
    };

    if (shopData.length > 0) {
      handleChange();
    }

  }, [shopData]);


  return (
    <ResponsiveBar
      data={shopData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.grey[900],
            color: colors.grey[100],
          },
        },
      }}
      
      margin={{ top: 30, right: 40, bottom: 50, left: 70 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        }

      ]}
  
      fill={[
        {
          match: {
            id: "value",
          },
          id: "lines",
        }
      ]}

      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Shop Name",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Einnahmen",
        legendPosition: "middle",
        legendOffset: -55,
      }}
      enableLabel={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
