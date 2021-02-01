import * as React from "react";
import * as Leaflet from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TopHat from "../assets/top-hat.png";
import { fetchAllLocations } from "./../services/database";
import console = require("console");

const FullSizeDiv = styled.div`
  width: 100%;
  height: 100%;
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
    popupAnchor: [0, -10]
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });
};

const startPosition: Leaflet.LatLngExpression = [51.505, -0.09];

export interface PointOfInterest {
  title: string;
  text?: string;
  latitude?: string;
  longitude?: string;
  image?: string;
  createdTime: string;
  id: string;
  author?: string;
}

export interface AirTableRecord {
  id: string;
  fields: PointOfInterest;
  createdTime: string;
}

class ColonialismMap extends React.Component {
  state = {
    pointsOfInterest: new Array<PointOfInterest>()
  };

  componentDidMount = () => {
    fetchAllLocations().then(pointsOfInterest => {
      this.setState({ pointsOfInterest });
    });
  };

  makeMarkers = (pois: PointOfInterest[]): any => {
    return pois.map(poi => {
      const position: Leaflet.LatLngExpression = [
        Number(poi.latitude),
        Number(poi.longitude)
      ];

      return (
        <Marker position={position} key={poi.id} icon={generateIcon(TopHat)}>
          <Popup>
            <Museo500Div className="card">
              <div className="card-image">
                {poi.image && (
                  <img
                    src={poi.image}
                    alt={poi.title}
                    style={{ width: "100%" }}
                  />
                )}
                <span className="card-title">{poi.title}</span>
              </div>
              <Museo500Div className="card-content">
                <p>
                  <b>{poi.author}</b>
                </p>
                <p>{poi.text.substring(0, 200).replace(/<[^>]*>?/gm, "")}...</p>
              </Museo500Div>

              <div className="card-action">
                <Link
                  to={{ pathname: `/location/${poi.id}`, data: poi }}
                  state={{ name: "Phil" }}
                  target="_blank"
                >
                  Read more{" "}
                </Link>
              </div>
            </Museo500Div>
          </Popup>
        </Marker>
      );
    });
  };

  render() {
    return (
      <FullSizeDiv>
        <Map
          center={startPosition}
          zoom={10}
          preferCanvas={true}
          style={{ height: "500px" }}
        >
          <TileLayer
            id="mapbox.streets"
            url={`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicG1jbWFob24xIiwiYSI6ImNqd294ZW4xMDBiMW80YnFyYzhheGo2NXMifQ.OAueHLCYkqOg4qbND3CvHg`} // TODO: mapbox access token
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.makeMarkers(this.state.pointsOfInterest)}
        </Map>
      </FullSizeDiv>
    );
  }
}

export default ColonialismMap;
