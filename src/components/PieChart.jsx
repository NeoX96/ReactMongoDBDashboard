import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { watchCollection, getShopRevenuePieChart } from "../data/shopsData_live";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shopData, setShopData] = useState([]);

  // Lade die Daten aus der MongoDB-Sammlung, wenn die Komponente mountet
  useEffect(() => {
    const loadData = async () => {
      const data = await getShopRevenuePieChart();
      setShopData(data);
    };
    loadData();

    return () => {
      loadData();
    }

  }, []);

  useEffect(() => {
    const handleChange = updatedShop => {
      setShopData(prevShopData => {
        const index = prevShopData.findIndex(shop => shop.ShopName === updatedShop.ShopName);
        if (index === -1) {
          return prevShopData;
        }
        const updatedShopData = {
          ShopName: updatedShop.ShopName,
          Revenue: updatedShop.Revenue,
        };
        const newData = [...prevShopData];
        newData[index] = updatedShopData;
        return newData;
      });
    };
    watchCollection(handleChange);

    return () => {
      watchCollection(handleChange);
    };
  }, []);
  


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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
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
