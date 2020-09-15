import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";

const _logger = debug.extend("Pricing");
const Pricing = (props) => {
  _logger(props);
  const priceFormula = (d, t) => {
    _logger(d, t);
    const speedType = () => {
      if (props.speedType === "ASAP") {
        _logger("Asap");
        return 9.5;
      }
      if (props.speedType === "3hr") {
        _logger("3hr");
        return 7.19;
      }
      if (props.speedType === "5hr") {
        _logger("5hr");
        return 5.75;
      } else {
        _logger("Missing SpeedType");
        return null;
      }
    };
    const parcelType = () => {
      if (props.parcelType === "Small") {
        return 1;
      }
      if (props.parcelType === "Medium") {
        return 3;
      }
      if (props.parcelType === "Large") {
        return 6;
      } else {
        _logger("Missing ParcelType");
        return null;
      }
    };
    let dMiles = (d / 1000) * 0.621371;
    let tmin = t / 60;
    let costPerMin = tmin * 0.35;
    let costPerMile = dMiles * 0.6;
    let insurance = 0.1;
    const baseRate =
      speedType() + costPerMin + costPerMile + parcelType() + insurance;
    let workersCompensation = baseRate * 0.025;
    let salesTax = baseRate * 0.0;
    const bookingFee = () => {
      if (baseRate >= 16.76 && baseRate <= 30) {
        let bF = baseRate * 0.2;
        _logger(bF);
        return bF;
      }
      if (baseRate >= 30.1 && baseRate <= 45) {
        let bF = baseRate * 0.17;
        _logger(bF);
        return bF;
      }
      if (baseRate >= 45.1 && baseRate <= 70) {
        let bF = baseRate * 0.15;
        _logger(bF);
        return bF;
      }
      if (baseRate > 70) {
        let bF = baseRate * 0.14;
        _logger(bF);
        return bF;
      } else {
        return null;
      }
    };
    if (d !== 0 && t !== 0) {
      let subTotal = parseFloat(
        baseRate + workersCompensation + salesTax + bookingFee()
      ).toFixed(2);
      if (props.price !== subTotal) {
        props.priceCallback(subTotal);
      }
      return `$${subTotal}`;
    } else {
      return `$0.00`;
    }
  };
  return (
    <div>
      <div className="card-body">
        <div className="text-center">
          <h3 className="mt-0">
            {priceFormula(props.distance, props.duration)}
          </h3>
          <p>Estimated Price</p>
        </div>
        <hr />
      </div>
    </div>
  );
};
Pricing.propTypes = {
  distance: PropTypes.number,
  duration: PropTypes.number,
  speedType: PropTypes.string,
  parcelType: PropTypes.string,
  priceCallback: PropTypes.func,
  price: PropTypes.number,
};
export default Pricing;
