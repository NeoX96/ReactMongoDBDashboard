import { ResponsiveFunnel } from "@nivo/funnel";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { watchCollection, getShopRevenueChartData } from "../data/shopsData_live";

const FunnelChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shopData, setShopData] = useState([{ id: "0", value: 0 }]);


  // Wird beim ersten Laden der Seite und beim Ändern der Daten in der MongoDB-Collection aufgerufen
  useEffect(() => {
    const loadData = async () => {
      const data = await getShopRevenueChartData();
      setShopData(data);
    };

    loadData();
  }, []);

    // Wird beim ersten Laden der Seite und beim Ändern der Daten in der MongoDB-Sammlung aufgerufen
    useEffect(() => {

      // Update shopData state when a shop revenue data changes in MongoDB collection
      const handleChange = async () => {
        watchCollection((updatedShop) => {
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

    const handleChange = async () => {
      watchCollection((updatedShop) => {
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


  return (
    <ResponsiveFunnel
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
        margin={{ top: 5, right: 5, bottom: 20, left: 20 }}
        valueFormat=">-.3s"
        colors={{ scheme: 'paired' }}
        borderWidth={8}
        labelColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    3
                ]
            ]
        }}
        beforeSeparatorLength={20}
        beforeSeparatorOffset={20}
        afterSeparatorLength={20}
        afterSeparatorOffset={20}
        currentPartSizeExtension={15}
        currentBorderWidth={8}
        motionConfig="wobbly"
    />
  );
};

export default FunnelChart;
