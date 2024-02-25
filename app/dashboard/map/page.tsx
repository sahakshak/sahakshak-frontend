"use client";
import { KEY } from "@/constant/const";
import { Case } from "@/lib/types/case";
import { Map, Marker, Overlay } from "pigeon-maps";
import { useEffect, useState } from "react";

interface LocationDetails {
  lat: number;
  lon: number;
  // Add other properties as needed
}

async function getCases() {
  const res = await fetch(KEY + "/cases", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data as Case[];
}

async function getLocationDetails(address: string): Promise<LocationDetails> {
  const apiKey = "b1c75e107f0f42179bc2f1a19569eaec";
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`
  );
  const data = await response.json();

  if (data.features && data.features.length > 0) {
    return data.features[0].properties;
  } else {
    throw new Error(`No location details found for ${address}`);
  }
}

export default function Page() {
  const [cases, setCases] = useState<Case[]>([]);
  const [locationDetails, setLocationDetails] = useState<LocationDetails[]>([]);

  useEffect(() => {
    const fetchCases = async () => {
      const casesData = await getCases();
      setCases(casesData);
    };

    fetchCases();
  }, []);

  const fetchLocationDetails = async (address: string) => {
    try {
      const locationDetails = await getLocationDetails(address);
      setLocationDetails((prevDetails) => [...prevDetails, locationDetails]);
    } catch (error) {
      console.error(`Error fetching location details for ${address}:`, error);
    }
  };

  useEffect(() => {
    cases.forEach((crime) => {
      fetchLocationDetails(crime.location);
    });
  }, [cases]);

  return (
    <div className="h-[80vh]">
      {/* <h1 className="text-3xl font-semibold py-5   ">Map</h1> */}
      <Map defaultCenter={[22.9868, 87.855]} defaultZoom={11}>
        {locationDetails.length &&
          locationDetails.map((location, index) =>
            location.lat && location.lon ? (
              <Overlay key={index} anchor={[location.lat, location.lon]}>
                <div className="bg-red-500 opacity-20 p-6 rounded-full shadow-md"></div>
              </Overlay>
            ) : null
          )}
      </Map>
    </div>
  );
}
