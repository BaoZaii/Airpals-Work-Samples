import React from "react";
import * as serviceHelper from "../../services/serviceHelpers";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import debug from "airpals-debug";

const _logger = debug.extend("LocationSelect");

class LocationMap extends React.Component {
  constructor(props) {
    super(props);
    _logger(this.props);
    this.onMapClick = this.onMapClick.bind(this);
  }
  request = () => {
    const waypointsArray = [{ location: this.props.waypoints }];
    _logger("way points array", waypointsArray);

    const req = {
      destination: this.props.dest,
      origin: this.props.org,
      travelMode: this.props.method,
    };

    if (this.props.waypoints) {
      req.waypoints = waypointsArray;
    }

    return req;
  };

  onMapClick(...args) {
    _logger("onClick args: ", args);
  }
  render() {
    return (
      <LoadScript googleMapsApiKey={serviceHelper.GOOGLE_APIKEY}>
        <GoogleMap
          id="direction-example"
          mapContainerStyle={this.props.dimensions}
          zoom={5}
          center={this.props.GPS}
          onClick={this.onMapClick}
          onLoad={(map) => {
            _logger("DirectionsRenderer onLoad map: ", map);
          }}
          onUnmount={(map) => {
            _logger("DirectionsRenderer onUnmount map: ", map);
          }}
        >
          {this.props.dest !== "" && this.props.org !== "" && (
            <DirectionsService
              options={this.request()}
              callback={this.props.directionsCallBack}
              onLoad={(directionsService) => {
                _logger(
                  "DirectionsService onLoad directionsService: ",
                  directionsService
                );
              }}
              onUnmount={(directionsService) => {
                _logger(
                  "DirectionsService onUnmount directionsService: ",
                  directionsService
                );
              }}
            />
          )}
          {this.props.response !== null && (
            <DirectionsRenderer
              options={{
                directions: this.props.response,
              }}
              onLoad={(directionsRenderer) => {
                _logger(
                  "DirectionsRenderer onLoad directionsRenderer: ",
                  directionsRenderer
                );
              }}
              onUnmount={(directionsRenderer) => {
                _logger(
                  "DirectionsRenderer onUnmount directionsRenderer: ",
                  directionsRenderer
                );
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}
LocationMap.propTypes = {
  GPS: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  org: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  waypoints: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  dest: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  method: PropTypes.string,
  directionsCallBack: PropTypes.func,
  response: PropTypes.string,
  dimensions: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string,
  }),
};
export default LocationMap;
