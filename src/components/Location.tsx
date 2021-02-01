import * as React from "react";
import { RouteProps } from "react-router";
import { fetchLocationById } from "./../services/database";
import { PointOfInterest, Museo500Div } from "./Map";
import styled from "styled-components";
import { string } from "prop-types";

export const LocationDescription = styled.div`
  font-family: MuseoSans-500;
  font-weight: normal;
  font-style: normal;
  padding: 20px;
  max-width: 1000px;
`;

export const MainImage = styled.img`
  max-width: 400px;
  width: 100%;
  float: left;
  padding: 10px;
`;

class Location extends React.Component<
  RouteProps,
  { location?: PointOfInterest }
> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.location.data) {
      this.setState({ location: this.props.location.data });
    } else {
      fetchLocationById(this.props.match.params.id).then(location => {
        this.setState({ location });
      });
    }
  };

  getSanitisedText = (text: string): any => {
    return {
      __html: text
    };
  };

  render() {
    return (
      <LocationDescription>
        {this.state.location && (
          <>
            <h2>{this.state.location.title}</h2>
            <h4>
              <i>{this.state.location.author}</i>
            </h4>

            <MainImage
              src={this.state.location.image}
              alt={this.state.location.title}
            />
            <p
              dangerouslySetInnerHTML={this.getSanitisedText(
                this.state.location.text
              )}
            ></p>
          </>
        )}
      </LocationDescription>
    );
  }
}

export default Location;
