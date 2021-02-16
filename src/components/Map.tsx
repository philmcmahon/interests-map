import * as React from "react";
import * as Leaflet from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Bomb from "../assets/bomb.png";
import Peace from "../assets/peace.png";
import { fetchAllLocations } from "./../services/database";
import console = require("console");

const MapDiv = styled.div`
  width: 80%;
  padding-left: 20%;
`;

const TitleDiv = styled.div`
  width: 90%;
  padding-left: 10%;
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

const startPosition: Leaflet.LatLngExpression = [
  53.80618473785163,
  -1.5504965349684796,
];

export interface PointOfInterest {
  title: string;
  riscLinks?: string;
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

class ColonialismMap extends React.Component {
  state = {
    pointsOfInterest: new Array<PointOfInterest>(),
  };

  componentDidMount = () => {
    fetchAllLocations().then((pointsOfInterest) => {
      console.log(pointsOfInterest);
      this.setState({ pointsOfInterest });
    });
  };

  makeMarkers = (pois: PointOfInterest[]): any => {
    return pois.map((poi) => {
      const position: Leaflet.LatLngExpression = [
        Number(poi.latitude),
        Number(poi.longitude),
      ];

      const markerIcon = Bomb;

      return (
        <Marker
          position={position}
          key={poi.id}
          icon={generateIcon(markerIcon)}
        >
          <Popup>
            <Museo500Div className="card blue-grey darken-1">
              <div className="card-image">
                <img
                  src={poi.image}
                  alt={poi.title}
                  style={{ width: "100%" }}
                />
              </div>
              <Museo500Div className="card-content white-text">
                <span className="card-title">{poi.title}</span>
                {poi.riscLinks && (
                  <>
                    <b>Links to institutions in RiSC network</b>
                    <p>{poi.riscLinks}</p>
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

  render() {
    return (
      <>
        <TitleDiv>
          <h1>UK Universities with links to Academic RiSC</h1>
          <p>
            You can use the map below to explore universities with links to the
            academic resilience and security community network. In all cases you
            can read our source data by clicking the 'read more' button. If
            you're currently studying at one of these institutions and are
            interested in campaigning for change head to the{" "}
            <a href="https://caatunis.net/">CAAT Universities website</a>.
          </p>
        </TitleDiv>
        <MapDiv>
          <MapContainer
            center={startPosition}
            zoom={6}
            preferCanvas={true}
            style={{ height: "800px" }}
          >
            <TileLayer
              id="mapbox/streets-v11"
              url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG1jbWFob24xIiwiYSI6ImNqd294ZW4xMDBiMW80YnFyYzhheGo2NXMifQ.OAueHLCYkqOg4qbND3CvHg`} // TODO: mapbox access token
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.makeMarkers(this.state.pointsOfInterest)}
          </MapContainer>
        </MapDiv>
      </>
    );
  }
}

export default ColonialismMap;
