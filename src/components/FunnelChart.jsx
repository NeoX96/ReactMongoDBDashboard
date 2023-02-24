import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { getShopsData } from "../data/shopsData";
import { useEffect, useState } from "react";
import { ResponsiveFunnel } from "@nivo/funnel";

const FunnelChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    getShopsData().then((shops) => {
      const formattedData = shops.documents.map((shop) => ({
        id: shop.ShopName,
        value: shop.Revenue,
      }));
      setData(formattedData);
    });
  }, []);

  return (
    <ResponsiveFunnel
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      valueFormat=">-.4s"
      colors={{ scheme: "spectral" }}
      borderWidth={20}
      labelColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      beforeSeparatorLength={100}
      beforeSeparatorOffset={20}
      afterSeparatorLength={100}
      afterSeparatorOffset={20}
      currentPartSizeExtension={10}
      currentBorderWidth={40}
      motionConfig="wobbly"
    />
  );
};

export default FunnelChart;
