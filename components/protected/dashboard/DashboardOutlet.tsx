import React from "react";
import { LessInfoCard } from "@/components/DisplayCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";

const DashboardOutlet = () => {
  return (
    <Grid py={10} px={8} flexGrow={1} templateColumns="repeat(6, 1fr)" gap={6}>
      {/* earning */}
      <GridItem colSpan={2}>
        <LessInfoCard
          icon={PiCurrencyDollarBold}
          iconProps={{
            color: "#45C881",
            bg: "#E8F8F0",
            borderColor: "#45C881",
          }}
          title="EARNING (This Month)"
          highlightedText="$0.00"
        />
      </GridItem>

      {/* total enroll */}
      <GridItem colSpan={2}>
        <LessInfoCard
          icon={BsPeopleFill}
          iconProps={{
            color: "#4F7A28",
            bg: "#EDE8F8",
            borderColor: "#4F7A28",
          }}
          title="TOTAL ENROLL (This Month)"
          highlightedText="0"
        />
      </GridItem>

      {/* best selling course */}
      <GridItem colSpan={2}>
        <LessInfoCard
          icon={IoDiamondOutline}
          iconProps={{
            color: "#E1AC1B",
            bg: "#FFF1CB",
            borderColor: "#E1AC1B",
          }}
          title="BEST SELLING COURSE"
        />
      </GridItem>
    </Grid>
  );
};

export default DashboardOutlet;
