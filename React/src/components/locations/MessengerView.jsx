import React from "react";
import debug from "airpals-debug";
import LocationMap from "./LocationMap";
import PropTypes from "prop-types";
import * as dateService from "../../services/dateService";

const _logger = debug.extend("Locations");
class MessengerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: {
        lat: 0,
        lng: 0,
      },
      mapView: {
        height: "430px",
        width: "535px",
      },
      response: null,
      loopPrevention: true,
      totalDistance: "",
      totalTime: "",
      distance: 0,
      time: 0,
      messengerDelivTime: 0,
    };
  }
  componentDidMount() {
    _logger(this.props.location);
    this.getLocation();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      _logger("GeoLocation is not supported by this browser.");
    }
  }
  getCoordinates = (position) => {
    _logger(position.coords.latitude, position.coords.longitude);
    if (position !== null) {
      this.setState(() => ({
        origin: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      }));
    }
  };
  directionsCallback = (response) => {
    _logger(response);
    if (response !== null && this.state.loopPrevention === true) {
      if (response.status === "OK") {
        let time = response.routes[0].legs[0].duration.value / 60;
        this.calculateMessengerCost(time);
        this.setState(() => ({
          response,
          loopPrevention: false,
          totalDistance:
            response.routes[0].legs[0].distance.value +
            response.routes[0].legs[1].distance.value,
          totalTime:
            response.routes[0].legs[0].duration.value +
            response.routes[0].legs[1].duration.value,
        }));
        _logger(this.state.totalDistance, this.state.totalTime);
      } else {
        _logger("response: ", response);
      }
    }
  };
  onSubmit = () => {
    _logger("Shipment was accepted!");
  };
  calculateMessengerCost = (t) => {
    if (t < 60) {
      let rate = parseFloat(t * 0.45).toFixed(2);
      _logger("messenger delivery rate will be", rate);
      this.setState(() => ({
        messengerDelivTime: rate,
      }));
      if (t > 60) {
        let rate = parseFloat(t * 0.36).toFixed(2);
        _logger("messenger delivery rate will be", rate);
        this.setState(() => ({
          messengerDelivTime: rate,
        }));
      }
    }
  };
  render() {
    const pickUpDateFormat = dateService.formatDateTime(
      this.props.location.pickUpDate
    );
    const pickUpWindowFormat = dateService.formatDateTime(
      this.props.location.pickUpWindow
    );
    const totalDist = parseFloat(
      (this.state.totalDistance / 1000) * 0.621371
    ).toFixed(2);
    const totalT = parseFloat(this.state.totalTime / 60).toFixed(0);
    const totalCost = () => {
      let cost =
        +this.props.location.currentPrice + +this.state.messengerDelivTime;
      return parseFloat(cost).toFixed(2);
    };
    return (
      <div>
        <div className="content-wrapper">
          <div className="content-heading">
            <div>
              Messenger View
              <small>Confirm shipment</small>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="b mb-2 card">
                <div className="bb card-header">
                  <h4 className="card-title">Shipment Summary</h4>
                </div>
                <div className="bt card-body">
                  <h4 className="b0">Shipment #</h4>
                </div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Pickup Date</td>
                      <td>
                        <div className="text-right text-bold">
                          {pickUpDateFormat}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Pickup Window</td>
                      <td>
                        <div className="text-right text-bold">
                          {pickUpWindowFormat}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Total distance</td>
                      <td>
                        <div className="text-right text-bold">
                          {totalDist} miles
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Time</td>
                      <td>
                        <div className="text-right text-bold">
                          {totalT} minutes
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping Cost</td>
                      <td>
                        <div className="text-right text-bold">
                          ${this.props.location.currentPrice}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Messenger Delivery Fee</td>
                      <td>
                        <div className="text-right text-bold">
                          ${this.state.messengerDelivTime}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-right text-right">
                      <div className="text-bold">${totalCost()}</div>
                      <div className="text-sm">USD</div>
                    </div>
                    <div className="float-left text-bold text-dark">
                      ESTIMATED TOTAL
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p>
                    <button
                      className="btn btn-primary btn-block"
                      type="button"
                      onClick={this.onSubmit}
                    >
                      Accept Shipment
                    </button>
                  </p>
                  <small className="text-muted">
                    * To use this method you must be registered first
                  </small>
                </div>
              </div>
            </div>
            <LocationMap
              org={this.state.origin}
              dest={this.props.location.dropOffLoc}
              waypoints={this.props.location.pickUpLoc}
              method={this.props.location.travelMode}
              directionsCallBack={this.directionsCallback}
              response={this.state.response}
              dimensions={this.state.mapView}
            />
          </div>
        </div>
      </div>
    );
  }
}
MessengerView.propTypes = {
  location: PropTypes.shape({
    pickUpLoc: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    dropOffLoc: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    currentPrice: PropTypes.number,
    travelMode: PropTypes.string,
    pickUpDate: PropTypes.string,
    pickUpWindow: PropTypes.string,
  }),
};
export default MessengerView;
