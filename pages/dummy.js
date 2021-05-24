import {
  Flex,
  Box,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import Dashboard from "@/Dashboard";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import React from "react";
import tw from "twin.macro";
const Index = () => {
  React.useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2Fpa2F0cGF1bCIsImEiOiJja3AwNjJ4eGgwbWZvMnZtcndmZGk1cDFtIn0.BgQq-HOiLgT7HCaFNc66UA";

    var map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 12,
      center: [-122.447303, 37.753574],
    });
    map.on("load", function () {
      /* Sample feature from the `examples.8fgz4egr` tileset:
      {
      "type": "Feature",
      "properties": {
      "ethnicity": "White"
      },
      "geometry": {
      "type": "Point",
      "coordinates": [ -122.447303, 37.753574 ]
      }
      }
      */
      map.addSource("ethnicity", {
        type: "vector",
        url: "mapbox://examples.8fgz4egr",
      });
      map.addLayer({
        id: "population",
        type: "circle",
        source: "ethnicity",
        "source-layer": "sf2010",
        paint: {
          // make circles larger as the user zooms from z12 to z22
          "circle-radius": {
            base: 1.75,
            stops: [
              [12, 2],
              [22, 180],
            ],
          },
          // color circles by ethnicity, using a match expression
          // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
          "circle-color": [
            "match",
            ["get", "ethnicity"],
            "White",
            "#fbb03b",
            "Black",
            "#223b53",
            "Hispanic",
            "#e55e5e",
            "Asian",
            "#3bb2d0",
            /* other */ "#ccc",
          ],
        },
      });
    });
  }, []);

  return (
    <Dashboard>
      <Box padding="2rem">
        <Grid
          h="80vh"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem
            id="mapbox"
            rowSpan={2}
            colSpan={2}
            bg="white"
            shadow="sm"
            rounded="md"
          ></GridItem>
          <GridItem
            rowSpan={1}
            bg="white"
            shadow="sm"
            padding="1rem"
            rounded="md"
          >
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </GridItem>
          <GridItem
            rowSpan={1}
            bg="white"
            shadow="sm"
            padding="1rem"
            rounded="md"
          >
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </GridItem>
          <GridItem
            rowSpan={1}
            bg="white"
            shadow="sm"
            padding="1rem"
            rounded="md"
          >
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </GridItem>
          <GridItem
            rowSpan={1}
            bg="white"
            shadow="sm"
            padding="1rem"
            rounded="md"
          >
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </GridItem>
          <GridItem colSpan={2} bg="white" shadow="sm" />
          <GridItem colSpan={2} bg="white" shadow="sm"></GridItem>
          <GridItem colSpan={4} bg="white" shadow="sm" />
        </Grid>
      </Box>
    </Dashboard>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  let isLoggedIn = false;
  const isCookieAvailable = req.cookies.token;
  if (isCookieAvailable) {
    isLoggedIn = true;
    return {
      props: { isLoggedIn },
    };
  }

  res.statusCode = 302;
  res.setHeader("Location", `/login`);

  return {
    props: {},
  };
}
