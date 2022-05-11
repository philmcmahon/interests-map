import * as React from "react";
import * as Leaflet from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import Money from "../assets/money.png";
import { fetchAllLocations } from "./../services/database";
import { getAllMps } from "./../services/parliament-api";

const MapDiv = styled.div`
  width: 80%;
  padding-left: 15%;
  padding-bottom: 2%;
`;

const TitleDiv = styled.div`
  width: 80%;
  padding-left: 15%;
`;

const DescriptionPara = styled.p`
  font-size: 20px;
`;

export const Museo500Div = styled.div`
  font-family: MuseoSans-500;
  font-weight: normal;
  font-style: normal;
`;

const generateIcon = (iconUrl: string, shadowUrl?: string) => {
  return Leaflet.icon({
    iconUrl,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });
};

const startPosition: Leaflet.LatLngExpression = [53.366413, -1.515828];

export interface PointOfInterest {
  title: string;
  description?: string;
  latitude?: string;
  longitude?: string;
  image?: string;
  createdTime: string;
  id: string;
  asylumBursary?: string;
  source?: string;
}

export interface AirTableRecord {
  id: string;
  fields: PointOfInterest;
  createdTime: string;
}

const makeMarkers = (pois: PointOfInterest[]): any => {
  return pois.map((poi) => {
    const position: Leaflet.LatLngExpression = [
      Number(poi.latitude),
      Number(poi.longitude),
    ];

    const markerIcon = Money;

    return (
      <Marker position={position} key={poi.id} icon={generateIcon(markerIcon)}>
        <Popup>
          <Museo500Div className="card blue-grey darken-1">
            <div className="card-image">
              <img src={poi.image} alt={poi.title} style={{ width: "100%" }} />
            </div>
            <Museo500Div className="card-content white-text">
              <span className="card-title">{poi.title}</span>
              {poi.description && (
                <>
                  <p>{poi.description}</p>
                </>
              )}
            </Museo500Div>
            <Museo500Div className="card-action">
              {poi.source && <a href={poi.source}>Read More</a>}
            </Museo500Div>
          </Museo500Div>
        </Popup>
      </Marker>
    );
  });
};

export const Map = () => {
  const [pointsOfInterest, setPointsOfInterest] = React.useState<
    PointOfInterest[]
  >([]);

  React.useEffect(() => {
    fetchAllLocations().then((pointsOfInterest) => {
      console.log(pointsOfInterest);
      setPointsOfInterest(pointsOfInterest);
      getAllMps();
    });
  }, []);

  const mapboxToken = process.env.MAPBOX_TOKEN
    ? process.env.MAPBOX_TOKEN
    : "pk.eyJ1IjoicG1jbWFob24xIiwiYSI6ImNsMzAydzludzAwcDYzZmxzZXVqY3FudWQifQ.f8rVG3e0k0Mz1sTpWj-mSw";
  return (
    <>
      <TitleDiv>
        <h2>MPs Interests</h2>
        <DescriptionPara>Some information about the map...</DescriptionPara>
      </TitleDiv>
      <MapDiv>
        <MapContainer
          center={startPosition}
          zoom={6}
          preferCanvas={true}
          style={{ height: "700px" }}
        >
          <TileLayer
            id="mapbox/streets-v11"
            url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {makeMarkers(pointsOfInterest)}
        </MapContainer>
        <DescriptionPara>
          This page was created for the guardian may 2022 hack day.
        </DescriptionPara>
      </MapDiv>
    </>
  );
};
