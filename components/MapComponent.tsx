import { Case } from "@/lib/types/case";
import { Map, Marker } from "pigeon-maps";
import React, { useEffect, useState } from "react";

export default function MapComponent({ cases }: { cases: Case[] }) {
  const [markers, setMarkers] = useState<Array<[number, number]>>([]);

  // useEffect(() => {
  //   const fetchGeoCodes = async () => {
  //     const apiKey = "YOUR_MAPBOX_API_KEY"; // Replace with your actual Mapbox API key
  //     const geocodingEndpoint =
  //       "https://api.mapbox.com/geocoding/v5/mapbox.places";

  //     const markersPromises = cases.map(async (crime) => {
  //       try {
  //         const response = await fetch(
  //           `${geocodingEndpoint}/${encodeURIComponent(
  //             crime.location
  //           )}.json?access_token=${apiKey}`
  //         );
  //         const data = await response.json();

  //         const coordinates = data.features[0].geometry.coordinates;
  //         return [coordinates[1], coordinates[0]]; // Latitude, Longitude
  //       } catch (error: any) {
  //         console.error(
  //           `Error geocoding location "${crime.location}":`,
  //           error?.message
  //         );
  //         return null;
  //       }
  //     });

  //     const resolvedMarkers = await Promise.all(markersPromises);
  //     setMarkers(
  //       resolvedMarkers.filter((marker) => marker !== null) as Array<
  //         [number, number]
  //       >
  //     );
  //   };

  //   fetchGeoCodes();
  // }, [cases]);

  return (
    <Map defaultZoom={11}>
      {/* {markers.map((marker, index) => (
          <Marker key={index} width={50} anchor={marker} />
        ))} */}
    </Map>
  );
}
