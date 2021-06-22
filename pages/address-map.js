import { Grid, GridItem } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import React from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const lat = query.get("lat");
    const lng = query.get("lng");
    console.log(lat, lng);
    // const { lat, lng } = router.query;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2Fpa2F0cGF1bCIsImEiOiJja3AwNjJ4eGgwbWZvMnZtcndmZGk1cDFtIn0.BgQq-HOiLgT7HCaFNc66UA";

    var map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 12,
      center: [parseFloat(lat), parseFloat(lng)],
    });
    var marker1 = new mapboxgl.Marker({ color: "#01E7AD" })
      .setLngLat([parseFloat(lat), parseFloat(lng)])
      .addTo(map);
    // map.on("load", function () {
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
    // map.addSource("points", {
    //   type: "geojson",
    //   data: {
    //     type: "FeatureCollection",
    //     features: [
    //       {
    //         type: "Feature",
    //         properties: {},
    //         geometry: {
    //           type: "Point",
    //           coordinates: [parseFloat(lat), parseFloat(lng)],
    //         },
    //       },
    //     ],
    //   },
    // });
    // map.addLayer({
    //   id: "population",
    //   type: "circle",
    //   source: "ethnicity",
    //   "source-layer": "sf2010",
    //   paint: {
    //     // make circles larger as the user zooms from z12 to z22
    //     "circle-radius": {
    //       base: 1.75,
    //       stops: [
    //         [12, 2],
    //         [22, 180],
    //       ],
    //     },
    //     // color circles by ethnicity, using a match expression
    //     // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
    //     "circle-color": [
    //       "match",
    //       ["get", "ethnicity"],
    //       "White",
    //       "#fbb03b",
    //       "Black",
    //       "#223b53",
    //       "Hispanic",
    //       "#e55e5e",
    //       "Asian",
    //       "#3bb2d0",
    //       /* other */ "#ccc",
    //     ],
    //   },
    // });
    // });
  }, []);

  return (
    <Grid w="full" h="100vh" templateRows="1fr" templateColumns="1fr" gap={4}>
      <GridItem
        id="mapbox"
        rowSpan={2}
        colSpan={2}
        bg="white"
        shadow="sm"
        rounded="md"
      ></GridItem>
    </Grid>
  );
};

export default Index;
