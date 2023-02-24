import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { getShopsData } from "../data/shopsData";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);


  useEffect(() => {
    getShopsData().then((shops) => {
      const formattedData = shops.documents.map((shop) => ({
        shopname: shop.ShopName,
        Einnahmen: shop.Revenue,
      }));
      setData(formattedData);
    });
  }, []);


  return (
    <ResponsiveBar
      data={data}
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
      keys={["Einnahmen"]}
      indexBy="shopname"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
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
            id: "Einnahmen",
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
        legendOffset: -50,
      }}
      enableLabel={false}
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
