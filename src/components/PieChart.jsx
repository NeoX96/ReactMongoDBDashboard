import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { getShopsData } from "../data/shopsData";
import { useEffect, useState } from "react";
import { realmLogin, watchCollection } from "../data/shopsData_live";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    getShopsData().then((shops) => {
      const formattedData = shops.documents.map((shop) => ({
        id: shop.ShopName,
        value: shop.Revenue,
      }));
      setShopData(formattedData);
    });
  }, []);

  useEffect(() => {
    if (shopData.length > 0) {
    const fetchData = async () => {
      const user = await realmLogin();
      if (user) {
        await watchCollection((updatedShop) => {
          console.log('updatedShop', updatedShop);
          console.log('shopData', shopData);
          const updatedShopIndex = shopData.findIndex((shop) => {
            console.log("shopID: ", shop.id);
            return shop.id === updatedShop.ShopName;
          });
          console.log('updatedShopIndex', updatedShopIndex);
          if (updatedShopIndex >= 0) {
            const updatedData = [...shopData];
            updatedData[updatedShopIndex] = {
              id: updatedShop.ShopName,
              value: updatedShop.Revenue,
            };
            console.log('updatedData', updatedData);
            setShopData(updatedData);
          }
        });
      }
    };
    fetchData();
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
