import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { watchCollection, getShopRevenuePieBarChart } from "../data/shopsData_live";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shopData, setShopData] = useState([]);

  // Lädt die Daten aus der MongoDB-Sammlung
  const loadData = async () => {
    const data = await getShopRevenuePieBarChart();
    setShopData(data);
  };


  // Wird beim ersten Laden der Seite und beim Ändern der Daten in der MongoDB-Sammlung aufgerufen
  useEffect(() => {
    loadData();

    return () => {
      loadData();
    }

  }, []);

  // Wird beim ersten Laden der Seite und beim Ändern der Daten in der MongoDB-Sammlung aufgerufen
  useEffect(() => {
    if (shopData.length > 0) {
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

    handleChange();
    }
  }, [shopData]);
  

  return (
    <ResponsivePie
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
      margin={{
        top: isDashboard ? 20 : 30,
        right: 80,
        bottom: isDashboard ? 20 : 80,
        left: 80,
      }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={isDashboard ? 12 : 9}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      legends={
        isDashboard
          ? []
          : [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

export default PieChart;
